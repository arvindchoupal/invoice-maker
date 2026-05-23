import { getToken } from "@/lib/api";

export type StoredUser = {
  name: string;
  email?: string;
  role: string;
};

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  if (!getToken()) return null;
  const raw = localStorage.getItem("invoice_user");
  if (!raw) return null;
  try {
    const user = JSON.parse(raw) as StoredUser;
    return user?.name ? user : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getStoredUser());
}
