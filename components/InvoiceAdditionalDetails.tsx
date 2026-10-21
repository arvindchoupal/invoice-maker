"use client";
import type { Invoice, TaxMode } from "@/types";
import { Field, inputClass } from "@/components/ui";

type DetailKey = "taxMode" | "amountPaid" | "supplierState" | "customerState" | "placeOfSupply" | "shippingAddress";

export function InvoiceAdditionalDetails({ invoice, update }: { invoice: Invoice; update: <K extends DetailKey>(key: K, value: Invoice[K]) => void }) {
  const isGst = invoice.taxMode === "intra" || invoice.taxMode === "inter";
  return <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
    <h3 className="font-semibold">Tax and payment details</h3>
    <Field label="Tax mode"><select className={inputClass} aria-describedby="tax-mode-help" value={invoice.taxMode || "tax"} onChange={e => update("taxMode", e.target.value as TaxMode)}><option value="none">No tax</option><option value="tax">General tax</option><option value="intra">GST: CGST + SGST</option><option value="inter">GST: IGST</option></select></Field>
    <p id="tax-mode-help" className="-mt-3 text-xs text-slate-500">This controls how tax appears on the PDF. Enter the applicable tax rate on each invoice item.</p>
    <Field label="Amount already paid"><input className={inputClass} type="number" min="0" step="0.01" value={invoice.amountPaid || 0} onChange={e => update("amountPaid", Number(e.target.value))} /></Field>
    <details open={isGst} className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
      <summary className="cursor-pointer py-1 text-sm font-semibold">GST location and shipping (optional)</summary>
      <div className="mt-3 grid gap-4">
        {isGst ? <>
          <Field label="Supplier state"><input className={inputClass} value={invoice.supplierState || ""} onChange={e => update("supplierState", e.target.value)} /></Field>
          <Field label="Customer state"><input className={inputClass} value={invoice.customerState || ""} onChange={e => update("customerState", e.target.value)} /></Field>
          <Field label="Place of supply"><input className={inputClass} value={invoice.placeOfSupply || ""} onChange={e => update("placeOfSupply", e.target.value)} /></Field>
          <p className="text-xs text-slate-500">Check the states and place of supply before choosing the GST mode.</p>
        </> : null}
        <Field label="Shipping address (optional)"><textarea className={inputClass} value={invoice.shippingAddress || ""} onChange={e => update("shippingAddress", e.target.value)} /></Field>
      </div>
    </details>
  </div>;
}
