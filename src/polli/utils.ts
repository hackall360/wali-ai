// polli/utils.ts

export function qs(params: Record<string, unknown>, referrer?: string) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    q.set(k, String(v));
  }
  if (referrer && !q.has("referrer")) q.set("referrer", referrer);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export async function backoff<T>(fn: () => Promise<T>, max = 3, baseMs = 750): Promise<T> {
  let attempt = 0;
  // Simple exponential backoff for 429 / 5xx
  while (true) {
    try {
      return await fn();
    } catch (e: any) {
      const status = e?.status ?? e?.response?.status;
      if (attempt < max && (status === 429 || status >= 500)) {
        const delay = baseMs * Math.pow(2, attempt++);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
}

export function safeJsonParse<T = any>(s: string, fallback: T): T {
  try { return JSON.parse(s) as T; } catch { return fallback; }
}
