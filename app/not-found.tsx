import Link from "next/link";
import { ArrowRight, FileText, Search } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const helpfulLinks = [
  { href: "/free-invoice", label: "Create free invoice", body: "Start with the invoice maker and preview your bill before signup." },
  { href: "/invoice-templates", label: "Browse invoice templates", body: "Find GST-ready invoice formats by profession and business type." },
  { href: "/tools/gst-calculator", label: "GST calculator", body: "Calculate GST, CGST, SGST and IGST before creating the invoice." },
  { href: "/gst-invoice-format", label: "GST invoice format", body: "Understand mandatory GST invoice fields with sample format." },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-5 py-6 sm:px-6">
        <nav className="flex items-center justify-between">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950" data-event="not_found_home_click" data-event-category="navigation" href="/">
            Home
          </Link>
        </nav>

        <div className="py-16 text-center sm:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-300/10 ring-1 ring-cyan-300/20">
            <Search className="h-7 w-7 text-cyan-300" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Page not found</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            This invoice page moved, but the useful tools are still here.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Try the invoice maker, GST calculator or template library. These pages help users continue instead of leaving from a broken URL.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-bold text-slate-950 hover:bg-cyan-200" data-event="not_found_create_invoice_click" data-event-category="cta" href="/free-invoice">
              Create invoice <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white hover:bg-white/10" data-event="not_found_templates_click" data-event-category="navigation" href="/invoice-templates">
              <FileText className="h-4 w-4" /> Browse templates
            </Link>
          </div>
        </div>

        <div className="grid gap-4 pb-16 md:grid-cols-2">
          {helpfulLinks.map((link) => (
            <Link className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30" data-event="not_found_helpful_link_click" data-event-category="engagement" data-event-label={link.href} href={link.href} key={link.href}>
              <h2 className="text-lg font-semibold group-hover:text-cyan-200">{link.label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{link.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
