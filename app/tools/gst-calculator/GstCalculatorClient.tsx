"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import styles from "@/components/tools/GstCalculator.module.css";

const rates = [0, 3, 5, 12, 18, 28, 40];
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

export default function GstCalculatorClient({seoContent}: {seoContent: ReactNode}) {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");
  const [copied, setCopied] = useState(false);
  const [actionError, setActionError] = useState("");
  const inputError = amount.trim() === "" ? "Enter an amount to calculate GST." : !Number.isFinite(Number(amount)) || Number(amount) < 0 || Number(amount) > 1e12 ? "Enter a valid amount between ₹0 and ₹1,00,000 crore." : rate.trim() === "" || !Number.isFinite(Number(rate)) || Number(rate) < 0 || Number(rate) > 100 ? "Enter a GST rate between 0% and 100%." : "";
  const displayMoney = (value: number) => inputError ? "—" : money(value);

  const result = useMemo(() => {
    const rawAmount = Math.max(0, numberValue(amount));
    const gstRate = Math.max(0, numberValue(rate));
    const divisor = 1 + gstRate / 100;
    const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
    const taxable = round(mode === "inclusive" && divisor > 0 ? rawAmount / divisor : rawAmount);
    const tax = round(mode === "inclusive" ? round(rawAmount) - taxable : taxable * (gstRate / 100));
    const total = round(mode === "inclusive" ? rawAmount : taxable + tax);
    const cgst = supplyType === "intra" ? round(tax / 2) : 0;
    const sgst = supplyType === "intra" ? round(tax - cgst) : 0;
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
  const invoiceHref = `/free-invoice?source=gst-calculator&amount=${encodeURIComponent(result.taxable.toFixed(2))}&gstRate=${encodeURIComponent(String(result.rate))}&taxMode=${supplyType}&item=${encodeURIComponent("GST taxable sale")}`;

  async function copyResult() {
    if (inputError) return;
    setActionError("");
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch { setActionError("Copy is unavailable. Download the calculation as CSV instead."); }
  }

  async function shareResult() {
    if (inputError) return;
    setActionError("");
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await navigator.share({ title: "GST calculation", text: shareText }); return; }
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    await copyResult();
  }

  function downloadResult() {
    if (inputError) return;
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
    <main className={`${styles.page} min-h-screen`}>
      <section id="gst-calculator" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-7"><p className="text-xs font-semibold uppercase tracking-widest text-[var(--guide-accent)]">Free GST calculator India</p><h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-[var(--guide-heading)] sm:text-4xl">Add or remove GST online before you create a bill.</h1><p className="mt-3 max-w-3xl text-sm leading-7">Calculate GST-inclusive or GST-exclusive prices with CGST/SGST or IGST split, then move the result into InvoiceWala for branded invoices, payment links and reminders.</p></header>
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className={styles.panel} aria-labelledby="gst-inputs-heading">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 id="gst-inputs-heading" className="text-xl font-semibold text-[var(--guide-heading)]">GST inputs</h2><p className="mt-2 text-sm text-[var(--guide-muted)]">Change any field to update the result instantly.</p></div><span className="rounded-full bg-[var(--guide-soft)] px-3 py-1 text-xs font-semibold text-[var(--guide-accent)]">Live calculation</span></div>
            <div className="mt-6 grid gap-6">
              <label className={styles.field}>Amount (₹)<input aria-label="Amount" aria-invalid={!!inputError && (amount.trim()==="" || Number(amount)<0 || !Number.isFinite(Number(amount)) || Number(amount)>1e12)} inputMode="decimal" type="number" min="0" max="1000000000000" step="0.01" value={amount} onChange={event=>setAmount(event.target.value)} /></label>
              <fieldset><legend className="text-sm font-medium">GST rate</legend><div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">{rates.map(preset=><button key={preset} type="button" aria-pressed={Number(rate)===preset && rate!==""} className={`min-h-11 rounded-lg border px-2 text-sm font-semibold ${Number(rate)===preset && rate!==""?"border-[var(--guide-accent)] bg-[var(--guide-soft)] text-[var(--guide-accent)]":"border-[var(--guide-border)] text-[var(--guide-text)] hover:bg-[var(--guide-soft)]"}`} onClick={()=>setRate(String(preset))}>{preset}%</button>)}</div><label className={`${styles.field} mt-4`}>Custom GST rate (%)<input aria-label="Custom GST rate" type="number" inputMode="decimal" min="0" max="100" step="0.01" value={rate} onChange={event=>setRate(event.target.value)} /></label><p className="mt-3 text-xs leading-6 text-[var(--guide-muted)]">Presets are calculation shortcuts. Confirm the rate applicable to your supply and transaction date; the calculator does not classify goods or services.</p></fieldset>
              <fieldset><legend className="mb-3 text-sm font-medium">Does your amount include GST?</legend><div className="grid grid-cols-2 gap-3"><SegmentedButton active={mode==="exclusive"} label="Add GST" sublabel="Amount excludes tax" onClick={()=>setMode("exclusive")} /><SegmentedButton active={mode==="inclusive"} label="Remove GST" sublabel="Amount includes tax" onClick={()=>setMode("inclusive")} /></div></fieldset>
              <fieldset><legend className="mb-3 text-sm font-medium">Tax breakup</legend><div className="grid grid-cols-2 gap-3"><SegmentedButton active={supplyType==="intra"} label="CGST + SGST" sublabel="Intra-state split" onClick={()=>setSupplyType("intra")} /><SegmentedButton active={supplyType==="inter"} label="IGST" sublabel="Inter-state split" onClick={()=>setSupplyType("inter")} /></div><p className="mt-3 text-xs leading-6 text-[var(--guide-muted)]">Choose the split that applies to your transaction after checking the place of supply.</p></fieldset>
              {inputError && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">{inputError}</p>}
            </div>
          </section>
          <section className={`${styles.panel} lg:sticky lg:top-24`} aria-labelledby="gst-breakdown-heading">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 id="gst-breakdown-heading" className="text-xl font-semibold text-[var(--guide-heading)]">GST breakdown</h2><p className="mt-2 text-sm text-[var(--guide-muted)]">Ready for invoice, quotation or estimate checks.</p></div><span className="rounded-full bg-[var(--guide-soft)] px-3 py-1 text-xs font-semibold text-[var(--guide-accent)]">{mode==="exclusive"?"GST exclusive":"GST inclusive"}</span></div>
            <dl className="mt-6 space-y-3" aria-live="polite"><ResultRow label="Taxable value" value={displayMoney(result.taxable)} /><ResultRow label="Total GST" value={displayMoney(result.tax)} highlight /><div className="grid grid-cols-3 gap-3"><MiniResult label="CGST" value={displayMoney(result.cgst)} /><MiniResult label="SGST" value={displayMoney(result.sgst)} /><MiniResult label="IGST" value={displayMoney(result.igst)} /></div><div className="rounded-2xl bg-blue-700 p-5 text-white"><dt className="text-sm font-medium">Grand total</dt><dd className="mt-2 break-words text-3xl font-semibold tracking-tight sm:text-4xl" data-gst-total>{displayMoney(result.total)}</dd></div></dl>
            {!inputError && <p className="mt-4 text-xs leading-6 text-[var(--guide-muted)]">{mode==="inclusive"?"GST has been separated from the amount you entered.":"GST has been added to the amount you entered."} Amounts are shown to two decimal places.</p>}
            <div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={!!inputError} className={actionClass} onClick={copyResult}>{copied?"Copied":"Copy result"}</button><button type="button" disabled={!!inputError} className={actionClass} onClick={shareResult}>Share</button><button type="button" disabled={!!inputError} className={actionClass} onClick={downloadResult}>Download CSV</button></div>
            <p role="status" className="mt-2 text-xs text-[var(--guide-accent)]">{copied?"GST calculation copied to clipboard.":""}</p>{actionError && <p role="alert" className="mt-3 text-sm">{actionError}</p>}
            <div className="mt-6 border-t border-[var(--guide-border)] pt-5"><h3 className="font-semibold text-[var(--guide-heading)]">Next step</h3><p className="mt-2 text-sm leading-7 text-[var(--guide-muted)]">Save this GST calculation into InvoiceWala to create a branded tax invoice, add payment links and track due reminders.</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><Link aria-disabled={!!inputError} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-4 text-center text-sm font-semibold text-white hover:bg-blue-800 aria-disabled:pointer-events-none aria-disabled:opacity-40" data-event="gst_result_create_invoice_click" data-event-category="funnel" data-event-label={`${result.rate}% ${mode} ${supplyType}`} href={inputError?"#gst-calculator":invoiceHref}>Use this in invoice</Link><Link className={actionClass} href="/tools/invoice-number-generator">Generate invoice number</Link><Link className={`${actionClass} sm:col-span-2`} href="/tools/gst-bill-format-generator">Create GST bill format</Link></div></div>
          </section>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">{[["GST invoice","Use the tax split while creating GST-compliant invoices in InvoiceWala."],["Quotation","Estimate GST before sharing a proposal with your customer."],["Purchase check","Validate vendor GST totals before bookkeeping or expense entry."]].map(([title,body])=><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-5" key={title}><h2 className="font-semibold text-[var(--guide-heading)]">{title}</h2><p className="mt-2 text-sm leading-7 text-[var(--guide-muted)]">{body}</p></article>)}</div>
      </section>
      {seoContent}
      <PublicSiteFooter />
    </main>
  );
}

