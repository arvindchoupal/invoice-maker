"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

const guestLinkClass = "rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10";
const guestButtonClass = "rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200";
const authedLinkClass = "rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10";
const authedButtonClass =
  "rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-100";

export function PublicNavActions({ showBlog = true }: { showBlog?: boolean }) {
  const { isLoggedIn, user, ready } = useAuthSession();

  if (!ready) {
    return <div className="h-10 w-40 animate-pulse rounded-xl bg-white/10" aria-hidden />;
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link className={`${guestLinkClass} hidden md:inline-flex`} data-event="nav_tools_click" data-event-category="navigation" href="/tools">
          Free tools
        </Link>
        <Link className={guestLinkClass} data-event="nav_templates_click" data-event-category="navigation" href="/invoice-templates">
          Templates
        </Link>
        <Link className={`hidden lg:inline-flex ${guestLinkClass}`} data-event="create_invoice_click" data-event-category="cta" data-event-label="nav make invoice authed" href="/free-invoice">
          Make invoice
        </Link>
        {showBlog ? (
          <Link className={`hidden md:inline-flex ${guestLinkClass}`} href="/blog">
            Blog
          </Link>
        ) : null}
        <Link className={`hidden sm:inline-flex ${authedLinkClass}`} href="/dashboard">
          Dashboard
        </Link>
        <Link className={authedButtonClass} data-event="create_invoice_click" data-event-category="cta" data-event-label="nav new invoice authed" href="/invoices/new" title={user?.name ? `Signed in as ${user.name}` : undefined}>
          New invoice
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link className={`${guestLinkClass} hidden sm:inline-flex`} data-event="nav_tools_click" data-event-category="navigation" href="/tools">
        Tools
      </Link>
      <Link className={guestLinkClass} data-event="nav_templates_click" data-event-category="navigation" href="/invoice-templates">
        Templates
      </Link>
      <Link className={`hidden lg:inline-flex ${guestLinkClass}`} data-event="create_invoice_click" data-event-category="cta" data-event-label="nav make invoice guest" href="/free-invoice">
        Make invoice
      </Link>
      {showBlog ? (
        <Link className={`hidden md:inline-flex ${guestLinkClass}`} href="/blog">
          Blog
        </Link>
      ) : null}
      <Link className={`hidden sm:inline-flex ${guestLinkClass}`} data-event="login_click" data-event-category="auth" href="/login">
        Log in
      </Link>
      <Link className={guestButtonClass} data-event="signup_click" data-event-category="auth" data-event-label="nav start free" href="/signup">
        Start free
      </Link>
    </div>
  );
}
