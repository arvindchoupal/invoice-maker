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
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/15 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 sm:w-auto" data-event="create_invoice_click" data-event-category="cta" data-event-label="homepage hero authed" href="/invoices/new">
            Create invoice
          </Link>
          <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-blue-300 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10 sm:w-auto" data-event="view_demo_click" data-event-category="engagement" data-event-label="homepage hero authed" href="#workflow">
            See how it works
          </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/15 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 sm:w-auto" data-event="create_invoice_click" data-event-category="cta" data-event-label="homepage hero guest first PDF free" href="/free-invoice">
          Create & download free
        </Link>
        <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-blue-300 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10 sm:w-auto" data-event="view_demo_click" data-event-category="engagement" data-event-label="homepage hero guest" href="#workflow">
          See how it works
        </Link>
    </div>
  );
}
