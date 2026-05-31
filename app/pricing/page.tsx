"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { api, getToken } from "@/lib/api";
import { BrandLogo } from "@/components/BrandLogo";
import { Badge, Card, LinkButton, Skeleton } from "@/components/ui";

interface Plan {
  id: number;
  name: "free" | "starter" | "pro" | "business";
  invoice_limit: number | null;
  ai_import_limit: number | null;
  features: string | Record<string, unknown>;
}

interface Usage {
  plan_name: Plan["name"];
  invoice_count: number;
  ai_import_count: number;
}

const prices: Record<Plan["name"], { monthly: number; yearly: number; tagline: string; cta: string }> = {
  free: { monthly: 0, yearly: 0, tagline: "For testing invoices and free tools", cta: "Start free" },
  starter: { monthly: 199, yearly: 159, tagline: "For freelancers, shops and GST starters", cta: "Choose Starter" },
  pro: { monthly: 199, yearly: 159, tagline: "Early access pricing for freelancers, shops and small teams", cta: "Get Pro for ₹199" },
  business: { monthly: 499, yearly: 399, tagline: "For teams once collaboration features mature", cta: "Join waitlist" },
};

const comparisonRows = [
  ["Invoices", "10/month", "Unlimited", "Unlimited"],
  ["AI imports", "2/month", "Unlimited", "Higher fair use"],
  ["GST reports", "Basic", "Advanced", "Advanced"],
  ["Reminders", "No", "Email + WhatsApp share", "Automation rules"],
  ["Branding removal", "No", "Yes", "Yes"],
  ["Client portal", "No", "Soon", "Included when ready"],
  ["Team workspace", "No", "No", "Included when ready"],
];

function parseFeatures(features: Plan["features"]) {
  if (typeof features !== "string") return features;
  try {
    return JSON.parse(features) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function meter(value: number, limit: number | null) {
  if (!limit) return 100;
  return Math.min((value / limit) * 100, 100);
}

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [yearly, setYearly] = useState(false);
  const isLoggedIn = Boolean(getToken());

  useEffect(() => {
    api<Plan[]>("/pricing/plans").then((items) => setPlans(items.filter((plan) => plan.name !== "starter")));
    if (getToken()) api<Usage>("/pricing/usage").then(setUsage).catch(() => undefined);
  }, []);

  const currentPlan = useMemo(() => plans.find((plan) => plan.name === usage?.plan_name), [plans, usage?.plan_name]);

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
            <Link className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-950" href={isLoggedIn ? "/invoices/new" : "/signup"}>
              {isLoggedIn ? "New invoice" : "Start free"}
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="blue">Pricing</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Simple pricing for invoices, GST and AI bookkeeping.</h1>
          <p className="mt-5 text-lg text-slate-300">
            Start free, then upgrade to Pro for ₹199/month while InvoiceWala is in its early growth phase.
          </p>
          <div className="mt-7 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <button className={`rounded-xl px-4 py-2 text-sm font-semibold ${!yearly ? "bg-white text-slate-950" : "text-slate-400"}`} onClick={() => setYearly(false)}>Monthly</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-semibold ${yearly ? "bg-white text-slate-950" : "text-slate-400"}`} onClick={() => setYearly(true)}>Yearly</button>
          </div>
        </div>

        {usage && currentPlan ? (
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="grid gap-5 lg:grid-cols-[240px_1fr_1fr]">
              <div>
                <p className="text-sm text-slate-400">Current plan</p>
                <p className="mt-2 text-2xl font-semibold capitalize">{usage.plan_name}</p>
              </div>
              <div>
                <div className="flex justify-between text-sm"><span>Invoices used</span><span>{usage.invoice_count}/{currentPlan.invoice_limit ?? "∞"}</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-400" style={{ width: `${meter(usage.invoice_count, currentPlan.invoice_limit)}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm"><span>AI credits used</span><span>{usage.ai_import_count}/{currentPlan.ai_import_limit ?? "∞"}</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-violet-400" style={{ width: `${meter(usage.ai_import_count, currentPlan.ai_import_limit)}%` }} /></div>
              </div>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.length ? plans.map((plan) => {
            const featureMap = parseFeatures(plan.features);
            const planPrice = prices[plan.name];
            const recommended = plan.name === "pro";
            return (
              <Card className={`relative border-white/10 bg-white/[0.04] p-6 text-white shadow-2xl shadow-black/20 ${recommended ? "border-cyan-300/60 bg-cyan-300/[0.08]" : ""}`} key={plan.id}>
                {recommended ? <Badge tone="blue">Best value</Badge> : null}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold capitalize">{plan.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{planPrice.tagline}</p>
                  </div>
                  {plan.name === "business" ? <Zap className="h-5 w-5 text-amber-300" /> : <Sparkles className="h-5 w-5 text-cyan-300" />}
                </div>
                <p className="mt-6 text-4xl font-semibold">₹{(yearly ? planPrice.yearly : planPrice.monthly).toLocaleString()}<span className="text-sm font-medium text-slate-400">/mo</span></p>
                {yearly && plan.name !== "free" ? <p className="mt-1 text-sm text-emerald-300">Billed yearly. Save 20%.</p> : null}
                <div className="mt-6 grid gap-3 text-sm text-slate-200">
                  <p><Check className="mr-2 inline h-4 w-4 text-emerald-300" />{plan.invoice_limit ?? "Unlimited"} invoices</p>
                  <p><Check className="mr-2 inline h-4 w-4 text-emerald-300" />{plan.ai_import_limit ?? "Unlimited"} AI imports</p>
                  {Object.entries(featureMap).slice(0, 4).map(([key, value]) => (
                    <p key={key}><Check className="mr-2 inline h-4 w-4 text-emerald-300" />{key}: {String(value)}</p>
                  ))}
                </div>
                <LinkButton className="mt-6 w-full" href={isLoggedIn ? "/dashboard" : "/signup"} variant={recommended ? "primary" : "secondary"}>
                  {usage?.plan_name === plan.name ? "Current plan" : planPrice.cta}
                  <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </Card>
            );
          }) : <><Skeleton className="h-96 bg-white/10" /><Skeleton className="h-96 bg-white/10" /><Skeleton className="h-96 bg-white/10" /></>}
        </div>

        <Card className="overflow-hidden border-white/10 bg-white/[0.04] text-white">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-xl font-semibold">Compare plans</h2>
            <p className="mt-1 text-sm text-slate-400">Choose based on invoice volume, AI imports and team needs.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-4">Feature</th><th className="p-4">Free</th><th className="p-4">Pro ₹199</th><th className="p-4">Business</th></tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr className="border-t border-white/10" key={row[0]}>
                    {row.map((cell) => <td className="p-4" key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </main>
  );
}
