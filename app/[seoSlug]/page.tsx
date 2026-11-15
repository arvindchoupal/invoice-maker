import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Download, FileSpreadsheet, FileText } from "lucide-react";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { PeopleAlsoUse } from "@/components/seo/PeopleAlsoUse";
import { seoPageBySlug, seoPageImageAlt, seoPageImageUrl, seoPages } from "@/lib/seo-pages";

type PageProps = {
  params: Promise<{ seoSlug: string }>;
};

const siteUrl = "https://invoicewala.shop";
const comparisonLinks = [
  {
    href: "/invoicewala-vs-excel",
    title: "InvoiceWala vs Excel",
    body: "Compare a dedicated invoice generator with spreadsheet invoice templates.",
  },
  {
    href: "/invoicewala-vs-zoho",
    title: "InvoiceWala vs Zoho",
    body: "See when a simple invoice-first flow is better for freelancers and small teams.",
  },
  {
    href: "/invoicewala-vs-vyapar",
    title: "InvoiceWala vs Vyapar",
    body: "Compare lightweight web invoicing with broader billing app workflows.",
  },
];

export function generateStaticParams() {
  return seoPages.map((page) => ({ seoSlug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoSlug } = await params;
  const page = seoPageBySlug(seoSlug);
  if (!page) return {};
  const image = `${siteUrl}${seoPageImageUrl(page.slug)}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/${page.slug}`,
      siteName: "InvoiceWala",
      images: [{ url: image, alt: seoPageImageAlt(page), width: 1200, height: 1500 }],
    },
  };
}

function faqSchema(page: NonNullable<ReturnType<typeof seoPageBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function softwareSchema(page: NonNullable<ReturnType<typeof seoPageBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "InvoiceWala",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/${page.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

function breadcrumbSchema(page: NonNullable<ReturnType<typeof seoPageBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.h1, item: `${siteUrl}/${page.slug}` },
    ],
  };
}

