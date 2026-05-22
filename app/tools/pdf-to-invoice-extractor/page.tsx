"use client";
import { useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function PdfToInvoiceExtractorPage() {
  const [text, setText] = useState("");
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const total = text.match(/(?:total|amount due)\D+(\d+(?:\.\d{1,2})?)/i)?.[1] ?? "";
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-2xl p-6"><h1 className="text-3xl font-semibold">PDF to invoice extractor</h1><p className="mt-2 text-sm text-slate-400">Public lightweight extractor. Paste OCR text here; authenticated AI import handles file uploads.</p><div className="mt-6 grid gap-4"><Field label="Paste invoice text"><textarea className={`${inputClass} min-h-48`} value={text} onChange={(e) => setText(e.target.value)} /></Field><div className="rounded-xl bg-slate-900 p-4 text-sm"><p>Email: {email || "Not detected"}</p><p>Total: {total || "Not detected"}</p></div></div></Card></main>;
}
