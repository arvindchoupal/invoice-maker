import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free GST, Invoice and Profit Calculators | Ledgerly Tools",
  description:
    "Use free business calculators and invoice converters for GST India, profit, margin, tax, invoice numbers, PDF invoice extraction and invoice to Excel workflows.",
};

const tools = [
  {
    href: "/tools/gst-calculator",
    title: "GST calculator India",
    body: "Calculate exclusive or inclusive GST with CGST, SGST and IGST split.",
    tag: "GST",
    intent: "Best for tax invoices",
  },
  {
    href: "/tools/profit-calculator",
    title: "Profit calculator",
    body: "See profit, profit margin and markup before sending a quote or invoice.",
    tag: "Finance",
    intent: "Best for pricing work",
  },
  {
    href: "/tools/margin-calculator",
    title: "Margin calculator",
    body: "Convert cost and selling price into clean margin and markup numbers.",
    tag: "Finance",
    intent: "Best for agencies and shops",
  },
  {
    href: "/tools/invoice-number-generator",
    title: "Invoice number generator",
    body: "Generate professional invoice numbering formats for FY, monthly and GST workflows.",
    tag: "Invoice",
    intent: "Best for new businesses",
  },
  {
    href: "/tools/pdf-to-invoice-extractor",
    title: "PDF to invoice extractor",
    body: "Paste invoice text or upload supported files to structure bill data faster.",
    tag: "AI",
    intent: "Best for bookkeeping",
  },
  {
    href: "/tools/invoice-to-excel-converter",
    title: "Invoice to Excel converter",
    body: "Turn invoice line items into spreadsheet-ready CSV for accounting reviews.",
    tag: "Export",
    intent: "Best for reports",
  },
  {
    href: "/tools/emi-calculator",
    title: "EMI calculator",
    body: "Calculate loan EMI, interest and repayment totals for business purchases.",
    tag: "Finance",
    intent: "Best for cash flow",
  },
  {
    href: "/tools/tax-calculator",
    title: "Tax calculator",
    body: "Calculate custom tax amounts for service bills, purchase orders and estimates.",
    tag: "Tax",
    intent: "Best for quick checks",
  },
];

const workflows = [
  "Calculate GST or profit before quoting",
  "Convert the result into an invoice draft",
  "Send a branded PDF with payment links",
  "Track payments, reminders and reports inside Ledgerly",
];

const faqs = [
  {
    question: "Are these tools free?",
    answer: "Yes. The calculators and converters are public. Saving invoices, reports and history requires a Ledgerly account.",
  },
  {
    question: "Is the GST calculator built for India?",
    answer: "Yes. It supports common GST rates, inclusive and exclusive GST, and CGST/SGST or IGST splits.",
  },
  {
    question: "Can I turn a result into an invoice?",
    answer: "Yes. High-intent tools include Ledgerly CTAs so you can move from calculation to invoice, PDF, reminders and reporting.",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%)] px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link className="text-xl font-semibold tracking-tight" href="/">
            Ledgerly
          </Link>
          <div className="flex items-center gap-2">
            <Link className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:inline-flex" href="/login">
              Log in
            </Link>
            <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-100" href="/signup">
              Start free
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Free business tools</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Calculators and converters for GST, invoices, profit and cash flow.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Use Ledgerly&apos;s public tools to price work, check GST, structure invoice data and export results. When the calculation becomes real business, save it into Ledgerly and keep the workflow moving.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="/tools/gst-calculator">
                Open GST calculator
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/signup?source=free-tools">
                Save results in Ledgerly
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Tool-to-invoice workflow</p>
                  <p className="mt-1 text-xs text-slate-400">Useful public tools, connected to the Finance OS.</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">No login needed</span>
              </div>
              <div className="mt-5 grid gap-3">
                {workflows.map((item, index) => (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3" key={item}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-300/12 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
                      {index + 1}
                    </span>
                    <p className="text-sm text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Popular tools</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Start with the number you need right now.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Every tool is designed to lead into a real Ledgerly workflow: invoice creation, branded PDF export, AI bookkeeping, reminders, reports and payment tracking.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.075] hover:shadow-2xl hover:shadow-cyan-950/20"
                href={tool.href}
                key={tool.href}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-white/10">{tool.tag}</span>
                  <span className="text-xs font-medium text-slate-500 transition group-hover:text-cyan-200">Open</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{tool.title}</h3>
                <p className="mt-3 min-h-18 text-sm leading-6 text-slate-400">{tool.body}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{tool.intent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free to paid funnel</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Make the free result too useful to abandon.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              ["Shareable outputs", "Copy a calculation link or export the result for a client conversation."],
              ["Invoice conversion", "Move GST, profit or item data into an invoice instead of retyping it."],
              ["SEO landing intent", "Each tool answers a search query and then offers the next business step."],
              ["Ledgerly upgrade path", "Save history, remove branding, automate reminders and build reports."],
            ].map(([title, body]) => (
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5" key={title}>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">FAQ</p>
          <div className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
            {faqs.map((faq) => (
              <div className="p-6" key={faq.question}>
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
