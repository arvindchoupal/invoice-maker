"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/tax-calculator")!;

export default function TaxCalculatorClient() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [inclusive, setInclusive] = useState(false);
  const tax = inclusive ? amount - amount / (1 + rate / 100) : amount * (rate / 100);
  const total = inclusive ? amount : amount + tax;

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Tax calculator</h2>
        <div className="mt-6 grid gap-4">
          <Field label="Amount"><input className={inputClass} type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></Field>
          <Field label="Tax rate %"><input className={inputClass} type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></Field>
          <label className="flex gap-2 text-sm text-slate-300"><input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} /> Amount includes tax</label>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
            <p className="flex justify-between text-slate-300"><span>Tax</span><strong className="text-white">{tax.toFixed(2)}</strong></p>
            <p className="mt-2 flex justify-between text-slate-300"><span>Total</span><strong className="text-white">{total.toFixed(2)}</strong></p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/tools/gst-calculator">
            Need GST split? Open GST calculator
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
