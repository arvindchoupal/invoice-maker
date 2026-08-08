import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "GST Invoice Format & Template India | PDF, Excel & Word",
  description:
    "Use this GST invoice format and template guide for India. See mandatory fields, sample GST invoice, CGST/SGST/IGST breakup, PDF, Excel and Word notes.",
  alternates: { canonical: `${siteUrl}/gst-invoice-format` },
  openGraph: {
    title: "GST Invoice Format & Template India | PDF, Excel & Word",
    description:
      "GST invoice template guide with sample layout, mandatory fields, tax breakup, Excel, Word and PDF notes.",
    url: `${siteUrl}/gst-invoice-format`,
    siteName: "InvoiceWala",
  },
};

const faqs: Array<[string, string]> = [
  ["What is GST invoice format?", "GST invoice format is the structure used to issue GST-ready invoices with supplier details, buyer details, GSTIN, invoice number, HSN/SAC, taxable value, GST rate, tax amount and total invoice value."],
  ["What is a GST invoice template?", "A GST invoice template is a reusable GST bill format with fields for supplier details, customer details, invoice number, item rows, HSN/SAC, taxable value, GST breakup and total amount."],
  ["Is GST invoice format and GST bill format the same?", "In common usage, both phrases often refer to the same document. Under GST, the formal document for taxable supply is generally called a tax invoice."],
  ["What fields are required in a GST invoice?", "Important fields include supplier name, GSTIN, invoice number, date, buyer details, item or service description, HSN/SAC, taxable value, GST rate, CGST/SGST or IGST and total value."],
  ["Can I use GST invoice format in Excel?", "Yes, but Excel requires manual formulas and formatting checks. Online invoice tools reduce calculation and PDF layout mistakes."],
  ["Can I download GST invoice format in PDF?", "Yes. You can create a GST invoice in InvoiceWala and download a professional PDF after adding your real invoice details."],
  ["Can GST invoice format be made in Word?", "Yes, Word can be used for a static layout, but calculations and repeat billing are easier in a structured invoice generator."],
  ["What is CGST and SGST in GST invoice?", "CGST and SGST are usually used for same-state supplies, where the tax amount is split between central and state GST."],
  ["What is IGST in GST invoice?", "IGST is usually used for inter-state supplies where seller and buyer are in different states."],
  ["Is invoice number mandatory in GST invoice?", "Yes. A unique invoice number helps identify the bill, track payment and keep accounting records clean."],
  ["Can freelancers issue GST invoices?", "GST-registered freelancers can issue GST invoices for taxable services when GST applies to their business."],
];

const mandatoryFields = [
  ["Supplier details", "Business name, address, GSTIN, contact details and logo if available."],
  ["Buyer details", "Customer name, billing address and GSTIN for B2B transactions."],
  ["Invoice number and date", "A unique invoice series such as GST-2026-001 or FY26-0001, plus issue date and due date."],
  ["Place of supply", "Used to decide whether CGST/SGST or IGST should appear on the invoice."],
  ["HSN or SAC", "HSN for goods and SAC for services, based on the supplied item or service."],
  ["Taxable value", "The value before GST after any applicable discount."],
  ["GST breakup", "GST rate, CGST, SGST or IGST amount and total tax."],
  ["Final total", "Subtotal, tax, round off if any and total invoice value payable."],
];

const sampleRows = [
  ["Website development", "998314", "1", "40,000", "18%", "7,200", "47,200"],
  ["Monthly support", "998313", "1", "8,000", "18%", "1,440", "9,440"],
  ["Setup fee", "998315", "1", "2,000", "18%", "360", "2,360"],
];

const formatCards = [
  {
    title: "GST invoice format in PDF",
    body: "PDF is best when you want to send a final invoice by email, WhatsApp or client portal because the layout stays consistent.",
  },
  {
    title: "GST invoice format in Excel",
    body: "Excel is useful for editable calculations, but formulas, tax rows and print layout need careful checking before sharing.",
  },
  {
    title: "GST invoice format in Word",
    body: "Word is fine for a simple static invoice layout, but it is weaker for repeated billing, totals and GST calculations.",
  },
];

const internalLinks = [
  { href: "/gst-invoice-generator", label: "GST Invoice Generator", body: "Create a GST-ready invoice and download a clean PDF." },
  { href: "/gst-invoice-format-in-excel", label: "GST Invoice Format in Excel", body: "Download a spreadsheet-friendly GST invoice sample." },
  { href: "/tools/gst-calculator", label: "GST Calculator", body: "Calculate taxable value, GST amount, CGST, SGST or IGST." },
  { href: "/tools/hsn-code-finder", label: "HSN and SAC Finder", body: "Search common product and service codes before invoice creation." },
  { href: "/tools/invoice-number-generator", label: "Invoice Number Generator", body: "Generate clean invoice numbers for GST billing." },
  { href: "/tax-invoice-format", label: "Tax Invoice Format", body: "Understand tax invoice fields and India-specific structure." },
  { href: "/blog/gst-bill-format", label: "GST Bill Format", body: "Read the GST bill format guide with sample invoice rules." },
];

function articleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GST Invoice Format and Template India: PDF, Excel and Word Sample Guide",
    description:
      "A complete GST invoice format guide for Indian businesses with sample fields, tax breakup, PDF, Excel and Word format notes.",
    author: { "@type": "Organization", name: "InvoiceWala" },
    publisher: {
      "@type": "Organization",
      name: "InvoiceWala",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: `${siteUrl}/gst-invoice-format`,
    datePublished: "2026-07-14",
    dateModified: "2026-08-08",
    inLanguage: "en-IN",
  };
}

