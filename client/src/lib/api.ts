const API_URL = process.env.API_URL ?? "http://localhost:4000";

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
  tags?: string[];
  revalidate?: number;
};

async function apiFetch<T>(
  path: string,
  { body, token, tags, revalidate = 60, ...rest }: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: tags ? { tags, revalidate } : { revalidate },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? `Request failed: ${res.status}`);
  }

  return json;
}

export const api = {
  get: <T>(path: string, opts?: Omit<FetchOptions, "body" | "method">) =>
    apiFetch<T>(path, { method: "GET", ...opts }),

  post: <T>(path: string, body: unknown, opts?: Omit<FetchOptions, "body" | "method">) =>
    apiFetch<T>(path, { method: "POST", body, ...opts }),

  put: <T>(path: string, body: unknown, opts?: Omit<FetchOptions, "body" | "method">) =>
    apiFetch<T>(path, { method: "PUT", body, ...opts }),

  delete: <T>(path: string, opts?: Omit<FetchOptions, "body" | "method">) =>
    apiFetch<T>(path, { method: "DELETE", ...opts }),
};
