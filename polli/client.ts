// polli/client.ts
// Lightweight wrapper around Pollinations image + chat endpoints with tool-calling support.
// Works in Node 18+ (global fetch), Bun, Deno, and modern browsers.
// Endpoints per official APIDOCS: image (/prompt), models (/models), text (GET /), openai chat (POST /openai).

import { ChatMessage, ChatOptions, ImageParams, PollinationsError, TextParams, Tool, ToolCall } from "./types";
import { qs, backoff, safeJsonParse } from "./utils";

export interface PolliConfig {
  token?: string;                 // Bearer token (recommended for servers/bots)
  referrer?: string;              // Identifier for client/web usage
  baseImageURL?: string;          // override for testing/mocking
  baseTextURL?: string;           // override for testing/mocking
}

export class Polli {
  private token?: string;
  private referrer?: string;
  private baseImageURL: string;
  private baseTextURL: string;

  constructor(cfg: PolliConfig = {}) {
    this.token = cfg.token;
    this.referrer = cfg.referrer;
    this.baseImageURL = cfg.baseImageURL ?? "https://image.pollinations.ai";
    this.baseTextURL  = cfg.baseTextURL  ?? "https://text.pollinations.ai";
  }

  private headers(contentType?: string): HeadersInit {
    const h: Record<string, string> = {};
    if (contentType) h["Content-Type"] = contentType;
    if (this.token) h["Authorization"] = `Bearer ${this.token}`;
    return h;
  }

  // ---------- IMAGE ----------
  buildImageURL(prompt: string, params: ImageParams = {}): string {
    const encoded = encodeURIComponent(prompt);
    const query = qs({
      width: params.width,
      height: params.height,
      model: params.model,
      seed: params.seed,
      nologo: params.nologo ? 1 : undefined,
      private: params.private ? 1 : undefined,
      enhance: params.enhance ? 1 : undefined,
      safe: params.safe ? 1 : undefined,
      transparent: params.transparent ? 1 : undefined,
      referrer: params.referrer ?? undefined,
    }, this.referrer);
    return `${this.baseImageURL}/prompt/${encoded}${query}`;
  }

  async generateImage(
    prompt: string,
    params: ImageParams = {},
    opts?: { asBuffer?: boolean }
  ): Promise<ArrayBuffer | Buffer> {
    const url = this.buildImageURL(prompt, params);
    const fetchRun = async () => {
      const res = await fetch(url, { method: "GET", headers: this.headers() });
      if (!res.ok) throw new PollinationsError(await res.text().catch(() => res.statusText), res.status);
      const ab = await res.arrayBuffer();
      // @ts-expect-error - Buffer exists in Node
      return (opts?.asBuffer && typeof Buffer !== "undefined") ? Buffer.from(ab) : ab;
    };
    return backoff(fetchRun);
  }

  async listImageModels(): Promise<any> {
    const url = `${this.baseImageURL}/models`;
    const fetchRun = async () => {
      const res = await fetch(url, { headers: this.headers() });
      if (!res.ok) throw new PollinationsError(await res.text().catch(() => res.statusText), res.status);
      return res.json();
    };
    return backoff(fetchRun);
  }

  // ---------- TEXT (simple GET) ----------
  async text(prompt: string, params: TextParams = {}): Promise<string | any> {
    const encoded = encodeURIComponent(prompt);
    const url = `${this.baseTextURL}/${encoded}${qs({
      model: params.model,
      seed: params.seed,
      temperature: params.temperature,
      top_p: params.top_p,
      presence_penalty: params.presence_penalty,
      frequency_penalty: params.frequency_penalty,
      system: params.system,
      json: params.json ? 1 : undefined,
      stream: params.stream ? 1 : undefined,
      private: params.private ? 1 : undefined,
      referrer: params.referrer ?? undefined,
    }, this.referrer)}`;

    const fetchRun = async () => {
      const res = await fetch(url, { headers: this.headers() });
      if (!res.ok) throw new PollinationsError(await res.text().catch(() => res.statusText), res.status);
      return params.json ? res.json() : res.text();
    };
    return backoff(fetchRun);
  }

