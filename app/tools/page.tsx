import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { PublicPrimaryCta } from "@/components/PublicPrimaryCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";
import { faqSchema, toolsItemListSchema, websiteSchema } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Free GST, Invoice and Profit Calculators | InvoiceWala Tools",
  description:
    "Use free business calculators and invoice converters for GST India, profit, margin, tax, invoice numbers, PDF invoice extraction and invoice to Excel workflows.",
  alternates: { canonical: "https://invoicewala.shop/tools" },
};

const workflows = [
  "Calculate GST or profit before quoting",
  "Convert the result into an invoice draft",
  "Send a branded PDF with payment links",
  "Track payments, reminders and reports inside InvoiceWala",
];

const faqs = [
  {
    question: "Are these tools free?",
    answer: "Yes. The calculators and converters are public. Saving invoices, reports and history requires an InvoiceWala account.",
  },
  {
    question: "Is the GST calculator built for India?",
    answer: "Yes. It supports common GST rates, inclusive and exclusive GST, and CGST/SGST or IGST splits.",
  },
  {
    question: "Can I turn a result into an invoice?",
    answer: "Yes. High-intent tools include InvoiceWala CTAs so you can move from calculation to invoice, PDF, reminders and reporting.",
  },
];

const toolHubs = [
  {
    title: "Invoice creation tools",
    body: "Start here when the user wants to create, format or number an invoice.",
    links: [
      ["/free-invoice-generator", "Free invoice generator"],
      ["/gst-invoice-generator", "GST invoice generator"],
      ["/invoice-template-india", "Invoice template India"],
      ["/tools/invoice-number-generator", "Invoice number generator"],
    ],
  },
  {
    title: "Business document tools",
    body: "Support pre-sale and post-payment documents around the invoice workflow.",
    links: [
      ["/quotation-maker", "Quotation maker"],
      ["/purchase-order-generator", "Purchase order generator"],
      ["/receipt-generator", "Receipt generator"],
      ["/blog/estimate-vs-invoice", "Estimate vs invoice guide"],
    ],
  },
  {
    title: "GST and pricing calculators",
    body: "Help businesses calculate tax, pricing, discounts and profit before billing.",
    links: [
      ["/tools/gst-calculator", "GST calculator"],
      ["/tools/profit-calculator", "Profit calculator"],
      ["/tools/margin-calculator", "Margin calculator"],
      ["/tools/discount-calculator", "Discount calculator"],
    ],
  },
];

const recommendedPaths = [
  ["/free-invoice-generator", "Create invoices online", "Best starting point for users who came from calculators and now need a customer-ready PDF invoice."],
  ["/gst-invoice-generator", "Create GST invoices", "Use this path when GSTIN, taxable value and CGST/SGST/IGST fields matter."],
  ["/invoice-template-india", "See invoice formats", "Useful for users comparing PDF, Word, Excel and GST-ready invoice template structures."],
  ["/quotation-maker", "Send a quotation first", "Best for contractors, agencies and service providers who need approval before invoicing."],
  ["/receipt-generator", "Create a receipt", "Use after payment is received and the customer needs payment proof."],
  ["/purchase-order-generator", "Create purchase orders", "Useful for supplier purchases, procurement and vendor communication."],
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={[
          websiteSchema(),
          toolsItemListSchema(),
          faqSchema(faqs.map((faq) => [faq.question, faq.answer] as [string, string])),
        ]}
      />
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%)] px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions showBlog={false} />
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Free business tools</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Calculators and converters for GST, invoices, profit and cash flow.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Use InvoiceWala&apos;s public tools to price work, check GST, structure invoice data and export results. When the calculation becomes real business, save it into InvoiceWala and keep the workflow moving.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="/tools/gst-calculator">
                Open GST calculator
              </Link>
              <PublicPrimaryCta
                guestHref="/signup?source=free-tools"
                guestLabel="Save results in InvoiceWala"
                authedHref="/dashboard"
                authedLabel="Open dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              />
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
              Every tool is designed to lead into a real InvoiceWala workflow: invoice creation, branded PDF export, AI bookkeeping, reminders, reports and payment tracking.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TOOLS_CATALOG.map((tool) => (
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
              ["InvoiceWala upgrade path", "Save history, remove branding, automate reminders and build reports."],
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
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Tool hubs</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Choose the right workflow before creating a document.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              These internal hubs help users and search engines understand how InvoiceWala tools connect: calculation, document creation, PDF download and payment tracking.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {toolHubs.map((hub) => (
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={hub.title}>
                <h3 className="text-xl font-semibold text-white">{hub.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{hub.body}</p>
                <div className="mt-5 grid gap-2">
                  {hub.links.map(([href, label]) => (
                    <Link
                      className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
                      href={href}
                      key={href}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Recommended paths</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Turn free tool traffic into invoice workflows.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {recommendedPaths.map(([href, label, body]) => (
                <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40" href={href} key={href}>
                  <span className="font-semibold text-white">{label}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-400">{body}</span>
                </Link>
              ))}
            </div>
          </div>
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
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala Tools · free business tools</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