function howToSchema(page: NonNullable<ReturnType<typeof seoPageBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.h1,
    step: (page.howItWorks ?? [
      "Enter business and customer details",
      "Add items, tax and totals",
      "Preview, save and download the invoice",
    ]).map((name) => ({ "@type": "HowToStep", name })),
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { seoSlug } = await params;
  const page = seoPageBySlug(seoSlug);
  if (!page) notFound();

  const schemas: Record<string, unknown>[] = [];
  if (page.schema.includes("FAQPage")) schemas.push(faqSchema(page));
  if (page.schema.includes("SoftwareApplication")) schemas.push(softwareSchema(page));
  if (page.schema.includes("BreadcrumbList")) schemas.push(breadcrumbSchema(page));
  if (page.schema.includes("HowTo")) schemas.push(howToSchema(page));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={schemas} />
      <section className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-6 sm:py-6">


        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{page.primaryKeyword}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{page.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{page.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" data-event="seo_cta_click" data-event-category="cta" data-event-label={`${page.slug} hero ${page.cta}`} href={page.ctaHref}>
                {page.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" data-event="pricing_click" data-event-category="cta" data-event-label={`${page.slug} hero pricing`} href="/pricing">
                First 1,000 free
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">Preview invoices free. Download and save after signup or login.</p>
            {page.trustBadges?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {page.trustBadges.slice(0, 4).map((badge) => (
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300" key={badge}>
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
            <div className="rounded-2xl bg-white p-5 text-slate-950">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="h-9 w-9 rounded-xl bg-blue-600" />
                  <p className="mt-4 text-xl font-bold">Your Business</p>
                  <p className="text-xs text-slate-500">business@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">INVOICE</p>
                  <p className="text-xs text-slate-500">PDF preview</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                <p className="mt-2 font-semibold">Customer Name</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_70px_90px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Item</span><span>Qty</span><span className="text-right">Total</span>
                </div>
                <div className="grid grid-cols-[1fr_70px_90px] px-3 py-3">
                  <span>{page.h1.replace(" Generator", "")}</span><span>1</span><span className="text-right">₹5,000</span>
                </div>
              </div>
              <div className="ml-auto mt-5 max-w-xs border-t border-slate-200 pt-3 text-right">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-2xl font-bold">₹5,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {page.featureBullets?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Features</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Everything needed to create and send invoices faster</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-400">Simple enough for a first invoice, structured enough for repeat business billing.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.featureBullets.map((feature) => (
                <div className="flex gap-3 rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={feature}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="grid gap-7 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Invoice image sample</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{page.primaryKeyword} image preview</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              This keyword-focused invoice preview gives Google Images and users a visual sample of the format before they create the real invoice.
            </p>
            <p className="mt-4 text-xs leading-5 text-slate-500">{seoPageImageAlt(page)}. Sample values only.</p>
          </div>
          <figure>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/25">
              <Image
                alt={seoPageImageAlt(page)}
                className="h-auto w-full"
                height={1500}
                sizes="(max-width: 1024px) 100vw, 760px"
                src={seoPageImageUrl(page.slug)}
                width={1200}
              />
            </div>
            <figcaption className="mt-3 text-center text-xs leading-5 text-slate-500">
              {seoPageImageAlt(page)}
            </figcaption>
          </figure>
        </div>
      </section>

      {page.supportingVisual ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="grid gap-7 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">{page.supportingVisual.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{page.supportingVisual.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{page.supportingVisual.body}</p>
            </div>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/25">
                <Image
                  alt={page.supportingVisual.alt}
                  className="h-auto w-full"
                  height={page.supportingVisual.height}
                  sizes="(max-width: 1024px) 100vw, 760px"
                  src={page.supportingVisual.src}
                  width={page.supportingVisual.width}
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-5 text-slate-500">
                {page.supportingVisual.caption}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {page.slug === "bill-book-format" ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Free bill book downloads</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Download a bill book format in Word, PDF or Excel</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">Choose the file that matches your workflow. Word is easy to edit, PDF is ready to print, and Excel includes working item, GST and balance formulas. All three are original InvoiceWala templates with blank business fields.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                { href: "/downloads/bill-book-format/bill-book-format-word.docx", title: "Bill book format in Word", body: "Editable A4 layout for shop and service bills.", icon: FileText, label: "Download Word" },
                { href: "/downloads/bill-book-format/bill-book-format-printable.pdf", title: "Bill book format PDF", body: "Print-ready blank template for handwritten bills.", icon: FileText, label: "Download PDF" },
                { href: "/downloads/bill-book-format/bill-book-format-excel.xlsx", title: "Excel bill book format", body: "Editable sheet with subtotal, GST and balance formulas.", icon: FileSpreadsheet, label: "Download Excel" },
              ].map((file) => {
                const Icon = file.icon;
                return <article className="rounded-2xl border border-white/10 bg-slate-950/75 p-5" key={file.href}><Icon className="h-6 w-6 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold">{file.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{file.body}</p><a className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-200" download href={file.href}><Download className="h-4 w-4" />{file.label}</a></article>;
              })}
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-400">These files are formatting aids, not tax or legal advice. Replace all sample values and confirm the GST treatment that applies to your business and transaction.</p>
          </div>
        </section>
      ) : null}

      {page.benefits?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            {page.benefits.map((benefit) => (
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={benefit.title}>
                <h2 className="text-xl font-semibold">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-3">
        {page.sections.map((section) => (
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={section.title}>
            <CheckCircle2 className="h-5 w-5 text-cyan-300" />
            <h2 className="mt-4 text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{section.body}</p>
          </article>
        ))}
      </section>

      {page.contentTables?.length ? (
        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6">
          {page.contentTables.map((table) => (
            <div className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6" key={table.title}>
              <h2 className="text-3xl font-semibold tracking-tight">{table.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{table.intro}</p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      {table.headers.map((header) => (
                        <th className="p-4" key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr className="border-t border-white/10" key={row.join("-")}>
                        {row.map((cell, cellIndex) => (
                          <td className={`p-4 ${cellIndex === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={`${cell}-${cellIndex}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {page.workedExamples?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Filled bill samples</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Practical bill book examples with calculations</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">Use these examples to understand the layout and calculation flow. Replace every item, rate, tax, discount and payment with the real transaction details.</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {page.workedExamples.map((example) => (
              <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]" key={example.title}>
                <div className="border-b border-white/10 p-6">
                  <h3 className="text-xl font-semibold">{example.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{example.context}</p>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-[480px] text-left text-sm">
                      <thead className="bg-slate-950/80 text-xs uppercase tracking-wide text-slate-400"><tr><th className="p-3">Item</th><th className="p-3">Calculation</th><th className="p-3 text-right">Amount</th></tr></thead>
                      <tbody>{example.rows.map((row) => <tr className="border-t border-white/10" key={`${example.title}-${row.item}`}><td className="p-3 font-semibold text-slate-200">{row.item}</td><td className="p-3 text-slate-400">{row.calculation}</td><td className="p-3 text-right text-slate-200">{row.amount}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <dl className="ml-auto mt-5 max-w-sm space-y-2 text-sm">{example.summary.map((row, index) => <div className={`flex items-center justify-between gap-4 ${index === example.summary.length - 1 ? "border-t border-white/10 pt-3 font-bold text-white" : "text-slate-400"}`} key={`${example.title}-${row.label}`}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
                  <p className="mt-5 rounded-xl bg-slate-950/70 p-4 text-xs leading-6 text-slate-400">{example.note}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-slate-500">GST values above are illustrative. Confirm the applicable registration, rate, HSN/SAC and place-of-supply treatment for the actual transaction.</p>
        </section>
      ) : null}

      {page.educationBlocks?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Invoice basics</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Everything a new business owner should know before creating an invoice</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {page.educationBlocks.map((block) => (
                <article className="rounded-2xl bg-slate-950/70 p-5" key={block.title}>
                  <h3 className="text-lg font-semibold">{block.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{block.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.industryTips?.length || page.howItWorks?.length ? (
        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-2">
          {page.industryTips?.length ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Practical tips</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Invoice details that help clients pay faster</h2>
              <div className="mt-6 space-y-3">
                {page.industryTips.map((tip) => (
                  <div className="flex gap-3 rounded-2xl bg-slate-950/70 p-4 text-sm leading-6 text-slate-300" key={tip}>
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {page.howItWorks?.length ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">From blank invoice to PDF in a few steps</h2>
              <div className="mt-6 space-y-4">
                {page.howItWorks.map((step, index) => (
                  <div className="flex gap-4 rounded-2xl bg-slate-950/70 p-4" key={step}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">{index + 1}</span>
                    <p className="pt-1 text-sm leading-6 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {page.testimonial ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Customer proof</p>
            <blockquote className="mt-4 max-w-4xl text-2xl font-semibold leading-snug tracking-tight text-white">
              “{page.testimonial.quote}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-slate-300">— {page.testimonial.author}</p>
          </div>
        </section>
      ) : null}

      {page.comparisons?.length ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Comparison</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{page.h1}: quick comparison</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="p-4">Area</th>
                    <th className="p-4">InvoiceWala</th>
                    <th className="p-4">Alternative</th>
                  </tr>
                </thead>
                <tbody>
                  {page.comparisons.map((row) => (
                    <tr className="border-t border-white/10" key={row.title}>
                      <td className="p-4 font-semibold text-white">{row.title}</td>
                      <td className="p-4 text-slate-300">{row.invoiceWala}</td>
                      <td className="p-4 text-slate-400">{row.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Search intent</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Built for people who want a useful result now</h2>
          <p className="mt-4 text-slate-300">{page.intent}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {page.secondaryKeywords.map((keyword) => (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300" key={keyword}>{keyword}</span>
            ))}
          </div>
          {page.longTailKeywords?.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white">Helpful long-tail searches</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.longTailKeywords.map((keyword) => (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-400" key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
          ) : null}
          {page.comparisonKeywords?.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white">Comparison searches</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.comparisonKeywords.map((keyword) => (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-400" key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Related InvoiceWala pages</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.internalLinks.map((link) => (
              <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-100" data-event="seo_internal_link_click" data-event-category="engagement" data-event-label={`${page.slug} to ${link.href}`} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {page.slug === "free-invoice-generator" ? (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Popular comparisons</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Compare invoice tools before you choose</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              If you are moving from spreadsheets or comparing business apps, these guides help you choose the simplest way to create invoices and track payments.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {comparisonLinks.map((link) => (
                <Link
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-slate-900"
                  href={link.href}
                  key={link.href}
                >
                  <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{link.body}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                    Read comparison
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PeopleAlsoUse eventLabel={`seo ${page.slug}`} />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">FAQs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {page.faqs.map(([question, answer]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to create your invoice?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">Start with a free preview. Signup only when you want to save, download the PDF and track payment.</p>
          <Link className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" data-event="seo_cta_click" data-event-category="cta" data-event-label={`${page.slug} bottom ${page.cta}`} href={page.ctaHref}>
            {page.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · invoicewala.shop</p>
          <PublicFooterLinks />
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Link
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950"
            data-event="mobile_sticky_seo_cta_click"
            data-event-category="cta"
            data-event-label={page.slug}
            href={page.ctaHref}
          >
            {page.cta}
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-4 text-sm font-semibold text-white"
            data-event="mobile_sticky_seo_tools_click"
            data-event-category="engagement"
            data-event-label={page.slug}
            href="/tools"
          >
            Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
