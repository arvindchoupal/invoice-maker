"use client";
import { useMemo, useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function InvoiceToExcelConverterPage() {
  const [text, setText] = useState("Service,1,1000\nGST,1,180");
  const csv = useMemo(() => `item,quantity,amount\n${text}`, [text]);
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-2xl p-6"><h1 className="text-3xl font-semibold">Invoice to Excel converter</h1><p className="mt-2 text-sm text-slate-400">Paste invoice rows and export CSV-compatible content.</p><div className="mt-6 grid gap-4"><Field label="Rows: item, quantity, amount"><textarea className={`${inputClass} min-h-40`} value={text} onChange={(e) => setText(e.target.value)} /></Field><a className="rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white" href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`} download="invoice-lines.csv">Download CSV</a><pre className="overflow-auto rounded-xl bg-slate-900 p-4 text-xs">{csv}</pre></div></Card></main>;
}
