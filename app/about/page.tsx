import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "About InvoiceWala | Invoice and GST Tools for India",
  description:
    "Learn about InvoiceWala, a lightweight invoice, GST billing and business document platform built for Indian freelancers and small businesses.",
  alternates: { canonical: `${siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About InvoiceWala",
        url: `${siteUrl}/about`,
        description: metadata.description,
      }} />
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">About</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">InvoiceWala helps small businesses create invoices faster.</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-300">
          <p>
            InvoiceWala is built for freelancers, contractors, consultants, agencies, local shops and GST businesses in India that want simple billing without heavy accounting software.
          </p>
          <p>
            The product starts with the most important workflow: create an invoice, preview it, download a PDF and track payment. Around that core, InvoiceWala adds GST invoice tools, quotations, receipts, purchase orders, calculators, reminders and lightweight reports.
          </p>
          <p>
            Our focus is practical business work: clear invoice formats, faster PDF documents, fewer manual calculations and better follow-up on payments.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950" href="/free-invoice-generator">Create invoice</Link>
          <Link className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white" href="/tools">Explore tools</Link>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · about</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
