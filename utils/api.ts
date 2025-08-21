type JSONValue = any;

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // relative on browser

  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  );
};

async function apiFetch<T = JSONValue>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${getBaseUrl()}${path}`;

  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type":
        init.body && !(init.headers as any)?.["Content-Type"]
          ? "application/json"
          : undefined,
      ...(init.headers as any),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} @ ${url}\n${text}`);
  }
  const json = (await res.json().catch(() => null)) as { data?: T } | T | null;

  // @ts-ignore – prefer {data} but fall back
  return (json && (json.data ?? json)) as T;
}
export const getEntries = () => apiFetch("/api/journal");
export const getEntry = (id: string) => apiFetch(`/api/journal/${id}`);

export const createNewEntry = (content: string) =>
  apiFetch("/api/journal", {
    method: "POST",
    body: JSON.stringify({ content }),
  });

export const updateEntry = (id: string, content: string) =>
  apiFetch(`/api/journal/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

export const pinEntry = (id: string, pinned: boolean) =>
  apiFetch(`/api/journal/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ pinned }),
  });

export const archiveEntry = (id: string, archived: boolean) =>
  apiFetch(`/api/journal/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ archived }),
  });

export const deleteEntry = (id: string) =>
  apiFetch(`/api/journal/${id}`, { method: "DELETE" });

export const register = (user: { email: string; password?: string }) =>
  apiFetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const login = (user: { email: string; password?: string }) =>
  apiFetch("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(user),
  });
