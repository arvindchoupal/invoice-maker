"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Button, Card, EmptyState, Field, Skeleton, inputClass } from "@/components/ui";

interface Summary { monthly: Array<{ month: string; income: number; expenses: number; profit: number; taxes: number }> }
interface Expense { id: number; vendor_name: string; category: string; expense_date: string; total: number; currency: string; payment_status: string }

export default function BookkeepingPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  async function load(showLoading = true) {
    if (showLoading) setLoading(true);
    try {
      const [nextSummary, nextExpenses] = await Promise.all([api<Summary>("/bookkeeping/summary"), api<Expense[]>("/bookkeeping/expenses")]);
      setSummary(nextSummary);
      setExpenses(nextExpenses);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.all([api<Summary>("/bookkeeping/summary"), api<Expense[]>("/bookkeeping/expenses")])
      .then(([nextSummary, nextExpenses]) => {
        setSummary(nextSummary);
        setExpenses(nextExpenses);
      })
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => summary?.monthly.reduce((acc, row) => ({ income: acc.income + Number(row.income), expenses: acc.expenses + Number(row.expenses), profit: acc.profit + Number(row.profit), taxes: acc.taxes + Number(row.taxes) }), { income: 0, expenses: 0, profit: 0, taxes: 0 }) ?? { income: 0, expenses: 0, profit: 0, taxes: 0 }, [summary]);

  async function addExpense(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await api("/bookkeeping/expenses", { method: "POST", body: JSON.stringify({ vendorName: form.get("vendorName"), expenseDate: form.get("expenseDate"), total: Number(form.get("total")), subtotal: Number(form.get("total")), currency: form.get("currency"), notes: form.get("notes") }) });
    event.currentTarget.reset();
    await load();
  }

  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-semibold tracking-tight">Bookkeeping</h1><p className="mt-1 text-sm text-slate-500">Income, expenses, purchases, taxes, vendors, and profit/loss summaries from real records.</p></div>
      <div className="grid gap-4 md:grid-cols-4">
        {loading ? <><Skeleton className="h-28" /><Skeleton className="h-28" /><Skeleton className="h-28" /><Skeleton className="h-28" /></> : <>
          <Card className="p-5"><p className="text-sm text-slate-500">Income</p><p className="mt-2 text-2xl font-semibold">{currency(totals.income)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Expenses</p><p className="mt-2 text-2xl font-semibold">{currency(totals.expenses)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Profit</p><p className="mt-2 text-2xl font-semibold">{currency(totals.profit)}</p></Card>
          <Card className="p-5"><p className="text-sm text-slate-500">Taxes</p><p className="mt-2 text-2xl font-semibold">{currency(totals.taxes)}</p></Card>
        </>}
      </div>
      <Card className="p-5"><form className="grid gap-4 md:grid-cols-5" onSubmit={addExpense}><Field label="Vendor"><input className={inputClass} name="vendorName" required /></Field><Field label="Date"><input className={inputClass} name="expenseDate" type="date" required /></Field><Field label="Total"><input className={inputClass} name="total" type="number" step="0.01" required /></Field><Field label="Currency"><input className={inputClass} name="currency" defaultValue="USD" /></Field><Field label="Notes"><input className={inputClass} name="notes" /></Field><Button className="md:col-span-5">Add expense</Button></form></Card>
      <Card className="overflow-hidden">{expenses.length ? <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Vendor</th><th className="p-4">Category</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th></tr></thead><tbody>{expenses.map((expense) => <tr className="border-t border-slate-100 dark:border-white/5" key={expense.id}><td className="p-4">{expense.vendor_name}</td><td className="p-4">{expense.category}</td><td className="p-4">{String(expense.expense_date).slice(0, 10)}</td><td className="p-4">{currency(Number(expense.total), expense.currency)}</td><td className="p-4">{expense.payment_status}</td></tr>)}</tbody></table></div> : <div className="p-5"><EmptyState title="No expenses yet" body="Add expenses or save AI imports as expenses to generate profit/loss summaries." /></div>}</Card>
    </div>
  );
}
