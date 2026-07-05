"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { BUSINESS_EXPENSE_FAQS } from "@/lib/business-expense-content";
import { toolByHref } from "@/lib/tools-catalog";

const tool = toolByHref("/tools/business-expense-calculator")!;
const categories = ["Materials", "Software", "Marketing", "Travel", "Rent", "Utilities", "Professional fees", "Other"];

type Expense = {
  id: number;
  description: string;
  category: string;
  amount: number;
  gstRate: number;
  deductible: boolean;
};

const initialExpenses: Expense[] = [
  { id: 1, description: "Accounting software", category: "Software", amount: 1180, gstRate: 18, deductible: true },
  { id: 2, description: "Online advertising", category: "Marketing", amount: 5900, gstRate: 18, deductible: true },
  { id: 3, description: "Client travel", category: "Travel", amount: 2400, gstRate: 5, deductible: true },
];

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
const inputClass = "min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition focus:border-cyan-300/60";

function SeoContent() {
  const sections = [
    ["What counts as a business expense?", "A business expense is a cost connected with earning business income, such as materials, software, advertising, rent, utilities, travel or professional fees. Keep invoices and receipts so each entry can be verified."],
    ["Expense ratio formula", "Expense ratio = Total business expenses ÷ Revenue × 100. If revenue is ₹50,000 and expenses are ₹10,000, the expense ratio is 20%. It is a planning metric, not a tax conclusion."],
    ["GST input estimate", "When an entered payment includes GST, the calculator extracts an indicative GST component using Amount × Rate ÷ (100 + Rate). Actual input-tax-credit eligibility depends on your registration, invoice and use of the purchase."],
  ];
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Expense guide</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Calculate business expenses without a spreadsheet</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {sections.map(([title, body]) => <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title}><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">FAQs</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Business expense questions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BUSINESS_EXPENSE_FAQS.map(([question, answer]) => <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}><h3 className="font-semibold">{question}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p></article>)}
          </div>
        </div>
        <aside className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.07] p-6 lg:self-start">
          <h2 className="text-2xl font-semibold">Use expenses in your workflow</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Review costs before pricing a job, creating an invoice or checking project profit.</p>
          <div className="mt-5 grid gap-3">
            <Link className="rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-bold text-slate-950" href="/tools/profit-calculator">Calculate profit</Link>
            <Link className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold" href="/invoice-templates">Browse invoice templates</Link>
            <Link className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold" href="/free-invoice">Create invoice</Link>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500">This calculator provides organisational estimates, not accounting, GST or income-tax advice.</p>
        </aside>
      </section>
    </div>
  );
}

