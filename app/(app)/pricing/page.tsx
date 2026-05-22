"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Sparkles, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { Badge, Button, Card, Skeleton } from "@/components/ui";

interface Plan {
  id: number;
  name: "free" | "pro" | "business";
  invoice_limit: number | null;
  ai_import_limit: number | null;
  features: string | Record<string, unknown>;
}

interface Usage {
  plan_name: string;
  invoice_count: number;
  ai_import_count: number;
}

const prices = {
  free: { monthly: 0, yearly: 0, tagline: "For trying Ledgerly" },
  pro: { monthly: 999, yearly: 799, tagline: "For freelancers and agencies" },
  business: { monthly: 2499, yearly: 1999, tagline: "For teams and growing businesses" },
};

const comparisonRows = [
  ["Invoices", "Limited", "Unlimited", "Unlimited"],
  ["AI imports", "Limited", "Unlimited", "Unlimited"],
  ["Reports", "Basic", "Advanced", "Advanced + teams"],
  ["Branding removal", "No", "Yes", "Yes"],
  ["Reminders", "No", "Yes", "Yes"],
  ["Client portal", "No", "No", "Yes"],
  ["Multi-workspace", "No", "No", "Yes"],
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

  useEffect(() => {
    api<Plan[]>("/pricing/plans").then(setPlans);
    api<Usage>("/pricing/usage").then(setUsage).catch(() => undefined);
  }, []);

  const currentPlan = useMemo(() => plans.find((plan) => plan.name === usage?.plan_name), [plans, usage?.plan_name]);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">Pricing</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Scale Ledgerly as your business grows.</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Plans, limits, and usage are loaded from backend subscription records.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-white/[0.04]">
          <button className={`rounded-xl px-4 py-2 text-sm font-semibold ${!yearly ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "text-slate-500"}`} onClick={() => setYearly(false)}>Monthly</button>
          <button className={`rounded-xl px-4 py-2 text-sm font-semibold ${yearly ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "text-slate-500"}`} onClick={() => setYearly(true)}>Yearly</button>
        </div>
      </div>

      {usage && currentPlan ? (
        <Card className="p-5">
          <div className="grid gap-5 lg:grid-cols-[240px_1fr_1fr]">
            <div>
              <p className="text-sm text-slate-500">Current plan</p>
              <p className="mt-2 text-2xl font-semibold capitalize">{usage.plan_name}</p>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>Invoices used</span><span>{usage.invoice_count}/{currentPlan.invoice_limit ?? "∞"}</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.08]"><div className="h-full rounded-full bg-blue-500" style={{ width: `${meter(usage.invoice_count, currentPlan.invoice_limit)}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>AI credits used</span><span>{usage.ai_import_count}/{currentPlan.ai_import_limit ?? "∞"}</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.08]"><div className="h-full rounded-full bg-violet-500" style={{ width: `${meter(usage.ai_import_count, currentPlan.ai_import_limit)}%` }} /></div>
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
            <Card className={`relative p-6 ${recommended ? "border-blue-400 shadow-xl shadow-blue-950/10" : ""}`} key={plan.id}>
              {recommended ? <Badge tone="blue">Recommended</Badge> : null}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold capitalize">{plan.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{planPrice.tagline}</p>
                </div>
                {plan.name === "business" ? <Zap className="h-5 w-5 text-amber-500" /> : <Sparkles className="h-5 w-5 text-blue-500" />}
              </div>
              <p className="mt-6 text-4xl font-semibold">₹{(yearly ? planPrice.yearly : planPrice.monthly).toLocaleString()}<span className="text-sm font-medium text-slate-500">/mo</span></p>
              {yearly && plan.name !== "free" ? <p className="mt-1 text-sm text-emerald-600">Billed yearly. Save 20%.</p> : null}
              <div className="mt-6 grid gap-3 text-sm">
                <p><Check className="mr-2 inline h-4 w-4 text-emerald-500" />{plan.invoice_limit ?? "Unlimited"} invoices</p>
                <p><Check className="mr-2 inline h-4 w-4 text-emerald-500" />{plan.ai_import_limit ?? "Unlimited"} AI imports</p>
                {Object.entries(featureMap).slice(0, 4).map(([key, value]) => (
                  <p key={key}><Check className="mr-2 inline h-4 w-4 text-emerald-500" />{key}: {String(value)}</p>
                ))}
              </div>
              <Button className="mt-6 w-full" variant={recommended ? "primary" : "secondary"}>{usage?.plan_name === plan.name ? "Current plan" : "Upgrade"}</Button>
            </Card>
          );
        }) : <><Skeleton className="h-96" /><Skeleton className="h-96" /><Skeleton className="h-96" /></>}
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.04]">
            <tr><th className="p-4">Feature</th><th className="p-4">Free</th><th className="p-4">Pro</th><th className="p-4">Business</th></tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr className="border-t border-slate-100 dark:border-white/5" key={row[0]}>
                {row.map((cell) => <td className="p-4" key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
