"use client";
import { useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(24);
  const monthlyRate = rate / 12 / 100;
  const emi = monthlyRate ? principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1) : principal / months;
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-xl p-6"><h1 className="text-3xl font-semibold">EMI calculator</h1><div className="mt-6 grid gap-4"><Field label="Loan amount"><input className={inputClass} type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></Field><Field label="Annual interest %"><input className={inputClass} type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></Field><Field label="Months"><input className={inputClass} type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} /></Field><p className="text-2xl font-semibold">EMI: {emi.toFixed(2)}</p><p>Total payable: {(emi * months).toFixed(2)}</p></div></Card></main>;
}