export default function BusinessExpenseCalculatorClient() {
  const [revenue, setRevenue] = useState(50000);
  const [expenses, setExpenses] = useState(initialExpenses);

  const result = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + Math.max(0, expense.amount || 0), 0);
    const deductible = expenses.filter((expense) => expense.deductible).reduce((sum, expense) => sum + Math.max(0, expense.amount || 0), 0);
    const gst = expenses.reduce((sum, expense) => {
      const amount = Math.max(0, expense.amount || 0);
      const rate = Math.max(0, expense.gstRate || 0);
      return sum + (rate ? (amount * rate) / (100 + rate) : 0);
    }, 0);
    const categoryTotals = expenses.reduce<Record<string, number>>((totals, expense) => {
      totals[expense.category] = (totals[expense.category] ?? 0) + Math.max(0, expense.amount || 0);
      return totals;
    }, {});
    return { total, deductible, gst, ratio: revenue > 0 ? (total / revenue) * 100 : 0, categoryTotals };
  }, [expenses, revenue]);

  const update = <K extends keyof Expense>(id: number, key: K, value: Expense[K]) => {
    setExpenses((rows) => rows.map((row) => row.id === id ? { ...row, [key]: value } : row));
  };

  const addExpense = () => setExpenses((rows) => [...rows, { id: Date.now(), description: "", category: "Other", amount: 0, gstRate: 18, deductible: true }]);
  const removeExpense = (id: number) => setExpenses((rows) => rows.filter((row) => row.id !== id));

  const exportCsv = () => {
    const lines = [
      ["Description", "Category", "Paid amount", "GST rate", "Potentially deductible"],
      ...expenses.map((row) => [row.description, row.category, row.amount, `${row.gstRate}%`, row.deductible ? "Yes" : "No"]),
    ];
    const safeCell = (cell: string | number) => {
      const value = String(cell);
      const formulaSafe = /^[=+\-@]/.test(value) ? `'${value}` : value;
      return `"${formulaSafe.replaceAll('"', '""')}"`;
    };
    const csv = lines.map((line) => line.map(safeCell).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "invoicewala-business-expenses.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout after={<SeoContent />} tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h2 className="text-xl font-semibold">Expense calculator</h2><p className="mt-2 text-sm text-slate-400">Enter GST-inclusive amounts paid during one period.</p></div>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">No signup</span>
        </div>

        <label className="mt-5 block text-sm font-semibold text-slate-300">Revenue for the same period
          <input className={`${inputClass} mt-2`} min="0" type="number" value={revenue} onChange={(event) => setRevenue(Math.max(0, Number(event.target.value)))} />
        </label>

        <div className="mt-5 grid gap-3">
          {expenses.map((expense) => (
            <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:grid-cols-[1.3fr_1fr_100px_76px_40px]" key={expense.id}>
              <input aria-label="Expense description" className={inputClass} placeholder="Expense description" value={expense.description} onChange={(event) => update(expense.id, "description", event.target.value)} />
              <select aria-label="Expense category" className={inputClass} value={expense.category} onChange={(event) => update(expense.id, "category", event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select>
              <input aria-label="Paid amount" className={inputClass} min="0" type="number" value={expense.amount} onChange={(event) => update(expense.id, "amount", Math.max(0, Number(event.target.value) || 0))} />
              <select aria-label="GST rate included" className={inputClass} value={expense.gstRate} onChange={(event) => update(expense.id, "gstRate", Number(event.target.value))}>{[0, 5, 12, 18, 28].map((rate) => <option key={rate} value={rate}>{rate}%</option>)}</select>
              <button aria-label={`Remove ${expense.description || "expense"}`} className="grid min-h-11 place-items-center rounded-xl border border-white/10 text-slate-400 hover:border-rose-400/40 hover:text-rose-300" onClick={() => removeExpense(expense.id)} type="button"><Trash2 className="h-4 w-4" /></button>
              <label className="flex items-center gap-2 text-xs text-slate-400 sm:col-span-5"><input checked={expense.deductible} onChange={(event) => update(expense.id, "deductible", event.target.checked)} type="checkbox" /> Mark as potentially deductible for this estimate</label>
            </div>
          ))}
        </div>

        <button className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold hover:bg-white/[0.05]" onClick={addExpense} type="button"><Plus className="h-4 w-4" /> Add expense</button>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[["Total expenses", money(result.total)], ["Expense ratio", `${result.ratio.toFixed(2)}%`], ["GST included (estimate)", money(result.gst)], ["Marked deductible", money(result.deductible)]].map(([label, value]) => <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={label}><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-xl font-bold">{value}</p></div>)}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 p-4">
          <p className="text-sm font-semibold">Category breakdown</p>
          <div className="mt-3 grid gap-2 text-sm">{Object.entries(result.categoryTotals).filter(([, amount]) => amount > 0).sort((a, b) => b[1] - a[1]).map(([category, amount]) => <p className="flex justify-between text-slate-400" key={category}><span>{category}</span><strong className="text-white">{money(amount)}</strong></p>)}</div>
        </div>

        <button className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-200" onClick={exportCsv} type="button"><Download className="h-4 w-4" /> Export expense CSV</button>
      </div>
    </ToolPageLayout>
  );
}
