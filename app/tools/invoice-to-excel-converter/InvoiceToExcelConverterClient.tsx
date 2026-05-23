"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/invoice-to-excel-converter")!;

export default function InvoiceToExcelConverterClient() {
  const [text, setText] = useState("Service,1,1000\nGST,1,180");
  const csv = useMemo(() => `item,quantity,amount\n${text}`, [text]);

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Invoice to Excel converter</h2>
        <p className="mt-2 text-sm text-slate-400">Paste rows as item, quantity, amount — then download CSV for Excel or accounting.</p>
        <div className="mt-6 grid gap-4">
          <Field label="Rows: item, quantity, amount"><textarea className={`${inputClass} min-h-40`} value={text} onChange={(e) => setText(e.target.value)} /></Field>
          <a className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`} download="invoice-lines.csv">
            Download CSV
          </a>
          <pre className="overflow-auto rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs text-slate-300">{csv}</pre>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-4 text-sm font-semibold text-white" href="/signup?source=invoice-to-excel-converter">
            Save invoice lines in InvoiceWala
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
