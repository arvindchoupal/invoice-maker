"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, CheckCircle2, ReceiptText } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicToolNavActions } from "@/components/PublicToolNavActions";

const useCases = [
  ["Freelancers", "Check project profit after software, outsourcing, platform fees, ads or time cost before sending the final invoice."],
  ["Agencies", "Compare campaign revenue with designer, developer, ad spend and vendor costs to protect service margins."],
  ["Contractors", "Estimate profit after labor, material, travel, equipment and subcontractor costs before billing a milestone."],
  ["Consultants", "Understand net profit on retainers, workshops and advisory projects after travel, research and tool costs."],
  ["Ecommerce Sellers", "Calculate profit after product cost, packaging, delivery, returns, ads and marketplace fees."],
  ["Small Businesses", "Use a business profit calculator to understand whether sales revenue actually covers operating expenses."],
];

const relatedCalculators = [
  ["/free-invoice-generator", "Invoice Generator", "Turn profitable pricing into a professional invoice PDF."],
  ["/tools/gst-calculator", "GST Calculator", "Calculate GST before creating tax invoices or quotes."],
  ["/tools/tax-calculator", "Tax Calculator", "Check custom tax rates on service bills and estimates."],
  ["/tools/discount-calculator", "Discount Calculator", "See how discounts affect sale price and profit."],
  ["/quotation-maker", "Quotation Generator", "Quote profitable prices before work starts."],
  ["/quotation-maker", "Estimate Generator", "Prepare estimate-style pricing for projects and repairs."],
  ["/tools/tax-calculator", "VAT Calculator", "Use custom tax mode for VAT-style calculations."],
  ["/freelancer-invoice-generator", "Freelance Invoice Generator", "Create invoices for freelance projects and retainers."],
  ["/purchase-order-generator", "Purchase Order Generator", "Create supplier purchase orders before vendor invoices."],
];

const linkHub = [
  ["/free-invoice-generator", "Invoice Generator"],
  ["/gst-invoice-generator", "GST Invoice Generator"],
  ["/quotation-maker", "Quote Generator"],
  ["/quotation-maker", "Estimate Generator"],
  ["/free-invoice-generator", "Receipt Generator"],
  ["/tools/tax-calculator", "Tax Calculator"],
  ["/tools/discount-calculator", "Discount Calculator"],
  ["/tools/margin-calculator", "Margin Calculator"],
];

const faqs = [
  ["What is profit?", "Profit is the amount left after subtracting expenses from revenue. If revenue is ₹10,000 and expenses are ₹6,500, net profit is ₹3,500."],
  ["How do I calculate profit margin?", "Profit margin = Net Profit / Revenue × 100. A ₹3,500 profit on ₹10,000 revenue gives a 35% profit margin."],
  ["What is markup?", "Markup compares profit with expenses or cost. Markup % = Net Profit / Expenses × 100."],
  ["Can I create an invoice from the result?", "Yes. After calculating profit, use InvoiceWala's invoice generator to create a professional invoice with the same pricing."],
  ["Is this calculator free?", "Yes. The profit calculator is free and does not require signup for calculation."],
  ["How do freelancers use a profit calculator?", "Freelancers use it to check whether project fees cover tools, outsourcing, platform fees, ads, travel and time costs."],
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
}

function percent(value: number) {
  return `${Number.isFinite(value) ? value.toFixed(2) : "0.00"}%`;
}

function inputClass() {
  return "mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-base font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60";
}

function resultCard(title: string, value: string, body: string) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/10">
      <p className="text-sm font-semibold text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
    </article>
  );
}

