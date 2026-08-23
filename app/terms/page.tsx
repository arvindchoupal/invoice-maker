import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Terms of Service | InvoiceWala",
  description: "Read InvoiceWala's terms of service for invoice, GST billing and business document tools.",
  alternates: { canonical: `${siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>
      </section>
      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: 19 August 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <p>By using InvoiceWala, you agree to use the product responsibly for lawful invoice, billing, document and business record workflows.</p>
          <h2 className="text-2xl font-semibold text-white">Product Use</h2>
          <p>InvoiceWala provides tools for invoices, GST-ready documents, quotations, receipts, purchase orders, calculators and reports. You are responsible for the accuracy of business, tax and customer information entered into the product.</p>
          <h2 className="text-2xl font-semibold text-white">Tax and Legal Responsibility</h2>
          <p>InvoiceWala is not a replacement for a chartered accountant, tax advisor or legal advisor. Confirm GST, tax, filing and compliance decisions with a qualified professional.</p>
          <h2 className="text-2xl font-semibold text-white">Accounts and Security</h2>
          <p>You are responsible for keeping account access secure and for activity performed through your account.</p>
          <h2 className="text-2xl font-semibold text-white">Founding Customer Offer</h2>
          <p>The first 1,000 eligible, genuine customer accounts receive free access to current Founding Pro features. The offer is limited to one spot per user and may exclude duplicate, abusive or automated registrations. Future optional add-ons may have separate terms, but InvoiceWala will not automatically charge or silently convert a founding account into a paid subscription.</p>
          <h2 className="text-2xl font-semibold text-white">Availability</h2>
          <p>We aim to keep InvoiceWala reliable, but access may occasionally be affected by maintenance, infrastructure issues or third-party service interruptions.</p>
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p>For questions about these terms, email support@invoicewala.shop.</p>
        </div>
      </article>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · terms</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
