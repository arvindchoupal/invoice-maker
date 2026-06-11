import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Contact InvoiceWala | Support and Business Enquiries",
  description:
    "Contact InvoiceWala for support, billing questions, product feedback and business enquiries.",
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact InvoiceWala",
        url: `${siteUrl}/contact`,
      }} />
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Need help with InvoiceWala?</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          For support, product feedback, billing questions or business enquiries, reach the InvoiceWala team by email.
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-slate-400">Support email</p>
          <a className="mt-2 block text-2xl font-semibold text-cyan-300" href="mailto:support@invoicewala.shop">support@invoicewala.shop</a>
          <p className="mt-4 text-sm leading-6 text-slate-400">We usually recommend including your account email, invoice number if relevant, and a short description of the issue.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950" href="/free-invoice">Create free invoice</Link>
          <Link className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white" href="/pricing">View pricing</Link>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · contact</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