  // ---------- CHAT (OpenAI-compatible POST) ----------
  async chatComplete(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    const body = {
      model: options.model ?? "openai",
      messages,
      temperature: options.temperature,
      top_p: options.top_p,
      stream: false,
      private: options.private,
      referrer: options.referrer ?? this.referrer,
      tool_choice: options.tool_choice,
      ...options,
    };

    const fetchRun = async () => {
      const res = await fetch(`${this.baseTextURL}/openai`, {
        method: "POST",
        headers: this.headers("application/json"),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new PollinationsError(await res.text().catch(() => res.statusText), res.status);
      const data = await res.json();
      const msg = data?.choices?.[0]?.message?.content;
      if (typeof msg !== "string") throw new PollinationsError("Unexpected chat completion payload");
      return msg;
    };
    return backoff(fetchRun);
  }

  async *chatStream(messages: ChatMessage[], options: ChatOptions = {}): AsyncGenerator<string> {
    const body = {
      model: options.model ?? "openai",
      messages,
      temperature: options.temperature,
      top_p: options.top_p,
      stream: true,
      private: options.private,
      referrer: options.referrer ?? this.referrer,
      tool_choice: options.tool_choice,
      ...options,
    };

    const res = await fetch(`${this.baseTextURL}/openai`, {
      method: "POST",
      headers: this.headers("application/json"),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new PollinationsError(await res.text().catch(() => res.statusText), res.status);

    // SSE parsing (data: {...})
    const reader = res.body?.getReader();
    if (!reader) throw new PollinationsError("ReadableStream not supported in this environment");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) return;
      buffer += decoder.decode(value, { stream: true });

      let idx;
      while ((idx = buffer.indexOf("\n\n")) !== -1) {
        const raw = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 2);

        if (!raw.startsWith("data:")) continue;
        const payload = raw.replace(/^data:\s*/, "");
        if (payload === "[DONE]" || payload === "DONE") return;

        try {
          const json = JSON.parse(payload);
          const delta = json?.choices?.[0]?.delta?.content;
          if (typeof delta === "string") yield delta;
        } catch {
          // Ignore heartbeats or non-JSON lines
        }
      }
    }
  }

  // ---------- CHAT + TOOLS (function calling loop) ----------
  /**
   * Run a tool-enabled conversation.
   * - Provide 'tools' (OpenAI-compatible schema) and an 'executor' map of tool implementations.
   * - The loop will keep calling /openai until no tool_calls are returned or maxRounds reached.
   */
  async chatWithTools(
    messages: ChatMessage[],
    tools: Tool[],
    exec: Record<string, (args: any) => Promise<any> | any>,
    options: ChatOptions = {},
    maxRounds = 4
  ): Promise<{ messages: ChatMessage[]; finalText?: string }> {
    let round = 0;
    const bodyBase = {
      model: options.model ?? "openai",
      temperature: options.temperature,
      top_p: options.top_p,
      private: options.private,
      referrer: options.referrer ?? this.referrer,
      tool_choice: options.tool_choice ?? "auto",
      tools,
      stream: false,
      ...options,
    };

    const msgs: ChatMessage[] = [...messages];

    while (round++ < maxRounds) {
      const res = await fetch(`${this.baseTextURL}/openai`, {
        method: "POST",
        headers: this.headers("application/json"),
        body: JSON.stringify({ ...bodyBase, messages: msgs }),
      });
      if (!res.ok) throw new PollinationsError(await res.text().catch(() => res.statusText), res.status);
      const data = await res.json();

      const choice = data?.choices?.[0];
      const assistantMsg = choice?.message as any;
      if (!assistantMsg) throw new PollinationsError("Malformed response from /openai");

      const toolCalls = (assistantMsg.tool_calls ?? []) as ToolCall[];
      // Append assistant message (even if it has tool_calls with or without content)
      msgs.push({ role: "assistant", content: assistantMsg.content ?? "" });

      if (toolCalls.length === 0) {
        // final textual answer
        const finalText = assistantMsg.content ?? "";
        return { messages: msgs, finalText };
      }

      // Execute tools sequentially (simple, reliable). Parallel could be added with Promise.all + ordering.
      for (const call of toolCalls) {
        const name = call.function?.name;
        const args = safeJsonParse(call.function?.arguments ?? "{}", {});
        const impl = exec[name];
        let result: any;
        if (typeof impl !== "function") {
          result = { error: `No tool implementation registered for "${name}"` };
        } else {
          try {
            result = await impl(args);
          } catch (err: any) {
            result = { error: String(err?.message ?? err) };
          }
        }

        msgs.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result),
        });
      }
      // Loop continues; the tool outputs are now in the message list.
    }

    return { messages: msgs };
  }
}
