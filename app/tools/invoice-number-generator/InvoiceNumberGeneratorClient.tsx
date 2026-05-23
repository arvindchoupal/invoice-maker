"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/invoice-number-generator")!;

export default function InvoiceNumberGeneratorClient() {
  const [prefix, setPrefix] = useState("INV");
  const [next, setNext] = useState(1);
  const number = `${prefix}-${String(next).padStart(5, "0")}`;

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Invoice number generator</h2>
        <div className="mt-6 grid gap-4">
          <Field label="Prefix"><input className={inputClass} value={prefix} onChange={(e) => setPrefix(e.target.value.toUpperCase())} /></Field>
          <Field label="Next number"><input className={inputClass} type="number" value={next} onChange={(e) => setNext(Number(e.target.value))} /></Field>
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-2xl font-semibold text-white">{number}</p>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/invoices/new">
            Create invoice with this number
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
