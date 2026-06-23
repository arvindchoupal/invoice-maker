import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2 } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { PurchaseOrderGeneratorClient } from "@/app/purchase-order-generator/PurchaseOrderGeneratorClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["What is a quotation generator?", "A quotation generator creates professional price quotes with business details, customer details, item rows, GST, discount, validity and terms."],
  ["Can I create a quotation online for free?", "Yes. InvoiceWala lets you create a quotation, review the live preview and download a PDF without saving it to a database."],
  ["What should an Indian quotation include?", "Include quotation number, date, validity, seller and customer details, item description, quantity, rate, tax, discount, total and terms."],
  ["Is a quotation the same as an invoice?", "No. A quotation shares proposed prices before approval. An invoice requests payment after goods or services are supplied."],
  ["Can I add GST to a quotation?", "Yes. Add GSTIN and tax rates when your proposed pricing needs a GST breakdown."],
  ["Can I download the quotation as PDF?", "Yes. The generated quotation can be downloaded as a clean PDF and shared by WhatsApp or email."],
  ["Who can use this quotation maker?", "Freelancers, contractors, agencies, consultants, repair businesses, traders and small Indian businesses can use it."],
  ["Does a quotation need a validity date?", "A validity date is recommended because prices, availability and project timelines can change."],
];

export const metadata: Metadata = {
  title: "Quotation Generator Online Free | GST Quote PDF India",
  description:
    "Free quotation generator for Indian businesses. Create GST quotations with customer details, item rows, discount, validity, terms and instant PDF download.",
  keywords: [
    "quotation generator",
    "quotation maker",
    "quotation generator online",
    "free quotation generator",
    "GST quotation format",
    "quotation PDF",
    "quote maker India",
    "estimate generator",
  ],
  alternates: { canonical: "/quotation-maker" },
  openGraph: {
    title: "Free Quotation Generator Online | InvoiceWala",
    description: "Create professional GST quotations and download PDF quotes for customers.",
    url: `${siteUrl}/quotation-maker`,
    siteName: "InvoiceWala",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "InvoiceWala Quotation Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/quotation-maker`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "Quotation Generator", item: `${siteUrl}/quotation-maker` },
    ],
  },
];

const features = [
  "Quotation number",
  "Customer details",
  "GSTIN fields",
  "Multiple item rows",
  "Discount calculation",
  "GST calculation",
  "Validity date",
  "Terms and notes",
  "Live preview",
  "PDF download",
];

export default function QuotationMakerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={schemas} />
      <section className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6">
        <nav className="flex items-center justify-between">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>
        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_430px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free quotation generator India</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Quotation Generator Online</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Create a professional GST quotation with customer details, item pricing, discount, validity and terms—then download a clean PDF.
            </p>
            <a className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" href="#quotation-tool">
              Create Free Quotation <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No signup", "GST ready", "Mobile friendly", "Instant PDF"].map((badge) => (
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300" key={badge}>✓ {badge}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
            <FileCheck2 className="h-10 w-10 text-cyan-300" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-slate-400">Quotation QT-2026-001</p>
            <h2 className="mt-2 text-2xl font-semibold">₹59,000 customer quote</h2>
            <div className="mt-5 space-y-3">
              {["Add products or services", "Calculate discount and GST", "Set quote validity", "Download and share PDF"].map((item) => (
                <div className="flex items-center gap-3 text-sm text-slate-300" key={item}>
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PurchaseOrderGeneratorClient documentType="quotation" />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Quotation maker features</p>
          <h2 className="mt-3 text-3xl font-semibold">Everything needed before the customer says yes</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => (
              <div className="flex gap-3 rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={feature}>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" /> {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Quotation format India</p>
            <h2 className="mt-3 text-3xl font-semibold">Create clear quotes, not confusing spreadsheets</h2>
            <p className="mt-4 leading-7 text-slate-400">
              A good quotation makes scope, quantity, price, tax and validity easy to understand. Use separate quotation numbers such as QT-2026-001, explain your terms and convert the approved quote into an invoice later.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Quotation vs invoice</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              A quotation is a proposed commercial offer sent before approval. An invoice is issued after supply or according to the agreed billing milestone. Keeping both documents separate improves customer communication and records.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950" href="/free-invoice">Create invoice</Link>
              <Link className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold" href="/purchase-order-generator">Purchase order generator</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <h2 className="text-3xl font-semibold">Quotation Generator FAQs</h2>
        <div className="mt-6 space-y-3">
          {faqs.map(([question, answer]) => (
            <details className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}>
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <PublicFooterLinks />
    </main>
  );
}
