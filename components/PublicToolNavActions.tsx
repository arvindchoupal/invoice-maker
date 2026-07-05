"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

export function PublicToolNavActions({ signupSource }: { signupSource: string }) {
  const { isLoggedIn, ready } = useAuthSession();

  if (!ready) {
    return <div className="h-10 w-36 animate-pulse rounded-xl bg-white/10" aria-hidden />;
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:inline-flex" href="/tools">
          All tools
        </Link>
        <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white" href="/invoice-templates">
          Templates
        </Link>
        <Link
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-100"
          href="/invoices/new"
        >
          New invoice
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:inline-flex" href="/tools">
        All tools
      </Link>
      <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white" href="/invoice-templates">
        Templates
      </Link>
      <Link
        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-100"
        href={`/signup?source=${signupSource}`}
      >
        Save result
      </Link>
    </div>
  );
}
