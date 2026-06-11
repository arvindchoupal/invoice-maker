import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ReceiptText } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReceiptGeneratorClient } from "./ReceiptGeneratorClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["What is a receipt generator?", "A receipt generator is an online tool that creates payment receipts with receipt number, date, business details, customer details, payment mode, amount received and PDF download."],
  ["Can I create a receipt online for free?", "Yes. InvoiceWala's public receipt generator lets you create a receipt and download a PDF through your browser without saving records to the database."],
  ["What should a receipt include?", "A receipt should include receipt number, date, business details, customer details, payment mode, payment reference, description, amount received and notes."],
  ["Is a receipt the same as an invoice?", "No. An invoice requests payment. A receipt confirms that payment has been received."],
  ["Can I download a receipt PDF?", "Yes. You can fill the receipt details and download a PDF receipt directly from the tool."],
  ["Can I create a GST receipt?", "You can add GSTIN and tax fields when needed, but GST businesses should confirm exact receipt and invoice requirements with their accountant."],
  ["Who can use a receipt maker?", "Freelancers, contractors, consultants, shops, service businesses, agencies and local repair businesses can use a receipt maker after receiving payment."],
  ["Can I send receipts on WhatsApp?", "Yes. After downloading the PDF receipt, you can share it on WhatsApp, email or any customer communication channel."],
  ["Do receipts need receipt numbers?", "A receipt number is strongly recommended because it makes payment records easier to track."],
  ["Does this tool save receipts to my account?", "This public tool does not save records to the database. It is built for quick PDF receipt creation and download."],
];

export const metadata: Metadata = {
  title: "Receipt Generator | Create Payment Receipts Online",
  description:
    "Create payment receipts online with receipt number, customer details, payment mode, GST fields and PDF download. Free receipt maker for Indian businesses.",
  alternates: { canonical: "/receipt-generator" },
  openGraph: {
    title: "Receipt Generator | InvoiceWala",
    description:
      "Create payment receipts online with customer details, payment mode, amount received and PDF download.",
    url: `${siteUrl}/receipt-generator`,
    siteName: "InvoiceWala",
  },
};

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function softwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "InvoiceWala Receipt Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/receipt-generator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Receipt Generator", item: `${siteUrl}/receipt-generator` },
    ],
  };
}

function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a receipt online",
    step: [
      { "@type": "HowToStep", name: "Enter receipt number, date and payment mode" },
      { "@type": "HowToStep", name: "Add business and customer details" },
      { "@type": "HowToStep", name: "Add payment items, tax and amount received" },
      { "@type": "HowToStep", name: "Review the live receipt preview" },
      { "@type": "HowToStep", name: "Download the receipt as a PDF" },
    ],
  };
}

const features = [
  "Receipt Number",
  "Business Details",
  "Customer Details",
  "Payment Mode",
  "UPI Reference",
  "GSTIN Support",
  "Item Rows",
  "Tax Calculation",
  "Live Preview",
  "PDF Download",
];

const relatedTools = [
  ["/free-invoice-generator", "Free Invoice Generator"],
  ["/gst-invoice-generator", "GST Invoice Maker"],
  ["/quotation-maker", "Quotation Maker"],
  ["/purchase-order-generator", "Purchase Order Generator"],
  ["/tools/invoice-number-generator", "Invoice Number Generator"],
  ["/tools/gst-calculator", "GST Calculator"],
];

export default function ReceiptGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={[faqSchema(), softwareSchema(), breadcrumbSchema(), howToSchema()]} />
      <section className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6">
        <nav className="flex items-center justify-between">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>

        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">receipt generator</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Receipt Generator</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Create professional payment receipts online with receipt number, customer details, payment mode, GST fields and PDF-ready formatting.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="#receipt-tool">
                Create Receipt
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="#receipt-tool">
                Download PDF
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Free Public Tool", "PDF Download", "UPI/Cash/Bank", "Mobile Friendly"].map((badge) => (
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300" key={badge}>✓ {badge}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/30">
            <div className="rounded-3xl bg-white p-6 text-slate-950">
              <div className="flex items-start justify-between">
                <div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <ReceiptText className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xl font-bold">Your Business</p>
                  <p className="text-xs text-slate-500">business@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-700">RECEIPT</p>
                  <p className="text-xs text-slate-500">RCPT-2026-001</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Received from</p>
                <p className="mt-2 font-semibold">Customer Name</p>
                <p className="text-xs text-slate-500">Payment mode: UPI</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_90px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Description</span><span className="text-right">Amount</span>
                </div>
                <div className="grid grid-cols-[1fr_90px] px-3 py-3">
                  <span>Service payment</span><span className="text-right">₹2,500</span>
                </div>
              </div>
              <div className="ml-auto mt-5 max-w-xs space-y-1 border-t border-slate-200 pt-3 text-right">
                <p className="text-sm text-slate-500">Amount received</p>
                <p className="text-2xl font-bold">₹2,500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReceiptGeneratorClient />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Everything Needed To Create Receipts Faster</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => (
              <div className="flex gap-3 rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={feature}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Receipt format</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">What Should a Payment Receipt Include?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              A receipt confirms that money has been received. It should be simple, clear and easy for the customer to store. Indian freelancers, contractors, consultants, local shops and service businesses can use receipts for UPI, cash, bank transfer, card and cheque payments.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Purpose</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300">
                {[
                  ["Receipt Number", "Unique payment reference"],
                  ["Receipt Date", "Date payment was received"],
                  ["Business Details", "Who received the payment"],
                  ["Customer Details", "Who made the payment"],
                  ["Payment Mode", "UPI, cash, bank transfer, card or cheque"],
                  ["Amount Received", "Final amount paid by customer"],
                  ["Notes", "Thank you note, reference or payment context"],
                ].map(([field, purpose]) => (
                  <tr key={field}><td className="px-4 py-3 font-semibold text-white">{field}</td><td className="px-4 py-3">{purpose}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-3">
        {[
          ["Receipt vs Invoice", "An invoice asks for payment before money is received. A receipt confirms payment after money is received."],
          ["Receipt PDF", "PDF receipts are easy to send on WhatsApp, email or print for customer records."],
          ["GST Receipts", "GST businesses should keep invoices and receipts organized so payment proof and tax records stay clear."],
        ].map(([title, body]) => (
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Related InvoiceWala Tools</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map(([href, label]) => (
              <Link className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/50" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Receipt Generator FAQs</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/[0.04]">
          {faqs.map(([question, answer]) => (
            <details className="group p-5" key={question}>
              <summary className="cursor-pointer list-none text-base font-semibold text-white">{question}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300 p-6 text-slate-950 sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">Create a receipt in minutes</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-800">
            Use InvoiceWala to create a clean payment receipt, download the PDF and send it to your customer after payment is received.
          </p>
          <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white" href="#receipt-tool">
            Start receipt
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · invoicewala.shop</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
