"use client";

import { useState } from "react";
import { FileUp, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { Badge, Button, Card, Field, inputClass } from "@/components/ui";

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
  const [loading, setLoading] = useState(false);

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const data = await api<ExtractionResult>("/ai/upload", { method: "POST", body: form });
    setResult(data);
    setLoading(false);
  }

  async function saveExtraction(options: { createExpense?: boolean; createPurchase?: boolean }) {
    if (!result) return;
    const data = await api<Record<string, number | null>>("/ai/save-extraction", {
      method: "POST",
      body: JSON.stringify({ invoice: result.invoice, createClient: true, ...options }),
    });
    setSaveMessage(JSON.stringify(data, null, 2));
  }

  async function convert(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const data = await api<ExtractionResult>("/ai/text-to-invoice", {
      method: "POST",
      body: JSON.stringify({ text: form.get("text") }),
    });
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">AI import</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Extract editable invoice fields from real OCR/text responses returned by the backend.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <form onSubmit={upload}>
            <h2 className="mb-4 text-lg font-semibold">OCR extraction</h2>
            <label className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-blue-300 bg-blue-50/60 p-6 text-center transition hover:bg-blue-50 dark:border-blue-400/20 dark:bg-blue-500/10">
              <FileUp className="mb-3 h-8 w-8 text-blue-500" />
              <span className="font-semibold">Drop or choose invoice image/PDF</span>
              <span className="mt-1 text-sm text-slate-500">The backend OCR endpoint processes the file.</span>
              <input className="sr-only" name="file" type="file" accept="image/*,application/pdf" required />
            </label>
            <Button className="mt-4" disabled={loading}>{loading ? "Scanning..." : "Extract fields"}</Button>
          </form>
        </Card>

        <Card className="p-5">
          <form onSubmit={convert}>
            <h2 className="mb-4 text-lg font-semibold">Text to invoice</h2>
            <Field label="Invoice text"><textarea className={`${inputClass} min-h-48`} name="text" required /></Field>
            <Button className="mt-4" disabled={loading}>{loading ? "Converting..." : "Convert text"}</Button>
          </form>
        </Card>
      </div>

      {loading ? (
        <Card className="overflow-hidden p-6">
          <div className="relative min-h-40 rounded-2xl border border-blue-500/20 bg-slate-950 p-5 text-blue-100">
            <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <Sparkles className="h-6 w-6" />
            <p className="mt-4 font-semibold">Scanning document and extracting fields...</p>
            <p className="mt-2 text-sm text-slate-400">Confidence scores will be shown after the backend returns extraction data.</p>
          </div>
        </Card>
      ) : result ? (
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
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
            <h2 className="text-lg font-semibold">Editable extraction payload</h2>
            <textarea
              className={`${inputClass} mt-4 min-h-96 w-full font-mono`}
              value={JSON.stringify(result.invoice, null, 2)}
              onChange={(event) => {
                try {
                  setResult({ ...result, invoice: JSON.parse(event.target.value || "{}") });
                } catch {
                  setResult({ ...result, invoice: { raw: event.target.value } });
                }
              }}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={() => saveExtraction({})}>Create client + invoice</Button>
              <Button variant="secondary" onClick={() => saveExtraction({ createExpense: true })}>Also create expense</Button>
              <Button variant="secondary" onClick={() => saveExtraction({ createPurchase: true })}>Also create purchase</Button>
            </div>
            {saveMessage ? <pre className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">{saveMessage}</pre> : null}
          </Card>
        </div>
      ) : (
        <Card className="p-6 text-sm text-slate-500">AI extraction results will appear here after upload or text conversion.</Card>
      )}
    </div>
  );
}
