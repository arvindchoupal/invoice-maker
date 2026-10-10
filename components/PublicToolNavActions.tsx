"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

export function PublicToolNavActions({ signupSource }: { signupSource: string }) {
  const { isLoggedIn, ready } = useAuthSession();

  if (!ready) {
    return <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" aria-hidden />;
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex" href="/tools">
          All tools
        </Link>
        <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white" href="/invoice-templates">
          Templates
        </Link>
        <Link
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
          href="/invoices/new"
        >
          New invoice
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex" href="/tools">
        All tools
      </Link>
      <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white" href="/invoice-templates">
        Templates
      </Link>
      <Link
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
        href={`/signup?source=${signupSource}`}
      >
        Save result
      </Link>
    </div>
  );
}
