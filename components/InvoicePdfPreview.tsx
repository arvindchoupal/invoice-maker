"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiBlob } from "@/lib/api";
import { invoiceValidationErrors } from "@/lib/invoice-document";
import type { Invoice } from "@/types";

type FixStep = "details" | "parties" | "items" | "tax";

function stepForError(message: string): FixStep {
  if (/business|customer|email/i.test(message)) return "parties";
  if (/item|line item/i.test(message)) return "items";
  if (/amount paid/i.test(message)) return "tax";
  return "details";
}

export function InvoicePdfPreview({ invoice, onFix, onClose }: { invoice: Invoice; onFix?: (step: FixStep) => void; onClose: () => void }) {
  const payload = JSON.stringify(invoice);
  const [preview, setPreview] = useState<{ payload: string; url?: string; error?: string }>({ payload: "" });
  useEffect(() => {
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
  return <div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/60 p-2 sm:p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="invoice-pdf-preview-title" className="flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-white">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3 dark:border-slate-700">
        <div><h2 id="invoice-pdf-preview-title" className="font-semibold">PDF preview</h2><p className="mt-0.5 text-xs text-slate-500">This is the same PDF layout used for download.</p></div>
        <button type="button" onClick={onClose} aria-label="Close PDF preview" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-5 w-5" /></button>
      </header>
      {errors.length ? <div className="max-h-28 overflow-auto border-b border-amber-200 bg-amber-50 px-5 py-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"><span className="font-semibold">Complete these fields for the final invoice:</span><ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">{errors.map((message) => <li className="flex items-center gap-1.5" key={message}><span>{message}</span>{onFix ? <button className="font-semibold underline underline-offset-2" type="button" onClick={() => { onClose(); onFix(stepForError(message)); }}>Fix</button> : null}</li>)}</ul></div> : null}
      <div className="min-h-0 flex-1 bg-slate-100 p-2 dark:bg-slate-950 sm:p-4">
        {preview.payload !== payload ? <p role="status" className="grid h-full min-h-[55vh] place-items-center text-sm text-slate-600">Preparing PDF preview…</p> : preview.error ? <p role="alert" className="grid h-full min-h-[55vh] place-items-center text-sm text-red-600">{preview.error}</p> : preview.url ? <iframe title="Invoice PDF preview" src={preview.url} className="h-[76vh] min-h-[420px] w-full rounded-lg border-0 bg-white" /> : null}
      </div>
    </section>
  </div>;
}
