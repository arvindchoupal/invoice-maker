"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/margin-calculator")!;

export default function MarginCalculatorClient() {
  const [cost, setCost] = useState(700);
  const [price, setPrice] = useState(1000);
  const margin = price ? ((price - cost) / price) * 100 : 0;
  const markup = cost ? ((price - cost) / cost) * 100 : 0;

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Margin calculator</h2>
        <div className="mt-6 grid gap-4">
          <Field label="Cost"><input className={inputClass} type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} /></Field>
          <Field label="Selling price"><input className={inputClass} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></Field>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
            <p className="flex justify-between text-slate-300"><span>Margin</span><strong className="text-white">{margin.toFixed(2)}%</strong></p>
            <p className="mt-2 flex justify-between text-slate-300"><span>Markup</span><strong className="text-white">{markup.toFixed(2)}%</strong></p>
            <p className="mt-2 flex justify-between text-slate-300"><span>Profit</span><strong className="text-white">{(price - cost).toFixed(2)}</strong></p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/signup?source=margin-calculator">
            Turn this into an invoice
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
