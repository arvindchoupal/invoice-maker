"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

type PublicPrimaryCtaProps = {
  guestHref?: string;
  guestLabel?: string;
  authedHref?: string;
  authedLabel?: string;
  className?: string;
};

export function PublicPrimaryCta({
  guestHref = "/signup",
  guestLabel = "Start free",
  authedHref = "/dashboard",
  authedLabel = "Open dashboard",
  className = "inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100",
}: PublicPrimaryCtaProps) {
  const { isLoggedIn, ready } = useAuthSession();

  if (!ready) {
    return <span className={`${className} animate-pulse bg-white/20`} aria-hidden />;
  }

  const href = isLoggedIn ? authedHref : guestHref;
  const label = isLoggedIn ? authedLabel : guestLabel;
  const guestEvent = guestHref.startsWith("/free-invoice") ? "create_invoice_click" : "signup_click";

  return (
    <Link className={className} data-event={isLoggedIn ? "dashboard_click" : guestEvent} data-event-category={isLoggedIn ? "navigation" : guestEvent === "signup_click" ? "auth" : "cta"} data-event-label={label} href={href}>
      {label}
    </Link>
  );
}
