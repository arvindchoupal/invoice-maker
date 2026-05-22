"use client";
import { useState } from "react";
import { Card, Field, inputClass } from "@/components/ui";

export default function InvoiceNumberGeneratorPage() {
  const [prefix, setPrefix] = useState("INV");
  const [next, setNext] = useState(1);
  return <main className="min-h-screen bg-slate-950 p-6 text-white"><Card className="mx-auto max-w-xl p-6"><h1 className="text-3xl font-semibold">Invoice number generator</h1><div className="mt-6 grid gap-4"><Field label="Prefix"><input className={inputClass} value={prefix} onChange={(e) => setPrefix(e.target.value.toUpperCase())} /></Field><Field label="Next number"><input className={inputClass} type="number" value={next} onChange={(e) => setNext(Number(e.target.value))} /></Field><p className="text-2xl font-semibold">{prefix}-{String(next).padStart(5, "0")}</p></div></Card></main>;
}
