"use client";

import { useMemo, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";

type Row = { id: number; customer: string; invoice: string; dueDate: string; amount: number; paid: number };
type Bucket = "Current" | "1–30 days" | "31–60 days" | "61–90 days" | "90+ days";

const fieldClass = "min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-cyan-300/60";

function parseDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function daysBetween(asOf: string, dueDate: string) {
  if (!asOf || !dueDate) return 0;
  return Math.floor((parseDate(asOf).getTime() - parseDate(dueDate).getTime()) / 86400000);
}

function bucketFor(days: number): Bucket {
  if (days <= 0) return "Current";
  if (days <= 30) return "1–30 days";
  if (days <= 60) return "31–60 days";
  if (days <= 90) return "61–90 days";
  return "90+ days";
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
}

export default function OutstandingAgeingCalculatorClient() {
  const today = new Date().toISOString().slice(0, 10);
  const [asOf, setAsOf] = useState(today);
  const [rows, setRows] = useState<Row[]>([
    { id: 1, customer: "Aarav Enterprises", invoice: "INV-0024", dueDate: today, amount: 29500, paid: 0 },
    { id: 2, customer: "Riya Consulting", invoice: "INV-0022", dueDate: "2026-10-01", amount: 12000, paid: 2000 },
  ]);

  const analysed = useMemo(() => rows.map((row) => {
    const balance = Math.max(0, Number(row.amount || 0) - Number(row.paid || 0));
    const days = daysBetween(asOf, row.dueDate);
    return { ...row, balance, days, bucket: bucketFor(days) };
  }), [asOf, rows]);
  const buckets = useMemo(() => (["Current", "1–30 days", "31–60 days", "61–90 days", "90+ days"] as Bucket[]).map((name) => ({ name, value: analysed.filter((row) => row.bucket === name).reduce((sum, row) => sum + row.balance, 0) })), [analysed]);
  const total = analysed.reduce((sum, row) => sum + row.balance, 0);

  function updateRow(id: number, patch: Partial<Row>) {
    setRows((current) => current.map((row) => row.id === id ? { ...row, ...patch } : row));
  }

  function exportCsv() {
    const header = ["Customer", "Invoice", "Due date", "Invoice amount", "Paid", "Outstanding", "Days overdue", "Ageing bucket"];
    const body = analysed.map((row) => [row.customer, row.invoice, row.dueDate, row.amount, row.paid, row.balance, Math.max(0, row.days), row.bucket]);
    const csv = [header, ...body].map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-ageing-${asOf}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6" id="ageing-tool"><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Receivables working</p><h2 className="mt-3 text-3xl font-semibold">Add unpaid invoices</h2></div><div className="flex flex-col gap-3 sm:flex-row sm:items-end"><label><span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">Ageing as of</span><input className={fieldClass} type="date" value={asOf} onChange={(event) => setAsOf(event.target.value)} /></label><button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-200" onClick={exportCsv} type="button"><Download className="h-4 w-4" />Export CSV</button></div></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{buckets.map((bucket) => <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4" key={bucket.name}><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{bucket.name}</p><p className="mt-2 text-xl font-bold text-white">{money(bucket.value)}</p></div>)}</div><div className="mt-7 overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-3 py-3">Customer</th><th className="px-3 py-3">Invoice</th><th className="px-3 py-3">Due date</th><th className="px-3 py-3">Amount</th><th className="px-3 py-3">Paid</th><th className="px-3 py-3">Outstanding</th><th className="px-3 py-3">Bucket</th><th className="px-3 py-3"></th></tr></thead><tbody className="divide-y divide-white/10">{analysed.map((row) => <tr key={row.id}><td className="p-2"><input aria-label="Customer" className={fieldClass} value={row.customer} onChange={(event) => updateRow(row.id, { customer: event.target.value })} /></td><td className="p-2"><input aria-label="Invoice number" className={fieldClass} value={row.invoice} onChange={(event) => updateRow(row.id, { invoice: event.target.value })} /></td><td className="p-2"><input aria-label="Due date" className={fieldClass} type="date" value={row.dueDate} onChange={(event) => updateRow(row.id, { dueDate: event.target.value })} /></td><td className="p-2"><input aria-label="Invoice amount" className={fieldClass} min="0" type="number" value={row.amount} onChange={(event) => updateRow(row.id, { amount: Number(event.target.value) })} /></td><td className="p-2"><input aria-label="Paid amount" className={fieldClass} min="0" type="number" value={row.paid} onChange={(event) => updateRow(row.id, { paid: Number(event.target.value) })} /></td><td className="px-3 py-2 font-semibold text-cyan-200">{money(row.balance)}</td><td className="px-3 py-2"><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200">{row.bucket}</span></td><td className="p-2"><button aria-label="Remove invoice" className="rounded-lg p-2 text-red-300 hover:bg-red-400/10" disabled={rows.length === 1} onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))} type="button"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div><div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/10" onClick={() => setRows((current) => [...current, { id: Date.now(), customer: "", invoice: "", dueDate: asOf, amount: 0, paid: 0 }])} type="button"><Plus className="h-4 w-4" />Add invoice</button><p className="text-lg font-semibold">Total outstanding: <span className="text-cyan-300">{money(total)}</span></p></div><p className="mt-5 text-xs leading-5 text-slate-500">This browser-only working groups calendar days from the entered due date. Confirm balances and agreed payment terms before contacting customers or sharing the CSV.</p></div></section>;
}
