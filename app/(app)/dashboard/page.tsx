"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  CreditCard,
  FilePlus2,
  FileText,
  IndianRupee,
  Mail,
  ReceiptText,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import { currency } from "@/lib/invoice";
import { Badge, Card, EmptyState, LinkButton, SectionHeader, Skeleton, StatCard } from "@/components/ui";

interface User {
  name: string;
}

interface DashboardData {
  summary: {
    total_invoices: number;
    paid_invoices: number;
    pending_invoices: number;
    overdue_invoices: number;
    paid_revenue: number;
    outstanding_amount: number;
    invoice_volume: number;
  };
  monthlyRevenue: Array<{ month: string; revenue: number; paid: number; outstanding: number; invoice_count: number }>;
  paymentTrends: Array<{ month: string; amount: number; payment_count: number }>;
  clientGrowth: Array<{ month: string; clients: number }>;
  topClients: Array<{
    id: number;
    name: string;
    email?: string;
    invoice_count: number;
    revenue: number;
    outstanding_amount: number;
    last_invoice_date?: string;
  }>;
  gstSummary: {
    gst_total: number;
    taxable_value: number;
    average_tax: number;
  };
  recentActivity: Array<{
    type: "invoice" | "notification";
    title: string;
    body: string;
    status: string;
    created_at: string;
  }>;
  insights: Array<{ type: string; message: string; severity: "info" | "warning" | "success" }>;
}

