"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import styles from "@/components/tools/ProfitCalculator.module.css";

const money = (value: number) => new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:2}).format(value);
const percent = (value: number | null) => value === null ? "Not defined" : `${value.toFixed(2)}%`;
const action = "inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--guide-border)] bg-[var(--guide-panel)] px-4 py-2 text-center text-sm font-semibold text-[var(--guide-accent)] hover:bg-[var(--guide-soft)] disabled:opacity-40 disabled:cursor-not-allowed";

export default function ProfitCalculatorClient({seoContent}: {seoContent:ReactNode}) {
  const [revenue,setRevenue] = useState("10000");
  const [expenses,setExpenses] = useState("6500");
  const [copied,setCopied] = useState(false);
  const [error,setError] = useState("");
  const validValue = (value:string) => value.trim() !== "" && Number.isFinite(Number(value)) && Number(value)>=0 && Number(value)<=1e12;
  const valid = validValue(revenue) && validValue(expenses);
  const r=Number(revenue), e=Number(expenses);
  const profit=Math.round((r-e+Number.EPSILON)*100)/100;
  const margin=r>0 ? profit/r*100 : null;
  const markup=e>0 ? profit/e*100 : null;
  const showMoney = (value:number) => valid ? money(value) : "—";
  const showPercent = (value:number|null) => valid ? percent(value) : "—";
  const summary = `InvoiceWala profit calculation: Revenue ${money(r)}, expenses ${money(e)}, net profit ${money(profit)}, profit margin ${percent(margin)}, markup ${percent(markup)}.`;
  const invoiceHref=`/free-invoice?source=profit-calculator&amount=${encodeURIComponent(valid?r.toFixed(2):"0")}&item=${encodeURIComponent("Project or product sale")}`;
  async function copyResult() {
    if (!valid) return;
    setError("");
    try { await navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(()=>setCopied(false),2000); }
    catch { setError("Copy is unavailable. Download the CSV to keep this calculation."); }
  }
  function downloadResult() {
    if (!valid) return;
    const rows=[["Metric","Value"],["Revenue (INR)",r.toFixed(2)],["Expenses (INR)",e.toFixed(2)],["Net profit / loss (INR)",profit.toFixed(2)],["Profit margin",percent(margin)],["Markup",percent(markup)]];
    const csv=rows.map(row=>row.map(cell=>`"${cell.replaceAll('"','""')}"`).join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
    const anchor=document.createElement("a"); anchor.href=url; anchor.download="invoicewala-profit-calculation.csv"; anchor.click(); URL.revokeObjectURL(url);
  }
  return <main className={`${styles.page} min-h-screen`}>
    <section id="profit-calculator" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-7"><p className="text-xs font-semibold uppercase tracking-widest text-[var(--guide-accent)]">Profit calculator</p><h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-[var(--guide-heading)] sm:text-4xl">Free Profit Calculator for Small Businesses & Freelancers</h1><p className="mt-3 max-w-3xl text-sm leading-7">Calculate profit, profit margin, markup, and pricing instantly. Turn calculations into professional invoices with InvoiceWala.</p></header>
      <div className="grid min-w-0 items-start gap-5 lg:grid-cols-2">
        <section className={styles.panel} aria-labelledby="profit-inputs-heading"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 id="profit-inputs-heading" className="text-xl font-semibold text-[var(--guide-heading)]">Profit Calculator</h2><p className="mt-2 text-sm leading-7 text-[var(--guide-muted)]">Revenue minus expenses, with live margin and markup.</p></div><span className="rounded-full bg-[var(--guide-soft)] px-3 py-1 text-xs font-semibold text-[var(--guide-accent)]">No signup</span></div>
          <div className="mt-6 grid gap-5"><label className={styles.field}>Revenue (₹)<input aria-label="Revenue" aria-invalid={!validValue(revenue)} type="number" inputMode="decimal" min="0" max="1000000000000" step="0.01" value={revenue} onChange={event=>setRevenue(event.target.value)} /><span className="text-xs font-normal leading-6 text-[var(--guide-muted)]">Total sales or project income before subtracting costs.</span></label><label className={styles.field}>Expenses (₹)<input aria-label="Expenses" aria-invalid={!validValue(expenses)} type="number" inputMode="decimal" min="0" max="1000000000000" step="0.01" value={expenses} onChange={event=>setExpenses(event.target.value)} /><span className="text-xs font-normal leading-6 text-[var(--guide-muted)]">Include the costs for the same project, sale or period.</span></label></div>
          {!valid && <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">Enter valid revenue and expenses between ₹0 and ₹1,00,000 crore.</p>}
          <div className="mt-6 rounded-xl bg-[var(--guide-soft)] p-4 text-sm leading-7"><p className="font-semibold text-[var(--guide-heading)]">Net profit = Revenue − Expenses</p><p className="mt-2 text-[var(--guide-muted)]">Change either amount to see the result instantly. Use the same scope and period for both figures.</p></div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-[var(--guide-accent)]">{["Profit calculator","Profit margin calculator","Markup calculator","Business profit calculator"].map(label=><span key={label} className="rounded-full border border-[var(--guide-border)] px-3 py-2">{label}</span>)}</div>
        </section>
        <section className={`${styles.panel} lg:sticky lg:top-24`} aria-labelledby="profit-results-heading"><div className="flex flex-wrap items-start justify-between gap-3"><h2 id="profit-results-heading" className="text-xl font-semibold text-[var(--guide-heading)]">Your profit breakdown</h2><span className="rounded-full bg-[var(--guide-soft)] px-3 py-1 text-xs font-semibold text-[var(--guide-accent)]">{!valid?"Check inputs":profit<0?"Loss":profit===0?"Break-even":"Profit"}</span></div>
          <dl className="mt-6 grid gap-4" aria-live="polite"><div className={`rounded-2xl p-5 text-white ${valid&&profit<0?"bg-red-700":"bg-blue-700"}`}><dt className="text-sm font-medium">Net profit</dt><dd data-profit-result className="mt-2 break-words text-3xl font-semibold sm:text-4xl">{showMoney(profit)}</dd><p className="mt-3 text-xs leading-6">{valid&&profit<0?"Expenses exceed revenue by the loss shown above.":"The amount remaining after the expenses you entered."}</p></div><div className="grid gap-4 sm:grid-cols-2">{[["Profit margin",showPercent(margin),"Profit ÷ Revenue × 100"],["Markup",showPercent(markup),"Profit ÷ Expenses × 100"]].map(([label,value,formula])=><div key={label} className="rounded-xl border border-[var(--guide-border)] p-4"><dt className="text-sm text-[var(--guide-muted)]">{label}</dt><dd className="mt-2 break-words text-2xl font-semibold text-[var(--guide-heading)]">{value}</dd><p className="mt-2 text-xs leading-6 text-[var(--guide-muted)]">{formula}</p></div>)}</div></dl>
          {valid&&(r===0||e===0)&&<p className="mt-4 text-xs leading-6 text-[var(--guide-muted)]">A percentage is not defined when its denominator is zero. The profit or loss amount still applies.</p>}
          <div className="mt-5 flex flex-wrap gap-3"><button disabled={!valid} type="button" className={action} onClick={copyResult}>{copied?"Copied":"Copy result"}</button><button disabled={!valid} type="button" className={action} onClick={downloadResult}>Download CSV</button></div><p role="status" className="mt-2 text-xs text-[var(--guide-accent)]">{copied?"Profit calculation copied to clipboard.":""}</p>{error&&<p role="alert" className="mt-3 text-sm">{error}</p>}
          <div className="mt-6 border-t border-[var(--guide-border)] pt-5"><p className="text-sm leading-7 text-[var(--guide-muted)]">Use your revenue as the starting invoice amount. Expenses remain part of your internal calculation.</p><Link aria-disabled={!valid} href={valid?invoiceHref:"#profit-calculator"} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 aria-disabled:pointer-events-none aria-disabled:opacity-40">Create invoice from this result</Link></div>
        </section>
      </div>
      <section className="mt-10" aria-labelledby="profit-explanation-heading"><p className="text-xs font-semibold uppercase tracking-widest text-[var(--guide-accent)]">Results explanation</p><h2 id="profit-explanation-heading" className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">Revenue, Expenses, Net Profit, Profit Margin and Markup</h2><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{[["Revenue",showMoney(r),"Revenue is the total money earned before subtracting expenses. Example: sales worth ₹10,000."],["Expenses",showMoney(e),"Expenses are business costs such as material, software, ads, rent, delivery, labor or subcontractors."],["Net Profit",showMoney(profit),"Formula: Net Profit = Revenue - Expenses. Example: ₹10,000 - ₹6,500 = ₹3,500."],["Profit Margin",showPercent(margin),"Formula: Profit Margin = Net Profit / Revenue × 100. Example: ₹3,500 / ₹10,000 = 35%."],["Markup %",showPercent(markup),"Formula: Markup = Net Profit / Expenses × 100. Example: ₹3,500 / ₹6,500 = 53.85%."]].map(([label,value,body])=><article className="min-w-0 rounded-xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-5" key={label}><h3 className="text-sm text-[var(--guide-muted)]">{label}</h3><p className="mt-3 break-words text-xl font-semibold text-[var(--guide-heading)]">{value}</p><p className="mt-3 text-xs leading-6 text-[var(--guide-muted)]">{body}</p></article>)}</div></section>
    </section>
    {seoContent}
    <PublicSiteFooter />
  </main>;
}
