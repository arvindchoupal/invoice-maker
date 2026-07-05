import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo-schemas";
import { INVOICE_TEMPLATE_PAGES, invoiceTemplateUrl } from "@/lib/invoice-template-pages";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Free Invoice Templates by Profession | InvoiceWala",
  description: "Explore free invoice templates for plumbers, electricians, contractors, freelancers, consultants, salons, gyms and other Indian businesses.",
  alternates: { canonical: `${siteUrl}/invoice-templates` },
  openGraph: {
    title: "Free Invoice Templates by Profession",
    description: "Choose a profession-specific invoice format with realistic line items and GST-ready fields.",
    url: `${siteUrl}/invoice-templates`,
  },
};

export default function InvoiceTemplatesPage() {
  const categories = INVOICE_TEMPLATE_PAGES.reduce((groups, page) => {
    const existing = groups.get(page.category) ?? [];
    existing.push(page);
    groups.set(page.category, existing);
    return groups;
  }, new Map<string, typeof INVOICE_TEMPLATE_PAGES>());

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: "Invoice templates", url: `${siteUrl}/invoice-templates` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Invoice templates by profession",
          itemListElement: INVOICE_TEMPLATE_PAGES.map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${page.profession} invoice template`,
            url: `${siteUrl}${invoiceTemplateUrl(page.slug)}`,
          })),
        },
      ]} />
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.16),transparent_30%)]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <nav className="flex items-center justify-between"><BrandLogo href="/" imageClassName="h-9 w-9" tagline="" /><PublicNavActions /></nav>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Invoice templates</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Invoice formats built around how you actually bill</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Choose your profession to see realistic services, material charges, payment terms and tax-ready fields—then create the invoice in InvoiceWala.</p>
            <Link className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-bold text-slate-950 hover:bg-cyan-200" href="/free-invoice">
              Create a free invoice <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="grid gap-12">
          {[...categories.entries()].map(([category, pages]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                  <Link className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30" href={invoiceTemplateUrl(page.slug)} key={page.slug}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300"><FileText className="h-5 w-5" /></div>
                    <h3 className="mt-4 text-lg font-semibold group-hover:text-cyan-200">{page.profession} invoice template</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{page.billingModel}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">View sample <ArrowRight className="h-4 w-4" /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t border-white/10 px-5 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><PublicFooterLinks /></div></footer>
    </main>
  );
}
