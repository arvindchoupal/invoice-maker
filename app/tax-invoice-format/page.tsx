import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Tax Invoice Format India | Sample PDF Template",
  description:
    "Learn tax invoice format in India with sample layout, GST fields, services/products examples, PDF/Excel notes, rules and FAQs.",
  alternates: { canonical: `${siteUrl}/tax-invoice-format` },
  openGraph: {
    title: "Tax Invoice Format India | Sample PDF Template",
    description:
      "Complete tax invoice format guide for Indian businesses, freelancers, contractors, agencies and GST registered businesses.",
    url: `${siteUrl}/tax-invoice-format`,
    siteName: "InvoiceWala",
  },
};

const faqs: Array<[string, string]> = [
  ["What is tax invoice format?", "Tax invoice format is the structure used to create an invoice for taxable goods or services. It includes supplier details, buyer details, invoice number, date, item details, taxable value, GST rate, tax amount and total amount."],
  ["Is tax invoice format required for GST?", "For taxable supplies under GST, businesses generally issue a tax invoice containing GSTIN, tax breakup and required invoice details."],
  ["What is the format of tax invoice in India?", "A practical tax invoice format includes business name, GSTIN, invoice number, invoice date, customer details, item description, quantity, rate, taxable value, GST percentage, tax amount and total amount."],
  ["What is a tax invoice sample?", "A tax invoice sample is an example invoice layout showing realistic fields and calculations so businesses can understand how to prepare a proper invoice."],
  ["Can freelancers issue tax invoices?", "Yes. GST registered freelancers can issue tax invoices for taxable services when GST applies to their business."],
  ["Can consultants use tax invoice format?", "Yes. Consultants can use tax invoice format for advisory, professional services, retainers and project billing."],
  ["What is tax invoice format for services?", "For services, tax invoice format usually includes service description, SAC code, quantity or unit, rate, taxable value, GST rate and tax amount."],
  ["What is tax invoice format for products?", "For products, tax invoice format usually includes product name, HSN code, quantity, unit, rate, discount, taxable value, GST rate and total."],
  ["What is GST tax invoice format?", "GST tax invoice format is a tax invoice layout that includes GSTIN, HSN/SAC, taxable value, CGST/SGST or IGST and total invoice value."],
  ["Is tax invoice and GST invoice the same?", "In common usage, they are often used similarly. Under GST, tax invoice is the formal document for taxable supplies, while GST invoice is a popular phrase for an invoice with GST details."],
  ["Can I download tax invoice format PDF?", "Yes. With InvoiceWala, you can create a tax invoice online and download it as a professional PDF after signup or login."],
  ["Can I use tax invoice format in Excel?", "Yes, but Excel requires manual formatting and formula checks. Online invoice tools reduce calculation and layout mistakes."],
  ["Is invoice number mandatory in a tax invoice?", "Yes. A unique invoice number is important for records, tracking and GST invoice documentation."],
  ["Can invoice numbers repeat?", "Invoice numbers should not repeat within the same series or financial year. Use a consistent sequence."],
  ["What is HSN code in tax invoice?", "HSN code classifies goods under GST. For services, SAC codes are commonly used."],
  ["What is place of supply?", "Place of supply helps decide whether CGST/SGST or IGST applies, especially for inter-state transactions."],
  ["How do I calculate tax amount?", "Tax Amount = Taxable Value x GST Rate / 100. For example, Rs. 10,000 at 18% GST gives Rs. 1,800 tax."],
  ["What are common tax invoice mistakes?", "Common mistakes include wrong GSTIN, duplicate invoice numbers, wrong GST rate, missing HSN/SAC and incorrect tax calculations."],
  ["Can I create a professional tax invoice online?", "Yes. InvoiceWala helps create professional invoices with tax fields, PDF templates, invoice numbers and client details."],
  ["Who should use tax invoice format?", "Small business owners, freelancers, contractors, consultants, agencies, startups and GST registered businesses can use tax invoice format."],
];

