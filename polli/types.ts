// polli/types.ts

export type ImageParams = {
  width?: number;
  height?: number;
  model?: string;      // e.g. "flux", "gptimage", etc. Use listImageModels() to discover.
  seed?: number|string;
  nologo?: boolean;
  private?: boolean;
  enhance?: boolean;
  safe?: boolean;
  transparent?: boolean;
  referrer?: string;
};

export type TextParams = {
  model?: string;      // e.g. "openai"
  seed?: number|string;
  temperature?: number;
  top_p?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  system?: string;
  json?: boolean;
  stream?: boolean;
  private?: boolean;
  referrer?: string;
};

export type ChatMessage =
  | { role: "system" | "user" | "assistant"; content: string }
  | {
      role: "user";
      content: Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string } }
      >;
    }
  | {
      role: "tool";
      tool_call_id: string;
      content: string;
    };

export type ChatOptions = {
  model?: string;      // default "openai"
  temperature?: number;
  top_p?: number;
  stream?: boolean;    // SSE streaming
  private?: boolean;
  referrer?: string;
  tool_choice?: "auto" | "none" | { type: "function"; function: { name: string } };
  [k: string]: unknown;
};

// OpenAI-compatible "tools" schema
export type ToolFunction = {
  name: string;
  description?: string;
  parameters?: Record<string, any>; // JSON Schema
};

export type Tool = {
  type: "function";
  function: ToolFunction;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

export class PollinationsError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "PollinationsError";
    this.status = status;
  }
}
