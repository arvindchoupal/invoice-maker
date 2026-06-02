import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { PurchaseOrderGeneratorClient } from "./PurchaseOrderGeneratorClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["What is a purchase order generator?", "A purchase order generator is an online tool that helps businesses create purchase orders with buyer details, supplier details, item rows, taxes, totals, notes and PDF-ready formatting."],
  ["Can I create a purchase order online?", "Yes. You can use InvoiceWala's purchase order generator to enter buyer, supplier and item details, then download a professional purchase order PDF through your browser."],
  ["What is a purchase order template?", "A purchase order template is a reusable format for creating purchase orders with PO number, dates, buyer details, supplier details, item descriptions, quantities, prices, taxes and totals."],
  ["Can I download a purchase order PDF?", "Yes. This public tool lets you create a purchase order and download it through your browser's PDF print flow without saving records to the database."],
  ["What should a purchase order format include?", "A purchase order format should include PO number, issue date, supplier details, buyer details, item details, quantity, unit price, tax, total, delivery terms, notes and terms."],
  ["What is a purchase order example?", "A purchase order example may show PO-2026-001, buyer ABC Technologies, supplier XYZ Office Supplies, 10 office chairs, subtotal ₹50,000, GST ₹9,000 and total ₹59,000."],
  ["What is a PO generator?", "A PO generator is another name for a purchase order generator or purchase order maker."],
  ["What is a purchase order number?", "A purchase order number is a unique reference used to track a purchase request, supplier order, delivery and later invoice matching."],
  ["Can I use a purchase order template Excel file?", "Yes, but a purchase order template Excel file can have formula, version and formatting issues when shared or converted to PDF."],
  ["What is purchase order format in Excel?", "Purchase order format in Excel is a spreadsheet layout for PO details, item rows, quantities, rates, tax and totals."],
  ["Can I use a purchase order template Word file?", "Yes, but Word templates are better for simple one-time POs and can be harder to calculate accurately."],
  ["What is purchase order format in Word?", "Purchase order format in Word is a document layout for PO details, supplier details, buyer details, item descriptions and terms."],
  ["What is purchase order vs invoice?", "A purchase order is issued by the buyer before purchase approval. An invoice is issued by the seller after supply or delivery to request payment."],
  ["What is purchase order vs quotation?", "A quotation is a supplier's price offer. A purchase order is the buyer's confirmation to buy based on accepted price, quantity and terms."],
  ["What is purchase order vs bill?", "A purchase order confirms intent to buy. A bill records what is payable after goods or services are supplied."],
  ["Can purchase orders include GST?", "Yes. Purchase orders can show supplier GSTIN, buyer GSTIN, taxable value, GST rate, CGST/SGST or IGST and grand total."],
  ["Who uses purchase orders?", "Contractors, manufacturers, retailers, agencies, service companies and small businesses use purchase orders to manage supplier purchases."],
  ["Is a purchase order legally binding?", "A purchase order can become a binding commercial document when accepted under agreed terms. Exact legal impact depends on contract terms and business context."],
  ["Can I create repeat purchase orders?", "Yes. A structured online purchase order creator helps repeat supplier orders by keeping the format consistent."],
  ["Is InvoiceWala a purchase order maker?", "InvoiceWala now provides a purchase order generator page for creating PDF-ready purchase order drafts and related business documents."],
  ["Can I convert a quotation into a purchase order?", "In a normal workflow, a supplier quotation is reviewed first. If accepted, the buyer creates a purchase order with confirmed items, quantities and terms."],
  ["Can I match a purchase order with an invoice?", "Yes. Businesses often match purchase order number, supplier invoice, quantities and delivery details before releasing payment."],
];

export const metadata: Metadata = {
  title: "Purchase Order Generator | Create PO Documents Online",
  description:
    "Create professional purchase orders online with supplier details, item rows, GST fields, purchase order templates and PDF-ready formatting.",
  alternates: { canonical: "/purchase-order-generator" },
  openGraph: {
    title: "Purchase Order Generator | InvoiceWala",
    description:
      "Create professional purchase orders online with supplier details, GST fields, item rows and PDF-ready formatting.",
    url: `${siteUrl}/purchase-order-generator`,
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
    name: "InvoiceWala Purchase Order Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/purchase-order-generator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Purchase Order Generator", item: `${siteUrl}/purchase-order-generator` },
    ],
  };
}

function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a purchase order online",
    step: [
      { "@type": "HowToStep", name: "Enter purchase order number and dates" },
      { "@type": "HowToStep", name: "Add buyer and supplier details" },
      { "@type": "HowToStep", name: "Add item rows with quantity, price and tax" },
      { "@type": "HowToStep", name: "Review subtotal, GST and grand total" },
      { "@type": "HowToStep", name: "Download the purchase order as a PDF" },
    ],
  };
}

