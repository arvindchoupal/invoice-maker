import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Calculator, CheckCircle2, Download, FileSpreadsheet, FileText, FileType2, Send, Smartphone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Bill Format in Excel, Word & PDF – Free Samples | InvoiceWala",
  description:
    "Preview free bill format samples for shops, services and freelancers. Compare Excel, Word and PDF formats, then create and download a professional bill online.",
  alternates: { canonical: `${siteUrl}/bill-format` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Bill Format in Excel, Word & PDF – Free Samples",
    description: "Preview simple, GST, retail, shop, service and freelancer bill formats for Indian businesses.",
    url: `${siteUrl}/bill-format`,
    siteName: "InvoiceWala",
    images: [
      {
        url: `${siteUrl}/bill-formats/gst-bill-format.webp`,
        width: 1200,
        height: 1698,
        alt: "GST bill format sample for an Indian mobile shop",
      },
    ],
  },
};

const templates = [
  {
    name: "Simple bill format",
    anchor: "simple-bill-format",
    image: "/bill-formats/simple-bill-format.webp",
    alt: "Simple bill format sample for a general store in India",
    description: "A clean non-GST bill for everyday products and services.",
    accent: "bg-blue-600",
    soft: "bg-blue-50 text-blue-700",
  },
  {
    name: "GST bill format",
    anchor: "gst-bill-format",
    image: "/bill-formats/gst-bill-format.webp",
    alt: "GST bill format sample with GSTIN, item rows and tax total",
    description: "GST-ready tax invoice with supplier, buyer and tax details.",
    accent: "bg-emerald-600",
    soft: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "Service bill format",
    anchor: "service-bill-format",
    image: "/bill-formats/service-bill-format.webp",
    alt: "Service bill format sample for a design studio",
    description: "For consultants, agencies, repairs and professional services.",
    accent: "bg-violet-600",
    soft: "bg-violet-50 text-violet-700",
  },
  {
    name: "Retail shop bill",
    anchor: "bill-format-for-shop",
    image: "/bill-formats/retail-shop-bill-format.webp",
    alt: "Retail shop bill format sample with products, quantities and GST",
    description: "A scan-friendly product bill for stores and local sellers.",
    accent: "bg-red-600",
    soft: "bg-red-50 text-red-700",
  },
  {
    name: "Bill book format",
    anchor: "bill-book-format",
    image: "/bill-formats/bill-book-format.webp",
    alt: "Bill book and cash memo format sample for a hardware store",
    description: "A familiar cash memo layout that works well for print.",
    accent: "bg-slate-900",
    soft: "bg-slate-100 text-slate-700",
  },
  {
    name: "Freelancer bill",
    anchor: "freelancer-bill-format",
    image: "/bill-formats/freelancer-bill-format.webp",
    alt: "Freelancer bill format sample for website development services",
    description: "Project, milestone and retainer billing in a polished format.",
    accent: "bg-cyan-600",
    soft: "bg-cyan-50 text-cyan-700",
  },
] as const;

const faqs = [
  ["What should a bill format include?", "A useful bill format includes the business name, bill number, date, customer details, item description, quantity, rate, amount, tax when applicable, total and payment information."],
  ["Can I use a bill format without GST?", "Yes. A business that is not charging GST can use a simple non-GST bill. Add GSTIN and tax breakup only when they apply to the transaction."],
  ["Which format is best: Excel, Word or PDF?", "Excel is useful for calculations, Word for manual editing, and PDF for sharing a stable final copy. An online bill maker combines calculations with a clean PDF output."],
  ["Is a bill and an invoice the same?", "People often use the words bill and invoice interchangeably. In practice, an invoice usually requests payment, while a bill may also be issued at the time of sale or payment."],
  ["Can I create a bill on my phone?", "Yes. InvoiceWala works in a modern mobile browser, so you can add customer and item details, preview the bill and continue to a professional invoice workflow."],
  ["Can I download a bill format for free?", "Yes. You can open any bill sample on this page for a full-size preview and use InvoiceWala to create and download your first customer-ready PDF bill free."],
  ["Which bill format is suitable for a shop?", "Retail shops usually need item name, quantity, rate, discount, tax and total columns. GST-registered shops should also show GSTIN, HSN where applicable and the correct CGST/SGST or IGST breakup."],
  ["How do I make a bill format in Excel?", "Create separate areas for seller and customer details, then add item, quantity, rate, tax and amount columns. Use formulas for line totals, subtotal, GST and grand total, and export the final bill as PDF before sharing."],
] as const;

