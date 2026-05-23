"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/pdf-to-invoice-extractor")!;

export default function PdfToInvoiceExtractorClient() {
  const [text, setText] = useState("");
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const total = text.match(/(?:total|amount due)\D+(\d+(?:\.\d{1,2})?)/i)?.[1] ?? "";

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">PDF to invoice extractor</h2>
        <p className="mt-2 text-sm text-slate-400">Paste OCR text from a bill or invoice. For file uploads, use AI import after signup.</p>
        <div className="mt-6 grid gap-4">
          <Field label="Paste invoice text"><textarea className={`${inputClass} min-h-48`} value={text} onChange={(e) => setText(e.target.value)} /></Field>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
            <p>Email: <strong className="text-white">{email || "Not detected"}</strong></p>
            <p className="mt-2">Total: <strong className="text-white">{total || "Not detected"}</strong></p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/ai-import">
            Import full PDF with AI
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
