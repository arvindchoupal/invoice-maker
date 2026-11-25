"use client";

import Link from "next/link";
import { PublicSiteSearch } from "@/components/PublicSiteSearch";
import { useAuthSession } from "@/hooks/useAuthSession";

const linkClass = "hidden rounded-xl px-3 py-2 text-[15px] text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex";
const buttonClass = "rounded-full border border-blue-600 px-4 py-2 text-[15px] font-medium text-blue-700 transition hover:bg-blue-600 hover:text-white dark:border-blue-300 dark:text-blue-200 dark:hover:bg-blue-300 dark:hover:text-slate-950";

export function PublicHeaderActions() {
  const { isLoggedIn, user, ready } = useAuthSession();

  if (!ready) return <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" aria-hidden />;

  return <div className="flex shrink-0 items-center gap-1.5 sm:gap-2"><PublicSiteSearch />{isLoggedIn ? <><Link className={linkClass} href="/dashboard">Dashboard</Link><Link className={buttonClass} href="/invoices/new" title={user?.name ? `Signed in as ${user.name}` : undefined}>New invoice</Link></> : <><Link className={linkClass} href="/login">Log in</Link><Link className={buttonClass} href="/signup?source=founding-1000">Claim free</Link></>}</div>;
}
