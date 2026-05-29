import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "GST Bill Format India | Sample GST Invoice",
  description:
    "Learn GST bill format in India with mandatory fields, sample table, GST invoice rules, mistakes, FAQs and free invoice format links.",
  alternates: { canonical: `${siteUrl}/blog/gst-bill-format` },
  openGraph: {
    title: "GST Bill Format India | Sample GST Invoice",
    description:
      "Complete GST bill format guide for Indian businesses, freelancers, contractors and small business owners.",
    url: `${siteUrl}/blog/gst-bill-format`,
    siteName: "InvoiceWala",
  },
};

const faqs: Array<[string, string]> = [
  ["What is a GST bill format?", "A GST bill format is the structure used to create a GST-compliant bill or invoice with supplier details, buyer details, GSTIN, invoice number, item details, taxable value, GST rate and total amount."],
  ["Is GST bill format and GST invoice format the same?", "In common business language, people often use both terms for the same document. Under GST, the correct term for taxable supply is usually tax invoice."],
  ["What details are mandatory in a GST bill?", "A GST bill should include supplier name, address, GSTIN, invoice number, date, buyer details, item description, HSN or SAC, taxable value, GST rate, tax amount and total value."],
  ["Can freelancers create GST bills?", "Yes. GST-registered freelancers can create GST invoices for taxable services when GST rules apply to their business."],
  ["Do I need GSTIN on every GST bill?", "Yes. A GST bill or tax invoice should include the supplier GSTIN. For B2B invoices, buyer GSTIN is also important when the buyer wants input tax credit."],
  ["What is HSN code in GST bill format?", "HSN code is a classification code for goods. SAC code is commonly used for services. These codes help identify the nature of supply under GST."],
  ["What is CGST and SGST in a GST invoice?", "CGST and SGST are generally used for intra-state supplies where seller and buyer are in the same state."],
  ["What is IGST in a GST invoice?", "IGST is generally used for inter-state supplies where seller and buyer are in different states."],
  ["Can I download a GST bill sample?", "You can use InvoiceWala's GST invoice generator or invoice template pages to create and download a GST-ready invoice PDF."],
  ["Is invoice number mandatory in GST bill format?", "Yes. A unique invoice number is an important part of GST invoice format and business record keeping."],
  ["Can invoice numbers repeat?", "Invoice numbers should not repeat within the same financial-year series. Use a consistent sequence to avoid confusion."],
  ["What is taxable value in a GST bill?", "Taxable value is the amount on which GST is calculated, usually after applicable discounts and before GST is added."],
  ["Should discount appear before GST?", "In many cases, discount is reduced before calculating taxable value when it is clearly shown on the invoice. Confirm exact treatment with your accountant."],
  ["Is signature required on a GST invoice?", "Many businesses include authorized signatory or digital signature for professionalism and records. Requirements can depend on invoice type and process."],
  ["Can a GST bill be made in PDF?", "Yes. PDF is commonly used because it keeps the GST bill layout consistent when shared by email, WhatsApp or client portals."],
  ["What is a tax invoice format?", "Tax invoice format is the structured invoice layout used for taxable supplies under GST, including tax breakup and mandatory invoice details."],
  ["What is the difference between bill of supply and tax invoice?", "A tax invoice is used for taxable supplies. A bill of supply is used in cases such as exempt supplies or composition schemes, depending on GST rules."],
  ["Can small shops use GST bill format?", "Yes. GST-registered shops can use GST bill format for product sales, service charges and B2B customer billing."],
  ["Can contractors use GST invoice format?", "Yes. Contractors can use GST invoice format for labor, materials, milestones and service billing when GST applies."],
  ["Which tool can create GST bills online?", "InvoiceWala can help create GST-ready invoices, invoice numbers, quotations and PDF invoice formats for Indian businesses."],
];

