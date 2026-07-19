import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, FileText, ReceiptIndianRupee } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { InvoiceTemplatePreview } from "@/components/seo/InvoiceTemplatePreview";
import { PeopleAlsoUse } from "@/components/seo/PeopleAlsoUse";
import type { InvoiceTemplatePage as InvoiceTemplatePageData } from "@/lib/invoice-template-pages";
import { getRelatedInvoiceTemplates, invoiceTemplateImageAlt, invoiceTemplateImageUrl, invoiceTemplateUrl } from "@/lib/invoice-template-pages";

export function InvoiceTemplatePage({ page }: { page: InvoiceTemplatePageData }) {
  const related = getRelatedInvoiceTemplates(page);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.17),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.16),transparent_32%)]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <nav className="flex items-center justify-between">
            <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
            <PublicNavActions />
          </nav>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
            <Link className="hover:text-cyan-200" href="/">Home</Link><span>/</span>
            <Link className="hover:text-cyan-200" href="/invoice-templates">Invoice templates</Link><span>/</span>
            <span className="text-slate-200">{page.profession}</span>
          </div>

          <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.82fr)] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">{page.primaryKeyword}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{page.h1}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{page.intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" data-event="template_cta_click" data-event-category="cta" data-event-label={`${page.slug} hero create invoice`} href={`/free-invoice?template=${page.slug}`}>
                  Create {page.profession.toLowerCase()} invoice <ArrowRight className="h-4 w-4" />
                </Link>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold hover:bg-white/10" data-event="template_tool_click" data-event-category="engagement" data-event-label={`${page.slug} gst calculator`} href="/tools/gst-calculator">
                  Calculate GST
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                {["Free preview", "GST-ready fields", "PDF after signup", "Mobile-friendly"].map((badge) => <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5" key={badge}>{badge}</span>)}
              </div>
              {page.searchIntents && page.searchIntents.length > 0 ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Also useful for</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100">
                    {page.searchIntents.map((intent) => (
                      <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5" key={intent}>{intent}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <InvoiceTemplatePreview page={page} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Required details</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">What to include in a {page.profession.toLowerCase()} invoice</h2>
          <p className="mt-4 leading-7 text-slate-400">Start with invoice number and dates, supplier and customer details, then add these profession-specific details before calculating the final amount.</p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {page.requiredFields.map((field) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={field.title}>
              <FileText className="h-5 w-5 text-cyan-300" />
              <h3 className="mt-4 text-lg font-semibold">{field.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{field.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6">
        <div className="grid gap-7 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Invoice image example</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Sample {page.profession.toLowerCase()} invoice image</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Use this visual as a formatting reference. Replace every sample name, amount and service with the real details of your transaction before sending an invoice.
            </p>
            <p className="mt-4 text-xs leading-5 text-slate-500">The image is generated specifically for this profession and uses illustrative data.</p>
          </div>
          <figure>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/25">
              <Image
                alt={invoiceTemplateImageAlt(page)}
                className="h-auto w-full"
                height={1500}
                sizes="(max-width: 1024px) 100vw, 760px"
                src={invoiceTemplateImageUrl(page)}
                width={1200}
              />
            </div>
            <figcaption className="mt-3 text-center text-xs leading-5 text-slate-500">
              {invoiceTemplateImageAlt(page)}. Sample values only.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Practical billing tips</p>
            <h2 className="mt-3 text-2xl font-semibold">Make the bill easier to approve</h2>
            <div className="mt-6 grid gap-3">
              {page.tips.map((tip) => (
                <div className="flex gap-3 rounded-2xl bg-white/[0.04] p-4 text-sm leading-6 text-slate-300" key={tip}>
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" /><span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Common mistakes</p>
            <h2 className="mt-3 text-2xl font-semibold">Avoid preventable payment delays</h2>
            <div className="mt-6 grid gap-4">
              {page.mistakes.map((mistake) => (
                <article className="rounded-2xl bg-white/[0.04] p-4" key={mistake.title}>
                  <h3 className="font-semibold">{mistake.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{mistake.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Questions answered</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{page.profession} invoice FAQs</h2>
            <div className="mt-6 grid gap-4">
              {page.faqs.map(([question, answer]) => (
                <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}>
                  <h3 className="font-semibold">{question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside>
            <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.07] p-6 lg:sticky lg:top-6">
              <ReceiptIndianRupee className="h-7 w-7 text-cyan-300" />
              <h2 className="mt-4 text-2xl font-semibold">Create the real invoice</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">Use the sample as a guide, then replace it with your business, customer and job details in InvoiceWala.</p>
              <Link className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-200" data-event="template_cta_click" data-event-category="cta" data-event-label={`${page.slug} sticky start free`} href={`/free-invoice?template=${page.slug}`}>
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 px-4 text-sm font-semibold hover:bg-white/[0.05]" data-event="template_tool_click" data-event-category="engagement" data-event-label={`${page.slug} business expense calculator`} href="/tools/business-expense-calculator">
                Calculate business expenses
              </Link>
              <p className="mt-3 text-center text-xs text-slate-500">Preview first. Sign in to save and download PDF.</p>
            </div>
          </aside>
        </div>
      </section>

      <PeopleAlsoUse eventLabel={`template ${page.slug}`} title="People also use this invoice template with" />

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Related formats</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Explore related invoice templates</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30" data-event="related_template_click" data-event-category="engagement" data-event-label={`${page.slug} to ${item.slug}`} href={invoiceTemplateUrl(item.slug)} key={item.slug}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.category}</p>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-cyan-200">{item.profession} invoice template</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.billingModel}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl"><PublicFooterLinks /></div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Link
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950"
            data-event="mobile_sticky_template_cta_click"
            data-event-category="cta"
            data-event-label={page.slug}
            href={`/free-invoice?template=${page.slug}`}
          >
            Create this invoice
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-4 text-sm font-semibold text-white"
            data-event="mobile_sticky_template_tool_click"
            data-event-category="engagement"
            data-event-label={`${page.slug} gst`}
            href="/tools/gst-calculator"
          >
            GST
          </Link>
        </div>
      </div>
    </main>
  );
}
