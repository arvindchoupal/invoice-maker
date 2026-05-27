import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicHeroActions } from "@/components/PublicHeroActions";
import { PublicNavActions } from "@/components/PublicNavActions";
import { PublicPrimaryCta } from "@/components/PublicPrimaryCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";
import { faqSchema, organizationSchema, toolsItemListSchema, websiteSchema } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "InvoiceWala - Free GST Invoice Generator for Indian Businesses",
  description:
    "Create GST-ready invoices, download professional PDFs, track payments, and send reminders. Free invoice generator for freelancers, contractors, agencies, and small businesses in India.",
  metadataBase: new URL("https://invoicewala.shop"),
  openGraph: {
    title: "InvoiceWala - Free GST Invoice Generator",
    description: "Create GST invoices fast, send PDFs, track payments, and get paid faster.",
    url: "https://invoicewala.shop",
    siteName: "InvoiceWala",
  },
};

const trustMetrics = [
  ["Free preview", "create before signup"],
  ["GST-ready", "tax invoice fields"],
  ["WhatsApp", "share invoice links"],
  ["₹199 Pro", "early access pricing"],
];

const features = [
  ["Create invoices fast", "Add customer details, item rows, tax, discount, notes and terms without fighting a complex accounting screen."],
  ["Send GST-ready PDFs", "Use GST/VAT fields, professional invoice layouts and PDF export built for Indian freelancers and businesses."],
  ["Track who has paid", "See paid, pending and overdue invoices so you know who needs a reminder."],
  ["Automate later", "When you are ready, import bills and receipts with AI, track expenses and review simple profit reports."],
];

const simpleUseCases = [
  ["Finished freelance work?", "Create a clean invoice, add taxes, download PDF and send it to your client."],
  ["Sold products to a customer?", "Make a proper sales invoice with item rows, GST/VAT and payment status."],
  ["Completed a service job?", "Send an invoice or receipt for repair, consulting, design, construction or local work."],
  ["Need a quote before billing?", "Prepare a quotation or estimate first, then convert it into an invoice later."],
];

const userTypes = [
  ["Freelancers", "Bill clients for projects, retainers and one-off work."],
  ["Contractors", "Invoice labor, materials, repairs and milestones."],
  ["Agencies", "Send clean invoices for campaigns, design, development and consulting."],
  ["Local shops", "Create simple sales invoices with tax and item rows."],
  ["GST businesses", "Use GST/VAT fields and tax-ready invoice layouts."],
];

const footerSeoLinks = [
  ["/free-invoice-generator", "Free invoice generator"],
  ["/gst-invoice-generator", "GST invoice generator"],
  ["/freelancer-invoice-generator", "Freelancer invoice"],
  ["/contractor-invoice-generator", "Contractor invoice"],
  ["/pdf-to-invoice-ai", "PDF to invoice AI"],
];

