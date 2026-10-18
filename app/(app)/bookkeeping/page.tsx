"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Badge, Button, Card, EmptyState, Field, PageHeader, Skeleton, inputClass } from "@/components/ui";

interface Summary { monthly: Array<{ month: string; income: number; expenses: number; profit: number; taxes: number }> }
interface Expense { id: number; vendor_name: string; category: string; expense_date: string; subtotal: number; tax_total: number; total: number; currency: string; payment_status: string; notes?: string }
const categories = ["expenses", "purchases", "taxes", "travel", "software", "rent", "utilities"];

export default function BookkeepingPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState<Expense | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load(showLoading = true) {
    if (showLoading) setLoading(true);
    setError("");
    try {
      const [nextSummary, nextExpenses] = await Promise.all([api<Summary>("/bookkeeping/summary"), api<Expense[]>("/bookkeeping/expenses")]);
      setSummary(nextSummary);
      setExpenses(nextExpenses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load bookkeeping data.");
    } finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, []);
  const totals = useMemo(() => summary?.monthly.reduce((acc, row) => ({ income: acc.income + Number(row.income), expenses: acc.expenses + Number(row.expenses), profit: acc.profit + Number(row.profit), taxes: acc.taxes + Number(row.taxes) }), { income: 0, expenses: 0, profit: 0, taxes: 0 }) ?? { income: 0, expenses: 0, profit: 0, taxes: 0 }, [summary]);

  async function saveExpense(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError("");
    const form = new FormData(event.currentTarget); const subtotal = Number(form.get("subtotal")); const taxTotal = Number(form.get("taxTotal"));
    try {
      await api(editing ? `/bookkeeping/expenses/${editing.id}` : "/bookkeeping/expenses", { method: editing ? "PUT" : "POST", body: JSON.stringify({ vendorName: form.get("vendorName"), expenseDate: form.get("expenseDate"), subtotal, taxTotal, total: subtotal + taxTotal, currency: form.get("currency"), category: form.get("category"), paymentStatus: form.get("paymentStatus"), notes: form.get("notes") }) });
      setMessage(editing ? "Expense updated." : "Expense added."); setEditing(null); setShowForm(false); await load(false);
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save expense."); } finally { setSubmitting(false); }
  }

  async function deleteExpense() {
    if (!deleting) return; setSubmitting(true);
    try { await api(`/bookkeeping/expenses/${deleting.id}`, { method: "DELETE" }); setDeleting(null); setMessage("Expense deleted."); await load(false); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete expense."); } finally { setSubmitting(false); }
  }

  return <div className="grid gap-5">
    <PageHeader title="Bookkeeping" description="Track Indian business expenses, tax and payment status alongside invoice income." action={<Button onClick={() => { setEditing(null); setShowForm((value) => !value); }}><Plus className="h-4 w-4" />{showForm ? "Close form" : "Add expense"}</Button>} />
    {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error} <button className="font-semibold underline" onClick={() => void load()}>Retry</button></p> : null}
    {message ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">{message}</p> : null}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{loading ? <><Skeleton className="h-28" /><Skeleton className="h-28" /><Skeleton className="h-28" /><Skeleton className="h-28" /></> : <><Card className="p-5"><p className="text-sm text-slate-500">Paid income</p><p className="mt-2 text-2xl font-semibold">{currency(totals.income, "INR")}</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Expenses</p><p className="mt-2 text-2xl font-semibold">{currency(totals.expenses, "INR")}</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Profit</p><p className="mt-2 text-2xl font-semibold">{currency(totals.profit, "INR")}</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Input tax</p><p className="mt-2 text-2xl font-semibold">{currency(totals.taxes, "INR")}</p></Card></>}</div>
    {showForm ? <Card className="p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">{editing ? "Edit expense" : "Add expense"}</h2><p className="mt-1 text-sm text-slate-500">Total is calculated from subtotal plus tax.</p></div><button className="grid h-11 w-11 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06]" onClick={() => { setShowForm(false); setEditing(null); }} aria-label="Close expense form"><X className="h-5 w-5" /></button></div><form key={editing?.id ?? "new"} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" onSubmit={saveExpense}><Field label="Vendor"><input className={inputClass} name="vendorName" defaultValue={editing?.vendor_name ?? ""} required /></Field><Field label="Date"><input className={inputClass} name="expenseDate" type="date" defaultValue={editing ? String(editing.expense_date).slice(0, 10) : ""} required /></Field><Field label="Category"><select className={inputClass} name="category" defaultValue={editing?.category ?? "expenses"}>{categories.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}</select></Field><Field label="Payment status"><select className={inputClass} name="paymentStatus" defaultValue={editing?.payment_status ?? "paid"}><option value="paid">Paid</option><option value="pending">Pending</option></select></Field><Field label="Subtotal"><input className={inputClass} name="subtotal" type="number" min="0" step="0.01" defaultValue={editing?.subtotal ?? editing?.total ?? ""} required /></Field><Field label="GST / tax"><input className={inputClass} name="taxTotal" type="number" min="0" step="0.01" defaultValue={editing?.tax_total ?? 0} /></Field><Field label="Currency"><select className={inputClass} name="currency" defaultValue={editing?.currency ?? "INR"}><option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="AED">AED</option></select></Field><Field label="Notes"><input className={inputClass} name="notes" defaultValue={editing?.notes ?? ""} /></Field><Button className="md:col-span-2 xl:col-span-4" disabled={submitting}>{submitting ? "Saving…" : editing ? "Update expense" : "Add expense"}</Button></form></Card> : null}
    {expenses.length ? <><div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#151a20] md:block"><div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Vendor</th><th className="p-4">Category</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead><tbody>{expenses.map((expense) => <tr className="border-t border-slate-100 dark:border-white/5" key={expense.id}><td className="p-4 font-medium">{expense.vendor_name}</td><td className="p-4 capitalize">{expense.category}</td><td className="p-4">{String(expense.expense_date).slice(0, 10)}</td><td className="p-4 font-semibold">{currency(Number(expense.total), expense.currency)}</td><td className="p-4"><Badge tone={expense.payment_status === "paid" ? "green" : "amber"}>{expense.payment_status}</Badge></td><td className="p-4"><div className="flex gap-2"><Button variant="secondary" onClick={() => { setEditing(expense); setShowForm(true); }}><Pencil className="h-4 w-4" />Edit</Button><Button variant="danger" onClick={() => setDeleting(expense)} aria-label={`Delete expense from ${expense.vendor_name}`}><Trash2 className="h-4 w-4" /></Button></div></td></tr>)}</tbody></table></div></div><div className="grid gap-3 md:hidden">{expenses.map((expense) => <Card className="p-4" key={expense.id}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{expense.vendor_name}</p><p className="mt-1 text-sm capitalize text-slate-500">{expense.category} · {String(expense.expense_date).slice(0, 10)}</p></div><Badge tone={expense.payment_status === "paid" ? "green" : "amber"}>{expense.payment_status}</Badge></div><p className="mt-4 text-xl font-semibold">{currency(Number(expense.total), expense.currency)}</p><div className="mt-4 grid grid-cols-2 gap-2"><Button variant="secondary" onClick={() => { setEditing(expense); setShowForm(true); }}><Pencil className="h-4 w-4" />Edit</Button><Button variant="danger" onClick={() => setDeleting(expense)}><Trash2 className="h-4 w-4" />Delete</Button></div></Card>)}</div></> : !loading ? <EmptyState title="No expenses yet" body="Add expenses or save AI imports as expenses to generate profit and tax summaries." /> : null}
    {deleting ? <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/55 p-4" role="dialog" aria-modal="true"><Card className="w-full max-w-md p-6"><h2 className="text-lg font-semibold">Delete this expense?</h2><p className="mt-2 text-sm text-slate-500">{deleting.vendor_name} · {currency(Number(deleting.total), deleting.currency)} will be permanently removed.</p><div className="mt-6 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button><Button variant="danger" disabled={submitting} onClick={() => void deleteExpense()}>{submitting ? "Deleting…" : "Delete expense"}</Button></div></Card></div> : null}
  </div>;
}
