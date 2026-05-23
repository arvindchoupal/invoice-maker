const API_URL =
 
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:4000/api"
    : "https://api.invoicewala.shop/api");

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("invoice_token") ?? "";
}

export function setSession(token: string, user: unknown) {
  localStorage.setItem("invoice_token", token);
  localStorage.setItem("invoice_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("invoice_token");
  localStorage.removeItem("invoice_user");
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export { API_URL };
