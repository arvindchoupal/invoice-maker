"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

const comparisonLinks = [
  { href: "/invoicewala-vs-excel", label: "InvoiceWala vs Excel" },
  { href: "/invoicewala-vs-zoho", label: "InvoiceWala vs Zoho" },
  { href: "/invoicewala-vs-vyapar", label: "InvoiceWala vs Vyapar" },
];

export function PublicFooterLinks() {
  const { isLoggedIn, ready } = useAuthSession();

  if (!ready) return null;

  if (isLoggedIn) {
    return (
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <Link className="transition hover:text-white" href="/dashboard">Dashboard</Link>
        <Link className="transition hover:text-white" href="/invoices">Invoices</Link>
        <Link className="transition hover:text-white" href="/tools">Tools</Link>
        <Link className="transition hover:text-white" href="/blog">Blog</Link>
        <Link className="transition hover:text-white" href="/settings">Settings</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 text-sm sm:grid-cols-[1fr_auto] sm:items-start">
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <Link className="transition hover:text-white" href="/tools">Tools</Link>
        <Link className="transition hover:text-white" href="/blog">Blog</Link>
        <Link className="transition hover:text-white" href="/pricing">Pricing</Link>
        <Link className="transition hover:text-white" href="/login">Log in</Link>
        <Link className="transition hover:text-white" href="/signup">Start free</Link>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-slate-500 sm:justify-end">
        {comparisonLinks.map((link) => (
          <Link className="transition hover:text-slate-200" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