const faqs: Array<[string, string]> = [
  ["Can I create an invoice without signup?", "Yes. You can create and preview an invoice for free. Signup or login is needed when you want to save it and download the PDF."],
  ["Does InvoiceWala support GST invoices?", "Yes. InvoiceWala supports GST/VAT fields, tax-ready invoice data and GST-focused tools for Indian businesses."],
  ["Is InvoiceWala accounting software?", "No. InvoiceWala is a simple invoicing and business tracking tool. AI import, expenses and reports are optional automation after the invoice flow."],
  ["Can I send invoices on WhatsApp?", "Yes. InvoiceWala supports direct WhatsApp sharing links for invoices without needing a WhatsApp API provider."],
];
//test

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={[organizationSchema(), websiteSchema(), toolsItemListSchema(), faqSchema(faqs)]} />

      <section className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-6 sm:py-6">
        <nav className="flex items-center justify-between">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>

        <div className="grid items-center gap-10 py-12 sm:py-16 lg:min-h-[720px] lg:grid-cols-[1fr_560px]">
          <div>
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
              Free GST invoice generator for freelancers, contractors and small businesses
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              Create invoices fast. Send GST-ready PDFs. Get paid faster.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              InvoiceWala helps Indian freelancers, contractors, agencies and small businesses create professional invoices, track payments and send reminders without accounting complexity.
            </p>
            <PublicHeroActions />
            <p className="mt-4 text-sm text-slate-400">No credit card required. Preview your invoice before signup.</p>
          </div>

          <div className="relative" id="demo">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="rounded-2xl bg-white p-5 text-slate-950 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="h-10 w-10 rounded-2xl bg-blue-600" />
                    <p className="mt-4 text-2xl font-bold">Your Business</p>
                    <p className="text-sm text-slate-500">business@email.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-blue-600">INVOICE</p>
                    <p className="mt-1 text-sm text-slate-500">Preview before signup</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                    <p className="mt-2 font-semibold">Customer Name</p>
                    <p className="text-sm text-slate-500">customer@email.com</p>
                  </div>
                  <div className="text-sm sm:text-right">
                    <p>Issue: 2026-05-25</p>
                    <p className="mt-2">Due: 2026-06-08</p>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-[1fr_56px_90px_100px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                    <span>Item</span><span>Qty</span><span>Rate</span><span className="text-right">Total</span>
                  </div>
                  {[
                    ["Service work", "1", "5,000", "₹5,000"],
                    ["GST", "18%", "", "₹900"],
                  ].map(([item, qty, rate, total]) => (
                    <div className="grid grid-cols-[1fr_56px_90px_100px] border-t border-slate-100 px-3 py-3 text-sm" key={item}>
                      <span className="font-medium">{item}</span>
                      <span>{qty}</span>
                      <span>{rate}</span>
                      <span className="text-right">{total}</span>
                    </div>
                  ))}
                </div>

                <div className="ml-auto mt-6 max-w-xs border-t border-slate-200 pt-4 text-right">
                  <p className="text-sm text-slate-500">Total due</p>
                  <p className="text-3xl font-bold">₹5,900</p>
                </div>

                <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                  No credit card required · PDF download after free signup
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustMetrics.map(([value, label]) => (
            <div className="rounded-2xl bg-white/[0.04] p-4" key={label}>
              <p className="text-3xl font-semibold">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Built for people who invoice customers</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {userTypes.map(([title, body]) => (
              <div className="rounded-2xl bg-slate-950/70 p-4" key={title}>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Need an invoice right now?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Sold something or completed work? Give your customer a proper invoice in minutes.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              InvoiceWala is simple enough for one invoice today and powerful enough to manage payments, GST, clients and reports as your business grows.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PublicPrimaryCta
                guestHref="/free-invoice"
                guestLabel="Create free invoice"
                authedHref="/invoices/new"
                authedLabel="Create invoice"
              />
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/tools/gst-calculator">
                Calculate GST first
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {simpleUseCases.map(([title, body]) => (
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5" key={title}>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-4">
        {features.map(([title, body]) => (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">AI import</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Already have a bill or receipt? Let AI extract it.</h2>
          <p className="mt-4 text-slate-300">Upload a vendor bill, GST invoice, receipt or PDF. InvoiceWala can detect vendor details, invoice number, dates, GST/VAT, line items, subtotal, tax and total so you can review and save faster.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {["Receipt", "GST Bill", "Vendor PDF"].map((item, index) => (
            <div className="rounded-3xl bg-white p-5 text-slate-950" key={item}>
              <p className="text-sm font-semibold">{item}</p>
              <div className="mt-4 h-32 rounded-2xl bg-slate-100 p-3">
                <div className="h-2 rounded bg-slate-300" />
                <div className="mt-3 h-2 w-2/3 rounded bg-slate-300" />
                <div className="mt-8 h-8 rounded bg-cyan-300/40" />
              </div>
              <p className="mt-4 text-sm text-slate-500">{[96, 91, 88][index]}% extraction confidence</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free tools</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Useful calculators that lead into better invoices.</h2>
          </div>
          <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950" href="/tools">View all tools</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TOOLS_CATALOG.map((tool) => (
            <Link
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-cyan-950/20"
              href={tool.href}
              key={tool.href}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-white/10">{tool.tag}</span>
                <span className="text-xs font-medium text-slate-500 transition group-hover:text-cyan-200">Open</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{tool.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{tool.body}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{tool.intent}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Simple pricing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Start free. Upgrade to Pro for ₹199/month when you need more.</h2>
              <p className="mt-4 text-slate-300">Create and preview invoices free. Pro unlocks saved invoices, PDF templates, reminders, GST reports, AI imports and business tracking features at early access pricing.</p>
            </div>
            <div className="grid gap-3">
              {[
                ["Free", "Preview invoices and use free tools", "/free-invoice"],
                ["Pro ₹199", "PDFs, reminders, GST reports and AI imports", "/pricing"],
              ].map(([plan, body, href]) => (
                <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-4" key={plan}>
                  <div>
                    <p className="font-semibold">{plan}</p>
                    <p className="text-sm text-slate-400">{body}</p>
                  </div>
                  <Link className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-950" href={href}>View</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Questions before you create your invoice?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400 lg:grid-cols-[1fr_auto]">
          <div>
            <p>InvoiceWala · invoicewala.shop</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {footerSeoLinks.map(([href, label]) => (
                <Link className="hover:text-white" href={href} key={href}>{label}</Link>
              ))}
            </div>
          </div>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
