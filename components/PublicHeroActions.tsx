"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

export function PublicHeroActions() {
  const { isLoggedIn, ready } = useAuthSession();

  if (!ready) {
    return <div className="h-12 w-72 animate-pulse rounded-xl bg-white/10" aria-hidden />;
  }

  if (isLoggedIn) {
    return (
      <>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200" href="/dashboard">
            Go to dashboard
          </Link>
          <Link className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-100" href="/invoices/new">
            Create invoice
          </Link>
          <Link className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" href="/tools">
            Free tools
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-400">Welcome back — pick up invoices, clients and payments where you left off.</p>
      </>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200" href="/signup">
          Start free
        </Link>
        <Link className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" href="/tools">
          Try free tools
        </Link>
        <Link className="rounded-xl border border-cyan-300/30 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10" href="/login">
          Log in
        </Link>
      </div>
      <p className="mt-4 text-sm text-slate-400">No credit card required. Save your first invoice in minutes.</p>
    </>
  );
}