const billHighlights = [
  [BadgeCheck, "Professional structure", "Keep business, customer, item, tax and payment details in a predictable order customers can scan quickly."],
  [Calculator, "Accurate totals", "Use a calculation-friendly layout so quantity, rate, discount, taxable value and GST lead to one clear amount due."],
  [Smartphone, "Ready for mobile", "Choose a format that stays readable when a customer opens the PDF from WhatsApp, email or a phone browser."],
  [Send, "Easy to share", "Finish with a stable PDF instead of sending an editable sheet whose columns, fonts or formulas can change."],
] as const;

const billTips = [
  ["Start with the right document", "Use a simple bill for straightforward non-GST transactions and a tax invoice when GST rules apply to your business and sale."],
  ["Identify both parties", "Add your legal or trade name, address, contact details and GSTIN when applicable. Include the customer name, billing address and GSTIN for B2B invoices."],
  ["Use a unique bill number", "Keep invoice numbers sequential and easy to trace, such as INV-2026-001. Show the issue date, due date and place of supply where relevant."],
  ["Describe every item clearly", "Write a recognisable product or service description with quantity, unit, rate, discount and HSN or SAC details when required."],
  ["Show tax and total separately", "Display taxable value, CGST and SGST or IGST, rounding and the final amount due. This reduces customer questions and payment delays."],
  ["Add payment and policy details", "Mention accepted payment methods, bank or UPI information, payment terms and a short return, late-fee or service note if it applies."],
] as const;

