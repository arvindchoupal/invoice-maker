"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type Severity = "pass" | "warning" | "error";
type Check = { severity: Severity; title: string; body: string };
type TaxMode = "cgst-sgst" | "igst";

const fieldClass = "mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-cyan-300/60";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-400";
const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

function closeEnough(actual: number, expected: number) {
  return Math.abs(actual - expected) <= 1;
}

export default function GstInvoiceValidatorClient() {
  const [data, setData] = useState({ sellerName: "Your Business", sellerGstin: "", buyerName: "Customer Name", buyerGstin: "", invoiceNumber: "INV-2026-001", invoiceDate: new Date().toISOString().slice(0, 10), placeOfSupply: "", hsnSac: "", taxableValue: 10000, taxRate: 18, cgst: 900, sgst: 900, igst: 0, total: 11800 });
  const [taxMode, setTaxMode] = useState<TaxMode>("cgst-sgst");

  const checks = useMemo<Check[]>(() => {
    const expectedTax = Number(data.taxableValue || 0) * Number(data.taxRate || 0) / 100;
    const actualTax = taxMode === "igst" ? Number(data.igst || 0) : Number(data.cgst || 0) + Number(data.sgst || 0);
    const expectedTotal = Number(data.taxableValue || 0) + actualTax;
    const result: Check[] = [];
    result.push(data.sellerName.trim() ? { severity: "pass", title: "Seller name present", body: "The supplier name field is filled." } : { severity: "error", title: "Seller name missing", body: "Add the legal or trade name of the supplier." });
    result.push(gstinPattern.test(data.sellerGstin.trim().toUpperCase()) ? { severity: "pass", title: "Seller GSTIN format looks valid", body: "The value matches the 15-character GSTIN structure." } : { severity: "error", title: "Check seller GSTIN", body: "Enter a 15-character GSTIN in uppercase. This checks format only, not registration status." });
    if (data.buyerGstin.trim()) result.push(gstinPattern.test(data.buyerGstin.trim().toUpperCase()) ? { severity: "pass", title: "Buyer GSTIN format looks valid", body: "The entered buyer GSTIN matches the expected structure." } : { severity: "error", title: "Check buyer GSTIN", body: "The buyer GSTIN is present but does not match the expected 15-character structure." });
    else result.push({ severity: "warning", title: "Buyer GSTIN not entered", body: "This can be appropriate for an unregistered buyer, but confirm whether the transaction requires it." });
    result.push(data.invoiceNumber.trim() ? { severity: "pass", title: "Invoice number present", body: "Keep invoice numbering unique and consistent in your records." } : { severity: "error", title: "Invoice number missing", body: "Add a unique invoice number." });
    result.push(data.invoiceDate ? { severity: "pass", title: "Invoice date present", body: "The invoice has an issue date." } : { severity: "error", title: "Invoice date missing", body: "Add the actual issue date." });
    result.push(data.placeOfSupply.trim() ? { severity: "pass", title: "Place of supply recorded", body: "Use it with the supplier location to confirm the correct tax treatment." } : { severity: "warning", title: "Place of supply missing", body: "Record the applicable state or place-of-supply detail before choosing CGST/SGST or IGST." });
    result.push(data.hsnSac.trim() ? { severity: "pass", title: "HSN/SAC entered", body: "Confirm that the code and rate match the actual goods or services." } : { severity: "warning", title: "HSN/SAC not entered", body: "Check whether the transaction requires classification details." });
    result.push(closeEnough(actualTax, expectedTax) ? { severity: "pass", title: "Tax amount matches the rate", body: `Expected tax is approximately INR ${expectedTax.toFixed(2)}.` } : { severity: "error", title: "Tax calculation mismatch", body: `At ${data.taxRate}% on INR ${data.taxableValue}, tax is approximately INR ${expectedTax.toFixed(2)}, not INR ${actualTax.toFixed(2)}.` });
    if (taxMode === "cgst-sgst") result.push(closeEnough(Number(data.cgst), Number(data.sgst)) ? { severity: "pass", title: "CGST and SGST are evenly split", body: "The entered central and state tax amounts match each other." } : { severity: "warning", title: "CGST and SGST split differs", body: "For a normal equal split, the two components usually match. Confirm the actual treatment." });
    result.push(closeEnough(Number(data.total), expectedTotal) ? { severity: "pass", title: "Invoice total adds up", body: "Taxable value plus entered tax matches the total." } : { severity: "error", title: "Invoice total mismatch", body: `Based on the entered taxable value and tax, the total should be approximately INR ${expectedTotal.toFixed(2)}.` });
    return result;
  }, [data, taxMode]);
  const summary = checks.reduce((acc, check) => ({ ...acc, [check.severity]: acc[check.severity] + 1 }), { pass: 0, warning: 0, error: 0 });

  function update(key: keyof typeof data, value: string | number) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6" id="gst-validator-tool"><div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Invoice checklist</p><h2 className="mt-3 text-3xl font-semibold">Enter the invoice values to review</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{([ ["sellerName", "Seller name"], ["sellerGstin", "Seller GSTIN"], ["buyerName", "Buyer name"], ["buyerGstin", "Buyer GSTIN (if registered)"], ["invoiceNumber", "Invoice number"], ["invoiceDate", "Invoice date", "date"], ["placeOfSupply", "Place of supply"], ["hsnSac", "HSN / SAC"] ] as Array<[keyof typeof data, string, string?]>).map(([key, label, type]) => <label key={key}><span className={labelClass}>{label}</span><input className={fieldClass} type={type || "text"} value={data[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div><div className="mt-5"><span className={labelClass}>Tax treatment entered on invoice</span><div className="mt-2 grid grid-cols-2 gap-3">{([ ["cgst-sgst", "CGST + SGST"], ["igst", "IGST"] ] as Array<[TaxMode, string]>).map(([value, label]) => <button className={`min-h-11 rounded-xl border px-3 text-sm font-semibold ${taxMode === value ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 bg-slate-950/70 text-slate-300"}`} key={value} onClick={() => setTaxMode(value)} type="button">{label}</button>)}</div></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{([ ["taxableValue", "Taxable value"], ["taxRate", "GST rate %"], ...(taxMode === "cgst-sgst" ? [["cgst", "CGST amount"], ["sgst", "SGST amount"]] : [["igst", "IGST amount"]]), ["total", "Invoice total"] ] as Array<[keyof typeof data, string]>).map(([key, label]) => <label key={key}><span className={labelClass}>{label}</span><input className={fieldClass} min="0" step="0.01" type="number" value={data[key]} onChange={(event) => update(key, Number(event.target.value))} /></label>)}</div><div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-xs leading-5 text-amber-100">This tool checks entered formats and arithmetic only. It does not query the GST portal, confirm registration status, determine the legal place of supply or certify compliance.</div></div><aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"><div className="grid grid-cols-3 gap-3">{([ ["pass", summary.pass, "Pass"], ["warning", summary.warning, "Warnings"], ["error", summary.error, "Errors"] ] as const).map(([severity, count, label]) => <div className="rounded-2xl bg-slate-950/60 p-3 text-center" key={severity}><p className={`text-2xl font-bold ${severity === "pass" ? "text-emerald-300" : severity === "warning" ? "text-amber-300" : "text-red-300"}`}>{count}</p><p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{label}</p></div>)}</div><div className="mt-5 grid gap-3">{checks.map((check) => { const Icon = check.severity === "pass" ? CheckCircle2 : check.severity === "warning" ? AlertTriangle : XCircle; return <div className={`flex gap-3 rounded-2xl border p-4 ${check.severity === "pass" ? "border-emerald-400/20 bg-emerald-400/5" : check.severity === "warning" ? "border-amber-300/20 bg-amber-300/5" : "border-red-400/20 bg-red-400/5"}`} key={check.title}><Icon className={`mt-0.5 h-5 w-5 shrink-0 ${check.severity === "pass" ? "text-emerald-300" : check.severity === "warning" ? "text-amber-300" : "text-red-300"}`} /><div><h3 className="text-sm font-semibold text-white">{check.title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{check.body}</p></div></div>; })}</div></aside></div></section>;
}