const mandatoryFields = [
  "Supplier legal name, address and GSTIN",
  "Unique invoice number and invoice date",
  "Customer name, billing address and GSTIN for B2B",
  "Place of supply when relevant",
  "Description of goods or services",
  "HSN code for goods or SAC code for services",
  "Quantity, unit, rate and taxable value",
  "Discount shown clearly if applied",
  "GST rate and tax amount",
  "CGST/SGST or IGST breakup",
  "Total invoice value",
  "Payment terms, notes and authorized signatory",
];

const sampleRows = [
  ["Website design service", "998314", "1", "25,000", "0", "25,000", "18%", "4,500", "29,500"],
  ["Hosting setup", "998315", "1", "5,000", "500", "4,500", "18%", "810", "5,310"],
  ["Maintenance retainer", "998313", "1", "10,000", "0", "10,000", "18%", "1,800", "11,800"],
];

const internalLinks = [
  { href: "/gst-invoice-generator", label: "GST Invoice Generator", body: "Create a GST-ready invoice and download a professional PDF." },
  { href: "/invoice-template-india", label: "Invoice Format", body: "See a practical invoice format for Indian businesses." },
  { href: "/tax-invoice-format", label: "Tax Invoice Format", body: "Understand tax invoice fields and structure." },
  { href: "/quotation-maker", label: "Quotation Format", body: "Prepare a quotation before creating an invoice." },
  { href: "/tools/invoice-number-generator", label: "Invoice Number Generator", body: "Create clean invoice number series for GST billing." },
];

function articleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GST Bill Format in India: Sample GST Invoice Format and Rules",
    description:
      "A complete GST bill format guide for Indian businesses, freelancers, contractors, consultants and small business owners.",
    author: { "@type": "Organization", name: "InvoiceWala" },
    publisher: {
      "@type": "Organization",
      name: "InvoiceWala",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: `${siteUrl}/blog/gst-bill-format`,
    datePublished: "2026-05-29",
    dateModified: "2026-05-29",
    inLanguage: "en-IN",
  };
}

