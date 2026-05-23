"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/profit-calculator")!;

export default function ProfitCalculatorClient() {
  const [revenue, setRevenue] = useState(10000);
  const [expenses, setExpenses] = useState(6500);
  const profit = revenue - expenses;
  const margin = revenue ? (profit / revenue) * 100 : 0;

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Profit calculator</h2>
        <div className="mt-6 grid gap-4">
          <Field label="Revenue"><input className={inputClass} type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} /></Field>
          <Field label="Expenses"><input className={inputClass} type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} /></Field>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
            <p className="flex justify-between text-slate-300"><span>Net profit</span><strong className="text-white">{profit.toFixed(2)}</strong></p>
            <p className="mt-2 flex justify-between text-slate-300"><span>Profit margin</span><strong className="text-white">{margin.toFixed(2)}%</strong></p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/signup?source=profit-calculator">
            Create invoice with this pricing
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
