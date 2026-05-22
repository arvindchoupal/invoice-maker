"use client";
import { useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function MarginCalculatorPage() {
  const [cost, setCost] = useState(700);
  const [price, setPrice] = useState(1000);
  const margin = price ? ((price - cost) / price) * 100 : 0;
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-xl p-6"><h1 className="text-3xl font-semibold">Margin calculator</h1><div className="mt-6 grid gap-4"><Field label="Cost"><input className={inputClass} type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} /></Field><Field label="Selling price"><input className={inputClass} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></Field><p>Margin: {margin.toFixed(2)}%</p><p>Profit: {(price - cost).toFixed(2)}</p></div></Card></main>;
}