export default function GstBillFormatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Blog", url: `${siteUrl}/blog` },
            { name: "GST Bill Format", url: `${siteUrl}/blog/gst-bill-format` },
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">GST bill format</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              GST Bill Format in India
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Learn the GST bill format used by Indian businesses, freelancers, contractors, consultants and small business owners. See mandatory fields, sample table, GST invoice rules, common mistakes and links to create a GST-ready PDF invoice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="/gst-invoice-generator">
                Create GST invoice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/tools/gst-calculator">
                Open GST calculator
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30">
            <div className="rounded-2xl bg-white p-5 text-slate-950">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-600" />
                  <p className="mt-4 text-xl font-bold">Your Business</p>
                  <p className="text-xs text-slate-500">GSTIN: 29ABCDE1234F1Z5</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">TAX INVOICE</p>
                  <p className="text-xs text-slate-500">INV-0001</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                <p className="mt-2 font-semibold">Customer Name</p>
                <p className="text-xs text-slate-500">GSTIN: 27ABCDE1234F1Z8</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_80px_100px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Item</span><span>GST</span><span className="text-right">Total</span>
                </div>
                <div className="grid grid-cols-[1fr_80px_100px] px-3 py-3">
                  <span>Service invoice</span><span>18%</span><span className="text-right">Rs. 29,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-8">
            <Section title="Introduction">
              <p>
                A GST bill format is the structure Indian businesses use to create a GST-compliant invoice or bill for taxable goods and services. If you are a freelancer, contractor, consultant, agency owner, shopkeeper, manufacturer or small business owner, understanding GST bill format helps you prepare clearer invoices, avoid missing important fields and communicate professionally with customers.
              </p>
              <p>
                In day-to-day business, many people search for gst bill format, gst invoice format, tax invoice format, gst bill sample, gst invoice sample, gst bill example, gst bill template and gst invoice template. These searches usually mean the same practical need: the user wants to know what details must be shown on a GST bill and how the document should look before it is sent to a customer.
              </p>
              <p>
                A good GST bill is more than a payment request. It is a business record that shows who sold the product or service, who bought it, what was supplied, what tax rate was applied and what final amount is payable. For B2B customers, a correct GST invoice can also help with input tax credit records. For freelancers and service businesses, a professional GST invoice builds trust and reduces payment confusion.
              </p>
              <p>
                This guide explains GST bill format in simple English for India users. You will learn what a GST bill is, mandatory GST invoice fields, a GST bill format example, a sample GST bill table, difference between GST invoice and tax invoice, GST bill rules in India, common billing mistakes and how to create a downloadable sample format using InvoiceWala. This is educational content, not legal or tax advice. For filing, classification and exact compliance questions, confirm with your CA or tax advisor.
              </p>
            </Section>

            <Section title="What is a GST Bill?">
              <p>
                A GST bill is a document issued by a registered supplier when selling taxable goods or services. Under GST, the commonly used legal term is tax invoice for taxable supplies. In everyday Indian business language, people often say GST bill, GST invoice, GST tax invoice or GST bill format. The purpose is to record the supply and show GST details clearly.
              </p>
              <p>
                A GST bill generally includes supplier details, customer details, invoice number, invoice date, product or service description, HSN or SAC code, taxable value, GST rate, CGST, SGST or IGST amount and total invoice value. It can also include notes, payment terms, bank details, UPI details, digital signature and company logo.
              </p>
              <p>
                For example, if a consultant charges Rs. 25,000 plus 18% GST, the GST bill should show taxable value Rs. 25,000, GST amount Rs. 4,500 and final total Rs. 29,500. If the customer is in the same state, GST may be split into CGST and SGST. If the customer is in another state, IGST may apply. These tax split details depend on the transaction and GST rules.
              </p>
            </Section>

            <Section title="Mandatory Fields in a GST Bill">
              <p>
                The exact fields can vary by business type, supply type and GST requirements, but a practical GST invoice format should include these important details. Missing fields can create confusion for customers, accountants and internal records.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mandatoryFields.map((field) => (
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300" key={field}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{field}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="GST Bill Format Example">
              <p>
                A simple GST bill format example starts with your business identity at the top: legal business name, address, GSTIN, phone, email and logo. On the right side, show the document title such as Tax Invoice, invoice number, invoice date and due date. Below that, show customer details including customer name, address, GSTIN if available and place of supply.
              </p>
              <p>
                The item table should include serial number, item or service description, HSN/SAC, quantity, rate, discount, taxable value, GST rate, tax amount and line total. At the bottom, show subtotal, taxable value, CGST, SGST or IGST, round off if any and grand total. Add payment terms, bank details, notes and authorized signatory.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/80 p-5">
                <p className="font-semibold text-white">Example summary</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <p>Supplier: ABC Services Pvt Ltd</p>
                  <p>GSTIN: 29ABCDE1234F1Z5</p>
                  <p>Invoice No: INV-2026-001</p>
                  <p>Invoice Date: 29 May 2026</p>
                  <p>Customer: XYZ Traders</p>
                  <p>Place of Supply: Karnataka</p>
                  <p>Taxable Value: Rs. 39,500</p>
                  <p>Total GST: Rs. 7,110</p>
                </div>
              </div>
            </Section>

            <Section title="GST Bill Sample Table">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      {["Description", "SAC/HSN", "Qty", "Rate", "Discount", "Taxable", "GST", "Tax", "Total"].map((head) => (
                        <th className="p-3" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((row) => (
                      <tr className="border-t border-white/10" key={row[0]}>
                        {row.map((cell) => (
                          <td className="p-3 text-slate-300" key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                This GST bill sample table is simplified for understanding. A real GST invoice may include unit, place of supply, reverse charge, shipping details, amount in words and other fields based on your business workflow.
              </p>
            </Section>

            <Section title="GST Invoice vs Tax Invoice">
              <p>
                In many Indian businesses, GST invoice and tax invoice are used interchangeably. Strictly speaking, tax invoice is the term used for invoices issued for taxable supplies under GST. GST invoice is a common phrase people use when they mean a tax invoice that includes GST details.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <InfoCard title="GST Invoice">
                  A common business phrase for an invoice containing GSTIN, tax rate, taxable value and GST breakup.
                </InfoCard>
                <InfoCard title="Tax Invoice">
                  The formal invoice type for taxable supplies under GST, usually required for registered taxable transactions.
                </InfoCard>
              </div>
              <p className="mt-4">
                There is also a bill of supply, which is different from a tax invoice. It is used in specific situations such as exempt supplies or composition scheme cases. If your business is registered under a special category, confirm the right document type with your accountant.
              </p>
            </Section>

            <Section title="GST Bill Rules in India">
              <p>
                GST bill rules in India focus on accurate supplier details, buyer details, invoice numbering, tax classification and tax breakup. A GST invoice should have a unique number, be issued within applicable timelines, show correct GSTIN details and clearly mention taxable value and GST amount. It should also identify whether CGST/SGST or IGST applies.
              </p>
              <p>
                GST rates depend on the goods or services supplied. HSN/SAC classification matters because it helps identify the supply and applicable tax rate. Place of supply is also important, especially when deciding between intra-state and inter-state taxation. For intra-state supplies, CGST and SGST are generally shown. For inter-state supplies, IGST is generally shown.
              </p>
              <p>
                Businesses should maintain consistent invoice numbering. For example, use INV-2026-001, INV-2026-002 and so on. Avoid duplicate invoice numbers, random formats and gaps that are hard to explain. Digital tools like InvoiceWala can help keep invoice numbers cleaner and reduce manual formatting issues.
              </p>
            </Section>

            <Section title="Common GST Billing Mistakes">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Wrong GSTIN", "Entering an incorrect supplier or customer GSTIN can create record and credit issues."],
                  ["Missing HSN/SAC", "Not adding HSN or SAC codes can make product or service classification unclear."],
                  ["Wrong tax split", "Using CGST/SGST instead of IGST, or the reverse, can create tax reporting confusion."],
                  ["Duplicate invoice number", "Repeating invoice numbers makes records harder to audit and track."],
                  ["Unclear discounts", "Discounts should be shown clearly so taxable value and final total are easy to verify."],
                  ["No payment terms", "Missing due date and terms can delay payment follow-up."],
                  ["Manual calculation errors", "Spreadsheet or handwritten calculations can lead to incorrect tax or total values."],
                  ["Poor PDF formatting", "Broken layouts make invoices look less professional and harder to read."],
                ].map(([title, body]) => (
                  <InfoCard key={title} title={title}>{body}</InfoCard>
                ))}
              </div>
            </Section>

            <Section title="Downloadable Sample Format Section">
              <p>
                If you want a downloadable GST bill sample, the easiest workflow is to create the invoice online and download it as a PDF. With InvoiceWala, you can add business details, customer details, GST/VAT information, line items, discount, tax, notes and terms, then choose a professional invoice template.
              </p>
              <p>
                This is better than manually editing a GST bill template in Word or Excel because the totals update automatically and the final PDF keeps a clean layout. You can also use related tools like GST calculator, invoice number generator and quotation maker before preparing the final invoice.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {internalLinks.map((link) => (
                  <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-cyan-300/40 hover:bg-slate-900" href={link.href} key={link.href}>
                    <h3 className="font-semibold text-white">{link.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{link.body}</p>
                  </Link>
                ))}
              </div>
            </Section>

            <Section title="GST Bill Format FAQs">
              <div className="grid gap-4 md:grid-cols-2">
                {faqs.map(([question, answer]) => (
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5" key={question}>
                    <h3 className="font-semibold text-white">{question}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">On this page</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-300">
                {["What is a GST bill?", "Mandatory fields", "Sample table", "GST invoice vs tax invoice", "Rules and mistakes", "FAQs"].map((item) => (
                  <span className="rounded-xl bg-slate-950/70 px-3 py-2" key={item}>{item}</span>
                ))}
              </div>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/gst-invoice-generator">
                Create GST invoice
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <p>InvoiceWala Blog · GST bill format guide</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">{children}</div>
    </section>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{children}</p>
    </div>
  );
}
