"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { api, getToken } from "@/lib/api";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { Badge, Card, LinkButton } from "@/components/ui";

interface LaunchOffer {
  key: string;
  limit: number;
  claimed: number;
  remaining: number;
  active: boolean;
}

interface Usage {
  plan_name: "free" | "starter" | "pro" | "business";
  invoice_count: number;
  ai_import_count: number;
}

const foundingFeatures = [
  "Create and save unlimited invoices",
  "Download professional invoice PDFs",
  "Use GST-ready fields and reports",
  "Track clients, payments and reminders",
  "Use AI imports and business reports",
  "No card, subscription fee or automatic charge",
];

export function PricingClient() {
  const [offer, setOffer] = useState<LaunchOffer | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const isLoggedIn = Boolean(getToken());

  useEffect(() => {
    api<LaunchOffer>("/pricing/launch-offer").then(setOffer).catch(() => undefined);
    if (getToken()) api<Usage>("/pricing/usage").then(setUsage).catch(() => undefined);
  }, []);

  const limit = offer?.limit ?? 1000;
  const claimed = offer?.claimed ?? 0;
  const remaining = offer?.remaining;
  const progress = Math.min((claimed / limit) * 100, 100);
  const eligible = offer?.active ?? true;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#050816]/85 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo className="text-white" href="/" imageClassName="h-10 w-10" tagline="" />
          <div className="flex items-center gap-2">
            <Link className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 sm:inline-flex" href="/tools">Free tools</Link>
            <Link className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10" href={isLoggedIn ? "/dashboard" : "/login"}>
              {isLoggedIn ? "Dashboard" : "Log in"}
            </Link>
            <Link className="rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950" href={isLoggedIn ? "/invoices/new" : "/signup?source=founding-1000"}>
              {isLoggedIn ? "New invoice" : "Claim free account"}
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Badge tone="blue">Founding customer offer</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">The first 1,000 customers get InvoiceWala free.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            We are not collecting subscription payments during launch. Eligible founding customers get access to all current Pro account features with no card and no automatic charge.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="relative overflow-hidden border-cyan-300/50 bg-cyan-300/[0.08] p-6 text-white shadow-2xl shadow-cyan-950/30 sm:p-8">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Badge tone="blue">Limited to 1,000 accounts</Badge>
                  <h2 className="mt-4 text-3xl font-semibold">Founding Pro account</h2>
                </div>
                <Gift className="h-9 w-9 text-cyan-300" />
              </div>
              <div className="mt-6 flex items-end gap-3">
                <p className="text-6xl font-semibold">₹0</p>
                <p className="pb-2 text-sm text-slate-400">subscription fee</p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {foundingFeatures.map((feature) => (
                  <p className="flex gap-2 text-sm text-slate-200" key={feature}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    {feature}
                  </p>
                ))}
              </div>
              <LinkButton className="mt-8 w-full sm:w-auto" href={isLoggedIn ? "/dashboard" : "/signup?source=founding-1000"} variant="primary">
                {isLoggedIn ? "Open your workspace" : eligible ? "Claim my free account" : "Create a free account"}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                One founding spot per genuine user account. Future optional add-ons may have separate terms, but InvoiceWala will never charge this account automatically.
              </p>
            </div>
          </Card>

          <div className="grid gap-5">
            <Card className="border-white/10 bg-white/[0.04] p-6 text-white">
              <Sparkles className="h-6 w-6 text-cyan-300" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Launch availability</p>
              <p className="mt-3 text-3xl font-semibold">{remaining == null ? "Checking availability…" : `${remaining.toLocaleString()} spots remaining`}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>{offer ? `${claimed.toLocaleString()} claimed` : "Live count"}</span>
                <span>{limit.toLocaleString()} total</span>
              </div>
            </Card>

            <Card className="border-white/10 bg-white/[0.04] p-6 text-white">
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
              <h2 className="mt-4 text-xl font-semibold">No payment setup required</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Create the account with your name, email and password. We do not ask for card, UPI or bank details for this offer.
              </p>
            </Card>

            {usage ? (
              <Card className="border-emerald-300/20 bg-emerald-300/[0.06] p-6 text-white">
                <p className="text-sm text-emerald-200">Your current access</p>
                <p className="mt-2 text-2xl font-semibold">{usage.plan_name === "pro" ? "Founding Pro" : "Free account"}</p>
              </Card>
            ) : null}
          </div>
        </div>

        <Card className="border-white/10 bg-white/[0.04] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-semibold">What happens after the first 1,000 accounts?</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
            New account terms may change after all founding spots are claimed. Any future paid plan will be announced separately. We will not silently convert a free account into a paid subscription or charge a saved payment method.
          </p>
        </Card>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · founding customer offer</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
