import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Refund Policy | InvoiceWala",
  description: "Read InvoiceWala's refund and cancellation policy for paid plans and billing questions.",
  alternates: { canonical: `${siteUrl}/refund-policy` },
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions />
        </nav>
      </section>
      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Refunds</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Refund Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: 11 June 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <p>InvoiceWala is currently early-stage software. We want billing to be simple and fair for freelancers and small businesses.</p>
          <h2 className="text-2xl font-semibold text-white">Free Plan</h2>
          <p>Free tools and free plan usage do not require a refund because no payment is collected for those workflows.</p>
          <h2 className="text-2xl font-semibold text-white">Paid Plans</h2>
          <p>If a paid plan is active, cancellation stops future renewal where supported. Refund requests are reviewed case by case depending on payment status, usage and billing issue.</p>
          <h2 className="text-2xl font-semibold text-white">Billing Issues</h2>
          <p>If you believe you were charged incorrectly, contact us with your account email, payment reference and issue details.</p>
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p>For refund or cancellation questions, email support@invoicewala.shop.</p>
        </div>
      </article>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · refund policy</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
