"use client";

import { useEffect, useState } from "react";
import { apiBlob } from "@/lib/api";
import { invoiceValidationErrors } from "@/lib/invoice-document";
import type { Invoice } from "@/types";

export function InvoicePdfPreview({ invoice }: { invoice: Invoice }) {
  const payload = JSON.stringify(invoice);
  const [preview, setPreview] = useState<{ payload: string; url?: string; error?: string }>({ payload: "" });
  useEffect(() => {
    const snapshot = JSON.parse(payload) as Invoice;
    const errors = invoiceValidationErrors(snapshot);
    if (errors.length) return;
    let active = true;
    let url = "";
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      apiBlob("/invoice-preview", { method: "POST", body: payload, signal: controller.signal })
        .then(blob => { if (active) { url = URL.createObjectURL(blob); setPreview({payload, url}); } })
        .catch(error => { if (active) setPreview({payload, error: error.message || "Could not load PDF preview."}); });
    }, 800);
    return () => { active = false; clearTimeout(timer); controller.abort(); if (url) URL.revokeObjectURL(url); };
  }, [payload]);
  const errors = invoiceValidationErrors(invoice);
  return <section className="rounded-xl border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
    <h2 className="font-semibold">PDF preview</h2><p className="mb-3 mt-1 text-xs text-slate-500">The same document layout is used when you save and download. Invoice numbers are assigned on save when left blank.</p>
    {errors.length ? <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Complete business, customer and valid item details to preview the PDF.</p> : preview.payload !== payload ? <p role="status" className="p-4 text-sm">Updating preview…</p> : preview.error ? <p role="alert" className="p-4 text-sm text-red-600">{preview.error}</p> : preview.url ? <><iframe title="Invoice PDF preview" src={preview.url} className="h-[75vh] min-h-[480px] w-full rounded-lg border-0 bg-slate-100" /><a className="mt-2 inline-block text-sm text-blue-600 underline" href={preview.url} target="_blank" rel="noreferrer">Open preview in a new tab</a></> : null}
  </section>;
}