const features = [
  "Purchase Order Numbering",
  "Supplier Management",
  "Buyer Information",
  "Item Rows",
  "GST Support",
  "Discount Support",
  "Professional PDF Templates",
  "Saved Purchase Orders",
  "Repeat Orders",
  "Download PDF",
];

const benefits = [
  ["Professional Purchase Orders", "Create purchase orders that look organized and are easier for suppliers to process."],
  ["GST Ready Documentation", "Add supplier GSTIN, buyer GSTIN, tax percentage and GST totals when your workflow needs them."],
  ["Reduce Purchasing Errors", "Structured rows for quantity, unit price and tax reduce confusion before supplier billing."],
  ["Improve Supplier Communication", "Send clear order details instead of loose email or WhatsApp messages."],
  ["Faster Procurement Workflow", "Move from quotation to purchase order to delivery and invoice with cleaner records."],
  ["PDF Export", "Create a PDF-ready purchase order for supplier sharing without saving records to the database."],
];

const relatedTools = [
  ["/quotation-maker", "Quotation Maker"],
  ["/gst-invoice-generator", "GST Invoice Maker"],
  ["/tools/invoice-number-generator", "Invoice Number Generator"],
  ["/invoice-template-india", "Invoice Template India"],
  ["/blog/tax-invoice-format-rules-examples", "Tax Invoice Guide"],
  ["/blog/estimate-vs-invoice", "Estimate vs Invoice"],
];