const actionClass = "inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--guide-border)] bg-[var(--guide-panel)] px-4 py-2 text-center text-sm font-semibold text-[var(--guide-accent)] hover:bg-[var(--guide-soft)] disabled:cursor-not-allowed disabled:opacity-40";

function SegmentedButton({active,label,onClick,sublabel}: {active:boolean;label:string;onClick:()=>void;sublabel:string}) {
  return <button aria-pressed={active} type="button" onClick={onClick} className={`min-w-0 rounded-xl border p-4 text-left ${active?"border-[var(--guide-accent)] bg-[var(--guide-soft)]":"border-[var(--guide-border)] hover:bg-[var(--guide-soft)]"}`}><span className="block text-sm font-semibold text-[var(--guide-heading)]">{label}</span><span className="mt-2 block text-xs leading-5 text-[var(--guide-muted)]">{sublabel}</span></button>;
}
function ResultRow({label,value,highlight=false}: {label:string;value:string;highlight?:boolean}) {
  return <div className={`flex min-w-0 items-center justify-between gap-4 rounded-xl border border-[var(--guide-border)] p-4 ${highlight?"bg-[var(--guide-soft)]":""}`}><dt className="text-sm text-[var(--guide-muted)]">{label}</dt><dd className="break-words text-right text-lg font-semibold text-[var(--guide-heading)]">{value}</dd></div>;
}
function MiniResult({label,value}: {label:string;value:string}) {
  return <div className="min-w-0 rounded-xl border border-[var(--guide-border)] p-3"><dt className="text-xs font-semibold text-[var(--guide-muted)]">{label}</dt><dd className="mt-2 break-words text-sm font-semibold text-[var(--guide-heading)] sm:text-base">{value}</dd></div>;
}
