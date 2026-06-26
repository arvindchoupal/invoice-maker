"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicToolNavActions } from "@/components/PublicToolNavActions";
import { HSN_DATA_LAST_REVIEWED, HSN_SAC_CATEGORIES, HSN_SAC_ENTRIES } from "@/lib/hsn-sac-data";

type Props = { faqs: Array<[string, string]> };
type TypeFilter = "All" | "HSN" | "SAC";

function getInitialFilters() {
  if (typeof window === "undefined") return { query: "", type: "All" as TypeFilter };
  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get("type");
  return {
    query: params.get("q") ?? "",
    type: requestedType === "HSN" || requestedType === "SAC" ? requestedType : ("All" as TypeFilter),
  };
}

export default function HsnCodeFinderClient({ faqs }: Props) {
  const [query, setQuery] = useState(() => getInitialFilters().query);
  const [type, setType] = useState<TypeFilter>(() => getInitialFilters().type);
  const [category, setCategory] = useState("All");
  const [rate, setRate] = useState("All");
  const [copiedCode, setCopiedCode] = useState("");
  const [shared, setShared] = useState(false);

  const filteredResults = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return HSN_SAC_ENTRIES.filter((entry) => {
      if (type !== "All" && entry.type !== type) return false;
      if (category !== "All" && entry.category !== category) return false;
      if (rate !== "All" && entry.rate !== rate) return false;
      if (!terms.length) return true;
      const haystack = [entry.code, entry.description, entry.category, ...entry.keywords].join(" ").toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [category, query, rate, type]);
  const results = filteredResults.slice(0, 60);

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    window.setTimeout(() => setCopiedCode(""), 1800);
  }

  function resetFilters() {
    setQuery("");
    setType("All");
    setCategory("All");
    setRate("All");
  }

  async function shareSearch() {
    const url = new URL(window.location.href);
    url.search = "";
    if (query.trim()) url.searchParams.set("q", query.trim());
    if (type !== "All") url.searchParams.set("type", type);
    await navigator.clipboard.writeText(url.toString());
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_30%)] px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicToolNavActions signupSource="hsn-code-finder" />
        </nav>

        <div className="mx-auto max-w-7xl py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Free GST classification tool</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">HSN Code Finder and SAC Code Search</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Search common Indian HSN codes for goods and SAC codes for services by product name, profession, category or code. Copy the closest match, then verify it before filing.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">{HSN_SAC_ENTRIES.length}+ searchable entries</span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">HSN chapters + common headings</span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">Reviewed {HSN_DATA_LAST_REVIEWED}</span>
          </div>

          <div className="mt-9 rounded-3xl border border-white/10 bg-white/[0.055] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
            <label className="block">
              <span className="sr-only">Search HSN or SAC code</span>
              <input
                autoFocus
                className="min-h-14 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-5 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10 sm:text-lg"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: laptop, software development, rice, electrician, 998314..."
                type="search"
                value={query}
              />
            </label>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <Filter label="Code type" onChange={setType} options={["All", "HSN", "SAC"]} value={type} />
              <Filter label="Category" onChange={setCategory} options={["All", ...HSN_SAC_CATEGORIES]} value={category} />
              <Filter label="Indicative rate" onChange={setRate} options={["All", "0%", "3%", "5%", "12%", "18%", "28%", "Varies"]} value={rate} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Popular</span>
              {["laptop", "software development", "rice", "t-shirt", "consulting", "electrician"].map((term) => (
                <button className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100" key={term} onClick={() => setQuery(term)} type="button">{term}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{filteredResults.length} matches</p>
              <h2 className="mt-2 text-2xl font-semibold">Matching HSN and SAC codes</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="text-left text-sm font-semibold text-cyan-300 underline-offset-4 hover:text-cyan-100 hover:underline" onClick={shareSearch} type="button">{shared ? "Search link copied" : "Share this search"}</button>
              <button className="text-left text-sm font-semibold text-slate-400 underline-offset-4 hover:text-white hover:underline" onClick={resetFilters} type="button">Clear filters</button>
            </div>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {results.map((entry) => (
                <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/25 hover:bg-white/[0.065]" key={`${entry.type}-${entry.code}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-200 ring-1 ring-cyan-300/20">{entry.type}</span>
                        {entry.level ? <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/10">{entry.level}</span> : null}
                        <span className="text-xs font-semibold text-slate-500">{entry.category}</span>
                      </div>
                      <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{entry.code}</p>
                    </div>
                    <button className="shrink-0 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10" onClick={() => copyCode(entry.code)} type="button">
                      {copiedCode === entry.code ? "Copied" : "Copy code"}
                    </button>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-6 text-white">{entry.description}</h3>
                  <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
                    <span className="text-sm text-slate-400">Indicative GST rate</span>
                    <span className={`text-sm font-bold ${entry.rate === "Varies" ? "text-amber-300" : "text-emerald-300"}`}>{entry.rate}</span>
                  </div>
                  {entry.note ? <p className="mt-3 text-xs leading-5 text-amber-200/75">{entry.note}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
              <h3 className="text-xl font-semibold">No close match found</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">Try a broader product or service name. You can also search directly on the official GST portal for the complete classification database.</p>
            </div>
          )}
          {filteredResults.length > results.length ? <p className="mt-5 text-center text-sm text-slate-500">Showing the first {results.length} matches. Add a product name, service or code to narrow the results.</p> : null}

          <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
            <h2 className="font-semibold text-amber-100">Verify before using the code in a GST return</h2>
            <p className="mt-2 text-sm leading-6 text-amber-100/70">
              This finder is a practical starting point, not tax advice. The exact code and rate may depend on composition, packaging, value, use, exemptions and current notifications.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="rounded-xl bg-amber-200 px-4 py-2.5 text-sm font-semibold text-slate-950" href="https://services.gst.gov.in/services/searchhsnsac" rel="noreferrer" target="_blank">Verify on GST Portal</a>
              <a className="rounded-xl border border-amber-200/20 px-4 py-2.5 text-sm font-semibold text-amber-100" href="https://cbic-gst.gov.in/gst-goods-services-rates.html" rel="noreferrer" target="_blank">Check CBIC rates</a>
              <a className="rounded-xl border border-amber-200/20 px-4 py-2.5 text-sm font-semibold text-amber-100" href="https://taxinformation.cbic.gov.in/" rel="noreferrer" target="_blank">CBIC Tax Information Portal</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["HSN for goods", "HSN codes classify products such as food, apparel, electronics, furniture and construction materials."],
            ["SAC for services", "SAC codes classify services such as consulting, software development, advertising, repair and transport."],
            ["Use it in billing", "After verification, add the code to your GST invoice item row with taxable value and the correct GST rate."],
          ].map(([title, body]) => <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-5" key={title}><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></article>)}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">Transparent methodology</p>
            <h2 className="mt-3 text-2xl font-semibold">How this HSN/SAC finder is maintained</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              The database combines broad HSN chapter navigation with commonly searched goods and service headings. Search synonyms are added for everyday Indian business language. Rates are labelled indicative or “Varies” because detailed classification and current notifications control the final treatment.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric label="Searchable entries" value={`${HSN_SAC_ENTRIES.length}+`} />
              <Metric label="Last reviewed" value={HSN_DATA_LAST_REVIEWED} />
              <Metric label="Primary verification" value="GST + CBIC portals" />
            </div>
            <Link className="mt-5 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-100" href="/tools/hsn-code-finder/methodology">Read full methodology and correction policy →</Link>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
            {faqs.map(([question, answer]) => <article className="p-6" key={question}><h3 className="font-semibold">{question}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{answer}</p></article>)}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-semibold hover:border-cyan-300/30" href="/tools/gst-calculator">GST calculator</Link>
            <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-semibold hover:border-cyan-300/30" href="/gst-invoice-generator">GST invoice generator</Link>
            <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-semibold hover:border-cyan-300/30" href="/tax-invoice-format">Tax invoice format</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p><p className="mt-2 text-sm font-semibold text-white">{value}</p></div>;
}

function Filter({ label, onChange, options, value }: { label: string; onChange: (value: never) => void; options: string[]; value: string }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {label}
      <select className="min-h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm font-medium normal-case tracking-normal text-white outline-none focus:border-cyan-300/60" onChange={(event) => onChange(event.target.value as never)} value={value}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
