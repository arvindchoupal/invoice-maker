"use client";

import { useEffect, useState } from "react";
import { getStoredUser, type StoredUser } from "@/lib/session";

export function useAuthSession() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setReady(true);
  }, []);

  return { user, isLoggedIn: Boolean(user), ready };
}
