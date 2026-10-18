"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Button, Card, EmptyState, PageHeader, Skeleton, inputClass } from "@/components/ui";

interface ReportData {
  revenue: Array<{ month: string; invoices: number; total: number }>;
  gst: Array<{ invoice_number: string; issue_date: string; customer_name: string; customer_tax_id?: string; taxable_value: number; tax_total: number; total: number; currency: string }>;
  clients: Array<{ name: string; email?: string; invoices: number; revenue: number }>;
  expenses: Array<{ month: string; expenses: number; total: number }>;
  profit: Array<{ month: string; revenue: number; expenses: number; profit: number }>;
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadCsv(data: ReportData) {
  const rows = [["Invoice", "Date", "Client", "GSTIN", "Taxable value", "Tax", "Total", "Currency"], ...data.gst.map((row) => [row.invoice_number, String(row.issue_date).slice(0, 10), row.customer_name, row.customer_tax_id ?? "", row.taxable_value, row.tax_total, row.total, row.currency])];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = "invoicewala-gst-report.csv"; anchor.click(); URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  async function load() { setLoading(true); setError(""); try { setData(await api<ReportData>("/reports/exports")); } catch (err) { setError(err instanceof Error ? err.message : "Could not load reports."); } finally { setLoading(false); } }
  useEffect(() => { void load(); }, []);

  const filtered = useMemo<ReportData | null>(() => {
    if (!data) return null;
    const matchesMonth = (month: string) => (!from || month >= from.slice(0, 7)) && (!to || month <= to.slice(0, 7));
    const matchesDate = (date: string) => (!from || String(date).slice(0, 10) >= from) && (!to || String(date).slice(0, 10) <= to);
    return { ...data, revenue: data.revenue.filter((row) => matchesMonth(row.month)), expenses: data.expenses.filter((row) => matchesMonth(row.month)), profit: data.profit.filter((row) => matchesMonth(row.month)), gst: data.gst.filter((row) => matchesDate(row.issue_date)) };
  }, [data, from, to]);

  const totals = useMemo(() => {
    return {
      revenue: filtered?.revenue.reduce((sum, row) => sum + Number(row.total), 0) ?? 0,
      invoices: filtered?.revenue.reduce((sum, row) => sum + Number(row.invoices), 0) ?? 0,
      gst: filtered?.gst.reduce((sum, row) => sum + Number(row.tax_total), 0) ?? 0,
      clients: filtered?.clients.length ?? 0,
      expenses: filtered?.expenses.reduce((sum, row) => sum + Number(row.total), 0) ?? 0,
      profit: filtered?.profit.reduce((sum, row) => sum + Number(row.profit), 0) ?? 0,
    };
  }, [filtered]);

  return (
    <div className="grid gap-5">
      <PageHeader title="Reports" description="Revenue, client, invoice, GST, and export data from your database." action={<><Button disabled={!filtered} onClick={() => filtered && downloadCsv(filtered)}><Download className="h-4 w-4" />Export CSV</Button><Button variant="secondary" disabled={!filtered} onClick={() => downloadJson(filtered, "invoicewala-reports.json")}>
          <Download className="h-4 w-4" />
          Export JSON
        </Button></>} />

      <Card className="p-5"><div className="grid gap-3 sm:grid-cols-2 lg:max-w-xl"><label className="text-sm font-medium">From<input className={`${inputClass} mt-2 w-full`} type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label><label className="text-sm font-medium">To<input className={`${inputClass} mt-2 w-full`} type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label></div><p className="mt-3 text-xs text-slate-500">Totals and exports update to the selected period.</p></Card>
      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error} <button className="font-semibold underline" onClick={() => void load()}>Retry</button></p> : null}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <Card className="p-5"><p className="text-sm text-slate-500">Revenue</p><p className="mt-2 text-2xl font-semibold">{currency(totals.revenue)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Invoices</p><p className="mt-2 text-2xl font-semibold">{totals.invoices}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Expenses</p><p className="mt-2 text-2xl font-semibold">{currency(totals.expenses)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Profit</p><p className="mt-2 text-2xl font-semibold">{currency(totals.profit)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">GST/VAT</p><p className="mt-2 text-2xl font-semibold">{currency(totals.gst)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Clients</p><p className="mt-2 text-2xl font-semibold">{totals.clients}</p></Card>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 p-5 dark:border-white/10"><h2 className="text-lg font-semibold">Revenue by month</h2></div>
          {filtered?.revenue.length ? (
            <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Month</th><th className="p-4">Invoices</th><th className="p-4">Total</th></tr></thead>
              <tbody>{filtered.revenue.map((row) => <tr className="border-t border-slate-100 dark:border-white/5" key={row.month}><td className="p-4">{row.month}</td><td className="p-4">{row.invoices}</td><td className="p-4">{currency(Number(row.total))}</td></tr>)}</tbody>
            </table>
            </div>
          ) : <EmptyState contained title="No revenue report yet" body="Create invoices to populate revenue reports." />}
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 p-5 dark:border-white/10"><h2 className="text-lg font-semibold">Top clients</h2></div>
          {data?.clients.length ? (
            <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Client</th><th className="p-4">Invoices</th><th className="p-4">Revenue</th></tr></thead>
              <tbody>{data.clients.map((row) => <tr className="border-t border-slate-100 dark:border-white/5" key={row.name}><td className="p-4">{row.name}<div className="text-xs text-slate-500">{row.email}</div></td><td className="p-4">{row.invoices}</td><td className="p-4">{currency(Number(row.revenue))}</td></tr>)}</tbody>
            </table>
            </div>
          ) : <EmptyState contained title="No client report yet" body="Create clients and invoices to populate client reports." />}
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-slate-200 p-5 dark:border-white/10"><h2 className="text-lg font-semibold">GST invoice report</h2></div>
          {filtered?.gst.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Invoice</th><th className="p-4">Date</th><th className="p-4">Client</th><th className="p-4">GSTIN</th><th className="p-4">Taxable</th><th className="p-4">Tax</th><th className="p-4">Total</th></tr></thead>
              <tbody>{filtered.gst.map((row) => <tr className="border-t border-slate-100 dark:border-white/5" key={row.invoice_number}><td className="p-4">{row.invoice_number}</td><td className="p-4">{String(row.issue_date).slice(0, 10)}</td><td className="p-4">{row.customer_name}</td><td className="p-4">{row.customer_tax_id}</td><td className="p-4">{currency(Number(row.taxable_value), row.currency)}</td><td className="p-4">{currency(Number(row.tax_total), row.currency)}</td><td className="p-4">{currency(Number(row.total), row.currency)}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <EmptyState contained title="No GST report yet" body="Invoices with tax totals will appear here." />}
      </Card>
    </div>
  );
}
