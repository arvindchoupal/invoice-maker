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
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200 sm:w-auto" data-event="create_invoice_click" data-event-category="cta" data-event-label="homepage hero authed" href="/invoices/new">
            Create invoice
          </Link>
          <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto" data-event="view_demo_click" data-event-category="engagement" data-event-label="homepage hero authed" href="#demo">
            View demo
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-400">Welcome back — pick up invoices, clients and payments where you left off.</p>
      </>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200 sm:w-auto" data-event="create_invoice_click" data-event-category="cta" data-event-label="homepage hero guest" href="/free-invoice">
          Create free invoice
        </Link>
        <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto" data-event="view_demo_click" data-event-category="engagement" data-event-label="homepage hero guest" href="#demo">
          View demo
        </Link>
      </div>
      <p className="mt-4 text-sm text-slate-400">No credit card required. Save your first invoice in minutes.</p>
    </>
  );
}
