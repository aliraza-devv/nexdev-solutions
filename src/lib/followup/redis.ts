// A tiny client for Upstash Redis over its REST API. Plain fetch, so there is
// no new package to install. Errors never include the command, because the
// arguments can contain an email address or a phone number.

type Arg = string | number;

function settings(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

export function redisConfigured(): boolean {
  return settings() !== null;
}

export async function redis(...args: Arg[]): Promise<unknown> {
  const config = settings();
  if (!config) throw new Error("redis_not_configured");
  const res = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  let json: { result?: unknown; error?: unknown } = {};
  try {
    json = await res.json();
  } catch {
    json = {};
  }
  if (!res.ok || json.error) throw new Error("redis_error");
  return json.result;
}
