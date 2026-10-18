"use client";

import { useState } from "react";
import Link from "next/link";
import { FileUp, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { Badge, Button, Card, Field, PageHeader, inputClass } from "@/components/ui";

interface ExtractionResult {
  text?: string;
  invoice: Record<string, unknown>;
  confidence: {
    overall: number;
    fields: Array<{ field: string; label: string; value: string; confidence: number }>;
  };
}

export default function AiImportPage() {
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState<"upload" | "text" | "save" | "">("");
  const [error, setError] = useState("");

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingAction("upload"); setError(""); setSaveMessage("");
    try { const form = new FormData(event.currentTarget); const file = form.get("file"); if (file instanceof File && file.size > 10 * 1024 * 1024) throw new Error("File must be smaller than 10 MB."); setResult(await api<ExtractionResult>("/ai/upload", { method: "POST", body: form })); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not scan this file."); } finally { setLoadingAction(""); }
  }

  async function saveExtraction(options: { createExpense?: boolean; createPurchase?: boolean }) {
    if (!result) return;
    setLoadingAction("save"); setError("");
    try { const data = await api<Record<string, number | null>>("/ai/save-extraction", { method: "POST", body: JSON.stringify({ invoice: result.invoice, createClient: true, ...options }) }); const created = [data.invoiceId ? `invoice #${data.invoiceId}` : "", data.clientId ? `client #${data.clientId}` : "", data.expenseId ? `expense #${data.expenseId}` : "", data.purchaseId ? `purchase #${data.purchaseId}` : ""].filter(Boolean); setSaveMessage(created.length ? `Created ${created.join(", ")}.` : "Import saved successfully."); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not save this import."); } finally { setLoadingAction(""); }
  }

  async function convert(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingAction("text"); setError(""); setSaveMessage("");
    try { const form = new FormData(event.currentTarget); setResult(await api<ExtractionResult>("/ai/text-to-invoice", { method: "POST", body: JSON.stringify({ text: form.get("text") }) })); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not convert this text."); } finally { setLoadingAction(""); }
  }

  return (
    <div className="grid gap-5">
      <PageHeader title="AI import" description="Extract editable invoice fields from real OCR/text responses returned by the backend." />
      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error}</p> : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <form onSubmit={upload}>
            <h2 className="mb-4 text-lg font-semibold">OCR extraction</h2>
            <label className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-blue-300 bg-blue-50/60 p-6 text-center transition hover:bg-blue-50 dark:border-blue-400/20 dark:bg-blue-500/10">
              <FileUp className="mb-3 h-8 w-8 text-blue-500" />
              <span className="font-semibold">Choose an invoice image or PDF</span>
              <span className="mt-1 text-sm text-slate-500">PNG, JPG, WebP or PDF · maximum 10 MB.</span>
              <input className="sr-only" name="file" type="file" accept="image/*,application/pdf" required />
            </label>
            <Button className="mt-4" disabled={Boolean(loadingAction)}>{loadingAction === "upload" ? "Scanning..." : "Extract fields"}</Button>
          </form>
        </Card>

        <Card className="p-5">
          <form onSubmit={convert}>
            <h2 className="mb-4 text-lg font-semibold">Text to invoice</h2>
            <Field label="Invoice text"><textarea className={`${inputClass} min-h-48`} name="text" required /></Field>
            <Button className="mt-4" disabled={Boolean(loadingAction)}>{loadingAction === "text" ? "Converting..." : "Convert text"}</Button>
          </form>
        </Card>
      </div>

      {loadingAction === "upload" || loadingAction === "text" ? (
        <Card className="overflow-hidden p-5">
          <div className="relative min-h-40 rounded-2xl border border-blue-500/20 bg-slate-950 p-5 text-blue-100">
            <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <Sparkles className="h-6 w-6" />
            <p className="mt-4 font-semibold">{loadingAction === "upload" ? "Scanning document and extracting fields…" : "Turning text into invoice fields…"}</p>
            <p className="mt-2 text-sm text-slate-400">Confidence scores will be shown after the backend returns extraction data.</p>
          </div>
        </Card>
      ) : result ? (
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Confidence</h2>
              <Badge tone={result.confidence.overall >= 75 ? "green" : result.confidence.overall >= 45 ? "amber" : "rose"}>{result.confidence.overall}%</Badge>
            </div>
            <div className="mt-5 grid gap-3">
              {result.confidence.fields.map((field) => (
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]" key={field.field}>
                  <div className="flex justify-between gap-3">
                    <p className="text-sm font-semibold">{field.label}</p>
                    <span className="text-sm text-slate-500">{field.confidence}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.08]">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${field.confidence}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{field.value || "No value detected"}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold">Review extracted invoice</h2><p className="mt-1 text-sm text-slate-500">Check the detected values before saving.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">{Object.entries(result.invoice).filter(([, value]) => typeof value !== "object").map(([key, value]) => <Field key={key} label={key.replaceAll("_", " ").replace(/([a-z])([A-Z])/g, "$1 $2")}><input className={inputClass} value={String(value ?? "")} onChange={(event) => setResult({ ...result, invoice: { ...result.invoice, [key]: event.target.value } })} /></Field>)}</div>
            {Object.entries(result.invoice).some(([, value]) => typeof value === "object") ? <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-white/[0.04]">Line items and structured details were also detected and will be preserved when saved.</p> : null}
            <div className="mt-4 flex flex-wrap gap-3">
              <Button disabled={Boolean(loadingAction)} onClick={() => saveExtraction({})}>{loadingAction === "save" ? "Saving…" : "Create client + invoice"}</Button>
              <Button variant="secondary" disabled={Boolean(loadingAction)} onClick={() => saveExtraction({ createExpense: true })}>Create invoice + expense</Button>
              <Button variant="secondary" disabled={Boolean(loadingAction)} onClick={() => saveExtraction({ createPurchase: true })}>Create invoice + purchase</Button>
            </div>
            {saveMessage ? <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">{saveMessage} <Link className="font-semibold underline" href="/invoices">View invoices</Link></div> : null}
          </Card>
        </div>
      ) : (
        <Card className="p-5 text-sm text-slate-500">AI extraction results will appear here after upload or text conversion.</Card>
      )}
    </div>
  );
}