export default function BillFormatPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Bill format", item: `${siteUrl}/bill-format` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Free bill format samples",
      itemListElement: templates.map((template, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: template.name,
        image: `${siteUrl}${template.image}`,
      })),
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
      "@type": "CollectionPage",
      name: "Free Bill Format in Excel, Word and PDF",
      description: metadata.description,
      url: `${siteUrl}/bill-format`,
      inLanguage: "en-IN",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: templates.length,
        itemListElement: templates.map((template, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/bill-format#${template.anchor}`,
          name: template.name,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to create a professional bill online",
      description: "Choose a bill format, add transaction details and download a customer-ready PDF.",
      totalTime: "PT5M",
      step: [
        { "@type": "HowToStep", position: 1, name: "Choose a bill format", text: "Choose the format that matches your business and tax needs." },
        { "@type": "HowToStep", position: 2, name: "Add bill details", text: "Add your business, customer, item, price, tax and payment details." },
        { "@type": "HowToStep", position: 3, name: "Review and download", text: "Review the totals and download a polished PDF bill." },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <JsonLd data={schemas} />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:px-6">
          <BrandLogo className="text-slate-950" imageClassName="h-9 w-9" tagline="" />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex" aria-label="Primary navigation">
            <Link className="transition hover:text-blue-600" href="/invoice-templates">Templates</Link>
            <Link className="transition hover:text-blue-600" href="/tools">Free tools</Link>
            <Link className="transition hover:text-blue-600" href="/pricing">Pricing</Link>
            <Link className="transition hover:text-blue-600" href="/blog">Guides</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:inline-flex" href="/login">Log in</Link>
            <Link className="inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700" href="/free-invoice">Create bill</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-blue-100 bg-[linear-gradient(115deg,#f8fbff_0%,#eef6ff_55%,#ffffff_100%)] dark:border-white/10 dark:bg-[linear-gradient(115deg,#0b0f14_0%,#111b2d_55%,#0b0f14_100%)]">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(#dbeafe_1px,transparent_1px),linear-gradient(90deg,#dbeafe_1px,transparent_1px)] [background-size:32px_32px] dark:opacity-20 dark:[background-image:linear-gradient(#334155_1px,transparent_1px),linear-gradient(90deg,#334155_1px,transparent_1px)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-24">
          <div>
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700 shadow-sm dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-200">Free bill formats for India</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Bill format that looks professional from the first glance
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Preview simple, GST, retail, service and freelancer bill formats. Pick the layout that fits your business, then create a clean customer-ready bill online.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-extrabold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700" href="#bill-templates">
                Browse bill formats <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-700 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-white" href="/free-invoice">
                Create a bill online
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              {["GST and non-GST", "Mobile-friendly", "Professional PDF flow"].map((item) => (
                <span className="inline-flex items-center gap-2" key={item}><CheckCircle2 className="h-4 w-4 text-emerald-600" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[430px] w-full max-w-[610px] sm:h-[540px]">
            <div className="absolute left-[4%] top-[12%] w-[46%] -rotate-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-blue-900/15">
              <Image alt={templates[0].alt} className="h-auto w-full rounded-xl" height={1698} priority src={templates[0].image} width={1200} />
            </div>
            <div className="absolute right-[3%] top-0 z-10 w-[52%] rotate-3 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-2 shadow-2xl shadow-emerald-900/20">
              <Image alt={templates[1].alt} className="h-auto w-full rounded-xl" height={1698} priority src={templates[1].image} width={1200} />
            </div>
            <div className="absolute bottom-[2%] left-[22%] z-20 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-xl dark:border-white/15 dark:bg-[#11161c]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">Ready to use</p>
              <p className="mt-1 text-lg font-black text-slate-950 dark:text-white">6 polished formats</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-blue-100 bg-white px-5 py-5 dark:border-white/10 dark:bg-[#0b0f14] sm:px-6" aria-label="Popular bill format searches">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Popular searches</span>
          {[
            ["Bill format for shop", "#bill-format-for-shop"],
            ["Bill format PDF", "#bill-format-pdf"],
            ["Bill format in Excel", "#bill-format-excel"],
            ["Bill format in Word", "#bill-format-word"],
            ["Simple bill format", "#simple-bill-format"],
            ["Online bill format", "#online-bill-format"],
          ].map(([label, href]) => (
            <a className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/20" href={href} key={href}>{label}</a>
          ))}
        </div>
      </nav>

      <section className="bg-slate-100 py-16 sm:py-20" id="bill-templates">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Choose your layout</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Free bill format samples</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Each original preview is a crisp 1200 × 1698 WebP, designed for fast pages and strong Google Images visibility.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <article className="group scroll-mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl" id={template.anchor} key={template.name}>
                <a className="block bg-slate-50 p-4" href={template.image}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
                    <Image alt={template.alt} className="h-auto w-full transition duration-500 group-hover:scale-[1.02]" height={1698} loading="lazy" src={template.image} width={1200} />
                  </div>
                </a>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${template.soft}`}>1200 × 1698 WebP</span>
                    <span className={`h-2.5 w-10 rounded-full ${template.accent}`} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-xl font-black tracking-tight">{template.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{template.description}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700" href={template.image}>Full preview</a>
                    <Link className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-blue-600 px-3 text-sm font-bold text-white transition hover:bg-blue-700" href="/free-invoice">Use format <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Built for everyday business</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Why use a ready bill format?</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              A bill is more than a total on a page. It records what was sold, who must pay, how tax was calculated and when the payment is due. A consistent format helps you prepare that record faster and makes the business look dependable.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              InvoiceWala formats are designed for Indian freelancers, agencies, contractors, consultants, local shops and service businesses that need a clear bill without learning complex accounting software first.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Freelancers", "Retail shops", "Agencies", "Contractors", "Consultants", "GST businesses"].map((audience) => (
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700" key={audience}>{audience}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {billHighlights.map(([Icon, title, body]) => (
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6" key={title}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-blue-50 py-16 sm:py-20" id="bill-format-files">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Choose the working format</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Excel, Word or PDF bill format?</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">The best file type depends on whether you are calculating, editing or sending the bill. Many businesses prepare the data in Excel or an online invoice maker and share the final copy as PDF.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <article className="scroll-mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm" id="bill-format-excel">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><FileSpreadsheet className="h-6 w-6" /></span>
              <h3 className="mt-5 text-2xl font-black">Bill format in Excel</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Best when you want formulas for quantity × rate, discounts, taxable value, GST and totals. Protect formula cells and export a PDF before sending it to a customer.</p>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">Best for calculations</p>
            </article>
            <article className="scroll-mt-8 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm" id="bill-format-word">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-700"><FileType2 className="h-6 w-6" /></span>
              <h3 className="mt-5 text-2xl font-black">Bill format in Word</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Useful for a simple document with flexible wording and branding. It works for occasional bills, but manual totals should be checked carefully before download.</p>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Best for manual editing</p>
            </article>
            <article className="scroll-mt-8 rounded-3xl border border-violet-100 bg-white p-7 shadow-sm" id="bill-format-pdf">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700"><Download className="h-6 w-6" /></span>
              <h3 className="mt-5 text-2xl font-black">Bill format in PDF</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">The safest format for customers because the design does not shift across phones and computers. PDF is ideal for email, WhatsApp, printing and record keeping.</p>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-700">Best for final sharing</p>
            </article>
          </div>
          <div className="mt-8 flex scroll-mt-8 flex-col items-center justify-between gap-5 rounded-3xl bg-slate-950 p-7 text-center text-white sm:flex-row sm:text-left" id="online-bill-format">
            <div><h3 className="text-2xl font-black">Want the calculations and PDF in one flow?</h3><p className="mt-2 text-sm leading-6 text-slate-300">Create the bill online, review GST and totals, then download a customer-ready document.</p></div>
            <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-blue-500" href="/free-invoice">Create bill online <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-5 shadow-xl shadow-blue-900/5">
            <Image alt={templates[2].alt} className="mx-auto h-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white" height={1698} loading="lazy" src={templates[2].image} width={1200} />
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Benefits of a consistent format</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Make every bill easier to understand and act on.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Customers should not have to search for the amount due or ask where to pay. A well-designed bill keeps the commercial details together and gives both sides a reliable transaction record.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ["Faster preparation", "Reuse the same structure instead of rebuilding a document for every customer."],
                ["Fewer mistakes", "Keep required fields and totals in visible, repeatable positions."],
                ["Stronger brand", "Use one professional layout, logo and colour system across customer bills."],
                ["Better follow-up", "A clear invoice number, due date and amount make payment reminders simpler."],
              ].map(([title, body]) => (
                <div className="rounded-2xl border border-slate-200 p-5" key={title}><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Pick the right document</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">GST bill or simple bill?</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Use a simple bill when tax is not being charged. GST-registered businesses issuing a tax invoice should include applicable supplier, buyer, supply and tax details.</p>
            <Link className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700" href="/blog/gst-bill-format">Read the GST bill format guide <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Simple bill format", "Best for non-GST billing, everyday sales and straightforward payment records.", ["Business and customer", "Bill number and date", "Items, rate and total"]],
              ["GST bill format", "Best when GST applies and the invoice needs a clear tax-ready structure.", ["GSTIN and place of supply", "HSN or SAC when applicable", "CGST/SGST or IGST breakup"]],
            ].map(([title, body, points]) => (
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6" key={String(title)}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white"><FileText className="h-5 w-5" /></div>
                <h3 className="mt-5 text-xl font-black">{String(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{String(body)}</p>
                <ul className="mt-5 space-y-3">
                  {(points as string[]).map((point) => <li className="flex gap-2 text-sm font-semibold text-slate-700" key={point}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-blue-50 py-16 sm:py-20" id="how-to-create-bill">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Three simple steps</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">From sample to customer-ready bill</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["Choose the format that matches your business and tax needs.", "Add your business, customer, item, price and payment details.", "Review the totals, then continue to a polished PDF invoice workflow."].map((step, index) => (
              <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm" key={step}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</span>
                <p className="mt-5 text-base font-bold leading-7 text-slate-800">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Bill-making checklist</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Tips to create an effective bill</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Use this checklist before sending any bill format to a customer. Requirements can vary by transaction and tax status, so keep the document accurate for your business.</p>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {billTips.map(([title, body], index) => (
              <li className="rounded-3xl border border-slate-200 bg-slate-50 p-6" key={title}>
                <span className="text-sm font-black text-blue-600">TIP {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div><h3 className="text-xl font-black">Need a tax-ready structure?</h3><p className="mt-2 text-sm leading-6 text-slate-600">Read the detailed GST bill guide for GSTIN, place of supply, HSN/SAC and tax-breakup examples.</p></div>
            <Link className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-blue-700 sm:mt-0" href="/blog/gst-bill-format">Open GST bill guide <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">Common questions</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Bill format FAQs</h2>
          </div>
          <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map(([question, answer], index) => (
              <details className="group py-5" key={question} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-slate-900">
                  {question}<span className="text-2xl font-light text-blue-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl pr-10 text-sm leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 rounded-[2rem] border border-blue-400/20 bg-[linear-gradient(120deg,rgba(37,99,235,.28),rgba(8,145,178,.14))] p-8 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-300">Ready to bill?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Create your bill in InvoiceWala</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Start with the format you like, add the real transaction details and send a professional invoice to your customer.</p>
          </div>
          <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#0f172a] transition hover:-translate-y-0.5 hover:bg-cyan-50" href="/free-invoice">Create free bill <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-white sm:px-6"><div className="mx-auto max-w-7xl"><PublicFooterLinks /></div></footer>
    </main>
  );
}
