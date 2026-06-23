import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo-schemas";
import { HSN_DATA_LAST_REVIEWED, HSN_SAC_ENTRIES } from "@/lib/hsn-sac-data";

export const metadata: Metadata = {
  title: "HSN Finder Methodology, Sources and Correction Policy",
  description: "See how InvoiceWala builds, reviews and corrects its HSN and SAC code search database, including official GST and CBIC verification sources.",
  alternates: { canonical: "https://invoicewala.shop/tools/hsn-code-finder/methodology" },
};

export default function HsnMethodologyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://invoicewala.shop" },
        { name: "HSN Code Finder", url: "https://invoicewala.shop/tools/hsn-code-finder" },
        { name: "Methodology", url: "https://invoicewala.shop/tools/hsn-code-finder/methodology" },
      ])} />
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
        <Link className="text-sm font-semibold text-cyan-300" href="/tools/hsn-code-finder">Open finder</Link>
      </nav>
      <article className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Data transparency</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">HSN/SAC Finder methodology and correction policy</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">InvoiceWala is designed to help users discover likely classifications—not replace the official tariff, GST notifications or professional advice.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Entries" value={`${HSN_SAC_ENTRIES.length}+`} />
          <Stat label="Reviewed" value={HSN_DATA_LAST_REVIEWED} />
          <Stat label="Coverage" value="Goods + services" />
        </div>

        <div className="mt-12 grid gap-8 text-sm leading-7 text-slate-300">
          <Section title="What the database contains">
            It includes broad two-digit HSN chapters, commonly searched four-digit goods headings and high-demand SAC service groups. Everyday synonyms such as laptop, atta, web developer and electrician are mapped to help non-specialists find a starting point.
          </Section>
          <Section title="How rates are shown">
            Rates are intentionally labelled indicative. “Varies” is used whenever a chapter or heading can contain multiple rates, exemptions or conditional treatments. Product composition, packaging, value, recipient, use and later notifications may change the final GST treatment.
          </Section>
          <Section title="Primary verification sources">
            Verify a result using the <a className="font-semibold text-cyan-300" href="https://services.gst.gov.in/services/searchhsnsac" rel="noreferrer" target="_blank">GST Portal HSN/SAC search</a>, the <a className="font-semibold text-cyan-300" href="https://taxinformation.cbic.gov.in/" rel="noreferrer" target="_blank">CBIC Tax Information Portal</a> and current notifications. The older CBIC rates page now directs users to its Tax Information Portal and displays a last-updated date of 11 June 2026.
          </Section>
          <Section title="Review and correction policy">
            High-demand entries are reviewed when official classifications or rate notifications change, and the public review date is updated only after a source check. If an entry appears incorrect, send the code, description, source link and suggested correction through the InvoiceWala contact page. Corrections should be supported by an official source.
          </Section>
          <Section title="Limitations">
            This is an educational discovery tool. It does not determine classification for disputes, customs, filing or Input Tax Credit eligibility. Consult a qualified tax professional when classification affects a return, contract or material tax liability.
          </Section>
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6">
          <h2 className="text-xl font-semibold">Suggest a sourced correction</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Include the code, current description, proposed correction and an official GST/CBIC source URL.</p>
          <Link className="mt-4 inline-flex rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950" href="/contact">Contact InvoiceWala</Link>
        </div>
      </article>
    </main>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return <section><h2 className="text-2xl font-semibold text-white">{title}</h2><p className="mt-3">{children}</p></section>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p><p className="mt-2 text-lg font-semibold">{value}</p></div>;
}
