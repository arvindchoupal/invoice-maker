import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Privacy Policy | InvoiceWala",
  description: "Read InvoiceWala's privacy policy for invoice, billing and business tool users.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>
      </section>
      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: 11 June 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <p>InvoiceWala collects information needed to provide invoice creation, billing, document generation, account access and related business workflows.</p>
          <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
          <p>This may include account details, invoice details, client details, business information, uploaded files, payment status data, usage events and support messages.</p>
          <h2 className="text-2xl font-semibold text-white">How We Use Information</h2>
          <p>We use information to provide the product, save documents, generate PDFs, improve features, support users, secure accounts and communicate important product updates.</p>
          <h2 className="text-2xl font-semibold text-white">Data Sharing</h2>
          <p>We do not sell personal information. We may use trusted service providers for hosting, analytics, payments, email and infrastructure where needed to operate InvoiceWala.</p>
          <h2 className="text-2xl font-semibold text-white">Your Choices</h2>
          <p>You can contact us to request account help, data correction or deletion where applicable. Some records may need to be retained for legal, security or operational reasons.</p>
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p>For privacy questions, email support@invoicewala.shop.</p>
        </div>
      </article>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · privacy</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
