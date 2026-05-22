"use client";
import { useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function ProfitCalculatorPage() {
  const [revenue, setRevenue] = useState(10000);
  const [expenses, setExpenses] = useState(6500);
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-xl p-6"><h1 className="text-3xl font-semibold">Profit calculator</h1><div className="mt-6 grid gap-4"><Field label="Revenue"><input className={inputClass} type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} /></Field><Field label="Expenses"><input className={inputClass} type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} /></Field><p>Profit: {(revenue - expenses).toFixed(2)}</p><p>Margin: {revenue ? (((revenue - expenses) / revenue) * 100).toFixed(2) : "0.00"}%</p></div></Card></main>;
}
