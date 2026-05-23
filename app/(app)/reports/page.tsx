"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Button, Card, EmptyState, Skeleton } from "@/components/ui";

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

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<ReportData>("/reports/exports").then(setData).finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => {
    return {
      revenue: data?.revenue.reduce((sum, row) => sum + Number(row.total), 0) ?? 0,
      invoices: data?.revenue.reduce((sum, row) => sum + Number(row.invoices), 0) ?? 0,
      gst: data?.gst.reduce((sum, row) => sum + Number(row.tax_total), 0) ?? 0,
      clients: data?.clients.length ?? 0,
      expenses: data?.expenses.reduce((sum, row) => sum + Number(row.total), 0) ?? 0,
      profit: data?.profit.reduce((sum, row) => sum + Number(row.profit), 0) ?? 0,
    };
  }, [data]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Revenue, client, invoice, GST, and export data from your database.</p>
        </div>
        <Button disabled={!data} onClick={() => downloadJson(data, "invoicewala-reports.json")}>
          <Download className="h-4 w-4" />
          Export JSON
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-6">
          <Card className="p-5"><p className="text-sm text-slate-500">Revenue</p><p className="mt-2 text-2xl font-semibold">{currency(totals.revenue)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Invoices</p><p className="mt-2 text-2xl font-semibold">{totals.invoices}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Expenses</p><p className="mt-2 text-2xl font-semibold">{currency(totals.expenses)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Profit</p><p className="mt-2 text-2xl font-semibold">{currency(totals.profit)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">GST/VAT</p><p className="mt-2 text-2xl font-semibold">{currency(totals.gst)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Clients</p><p className="mt-2 text-2xl font-semibold">{totals.clients}</p></Card>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 p-5 dark:border-white/10"><h2 className="text-lg font-semibold">Revenue by month</h2></div>
          {data?.revenue.length ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Month</th><th className="p-4">Invoices</th><th className="p-4">Total</th></tr></thead>
              <tbody>{data.revenue.map((row) => <tr className="border-t border-slate-100 dark:border-white/5" key={row.month}><td className="p-4">{row.month}</td><td className="p-4">{row.invoices}</td><td className="p-4">{currency(Number(row.total))}</td></tr>)}</tbody>
            </table>
          ) : <div className="p-5"><EmptyState title="No revenue report yet" body="Create invoices to populate revenue reports." /></div>}
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 p-5 dark:border-white/10"><h2 className="text-lg font-semibold">Top clients</h2></div>
          {data?.clients.length ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Client</th><th className="p-4">Invoices</th><th className="p-4">Revenue</th></tr></thead>
              <tbody>{data.clients.map((row) => <tr className="border-t border-slate-100 dark:border-white/5" key={row.name}><td className="p-4">{row.name}<div className="text-xs text-slate-500">{row.email}</div></td><td className="p-4">{row.invoices}</td><td className="p-4">{currency(Number(row.revenue))}</td></tr>)}</tbody>
            </table>
          ) : <div className="p-5"><EmptyState title="No client report yet" body="Create clients and invoices to populate client reports." /></div>}
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-slate-200 p-5 dark:border-white/10"><h2 className="text-lg font-semibold">GST invoice report</h2></div>
        {data?.gst.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Invoice</th><th className="p-4">Date</th><th className="p-4">Client</th><th className="p-4">GSTIN</th><th className="p-4">Taxable</th><th className="p-4">Tax</th><th className="p-4">Total</th></tr></thead>
              <tbody>{data.gst.map((row) => <tr className="border-t border-slate-100 dark:border-white/5" key={row.invoice_number}><td className="p-4">{row.invoice_number}</td><td className="p-4">{String(row.issue_date).slice(0, 10)}</td><td className="p-4">{row.customer_name}</td><td className="p-4">{row.customer_tax_id}</td><td className="p-4">{currency(Number(row.taxable_value), row.currency)}</td><td className="p-4">{currency(Number(row.tax_total), row.currency)}</td><td className="p-4">{currency(Number(row.total), row.currency)}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <div className="p-5"><EmptyState title="No GST report yet" body="Invoices with tax totals will appear here." /></div>}
      </Card>
    </div>
  );
}
