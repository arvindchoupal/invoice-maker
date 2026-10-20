"use client";
import type { Invoice, TaxMode } from "@/types";
import { Field, inputClass } from "@/components/ui";

type DetailKey = "taxMode" | "amountPaid" | "supplierState" | "customerState" | "placeOfSupply" | "shippingAddress" | "businessTaxId" | "customerTaxId";

export function InvoiceAdditionalDetails({ invoice, update }: { invoice: Invoice; update: <K extends DetailKey>(key: K, value: Invoice[K]) => void }) {
  return <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
    <h3 className="font-semibold sm:col-span-2">Tax, delivery & payment</h3>
    <Field label="Tax mode"><select className={inputClass} value={invoice.taxMode || "tax"} onChange={e => update("taxMode", e.target.value as TaxMode)}><option value="none">No tax</option><option value="tax">General tax</option><option value="intra">GST: CGST + SGST</option><option value="inter">GST: IGST</option></select></Field>
    <Field label="Amount already paid"><input className={inputClass} type="number" min="0" step="0.01" value={invoice.amountPaid || 0} onChange={e => update("amountPaid", Number(e.target.value))} /></Field>
    {invoice.taxMode === "intra" || invoice.taxMode === "inter" ? <>
      <Field label="Supplier state"><input className={inputClass} value={invoice.supplierState || ""} onChange={e => update("supplierState", e.target.value)} /></Field>
      <Field label="Customer state"><input className={inputClass} value={invoice.customerState || ""} onChange={e => update("customerState", e.target.value)} /></Field>
      <Field label="Place of supply"><input className={inputClass} value={invoice.placeOfSupply || ""} onChange={e => update("placeOfSupply", e.target.value)} /></Field>
      <p className="text-xs text-slate-500">Choose the applicable GST mode. The PDF shows only the tax components you select.</p>
    </> : null}
    <Field label="Supplier GST / tax ID"><input className={inputClass} value={invoice.businessTaxId || ""} onChange={e => update("businessTaxId", e.target.value)} /></Field>
    <Field label="Customer GST / tax ID"><input className={inputClass} value={invoice.customerTaxId || ""} onChange={e => update("customerTaxId", e.target.value)} /></Field>
    <Field label="Shipping address (optional)"><textarea className={inputClass} value={invoice.shippingAddress || ""} onChange={e => update("shippingAddress", e.target.value)} /></Field>
  </div>;
}
