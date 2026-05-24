"use client";

import { useState } from "react";
import { getStoredUser, type StoredUser } from "@/lib/session";

export function useAuthSession() {
  const [user] = useState<StoredUser | null>(() => getStoredUser());
  const ready = true;

  return { user, isLoggedIn: Boolean(user), ready };
}