function formatDate(value?: string) {
  if (!value) return "No activity";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function insightTone(severity: DashboardData["insights"][number]["severity"]) {
  if (severity === "warning") return "amber";
  if (severity === "success") return "green";
  return "blue";
}

function activityIcon(type: string, status: string) {
  if (type === "notification") return Mail;
  if (status === "Paid") return CheckCircle2;
  if (status === "Overdue") return AlertTriangle;
  return FileText;
}

function activityTone(status: string) {
  if (status === "Paid" || status === "sent") return "green";
  if (status === "Overdue") return "rose";
  if (status === "Draft") return "slate";
  return "blue";
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [user] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setError("");
    try {
      setData(await api<DashboardData>("/reports/dashboard"));
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadDashboard(); }, []);

  const summary = data?.summary;
  const collectionHealth = useMemo(() => {
    const total = Number(summary?.paid_revenue ?? 0) + Number(summary?.outstanding_amount ?? 0);
    if (!total) return 0;
    return Math.round((Number(summary?.paid_revenue ?? 0) / total) * 100);
  }, [summary]);
  const maxRevenue = Math.max(...(data?.monthlyRevenue.map((m) => Number(m.revenue)) ?? [1]), 1);
  const maxPayments = Math.max(...(data?.paymentTrends.map((m) => Number(m.amount)) ?? [1]), 1);
  const primaryInsight = data?.insights[0];

  return (
    <div className="grid gap-5">
      <section className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2b3138] dark:bg-[#171b20]">
        <div className="pointer-events-none absolute -right-24 -top-32 hidden h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:block" aria-hidden="true" />
        <div className="relative grid gap-5 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              Finance overview
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-[2rem]">
              {user?.name ? `Good to see you, ${user.name}.` : "Your finance workspace is ready."}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              These numbers are pulled from your invoices, clients, payments, GST totals, and notification activity.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/invoices/new">
                <FilePlus2 className="h-4 w-4" />
                New invoice
              </LinkButton>
              <LinkButton href="/ai-import" variant="secondary">
                <Sparkles className="h-4 w-4" />
                Import with AI
              </LinkButton>
              <LinkButton href="/invoices" variant="ghost">
                <ReceiptText className="h-4 w-4" />
                Review invoices
              </LinkButton>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-[#2b3138] dark:bg-[#12161b]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Revenue collected</p>
                <p className="mt-1 text-3xl font-semibold">{loading ? "..." : `${collectionHealth}%`}</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${collectionHealth}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-[#2b3138] dark:bg-[#171b20]">
                <p className="text-lg font-semibold">{summary?.paid_invoices ?? 0}</p>
                <p className="text-xs text-slate-400">Paid</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-[#2b3138] dark:bg-[#171b20]">
                <p className="text-lg font-semibold">{summary?.pending_invoices ?? 0}</p>
                <p className="text-xs text-slate-400">Pending</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-[#2b3138] dark:bg-[#171b20]">
                <p className="text-lg font-semibold">{summary?.overdue_invoices ?? 0}</p>
                <p className="text-xs text-slate-400">Overdue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">Dashboard data could not be loaded: {error} <button className="ml-2 font-semibold underline" onClick={() => void loadDashboard()}>Retry</button></div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </>
        ) : (
          <>
            <StatCard label="Paid revenue" value={currency(Number(summary?.paid_revenue ?? 0))} caption={`${summary?.paid_invoices ?? 0} paid invoices`} tone="blue" />
            <StatCard label="Outstanding" value={currency(Number(summary?.outstanding_amount ?? 0))} caption={`${summary?.pending_invoices ?? 0} pending invoices`} tone="amber" />
            <StatCard label="Overdue invoices" value={String(summary?.overdue_invoices ?? 0)} caption="Calculated from status and due date" tone="rose" />
            <StatCard label="GST/VAT total" value={currency(Number(data?.gstSummary.gst_total ?? 0))} caption={`${currency(Number(data?.gstSummary.taxable_value ?? 0))} taxable value`} tone="green" />
          </>
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <Card className="p-5">
          <SectionHeader title="Monthly revenue" eyebrow="Invoices" action={<Badge tone="blue">Database values</Badge>} />
          {data?.monthlyRevenue.length ? (
            <div className="mt-6 flex h-72 items-end gap-3">
              {data.monthlyRevenue.map((item) => {
                const amount = Number(item.revenue);
                return (
                  <div className="group flex flex-1 flex-col items-center gap-3" key={item.month}>
                    <div className="flex w-full items-end rounded-t-2xl bg-slate-100 p-1 dark:bg-white/[0.04]" style={{ height: `${Math.max((amount / maxRevenue) * 220, 18)}px` }}>
                      <div className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-300 shadow-lg shadow-blue-950/10 transition-all duration-200" style={{ height: "100%" }} title={`${item.month}: ${currency(amount)}`} />
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.month.slice(5)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState contained title="No revenue yet" body="Create invoices to populate revenue trends from the database." action={<LinkButton href="/invoices/new">Create invoice</LinkButton>} />
            </div>
          )}
        </Card>

        <Card className="p-5">
          <SectionHeader title="Business insights" eyebrow="Based on your records" action={<Brain className="h-5 w-5 text-blue-500" />} />
          <div className="mt-5 grid gap-3">
            {data?.insights.map((insight) => (
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04]" key={`${insight.type}-${insight.message}`}>
                <div className="flex gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-200">
                    {insight.severity === "warning" ? <AlertTriangle className="h-4 w-4" /> : insight.severity === "success" ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                  </div>
                  <div>
                    <Badge tone={insightTone(insight.severity)}>{insight.type}</Badge>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="p-5">
          <SectionHeader title="Payment trends" eyebrow="Payments" />
          {data?.paymentTrends.length ? (
            <div className="mt-5 grid gap-3">
              {data.paymentTrends.map((item) => (
                <div className="grid gap-2" key={item.month}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.month}</span>
                    <span className="text-slate-500 dark:text-slate-400">{currency(Number(item.amount))}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.max((Number(item.amount) / maxPayments) * 100, 4)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState contained title="No payments yet" body="Payment trends will appear after invoices are marked paid or payments are recorded." />
          )}
        </Card>

        <Card className="p-5">
          <SectionHeader title="Top clients" eyebrow="Accounts" />
          {data?.topClients.length ? (
            <div className="mt-5 grid gap-4">
              {data.topClients.map((client, index) => (
                <div className="flex items-center justify-between gap-3" key={client.id}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700 dark:bg-white/[0.08] dark:text-slate-200">{index + 1}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{client.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{client.invoice_count} invoices · last {formatDate(client.last_invoice_date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{currency(Number(client.revenue))}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{currency(Number(client.outstanding_amount))} due</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState contained title="No clients yet" body="Create clients and invoices to see account-level revenue." />
          )}
        </Card>

        <Card className="p-5">
          <SectionHeader title="Recent activity" eyebrow="Timeline" />
          {data?.recentActivity.length ? (
            <div className="mt-5 grid gap-4">
              {data.recentActivity.map((item) => {
                const Icon = activityIcon(item.type, item.status);
                return (
                  <div className="flex gap-3" key={`${item.type}-${item.title}-${item.created_at}`}>
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold">{item.title}</p>
                        <Badge tone={activityTone(item.status)}>{formatDate(item.created_at)}</Badge>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState contained title="No activity yet" body="Invoices, payments, and reminder events will appear here." />
          )}
        </Card>
      </div>

      <Card className="p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeader title="GST and client growth" eyebrow="Reports" />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
                <IndianRupee className="h-5 w-5 text-emerald-500" />
                <p className="mt-3 text-sm font-semibold">{currency(Number(data?.gstSummary.gst_total ?? 0))}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Total GST/VAT from invoices.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
                <Users className="h-5 w-5 text-blue-500" />
                <p className="mt-3 text-sm font-semibold">{data?.clientGrowth.reduce((sum, item) => sum + Number(item.clients), 0) ?? 0} clients</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Client growth across recorded months.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
                <CreditCard className="h-5 w-5 text-violet-500" />
                <p className="mt-3 text-sm font-semibold">{currency(Number(summary?.invoice_volume ?? 0))}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Total invoice volume in the database.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white dark:border-white/10">
            <p className="text-sm text-slate-300">Next best action</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{primaryInsight?.message ?? "Create your first invoice to unlock business guidance."}</p>
            <LinkButton href="/invoices" className="mt-5 w-full">
              <Mail className="h-4 w-4" />
              {summary?.overdue_invoices ? "Review overdue invoices" : "Review all invoices"}
            </LinkButton>
            {!summary?.overdue_invoices ? <p className="mt-2 text-xs text-slate-400">No overdue invoices need a reminder right now.</p> : null}
          </div>
        </div>
      </Card>
    </div>
  );
}
