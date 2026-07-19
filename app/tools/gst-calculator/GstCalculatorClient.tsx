"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicToolNavActions } from "@/components/PublicToolNavActions";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { gstCalculatorSeoContent } from "@/lib/tool-seo-content";

const rates = [0, 3, 5, 12, 18, 28];
const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function money(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function GstCalculatorClient() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const rawAmount = Math.max(0, numberValue(amount));
    const gstRate = Math.max(0, numberValue(rate));
    const divisor = 1 + gstRate / 100;
    const taxable = mode === "inclusive" && divisor > 0 ? rawAmount / divisor : rawAmount;
    const tax = taxable * (gstRate / 100);
    const total = mode === "inclusive" ? rawAmount : taxable + tax;
    const cgst = supplyType === "intra" ? tax / 2 : 0;
    const sgst = supplyType === "intra" ? tax / 2 : 0;
    const igst = supplyType === "inter" ? tax : 0;

    return {
      taxable,
      tax,
      total,
      cgst,
      sgst,
      igst,
      rate: gstRate,
      amount: rawAmount,
    };
  }, [amount, mode, rate, supplyType]);

  const shareText = `InvoiceWala GST calculation: ${mode === "inclusive" ? "Inclusive" : "Exclusive"} GST at ${result.rate}% on ${money(result.amount)}. Taxable value ${money(result.taxable)}, GST ${money(result.tax)}, total ${money(result.total)}.`;
  const invoiceHref = `/free-invoice?source=gst-calculator&amount=${encodeURIComponent(result.taxable.toFixed(2))}&gstRate=${encodeURIComponent(String(result.rate))}&item=${encodeURIComponent("GST taxable sale")}`;

  async function shareResult() {
    setCopied(false);
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "GST calculation", text: shareText });
        return;
      } catch {
        // User cancelled native share; fall through to clipboard.
      }
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  function downloadResult() {
    const rows = [
      ["Mode", mode],
      ["Supply type", supplyType === "intra" ? "Intra-state" : "Inter-state"],
      ["Input amount", result.amount.toFixed(2)],
      ["GST rate", `${result.rate}%`],
      ["Taxable amount", result.taxable.toFixed(2)],
      ["CGST", result.cgst.toFixed(2)],
      ["SGST", result.sgst.toFixed(2)],
      ["IGST", result.igst.toFixed(2)],
      ["Total GST", result.tax.toFixed(2)],
      ["Grand total", result.total.toFixed(2)],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "invoicewala-gst-calculation.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_30%)] px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicToolNavActions signupSource="gst-calculator" />
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-10 sm:py-12 xl:grid-cols-[minmax(0,0.82fr)_minmax(620px,0.98fr)] xl:items-start">
          <div className="xl:sticky xl:top-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Free GST calculator India</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl xl:text-5xl">Add or remove GST online before you create a bill.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Calculate GST-inclusive or GST-exclusive prices with CGST/SGST or IGST split, then move the result into InvoiceWala for branded invoices, payment links and reminders.
            </p>
            <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
              {["Add GST to a base price", "Remove GST from an inclusive price", "Built for GST bills, invoices and quotations"].map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full min-w-0 rounded-3xl border border-white/10 bg-white/[0.05] p-2 shadow-2xl shadow-black/30 backdrop-blur sm:p-3">
            <div className="grid min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/85 xl:grid-cols-[minmax(260px,0.85fr)_minmax(340px,1.15fr)]">
              <section className="min-w-0 border-b border-white/10 p-4 sm:p-5 xl:border-b-0 xl:border-r">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">GST inputs</h2>
                    <p className="mt-1 text-sm text-slate-400">Change any field to update the result instantly.</p>
                  </div>
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-300/20">Live</span>
                </div>

                <div className="mt-5 grid gap-4">
                  <label className="grid gap-2 text-sm font-medium text-slate-200">
                    Amount
                    <input
                      className="min-h-12 w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-base text-white outline-none transition focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
                      inputMode="decimal"
                      min="0"
                      onChange={(event) => setAmount(event.target.value)}
                      type="number"
                      value={amount}
                    />
                  </label>

                  <div>
                    <p className="text-sm font-medium text-slate-200">GST rate</p>
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6 xl:grid-cols-3 2xl:grid-cols-5">
                      {rates.map((preset) => (
                        <button
                          className={`min-h-10 rounded-xl border px-2 text-sm font-semibold transition ${
                            Number(rate) === preset
                              ? "border-cyan-300/70 bg-cyan-300 text-slate-950"
                              : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                          }`}
                          key={preset}
                          onClick={() => setRate(String(preset))}
                          type="button"
                        >
                          {preset}%
                        </button>
                      ))}
                    </div>
                    <input
                      className="mt-3 min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
                      inputMode="decimal"
                      min="0"
                      onChange={(event) => setRate(event.target.value)}
                      type="number"
                      value={rate}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <SegmentedButton active={mode === "exclusive"} label="Add GST" onClick={() => setMode("exclusive")} sublabel="Amount excludes tax" />
                    <SegmentedButton active={mode === "inclusive"} label="Remove GST" onClick={() => setMode("inclusive")} sublabel="Amount includes tax" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <SegmentedButton active={supplyType === "intra"} label="CGST + SGST" onClick={() => setSupplyType("intra")} sublabel="Same state supply" />
                    <SegmentedButton active={supplyType === "inter"} label="IGST" onClick={() => setSupplyType("inter")} sublabel="Different state supply" />
                  </div>
                </div>
              </section>

              <section className="min-w-0 p-4 sm:p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-lg font-semibold">GST breakdown</h2>
                    <p className="mt-1 text-sm text-slate-400">Ready for invoice, quotation or estimate checks.</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10" onClick={shareResult} type="button">
                      {copied ? "Copied" : "Share"}
                    </button>
                    <button className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10" onClick={downloadResult} type="button">
                      Download
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <ResultRow label="Taxable value" value={money(result.taxable)} />
                  <ResultRow label="Total GST" value={money(result.tax)} highlight />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <MiniResult label="CGST" value={money(result.cgst)} />
                    <MiniResult label="SGST" value={money(result.sgst)} />
                    <MiniResult label="IGST" value={money(result.igst)} />
                  </div>
                  <div className="rounded-2xl bg-cyan-300 p-5 text-slate-950 shadow-xl shadow-cyan-950/30">
                    <p className="text-sm font-semibold text-slate-700">Grand total</p>
                    <p className="mt-2 break-words text-3xl font-semibold tracking-tight sm:text-4xl">{money(result.total)}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <h3 className="font-semibold text-white">Next step</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Save this GST calculation into InvoiceWala to create a branded tax invoice, add payment links and track due reminders.
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Link
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-center text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                      data-event="gst_result_create_invoice_click"
                      data-event-category="funnel"
                      data-event-label={`${result.rate}% ${mode} ${supplyType}`}
                      href={invoiceHref}
                    >
                      Use this in invoice
                    </Link>
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-center text-sm font-semibold text-white transition hover:bg-white/10" href="/tools/invoice-number-generator">
                      Generate invoice number
                    </Link>
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:col-span-2" href="/tools/gst-bill-format-generator">
                      Create GST bill format
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["GST invoice", "Use the tax split while creating GST-compliant invoices in InvoiceWala."],
            ["Quotation", "Estimate GST before sharing a proposal with your customer."],
            ["Purchase check", "Validate vendor GST totals before bookkeeping or expense entry."],
          ].map(([title, body]) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}>
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <ToolSeoContent content={gstCalculatorSeoContent} />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Link
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950"
            data-event="mobile_sticky_gst_result_invoice_click"
            data-event-category="funnel"
            data-event-label={`${result.rate}% ${mode}`}
            href={invoiceHref}
          >
            Use in invoice
          </Link>
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-4 text-sm font-semibold text-white"
            data-event="mobile_sticky_gst_share_click"
            data-event-category="engagement"
            onClick={shareResult}
            type="button"
          >
            Share
          </button>
        </div>
      </div>
    </main>
  );
}

function SegmentedButton({
  active,
  label,
  onClick,
  sublabel,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  sublabel: string;
}) {
  return (
    <button
      className={`min-w-0 rounded-2xl border p-4 text-left transition ${
        active ? "border-cyan-300/70 bg-cyan-300/12 text-white shadow-lg shadow-cyan-950/20" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span className="mt-1 block text-xs text-slate-400">{sublabel}</span>
    </button>
  );
}

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center justify-between gap-4 rounded-2xl border p-4 ${highlight ? "border-cyan-300/25 bg-cyan-300/10" : "border-white/10 bg-white/[0.04]"}`}>
      <span className="text-sm text-slate-400">{label}</span>
      <span className="break-words text-right text-lg font-semibold text-white">{value}</span>
    </div>
  );
}

function MiniResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-base font-semibold text-white">{value}</p>
    </div>
  );
}