export default function PurchaseOrderGeneratorPage() {
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">purchase order generator</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Purchase Order Generator</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Create professional purchase orders online with supplier details, item rows, quantities, pricing, GST fields and PDF-ready formatting.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="#purchase-order-tool">
                Create Purchase Order
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="#purchase-order-tool">
                Download PDF
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Free Public Tool", "PDF Download", "GST Support", "Professional Templates"].map((badge) => (
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300" key={badge}>✓ {badge}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/30">
            <div className="rounded-3xl bg-white p-6 text-slate-950">
              <div className="flex items-start justify-between">
                <div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xl font-bold">ABC Technologies</p>
                  <p className="text-xs text-slate-500">buyer@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-700">PURCHASE ORDER</p>
                  <p className="text-xs text-slate-500">PO-2026-001</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Supplier</p>
                <p className="mt-2 font-semibold">XYZ Office Supplies</p>
                <p className="text-xs text-slate-500">Expected delivery: 12 June 2026</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_60px_90px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Item</span><span>Qty</span><span className="text-right">Amount</span>
                </div>
                <div className="grid grid-cols-[1fr_60px_90px] px-3 py-3">
                  <span>Office Chairs</span><span>10</span><span className="text-right">₹50,000</span>
                </div>
              </div>
              <div className="ml-auto mt-5 max-w-xs space-y-1 border-t border-slate-200 pt-3 text-right">
                <p className="text-sm text-slate-500">GST ₹9,000</p>
                <p className="text-2xl font-bold">₹59,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PurchaseOrderGeneratorClient />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Everything Needed To Create Purchase Orders Faster</h2>
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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Benefits</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Why Use a Purchase Order Generator?</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([title, body]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title}>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Purchase Order Format</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            A purchase order format should make supplier communication clear before delivery and invoicing. Every PO template should include order identity, buyer and supplier details, items, taxes, totals and delivery terms.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-4">Field</th><th className="p-4">What it means</th></tr>
              </thead>
              <tbody>
                {[
                  ["PO Number", "Unique purchase order reference such as PO-2026-001"],
                  ["Issue Date", "Date when the purchase order is issued"],
                  ["Supplier Details", "Supplier name, address, email, phone and GSTIN"],
                  ["Buyer Details", "Buyer business name, address, email, phone and GSTIN"],
                  ["Item Details", "Products or services being ordered"],
                  ["Quantity", "Number of units requested"],
                  ["Price", "Unit price before tax"],
                  ["Tax", "GST or tax percentage where applicable"],
                  ["Total", "Subtotal, discount, GST and grand total"],
                  ["Delivery Terms", "Expected delivery date, address and special conditions"],
                ].map(([field, body]) => (
                  <tr className="border-t border-white/10" key={field}>
                    <td className="p-4 font-semibold text-white">{field}</td>
                    <td className="p-4 text-slate-300">{body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Purchase Order Example</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            A realistic purchase order example helps buyers and suppliers understand how a PO document should look before final delivery and supplier invoicing.
          </p>
          <div className="mt-6 rounded-2xl bg-slate-950/70 p-5 text-sm">
            <p><strong>PO Number:</strong> PO-2026-001</p>
            <p className="mt-2"><strong>Buyer:</strong> ABC Technologies</p>
            <p className="mt-2"><strong>Supplier:</strong> XYZ Office Supplies</p>
            <p className="mt-2"><strong>Items:</strong> Office Chairs × 10</p>
            <p className="mt-2"><strong>Subtotal:</strong> ₹50,000</p>
            <p className="mt-2"><strong>GST:</strong> ₹9,000</p>
            <p className="mt-2 text-xl font-semibold text-cyan-300"><strong>Total:</strong> ₹59,000</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Business Workflow</h2>
          <div className="mt-6 space-y-3">
            {[
              ["Quotation", "Supplier shares pricing and terms."],
              ["Purchase Order", "Buyer confirms quantity, price and delivery requirements."],
              ["Delivery", "Supplier delivers goods or services."],
              ["Invoice", "Supplier sends invoice against the purchase order."],
              ["Payment", "Buyer verifies PO, delivery and invoice before payment."],
            ].map(([stage, body], index) => (
              <div className="rounded-2xl bg-slate-950/70 p-4" key={stage}>
                <p className="text-sm font-semibold text-cyan-300">{index + 1}. {stage}</p>
                <p className="mt-1 text-sm text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Purchase Order Template Options</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Businesses often search for purchase order template PDF, purchase order template Excel and purchase order template Word formats. Each format works, but an online purchase order generator is usually faster for repeat use.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-4">Template</th><th className="p-4">Pros</th><th className="p-4">Cons</th></tr>
              </thead>
              <tbody>
                {[
                  ["Purchase Order Template PDF", "Looks professional, stable layout, easy to share", "Harder to edit after creation"],
                  ["Purchase Order Template Excel", "Good for item rows and formulas", "Formula errors and version issues can happen"],
                  ["Purchase Order Format in Excel", "Useful for internal procurement teams", "Formatting can break when exported"],
                  ["Purchase Order Template Word", "Easy to edit text and terms", "Manual calculations and layout issues"],
                  ["Purchase Order Format in Word", "Simple for one-time orders", "Not ideal for repeated supplier orders"],
                  ["Online Purchase Order Generator", "Structured fields, instant totals, PDF-ready", "Requires internet access"],
                ].map((row) => (
                  <tr className="border-t border-white/10" key={row[0]}>
                    {row.map((cell, index) => <td className={`p-4 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Comparisons</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Purchase Order vs Invoice, Quotation and Bill</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {[
            ["Purchase Order vs Invoice", [["Purchase Order", "Buyer sends before purchase"], ["Invoice", "Supplier sends after supply to request payment"]]],
            ["Purchase Order vs Quotation", [["Quotation", "Supplier offers price"], ["Purchase Order", "Buyer confirms order"]]],
            ["Purchase Order vs Bill", [["Purchase Order", "Intent to buy"], ["Bill", "Amount payable after supply"]]],
          ].map(([title, rows]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title as string}>
              <h3 className="text-xl font-semibold">{title as string}</h3>
              <div className="mt-5 space-y-3">
                {(rows as string[][]).map(([label, body]) => (
                  <div className="rounded-2xl bg-slate-950/70 p-4" key={label}>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="mt-1 text-sm text-slate-400">{body}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Use Cases</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "For Contractors",
              "For Manufacturers",
              "For Retailers",
              "For Agencies",
              "For Small Businesses",
              "For Service Companies",
            ].map((item) => (
              <div className="rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={item}>{item}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">GST Ready Purchase Orders</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            A GST-ready purchase order can include supplier GSTIN, buyer GSTIN, tax calculation, CGST, SGST, IGST, taxable value and grand total. Purchase orders are not the same as tax invoices, but clean GST fields help suppliers prepare accurate invoices later.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Common Purchase Order Mistakes</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {["Missing PO Number", "Wrong Supplier Information", "Missing Tax Details", "Wrong Quantities", "No Approval Process"].map((mistake) => (
              <div className="rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={mistake}>{mistake}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Related tools</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Connect purchase orders with your billing workflow</h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Purchase orders sit between quotations and supplier invoices. These InvoiceWala pages help with related document formats, invoice numbers, GST invoices and tax invoice learning.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {relatedTools.map(([href, label]) => (
            <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-100" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Purchase Order Generator FAQs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map(([question, answer]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Create professional purchase orders online</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Use InvoiceWala&apos;s purchase order generator to create PDF-ready documents, organize supplier details and keep procurement communication clear.
          </p>
          <a className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="#purchase-order-tool">
            Create Purchase Order
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <p>InvoiceWala · invoicewala.shop</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
