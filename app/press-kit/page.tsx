import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo-schemas";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "InvoiceWala Press Kit | Product Facts, Logo and Links",
  description: "Official InvoiceWala product facts, approved descriptions, logo, screenshots checklist and press contact information.",
  alternates: { canonical: `${siteUrl}/press-kit` },
};

const facts = [
  ["Product", "InvoiceWala"],
  ["Founder", "Arvind Choupal"],
  ["Founder role", "Founder & Product Developer"],
  ["Location", "India"],
  ["Category", "Invoicing and small-business utilities"],
  ["Status", "Early access"],
  ["Platform", "Web"],
  ["Launch offer", "First 1,000 customers receive a free Founding Pro account"],
  ["Audience", "Freelancers, contractors, agencies and small businesses"],
];

const links = [
  ["/tools", "Free business tools"],
  ["/tools/hsn-code-finder", "HSN and SAC Code Finder"],
  ["/free-invoice-generator", "Free invoice generator"],
  ["/tools/gst-calculator", "GST calculator"],
  ["/tools/payment-reminder-generator", "Payment reminder generator"],
  ["/pricing", "Founding customer offer"],
];

export default function PressKitPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: siteUrl },
        { name: "Press Kit", url: `${siteUrl}/press-kit` },
      ])} />
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <BrandLogo href="/" imageClassName="h-10 w-10" tagline="" />
        <Link className="text-sm font-semibold text-cyan-300" href="/contact">Contact</Link>
      </nav>

      <article className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Official resources</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">InvoiceWala press and submission kit</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Approved product facts, descriptions, brand assets and links for journalists, directories, partners and reviewers.
        </p>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <Image className="h-36 w-36 rounded-3xl object-contain" src="/logo.png" alt="InvoiceWala logo" width={288} height={288} />
            <h2 className="mt-6 text-2xl font-semibold">Brand logo</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Use the logo without stretching, recolouring or adding effects.</p>
            <a className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950" href="/logo.png">Open high-resolution logo</a>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Product facts</h2>
            <div className="mt-5 divide-y divide-white/10">
              {facts.map(([label, value]) => <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]" key={label}><span className="text-sm text-slate-500">{label}</span><span className="text-sm font-semibold text-slate-200">{value}</span></div>)}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">Approved description</p>
          <h2 className="mt-3 text-3xl font-semibold">What is InvoiceWala?</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            InvoiceWala is a lightweight invoicing and business utility platform for freelancers, contractors and small businesses. It combines invoice creation with free GST calculators, an HSN/SAC finder, quotations, receipts, purchase orders, payment reminders and practical billing guides.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Public tools can be used without login, while an account adds saved invoices, client records, payment tracking, reminders and lightweight reporting.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">Founder</p>
          <h2 className="mt-3 text-3xl font-semibold">Arvind Choupal</h2>
          <p className="mt-2 text-sm font-semibold text-slate-400">Founder & Product Developer · India</p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Arvind Choupal is the founder and product developer behind InvoiceWala. He builds practical web tools that help freelancers and small businesses create invoices, manage GST workflows and follow up on payments without complicated accounting software.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Key product links</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(([href, label]) => <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-white" href={href} key={href}>{label}</Link>)}
          </div>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["Utility-first", "Users can complete practical billing and calculation tasks before creating an account."],
            ["Connected workflow", "Quotation, invoice, receipt and payment reminders are designed as connected jobs."],
            ["Global + India depth", "Global English invoicing is paired with specialist India GST utilities."],
          ].map(([title, body]) => <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>)}
        </section>

        <section className="mt-12 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Press and partnership contact</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">For product details, screenshots, founder comments, directory verification or partnerships:</p>
          <a className="mt-4 inline-flex text-lg font-semibold text-cyan-300" href="mailto:support@invoicewala.shop">support@invoicewala.shop</a>
        </section>
      </article>
    </main>
  );
}
