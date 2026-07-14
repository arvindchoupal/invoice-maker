"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Field, inputClass } from "@/components/ui";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolByHref } from "@/lib/tools-catalog";

const tool = toolByHref("/tools/gst-bill-format-generator")!;

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function money(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function numeric(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function GstBillFormatGeneratorClient({ faqs }: { faqs: Array<[string, string]> }) {
  const [seller, setSeller] = useState("InvoiceWala Demo Store");
  const [buyer, setBuyer] = useState("Aarav Retail Pvt Ltd");
  const [invoiceNo, setInvoiceNo] = useState("GST-2026-001");
  const [item, setItem] = useState("Professional service");
  const [taxable, setTaxable] = useState("10000");
  const [rate, setRate] = useState("18");
  const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");

  const result = useMemo(() => {
    const taxableValue = Math.max(0, numeric(taxable));
    const gstRate = Math.max(0, numeric(rate));
    const tax = taxableValue * (gstRate / 100);
    const cgst = supplyType === "intra" ? tax / 2 : 0;
    const sgst = supplyType === "intra" ? tax / 2 : 0;
    const igst = supplyType === "inter" ? tax : 0;
    return { taxableValue, gstRate, tax, cgst, sgst, igst, total: taxableValue + tax };
  }, [rate, supplyType, taxable]);
  const taxRows =
    supplyType === "intra"
      ? [
          [`CGST ${result.gstRate / 2}%`, money(result.cgst)],
          [`SGST ${result.gstRate / 2}%`, money(result.sgst)],
        ]
      : [[`IGST ${result.gstRate}%`, money(result.igst)]];

  return (
    <ToolPageLayout after={<SeoSections faqs={faqs} />} tool={tool}>
      <div className="grid gap-5">
        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
          <h2 className="text-xl font-semibold text-white">GST bill format inputs</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Preview the bill format first, then create the final PDF invoice in InvoiceWala.</p>
          <div className="mt-5 grid gap-4">
            <Field label="Seller name">
              <input className={inputClass} value={seller} onChange={(event) => setSeller(event.target.value)} />
            </Field>
            <Field label="Buyer name">
              <input className={inputClass} value={buyer} onChange={(event) => setBuyer(event.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Invoice number">
                <input className={inputClass} value={invoiceNo} onChange={(event) => setInvoiceNo(event.target.value)} />
              </Field>
              <Field label="Item or service">
                <input className={inputClass} value={item} onChange={(event) => setItem(event.target.value)} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Taxable value">
                <input className={inputClass} inputMode="decimal" min="0" type="number" value={taxable} onChange={(event) => setTaxable(event.target.value)} />
              </Field>
              <Field label="GST rate">
                <select className={inputClass} value={rate} onChange={(event) => setRate(event.target.value)}>
                  {["0", "3", "5", "12", "18", "28"].map((value) => <option className="bg-slate-950" key={value} value={value}>{value}%</option>)}
                </select>
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button className={`rounded-xl border p-3 text-left text-sm transition ${supplyType === "intra" ? "border-cyan-300/60 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`} onClick={() => setSupplyType("intra")} type="button">
                <span className="block font-semibold">CGST + SGST</span>
                <span className="text-xs text-slate-500">Same-state supply</span>
              </button>
              <button className={`rounded-xl border p-3 text-left text-sm transition ${supplyType === "inter" ? "border-cyan-300/60 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`} onClick={() => setSupplyType("inter")} type="button">
                <span className="block font-semibold">IGST</span>
                <span className="text-xs text-slate-500">Different-state supply</span>
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-300/20 bg-white p-5 text-slate-950">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">GST Bill</p>
              <h2 className="mt-1 text-2xl font-bold">{seller || "Seller name"}</h2>
            </div>
            <div className="text-sm sm:text-right">
              <p><strong>Invoice No:</strong> {invoiceNo || "GST-2026-001"}</p>
              <p><strong>Date:</strong> 12 Jul 2026</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="text-xs font-bold uppercase text-slate-500">Bill To</p>
              <p className="mt-1 font-semibold">{buyer || "Buyer name"}</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="text-xs font-bold uppercase text-slate-500">Supply Type</p>
              <p className="mt-1 font-semibold">{supplyType === "intra" ? "Intra-state · CGST + SGST" : "Inter-state · IGST"}</p>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 text-sm">
            <div className="grid grid-cols-[1.3fr_0.7fr] bg-slate-100 font-bold">
              <div className="p-3">Item</div>
              <div className="p-3 text-right">Amount</div>
            </div>
            {[[item || "Item or service", money(result.taxableValue)], ...taxRows].map(([label, value]) => (
              <div className="grid grid-cols-[1.3fr_0.7fr] border-t border-slate-200" key={label}>
                <div className="p-3">{label}</div>
                <div className="p-3 text-right font-semibold">{value}</div>
              </div>
            ))}
            <div className="grid grid-cols-[1.3fr_0.7fr] border-t border-slate-300 bg-cyan-50 text-lg font-bold">
              <div className="p-3">Total</div>
              <div className="p-3 text-right">{money(result.total)}</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-200" href="/free-invoice?source=gst-bill-format-generator">
              Create PDF invoice
            </Link>
            <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-100" href="/tools/gst-calculator">
              Open GST calculator
            </Link>
          </div>
        </section>
      </div>
    </ToolPageLayout>
  );
}

function SeoSections({ faqs }: { faqs: Array<[string, string]> }) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">GST bill format for Indian businesses</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            A GST bill format should clearly show invoice number, invoice date, seller details, buyer details, taxable value, GST rate, CGST/SGST or IGST amount and final total. This generator is designed for people searching for a practical GST bill format before creating the final invoice PDF.
          </p>
        </article>
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Service bills", "Use it for consultants, agencies, contractors and professional service invoices."],
            ["Retail bills", "Preview product taxable value, GST rate and final bill total."],
            ["GST invoices", "Use the preview before making a proper GST invoice with customer and supplier details."],
          ].map(([title, body]) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </section>
        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={question}>
                <h3 className="font-semibold text-white">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