const mandatoryFields = [
  ["Supplier Details", "Business name, address, email, phone and GSTIN of the seller or service provider."],
  ["Customer Details", "Buyer name, billing address and GSTIN when the buyer is GST registered."],
  ["GSTIN", "Supplier GSTIN is important. Buyer GSTIN is important for B2B invoices and input tax credit records."],
  ["Invoice Number", "A unique number such as INV-2026-001 or FY26-0001."],
  ["Invoice Date", "The date on which the tax invoice is issued."],
  ["HSN/SAC Codes", "HSN for goods and SAC for services, based on supply type."],
  ["Tax Rates", "GST rate such as 5%, 12%, 18% or 28%, depending on product or service."],
  ["Total Value", "Subtotal, taxable value, tax amount, discount if any and final invoice total."],
  ["Place of Supply", "Used to identify intra-state or inter-state supply for CGST/SGST or IGST."],
];

const sampleRows = [
  ["Website development", "998314", "1", "40,000", "40,000", "18%", "7,200", "47,200"],
  ["Maintenance support", "998313", "1", "8,000", "8,000", "18%", "1,440", "9,440"],
  ["Domain setup", "998315", "1", "2,000", "2,000", "18%", "360", "2,360"],
];

const serviceExamples = [
  ["Freelancer", "A designer can create a tax invoice for branding, UI design, social media creatives or monthly retainers."],
  ["Consultant", "A consultant can invoice for advisory hours, project consulting, implementation support or professional retainers."],
  ["Marketing Agency", "An agency can bill campaign management, ad creatives, SEO work, content retainers and performance marketing services."],
  ["Web Developer", "A developer can invoice for website development, maintenance, hosting setup, bug fixes and milestone payments."],
];

const productExamples = [
  ["Retail Shop", "Retail shops can use tax invoice format for product sales with quantity, rate, HSN, GST and total amount."],
  ["Ecommerce Seller", "Ecommerce sellers can generate tax invoices for online orders, shipping details and product-wise tax breakup."],
  ["Distributor", "Distributors can create invoices for bulk product movement, dealer pricing, discounts and GST breakup."],
  ["Manufacturer", "Manufacturers can use tax invoices for finished goods, raw material sales, quantity, units and tax classification."],
];

const mistakes = [
  ["Wrong GSTIN", "Incorrect GSTIN can affect customer records and input tax credit processing."],
  ["Duplicate Invoice Numbers", "Repeating invoice numbers makes tracking and audit trails messy."],
  ["Wrong GST Rate", "Using an incorrect GST rate changes tax amount and final invoice value."],
  ["Missing HSN/SAC", "Missing codes can make product or service classification unclear."],
  ["Incorrect Tax Calculations", "Manual calculations can create mismatch between taxable value, GST and final total."],
  ["Missing Place of Supply", "Without place of supply, tax split between CGST/SGST and IGST can become unclear."],
];

const internalLinks = [
  { href: "/gst-invoice-generator", label: "GST Invoice Generator", body: "Create GST-ready invoices with tax fields and PDF download." },
  { href: "/tools/invoice-number-generator", label: "Invoice Number Generator", body: "Generate clean invoice numbers for your tax invoice series." },
  { href: "/tools/gst-calculator", label: "GST Calculator", body: "Calculate GST amount before creating your invoice." },
  { href: "/quotation-maker", label: "Quotation Maker", body: "Prepare a quotation before converting it into an invoice." },
  { href: "/gst-bill-format", label: "GST Bill Format", body: "Read the GST bill format guide with sample invoice table." },
  { href: "/invoice-template-india", label: "Invoice Format", body: "Use a practical invoice format for Indian businesses." },
  { href: "/tools/margin-calculator", label: "Profit Margin Calculator", body: "Check margin before giving discounts or finalizing pricing." },
];

function articleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tax Invoice Format in India: Sample, Rules, PDF and Excel Template Guide",
    description:
      "A comprehensive tax invoice format guide for Indian small businesses, freelancers, contractors, consultants, agencies and GST registered businesses.",
    author: { "@type": "Organization", name: "InvoiceWala" },
    publisher: {
      "@type": "Organization",
      name: "InvoiceWala",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: `${siteUrl}/tax-invoice-format`,
    datePublished: "2026-05-30",
    dateModified: "2026-05-30",
    inLanguage: "en-IN",
  };
}

export default function TaxInvoiceFormatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Tax Invoice Format", url: `${siteUrl}/tax-invoice-format` },
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">tax invoice format</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Tax Invoice Format in India
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Learn the professional tax invoice format used by Indian small businesses, freelancers, consultants, contractors, agencies and GST registered businesses. See sample layouts, mandatory fields, examples, PDF and Excel notes, rules, mistakes and FAQs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="/free-invoice">
                Create tax invoice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/gst-invoice-generator">
                Generate GST invoice
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
                  <p className="text-xs text-slate-500">INV-2026-001</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                  <p className="mt-2 font-semibold">Customer Name</p>
                  <p className="text-xs text-slate-500">GSTIN: 27ABCDE1234F1Z8</p>
                </div>
                <div className="text-left sm:text-right">
                  <p>Invoice Date: 30 May 2026</p>
                  <p>Place of Supply: Maharashtra</p>
                </div>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_70px_90px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Description</span><span>GST</span><span className="text-right">Total</span>
                </div>
                <div className="grid grid-cols-[1fr_70px_90px] px-3 py-3">
                  <span>Professional service</span><span>18%</span><span className="text-right">Rs. 47,200</span>
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
                A tax invoice format is the standard structure businesses use to bill customers for taxable goods or services. In India, the term is especially important for GST registered businesses because a tax invoice is not just a payment request. It is also a tax document that records supplier details, customer details, GSTIN, invoice number, invoice date, item or service description, taxable value, GST rate, tax amount and final invoice total.
              </p>
              <p>
                People search for tax invoice format, format of tax invoice, tax invoice sample, tax invoice example, tax invoice template, tax invoice format in Excel, tax invoice format PDF, GST tax invoice format and professional tax invoice format because they want a clean structure they can trust. Some users want to create a service invoice for consulting or freelance work. Some want a product invoice for a retail shop, ecommerce order, distributor bill or manufacturing sale. Others want to understand which details are mandatory before sending a GST invoice to a customer.
              </p>
              <p>
                For Indian small business owners, freelancers, contractors, consultants, agencies and startups, a good tax invoice format helps avoid confusion. It clearly shows what was sold, what tax was charged, what the customer needs to pay and when payment is due. It also makes business records easier to search and explain. If a buyer is GST registered, the invoice details can matter for input tax credit records, so accuracy becomes even more important.
              </p>
              <p>
                This guide explains tax invoice format in simple human language. You will see a realistic sample invoice layout, mandatory fields, detailed calculations, service invoice examples, product invoice examples, tax invoice vs GST invoice comparison, PDF and Excel format notes, common mistakes, India-specific rules and frequently asked questions. The goal is to help you understand the format and then create a professional PDF invoice using InvoiceWala when you are ready.
              </p>
              <p>
                This page is educational and not legal or tax advice. GST rates, HSN/SAC classification, place of supply and filing requirements can depend on the exact product, service and business type. For compliance decisions, confirm with your accountant or tax advisor.
              </p>
            </Section>

            <Section title="What is a Tax Invoice?">
              <p>
                A tax invoice is a document issued by a supplier for taxable goods or services. It shows the value of supply, tax charged and total amount payable by the customer. Under GST, a tax invoice is commonly used by registered businesses when they make taxable supplies.
              </p>
              <p>
                A professional tax invoice helps both seller and buyer. The seller gets a clear record of the sale and payment due. The buyer gets a document showing what was purchased, what GST was charged and what amount should be paid. In B2B transactions, buyer GSTIN and tax breakup are especially important.
              </p>
            </Section>

            <Section title="Tax Invoice Format Sample">
              <p>
                A realistic tax invoice format should show business details at the top, invoice details on the right, customer details below, then a clear item table. The table should include description, quantity, rate, taxable value, GST percentage, tax amount and total amount.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/80 p-5">
                <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <p><strong className="text-white">Business Name:</strong> ABC Digital Services</p>
                  <p><strong className="text-white">GSTIN:</strong> 29ABCDE1234F1Z5</p>
                  <p><strong className="text-white">Invoice Number:</strong> INV-2026-001</p>
                  <p><strong className="text-white">Invoice Date:</strong> 30 May 2026</p>
                  <p><strong className="text-white">Customer:</strong> XYZ Traders</p>
                  <p><strong className="text-white">Place of Supply:</strong> Karnataka</p>
                </div>
                <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                      <tr>{["Item Description", "Qty", "Rate", "Taxable Value", "GST %", "Tax Amount", "Total Amount"].map((head) => <th className="p-3" key={head}>{head}</th>)}</tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-white/10">
                        {["Website development", "1", "40,000", "40,000", "18%", "7,200", "47,200"].map((cell) => <td className="p-3 text-slate-300" key={cell}>{cell}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

            <Section title="Mandatory Fields in a Tax Invoice">
              <p>
                A tax invoice format should be complete enough for business records, customer clarity and GST documentation. The following fields are important for most Indian tax invoice templates.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {mandatoryFields.map(([title, body]) => (
                  <InfoCard title={title} key={title}>{body}</InfoCard>
                ))}
              </div>
            </Section>

            <Section title="Tax Invoice Example">
              <p>
                Suppose a web developer provides website development services to a client. The base service value is Rs. 40,000. GST rate is 18%. The tax amount is calculated as Rs. 40,000 x 18 / 100 = Rs. 7,200. The final invoice total is Rs. 47,200.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                    <tr>{["Description", "SAC/HSN", "Qty", "Rate", "Taxable", "GST", "Tax", "Total"].map((head) => <th className="p-3" key={head}>{head}</th>)}</tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((row) => (
                      <tr className="border-t border-white/10" key={row[0]}>
                        {row.map((cell) => <td className="p-3 text-slate-300" key={cell}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                In this example, total taxable value is Rs. 50,000 and total GST is Rs. 9,000. The invoice total becomes Rs. 59,000. If seller and buyer are in the same state, GST may be split into CGST and SGST. If the supply is inter-state, IGST may apply.
              </p>
            </Section>

            <Section title="Tax Invoice Format for Services">
              <p>
                Tax invoice for services usually focuses on service description, SAC code, service period, rate, taxable value and GST. This format is common for freelancers, consultants, agencies, contractors, web developers and other service businesses.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {serviceExamples.map(([title, body]) => <InfoCard title={title} key={title}>{body}</InfoCard>)}
              </div>
            </Section>

            <Section title="Tax Invoice Format for Products">
              <p>
                Product invoices need clear quantity, unit, rate, HSN code, discount, taxable value and GST breakup. This matters for retail shops, ecommerce sellers, distributors and manufacturers because product movement and tax records need accurate item-level details.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {productExamples.map(([title, body]) => <InfoCard title={title} key={title}>{body}</InfoCard>)}
              </div>
            </Section>

            <Section title="Tax Invoice vs GST Invoice">
              <p>
                Tax invoice and GST invoice are closely related in Indian business language. Many people use GST invoice to mean a tax invoice that contains GST details. The formal usage under GST is generally tax invoice for taxable supplies.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                    <tr><th className="p-3">Area</th><th className="p-3">Tax Invoice</th><th className="p-3">GST Invoice</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ["Meaning", "Formal invoice for taxable supplies.", "Common phrase for invoice with GST details."],
                      ["Tax fields", "Includes tax rate and tax amount.", "Includes GSTIN, GST rate and tax breakup."],
                      ["Use case", "Used for taxable goods or services.", "Used by GST registered businesses in common language."],
                      ["Document title", "Often titled Tax Invoice.", "May be titled Tax Invoice or GST Invoice."],
                    ].map((row) => (
                      <tr className="border-t border-white/10" key={row[0]}>{row.map((cell) => <td className="p-3 text-slate-300" key={cell}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Tax Invoice Format PDF">
              <p>
                PDF is one of the best formats for sharing tax invoices because it keeps the layout consistent across mobile, desktop, email and WhatsApp. A tax invoice format PDF looks professional, is easy to store and reduces the risk of accidental layout changes after sending.
              </p>
              <p>
                With InvoiceWala, you can create a tax invoice online, add client details, item rows, GST, notes and terms, then download a professional PDF invoice after signup or login. This is useful when you want branded invoices without manually designing a PDF template.
              </p>
            </Section>

            <Section title="Tax Invoice Format Excel">
              <p>
                Excel tax invoice templates are popular because they are familiar and flexible. You can create columns for item description, quantity, rate, GST and total. However, Excel also has limitations. Formulas can break, formatting can shift, invoice numbers can repeat and PDF export may not look clean on every device.
              </p>
              <p>
                If you create invoices occasionally, Excel may be enough. If you create invoices regularly, an online invoice generator is usually easier because it handles layout, totals, PDF output and invoice records more cleanly.
              </p>
            </Section>

            <Section title="Common Tax Invoice Mistakes">
              <div className="grid gap-4 md:grid-cols-2">
                {mistakes.map(([title, body]) => <InfoCard title={title} key={title}>{body}</InfoCard>)}
              </div>
            </Section>

            <Section title="Tax Invoice Rules in India">
              <p>
                Tax invoice rules in India focus on accurate details, proper invoice numbering, correct tax calculation and clear supply information. A tax invoice should identify the supplier, buyer, invoice date, invoice number, description of supply, taxable value, tax rate, tax amount and total value.
              </p>
              <p>
                Place of supply is important because it helps decide whether CGST/SGST or IGST applies. HSN/SAC codes help classify goods and services. Invoice numbering should be unique and sequential enough for business records. Businesses should keep invoice copies and share PDF invoices when needed for customer records.
              </p>
              <p>
                This is a high-level overview only. GST rules can change and may depend on business type, turnover, product category, service category and transaction location. Always verify compliance with a qualified professional.
              </p>
            </Section>

            <Section title="Download Tax Invoice Template">
              <p>
                Instead of downloading a blank template and editing it manually, you can create a tax invoice online with InvoiceWala. Add your business details, customer details, item rows, GST rate, discount, notes and terms. Then generate a clean PDF invoice for your customer.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Cta href="/free-invoice" label="Create Tax Invoice Online" />
                <Cta href="/gst-invoice-generator" label="Generate GST Invoice" />
                <Cta href="/tools/invoice-number-generator" label="Generate Invoice Number" />
                <Cta href="/online-invoice-maker" label="Download PDF Invoice" />
              </div>
            </Section>

            <Section title="Internal Linking Opportunities">
              <div className="grid gap-3 sm:grid-cols-2">
                {internalLinks.map((link) => (
                  <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-cyan-300/40 hover:bg-slate-900" href={link.href} key={link.href}>
                    <h3 className="font-semibold text-white">{link.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{link.body}</p>
                  </Link>
                ))}
              </div>
            </Section>

            <Section title="Tax Invoice Format FAQs">
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
                {["Sample format", "Mandatory fields", "Services", "Products", "PDF vs Excel", "Rules", "FAQs"].map((item) => (
                  <span className="rounded-xl bg-slate-950/70 px-3 py-2" key={item}>{item}</span>
                ))}
              </div>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/free-invoice">
                Create tax invoice
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · Tax invoice format guide</p>
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

function Cta({ href, label }: { href: string; label: string }) {
  return (
    <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 text-center text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-slate-950" href={href}>
      {label}
    </Link>
  );
}
