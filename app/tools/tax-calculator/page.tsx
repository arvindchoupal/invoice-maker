"use client";
import { useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function TaxCalculatorPage() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [inclusive, setInclusive] = useState(false);
  const tax = inclusive ? amount - amount / (1 + rate / 100) : amount * rate / 100;
  const total = inclusive ? amount : amount + tax;
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-xl p-6"><h1 className="text-3xl font-semibold">Tax calculator</h1><div className="mt-6 grid gap-4"><Field label="Amount"><input className={inputClass} type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></Field><Field label="Tax rate %"><input className={inputClass} type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></Field><label className="flex gap-2 text-sm"><input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} /> Amount includes tax</label><p>Tax: {tax.toFixed(2)}</p><p>Total: {total.toFixed(2)}</p></div></Card></main>;
}
