"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/emi-calculator")!;

export default function EmiCalculatorClient() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(24);
  const monthlyRate = rate / 12 / 100;
  const emi = monthlyRate ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1) : principal / months;
  const total = emi * months;
  const interest = total - principal;

  return (
    <ToolPageLayout tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">EMI calculator</h2>
        <div className="mt-6 grid gap-4">
          <Field label="Loan amount"><input className={inputClass} type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></Field>
          <Field label="Annual interest %"><input className={inputClass} type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></Field>
          <Field label="Tenure (months)"><input className={inputClass} type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} /></Field>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-2xl font-semibold text-white">EMI: {emi.toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-400">Total payable: {total.toFixed(2)}</p>
            <p className="mt-1 text-sm text-slate-400">Total interest: {interest.toFixed(2)}</p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/signup?source=emi-calculator">
            Track business expenses in InvoiceWala
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
