"use client";

import Link from "next/link";
import { useAuthSession } from "@/hooks/useAuthSession";

export function PublicFooterLinks() {
  const { isLoggedIn, ready } = useAuthSession();

  if (!ready) return null;

  if (isLoggedIn) {
    return (
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/invoices">Invoices</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/settings">Settings</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/tools">Tools</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/login">Log in</Link>
      <Link href="/signup">Start free</Link>
    </div>
  );
}