export default function ProfitCalculatorClient() {
  const [revenue, setRevenue] = useState(10000);
  const [expenses, setExpenses] = useState(6500);

  const result = useMemo(() => {
    const profit = revenue - expenses;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const markup = expenses > 0 ? (profit / expenses) * 100 : 0;
    return { profit, margin, markup };
  }, [expenses, revenue]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_30%)] px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicToolNavActions signupSource="profit-calculator" />
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-12 lg:grid-cols-[1fr_500px] lg:items-start">
          <div className="lg:pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">profit calculator</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Free Profit Calculator for Small Businesses & Freelancers
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Calculate profit, profit margin, markup, and pricing instantly. Turn calculations into professional invoices with InvoiceWala.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="#profit-calculator">
                Calculate Profit
                <Calculator className="h-4 w-4" />
              </a>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/free-invoice-generator">
                Create Invoice
                <ReceiptText className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {["Profit calculator", "Profit margin calculator", "Markup calculator", "Business profit calculator"].map((item) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3" key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur" id="profit-calculator">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Profit Calculator</h2>
                  <p className="mt-2 text-sm text-slate-400">Revenue minus expenses, with live margin and markup.</p>
                </div>
                <span className="rounded-full w-fit text-nowrap bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">No signup</span>
              </div>
              <div className="mt-6 grid gap-4">
                <label>
                  <span className="text-sm font-semibold text-slate-300">Revenue</span>
                  <input className={inputClass()} min="0" type="number" value={revenue} onChange={(event) => setRevenue(Number(event.target.value))} />
                </label>
                <label>
                  <span className="text-sm font-semibold text-slate-300">Expenses</span>
                  <input className={inputClass()} min="0" type="number" value={expenses} onChange={(event) => setExpenses(Number(event.target.value))} />
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-cyan-300 p-4 text-slate-950">
                    <p className="text-xs font-semibold uppercase">Net profit</p>
                    <p className="mt-2 text-[20px] font-bold tabular-nums transition-all">{money(result.profit)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">Margin</p>
                    <p className="mt-2 text-[20px] font-bold tabular-nums transition-all">{percent(result.margin)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">Markup</p>
                    <p className="mt-2 text-[20px] font-bold tabular-nums transition-all">{percent(result.markup)}</p>
                  </div>
                </div>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5" href="/free-invoice-generator">
                  Create invoice from this result
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Results explanation</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Revenue, Expenses, Net Profit, Profit Margin and Markup</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {resultCard("Revenue", money(revenue), "Revenue is the total money earned before subtracting expenses. Example: sales worth ₹10,000.")}
          {resultCard("Expenses", money(expenses), "Expenses are business costs such as material, software, ads, rent, delivery, labor or subcontractors.")}
          {resultCard("Net Profit", money(result.profit), "Formula: Net Profit = Revenue - Expenses. Example: ₹10,000 - ₹6,500 = ₹3,500.")}
          {resultCard("Profit Margin", percent(result.margin), "Formula: Profit Margin = Net Profit / Revenue × 100. Example: ₹3,500 / ₹10,000 = 35%.")}
          {resultCard("Markup %", percent(result.markup), "Formula: Markup = Net Profit / Expenses × 100. Example: ₹3,500 / ₹6,500 = 53.85%.")}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">SEO guide</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">How To Calculate Profit</h2>
          <div className="mt-6 grid gap-6 text-base leading-8 text-slate-300 lg:grid-cols-2">
            <div className="space-y-4">
              <p>
                Profit calculation starts with revenue. Revenue means the total amount your business earns from a sale, project, invoice, order or service before costs are removed. For a freelancer, revenue may be a client project fee. For a shop, it may be product sales. For a contractor, it may be the amount billed for labor and materials. A profit calculator helps you see whether that revenue is actually enough after expenses.
              </p>
              <p>
                Expenses are the costs required to deliver the work or product. These can include product cost, contractor labor, packaging, delivery, ads, software, rent, payment gateway fees, subcontractors, travel or any direct business cost. If revenue is ₹10,000 and expenses are ₹6,500, the net profit formula is simple: Net Profit = Revenue - Expenses. In this example, profit is ₹3,500.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Profit margin shows how much of your revenue remains as profit. The profit margin formula is Profit Margin = Net Profit / Revenue × 100. If net profit is ₹3,500 on ₹10,000 revenue, the profit margin is 35%. A profit margin calculator is useful before you send a quote or invoice because it tells you whether your price is healthy enough.
              </p>
              <p>
                Markup is different from margin. Markup compares profit to expenses or cost. The markup formula is Markup = Net Profit / Expenses × 100. If expenses are ₹6,500 and profit is ₹3,500, markup is 53.85%. Use markup when setting prices from cost. Use margin when checking how profitable the final revenue is. InvoiceWala helps you calculate the number first, then create a professional invoice with the same pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Business use cases</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Who uses a business profit calculator?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, body]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title}>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Related calculators</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Use the next InvoiceWala tool</h2>
          </div>
          <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950" href="/tools">View all tools</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedCalculators.map(([href, title, body]) => (
            <Link className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.075]" href={href} key={href}>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                Open tool
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Profit Margin Examples</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-4">Revenue</th><th className="p-4">Expenses</th><th className="p-4">Profit</th><th className="p-4">Margin</th></tr>
              </thead>
              <tbody>
                {[
                  ["1000", "600", "400", "40%"],
                  ["5000", "3000", "2000", "40%"],
                  ["10000", "6500", "3500", "35%"],
                ].map((row) => (
                  <tr className="border-t border-white/10" key={row.join("-")}>
                    {row.map((cell) => <td className="p-4 text-slate-300" key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Why InvoiceWala</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">From profit calculation to invoice in one workflow</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Free forever", "No signup required", "Mobile friendly", "Save calculations", "Convert to invoice instantly", "Export PDF invoices"].map((item) => (
              <div className="flex gap-3 rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={item}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Profit Calculator FAQs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map(([question, answer]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Internal link hub</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">More InvoiceWala tools for pricing and billing</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {linkHub.map(([href, label]) => (
              <Link className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-100" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <p>InvoiceWala · invoicewala.shop</p>
          <Link className="hover:text-white" href="/tools">All tools</Link>
        </div>
      </footer>
    </main>
  );
}
