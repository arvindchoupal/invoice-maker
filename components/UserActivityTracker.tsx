"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { flushUserEvents, resetTracking, trackUserEvent } from "@/lib/user-tracking";

export function UserActivityTracker() {
  const pathname = usePathname();
  useEffect(() => {
    trackUserEvent("page_opened");
    void flushUserEvents();
  }, [pathname]);
  useEffect(() => {
    const auth = (event: Event) => {
      if ((event as CustomEvent).detail === "logout") resetTracking();
      else { trackUserEvent("page_opened"); void flushUserEvents(); }
    };
    const flush = () => { void flushUserEvents(); };
    const interval = window.setInterval(flush, 30000);
    window.addEventListener("invoicewala-session", auth);
    window.addEventListener("online", flush);
    window.addEventListener("pagehide", flush);
    return () => {
      clearInterval(interval);
      window.removeEventListener("invoicewala-session", auth);
      window.removeEventListener("online", flush);
      window.removeEventListener("pagehide", flush);
    };
  }, []);
  return null;
}