export default function GstInvoiceFormatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "GST Invoice Format", url: `${siteUrl}/gst-invoice-format` },
          ]),
          articleSchema(),
        ]}
      />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_32%)] px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">GST invoice format and template</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              GST Invoice Format and Template in India
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Use this GST invoice template guide for Indian businesses, freelancers, contractors, consultants and agencies. See mandatory fields, a sample GST invoice table, CGST/SGST/IGST breakup, and PDF, Excel and Word format notes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="/gst-invoice-generator">
                Create GST invoice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/tools/gst-calculator">
                Calculate GST
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100">
              {["GST invoice template", "GST invoice format PDF", "GST invoice format Excel", "CGST SGST IGST sample"].map((item) => (
                <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5" key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30">
            <div className="rounded-2xl bg-white p-5 text-slate-950">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">IW</div>
                  <p className="mt-4 text-xl font-bold">Your Business</p>
                  <p className="text-xs text-slate-500">GSTIN: 29ABCDE1234F1Z5</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">TAX INVOICE</p>
                  <p className="text-xs text-slate-500">GST-2026-001</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                  <p className="mt-2 font-semibold">Customer Name</p>
                  <p className="text-xs text-slate-500">GSTIN: 27ABCDE1234F1Z8</p>
                </div>
                <div className="text-left sm:text-right">
                  <p>Invoice Date: 14 Jul 2026</p>
                  <p>Place of Supply: Karnataka</p>
                </div>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_70px_90px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Description</span><span>GST</span><span className="text-right">Total</span>
                </div>
                <div className="grid grid-cols-[1fr_70px_90px] px-3 py-3">
                  <span>Professional service</span><span>18%</span><span className="text-right">₹47,200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-8">
            <Section title="What is GST invoice format and template?">
              <p>
                GST invoice format is the standard invoice structure used to show GST details on a sale of goods or services in India. A practical GST invoice includes supplier details, buyer details, GSTIN, invoice number, invoice date, item or service description, HSN or SAC code, taxable value, GST rate, CGST/SGST or IGST amount and total invoice value.
              </p>
              <p>
                A GST invoice template is the same practical structure in reusable form. Many users search for GST invoice template, GST invoice format in Excel, GST invoice format in Word, GST invoice format PDF, GST tax invoice format and GST bill format because they want a reliable sample before creating their own invoice. This page explains the structure and links to InvoiceWala tools when you want to create the actual PDF.
              </p>
            </Section>

            <Section title="GST invoice format sample">
              <p>
                The sample below shows a simple GST invoice table for a service business. Product businesses can use the same structure with product names, HSN codes, quantity, unit and rate.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      {["Description", "HSN/SAC", "Qty", "Taxable value", "GST", "Tax", "Total"].map((head) => (
                        <th className="p-3" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((row) => (
                      <tr className="border-t border-white/10" key={row[0]}>
                        {row.map((cell, index) => (
                          <td className={`p-3 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-5 text-sm leading-7 text-slate-200">
                Example: taxable value ₹50,000 at 18% GST gives ₹9,000 GST and ₹59,000 total invoice value. For same-state supply this may split into CGST ₹4,500 and SGST ₹4,500. For inter-state supply it may appear as IGST ₹9,000.
              </div>
            </Section>

            <Section title="Mandatory fields in GST invoice format">
              <p>
                A clean GST invoice format should make tax and payment details easy to verify. These are the fields most businesses should plan for before creating the invoice.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {mandatoryFields.map(([title, body]) => (
                  <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}>
                    <FileText className="h-5 w-5 text-cyan-300" />
                    <h3 className="mt-4 font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="GST invoice format in Excel, Word and PDF">
              <p>
                Different formats solve different problems. Excel and Word are useful when you want an editable file. PDF is better when you want to send the final invoice to a customer.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {formatCards.map((card) => (
                  <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5" key={card.title}>
                    <h3 className="font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{card.body}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="CGST, SGST and IGST in GST invoice format">
              <p>
                GST invoice format should show the correct tax breakup. For same-state supplies, invoices commonly show CGST and SGST separately. For inter-state supplies, invoices commonly show IGST. The correct treatment depends on supplier location, buyer location, place of supply and the nature of the transaction.
              </p>
              <p>
                Before sending a GST invoice, check the tax rate, place of supply, HSN/SAC code and customer GSTIN. If you only need a quick calculation, use the GST Calculator. If you are creating the final document, use the GST Invoice Generator.
              </p>
            </Section>

            <Section title="Common GST invoice format mistakes">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Using duplicate invoice numbers.",
                  "Missing buyer GSTIN on B2B invoices.",
                  "Using the wrong GST rate.",
                  "Forgetting HSN or SAC details.",
                  "Mixing CGST/SGST and IGST incorrectly.",
                  "Sharing Excel files when a locked PDF invoice is better.",
                ].map((mistake) => (
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300" key={mistake}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="GST invoice format FAQs">
              <div className="grid gap-4">
                {faqs.map(([question, answer]) => (
                  <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}>
                    <h3 className="font-semibold text-white">{question}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
                  </article>
                ))}
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
              <h2 className="text-xl font-semibold">Create the actual GST invoice</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use this page to understand the format, then create the real invoice with your business, customer and tax details.
              </p>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-200" href="/gst-invoice-generator">
                Open GST invoice generator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 grid gap-3">
              {internalLinks.map((item) => (
                <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/40" href={item.href} key={item.href}>
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-400">{item.body}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </article>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}
