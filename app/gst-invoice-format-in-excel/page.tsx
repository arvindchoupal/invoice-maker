import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, FileSpreadsheet } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";

const siteUrl = "https://invoicewala.shop";
const downloadUrl = "/downloads/gst-invoice-format-excel-sample.csv";

export const metadata: Metadata = {
  title: "GST Invoice Format in Excel | Free Download Sample",
  description:
    "Download a free GST invoice format in Excel-friendly CSV. See GST invoice Excel columns, formulas, CGST/SGST/IGST breakup and sample template.",
  alternates: { canonical: `${siteUrl}/gst-invoice-format-in-excel` },
  openGraph: {
    title: "GST Invoice Format in Excel | Free Download Sample",
    description:
      "Free GST invoice Excel format sample with taxable value, GST rate, CGST, SGST, IGST and total invoice value.",
    url: `${siteUrl}/gst-invoice-format-in-excel`,
    siteName: "InvoiceWala",
  },
};

const faqs: Array<[string, string]> = [
  ["Can I download GST invoice format in Excel?", "Yes. This page includes a free spreadsheet-friendly CSV sample that opens in Excel, Google Sheets and Numbers."],
  ["What columns should a GST invoice Excel format include?", "Useful columns include description, HSN/SAC, quantity, rate, taxable value, GST rate, CGST, SGST, IGST and line total."],
  ["Is CSV the same as Excel?", "CSV is a spreadsheet format that opens in Excel. It is simpler than XLSX but useful for a clean downloadable invoice sample."],
  ["What formula calculates GST in Excel?", "For exclusive GST, GST Amount = Taxable Value x GST Rate. Line Total = Taxable Value + GST Amount."],
  ["How do I split CGST and SGST in Excel?", "For same-state supply, CGST and SGST are commonly half of total GST each. Example: 18% GST becomes 9% CGST and 9% SGST."],
  ["When should I use IGST?", "IGST is generally used for inter-state supplies where seller and buyer are in different states. Confirm exact treatment with your accountant."],
  ["Can I use Excel for GST invoices?", "Yes, but manual Excel invoices can lead to formula, numbering and PDF layout mistakes. For repeated billing, an online GST invoice generator is safer."],
  ["Can I convert this Excel format to PDF?", "Yes. You can print or export the spreadsheet to PDF, or use InvoiceWala to create a cleaner PDF invoice online."],
];

const excelColumns = [
  ["Description", "Name the product or service being billed."],
  ["HSN/SAC", "Use HSN for goods and SAC for services."],
  ["Qty", "Number of units, hours, packages or service count."],
  ["Rate", "Price per unit before GST."],
  ["Taxable Value", "Quantity multiplied by rate, after any discount."],
  ["GST Rate", "Tax rate such as 5%, 12%, 18% or 28%."],
  ["CGST / SGST / IGST", "Tax breakup based on supply type."],
  ["Line Total", "Taxable value plus applicable GST."],
];

const sampleRows = [
  ["Website development", "998314", "1", "40,000", "40,000", "18%", "3,600", "3,600", "0", "47,200"],
  ["Monthly support", "998313", "1", "8,000", "8,000", "18%", "720", "720", "0", "9,440"],
  ["Setup fee", "998315", "1", "2,000", "2,000", "18%", "180", "180", "0", "2,360"],
];

const formulas = [
  ["Taxable Value", "= Quantity * Rate"],
  ["GST Amount", "= Taxable Value * GST Rate"],
  ["CGST", "= GST Amount / 2 for same-state supply"],
  ["SGST", "= GST Amount / 2 for same-state supply"],
  ["IGST", "= GST Amount for inter-state supply"],
  ["Line Total", "= Taxable Value + CGST + SGST + IGST"],
];

const internalLinks = [
  { href: "/gst-invoice-format", label: "GST Invoice Format", body: "Read the main GST invoice format pillar guide." },
  { href: "/gst-invoice-generator", label: "GST Invoice Generator", body: "Create a professional GST invoice PDF online." },
  { href: "/tools/gst-calculator", label: "GST Calculator", body: "Calculate GST before filling the Excel sheet." },
  { href: "/tools/hsn-code-finder", label: "HSN and SAC Finder", body: "Search product and service codes before invoicing." },
  { href: "/tools/invoice-number-generator", label: "Invoice Number Generator", body: "Create clean invoice numbers for your Excel format." },
  { href: "/blog/gst-bill-format", label: "GST Bill Format", body: "Understand GST bill fields and sample invoice structure." },
];

function articleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GST Invoice Format in Excel: Free Download Sample",
    description:
      "Download and understand a free GST invoice format in Excel-friendly CSV with GST columns, formulas and tax breakup.",
    author: { "@type": "Organization", name: "InvoiceWala" },
    publisher: {
      "@type": "Organization",
      name: "InvoiceWala",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: `${siteUrl}/gst-invoice-format-in-excel`,
    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
    inLanguage: "en-IN",
  };
}

export default function GstInvoiceFormatInExcelPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "GST Invoice Format", url: `${siteUrl}/gst-invoice-format` },
            { name: "GST Invoice Format in Excel", url: `${siteUrl}/gst-invoice-format-in-excel` },
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">GST invoice Excel template</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              GST Invoice Format in Excel
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Download a free GST invoice format in Excel-friendly CSV and learn the columns, formulas, CGST/SGST/IGST breakup and common mistakes before creating a customer-ready invoice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href={downloadUrl}>
                Download Excel sample
                <Download className="h-4 w-4" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/gst-invoice-generator">
                Create GST invoice PDF
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100">
              {["GST invoice Excel format", "GST bill format in Excel", "GST tax invoice Excel", "Download free sample"].map((item) => (
                <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5" key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30">
            <div className="rounded-2xl bg-white p-5 text-slate-950">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <FileSpreadsheet className="h-10 w-10 text-emerald-600" />
                  <p className="mt-3 text-xl font-bold">Excel-style GST Invoice</p>
                  <p className="text-xs text-slate-500">Spreadsheet preview</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>GST-2026-001</p>
                  <p>14 Jul 2026</p>
                </div>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 text-xs">
                <div className="grid grid-cols-[1fr_62px_70px_70px] bg-emerald-700 px-3 py-2 font-bold uppercase text-white">
                  <span>Description</span><span>GST</span><span>Tax</span><span className="text-right">Total</span>
                </div>
                {sampleRows.map((row) => (
                  <div className="grid grid-cols-[1fr_62px_70px_70px] border-t border-slate-200 px-3 py-2" key={row[0]}>
                    <span className="font-semibold">{row[0]}</span><span>{row[5]}</span><span>₹{Number(row[6].replace(",", "")) + Number(row[7].replace(",", ""))}</span><span className="text-right">₹{row[9]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-950">
                Opens in Excel, Google Sheets and Numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-8">
            <Section title="Download free GST invoice format in Excel">
              <p>
                This page gives you a free GST invoice format in Excel-friendly CSV. You can open the file in Microsoft Excel, Google Sheets, Apple Numbers or any spreadsheet tool. It includes sample supplier details, buyer details, GSTIN, invoice number, place of supply, HSN/SAC, taxable value, GST rate, CGST, SGST, IGST and grand total.
              </p>
              <p>
                The download is useful when you want a quick sample GST invoice Excel format. For repeated billing, PDF sharing, invoice numbering, client records and payment tracking, use the online GST invoice generator instead of maintaining manual spreadsheet files.
              </p>
              <Link className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-200" href={downloadUrl}>
                Download GST invoice Excel sample <Download className="h-4 w-4" />
              </Link>
            </Section>

            <Section title="GST invoice Excel columns">
              <div className="grid gap-4 sm:grid-cols-2">
                {excelColumns.map(([title, body]) => (
                  <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Sample GST invoice Excel table">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      {["Description", "HSN/SAC", "Qty", "Rate", "Taxable", "GST", "CGST", "SGST", "IGST", "Total"].map((head) => (
                        <th className="p-3" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((row) => (
                      <tr className="border-t border-white/10" key={row[0]}>
                        {row.map((cell, index) => (
                          <td className={`p-3 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={`${row[0]}-${cell}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="GST invoice Excel formulas">
              <p>
                If you build your own Excel template, keep formulas simple and visible. The exact GST split depends on supply type, but these formula ideas are useful for most sample formats.
              </p>
              <div className="mt-5 grid gap-3">
                {formulas.map(([label, formula]) => (
                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm" key={label}>
                    <p className="font-semibold text-white">{label}</p>
                    <code className="mt-2 block text-cyan-100">{formula}</code>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Excel vs online GST invoice generator">
              <p>
                Excel is familiar and flexible, but it creates manual work. Formulas can break, invoice numbers can repeat, print layout can shift and old files can get copied with wrong customer details. An online GST invoice generator is better when you need repeatable invoices, PDF output, client records and payment tracking.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Use Excel for one-off sample formats.",
                  "Use InvoiceWala for customer-ready GST invoice PDFs.",
                  "Use Excel only after checking formulas and tax split.",
                  "Use InvoiceWala when invoice numbers and records matter.",
                ].map((item) => (
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300" key={item}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="GST invoice format in Excel FAQs">
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
              <h2 className="text-xl font-semibold">Need a PDF invoice?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Download the spreadsheet sample, or create a cleaner GST invoice PDF directly in InvoiceWala.
              </p>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-200" href="/gst-invoice-generator">
                Create GST invoice <ArrowRight className="h-4 w-4" />
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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}
