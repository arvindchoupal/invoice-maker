"use client";

import { useMemo, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { jsPDF } from "jspdf";

type ChallanItem = { id: number; description: string; hsn: string; quantity: number; unit: string; value: number };

const fieldClass = "mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-cyan-300/60";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-400";

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
}

export default function DeliveryChallanGeneratorClient() {
  const [details, setDetails] = useState({
    number: "DC-2026-001",
    date: new Date().toISOString().slice(0, 10),
    reason: "Delivery of goods",
    business: "Your Business",
    businessAddress: "Business address",
    businessGstin: "",
    customer: "Customer Name",
    customerAddress: "Customer address",
    customerGstin: "",
    vehicle: "",
    transporter: "",
    notes: "Goods received in good condition.",
  });
  const [items, setItems] = useState<ChallanItem[]>([
    { id: 1, description: "Material / goods description", hsn: "", quantity: 1, unit: "Nos", value: 0 },
  ]);

  const totalQuantity = useMemo(() => items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0), [items]);
  const totalValue = useMemo(() => items.reduce((sum, item) => sum + (Number(item.value) || 0), 0), [items]);

  function updateDetails(key: keyof typeof details, value: string) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  function updateItem(id: number, patch: Partial<ChallanItem>) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  function downloadPdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("DELIVERY CHALLAN", 194, 18, { align: "right" });
    doc.setFontSize(15);
    doc.text(details.business || "Business name", left, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(details.businessAddress || "Business address", left, 27, { maxWidth: 100 });
    doc.text(`GSTIN: ${details.businessGstin || "Not provided"}`, left, 37);
    doc.text(`Challan: ${details.number || "-"}`, 145, 28);
    doc.text(`Date: ${details.date || "-"}`, 145, 34);
    doc.text(`Reason: ${details.reason}`, 145, 40, { maxWidth: 48 });

    doc.setDrawColor(210);
    doc.line(left, 48, 194, 48);
    doc.setFont("helvetica", "bold");
    doc.text("DELIVER TO", left, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(details.customer || "Customer name", left, 63);
    doc.setFontSize(9);
    doc.text(details.customerAddress || "Customer address", left, 69, { maxWidth: 85 });
    doc.text(`GSTIN: ${details.customerGstin || "Not provided"}`, left, 79);
    doc.text(`Transporter: ${details.transporter || "-"}`, 112, 58);
    doc.text(`Vehicle: ${details.vehicle || "-"}`, 112, 65);

    let y = 91;
    doc.setFillColor(15, 23, 42);
    doc.rect(left, y - 6, 178, 8, "F");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.text("Description", 19, y - 1);
    doc.text("HSN", 94, y - 1);
    doc.text("Qty", 123, y - 1);
    doc.text("Unit", 143, y - 1);
    doc.text("Value (INR)", 190, y - 1, { align: "right" });
    doc.setTextColor(20);
    doc.setFont("helvetica", "normal");
    y += 8;
    items.slice(0, 14).forEach((item) => {
      doc.text(item.description || "Item", 19, y, { maxWidth: 70 });
      doc.text(item.hsn || "-", 94, y);
      doc.text(String(item.quantity || 0), 123, y);
      doc.text(item.unit || "-", 143, y);
      doc.text((item.value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 }), 190, y, { align: "right" });
      doc.setDrawColor(232);
      doc.line(left, y + 4, 194, y + 4);
      y += 11;
    });
    doc.setFont("helvetica", "bold");
    doc.text(`Total quantity: ${totalQuantity}`, left, y + 5);
    doc.text(`Indicative value: INR ${totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, 194, y + 5, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Notes", left, y + 19);
    doc.text(details.notes || "-", left, y + 25, { maxWidth: 178 });
    doc.line(left, 260, 76, 260);
    doc.line(134, 260, 194, 260);
    doc.text("Authorized signatory", left, 266);
    doc.text("Receiver signature", 134, 266);
    doc.setFontSize(8);
    doc.setTextColor(90);
    doc.text("Generated with InvoiceWala. Verify the transaction-specific GST and documentation requirements before use.", left, 284, { maxWidth: 178 });
    doc.save(`${(details.number || "delivery-challan").replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}.pdf`);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6" id="delivery-challan-tool">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Challan builder</p><h2 className="mt-3 text-3xl font-semibold">Enter delivery details</h2></div>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-200" onClick={downloadPdf} type="button"><Download className="h-4 w-4" />Download PDF</button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {(["number", "date", "reason"] as const).map((key) => <label key={key}><span className={labelClass}>{key === "number" ? "Challan number" : key}</span>{key === "reason" ? <select className={fieldClass} value={details[key]} onChange={(event) => updateDetails(key, event.target.value)}><option>Delivery of goods</option><option>Job work</option><option>Returnable material</option><option>Supply on approval</option><option>Other movement</option></select> : <input className={fieldClass} type={key === "date" ? "date" : "text"} value={details[key]} onChange={(event) => updateDetails(key, event.target.value)} />}</label>)}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4"><h3 className="font-semibold">Consignor / sender</h3>{(["business", "businessAddress", "businessGstin"] as const).map((key) => <label className="mt-3 block" key={key}><span className={labelClass}>{key === "business" ? "Business name" : key === "businessAddress" ? "Address" : "GSTIN (optional)"}</span><input className={fieldClass} value={details[key]} onChange={(event) => updateDetails(key, event.target.value)} /></label>)}</div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4"><h3 className="font-semibold">Consignee / receiver</h3>{(["customer", "customerAddress", "customerGstin"] as const).map((key) => <label className="mt-3 block" key={key}><span className={labelClass}>{key === "customer" ? "Customer name" : key === "customerAddress" ? "Address" : "GSTIN (optional)"}</span><input className={fieldClass} value={details[key]} onChange={(event) => updateDetails(key, event.target.value)} /></label>)}</div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{(["transporter", "vehicle"] as const).map((key) => <label key={key}><span className={labelClass}>{key === "vehicle" ? "Vehicle number" : "Transporter"}</span><input className={fieldClass} value={details[key]} onChange={(event) => updateDetails(key, event.target.value)} /></label>)}</div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">Goods / material</h3><button className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-cyan-300 px-3 text-sm font-semibold text-slate-950" onClick={() => setItems((current) => [...current, { id: Date.now(), description: "", hsn: "", quantity: 1, unit: "Nos", value: 0 }])} type="button"><Plus className="h-4 w-4" />Add item</button></div>
            <div className="mt-4 grid gap-3">{items.map((item, index) => <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4" key={item.id}><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-300">Item {index + 1}</span><button aria-label="Remove item" className="rounded-lg p-2 text-red-300 hover:bg-red-400/10" disabled={items.length === 1} onClick={() => setItems((current) => current.filter((row) => row.id !== item.id))} type="button"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 grid gap-3 md:grid-cols-[1.6fr_0.7fr_0.55fr_0.55fr_0.8fr]"><label><span className={labelClass}>Description</span><input className={fieldClass} value={item.description} onChange={(event) => updateItem(item.id, { description: event.target.value })} /></label><label><span className={labelClass}>HSN</span><input className={fieldClass} value={item.hsn} onChange={(event) => updateItem(item.id, { hsn: event.target.value })} /></label><label><span className={labelClass}>Qty</span><input className={fieldClass} min="0" type="number" value={item.quantity} onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) })} /></label><label><span className={labelClass}>Unit</span><input className={fieldClass} value={item.unit} onChange={(event) => updateItem(item.id, { unit: event.target.value })} /></label><label><span className={labelClass}>Value</span><input className={fieldClass} min="0" type="number" value={item.value} onChange={(event) => updateItem(item.id, { value: Number(event.target.value) })} /></label></div></div>)}</div>
          </div>
          <label className="mt-5 block"><span className={labelClass}>Notes</span><textarea className={`${fieldClass} min-h-24 py-3`} value={details.notes} onChange={(event) => updateDetails("notes", event.target.value)} /></label>
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start"><div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4"><div className="rounded-3xl bg-white p-6 text-slate-950 shadow-2xl"><div className="flex justify-between gap-5"><div><p className="text-xl font-bold">{details.business || "Business"}</p><p className="mt-1 text-xs text-slate-500">{details.businessAddress}</p></div><div className="text-right"><p className="text-2xl font-bold text-cyan-700">DELIVERY CHALLAN</p><p className="text-xs text-slate-500">{details.number} · {details.date}</p></div></div><div className="mt-6 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Deliver to</p><p className="mt-2 font-semibold">{details.customer}</p><p className="text-xs text-slate-500">{details.customerAddress}</p></div><div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-xs"><div className="grid grid-cols-[1fr_58px_64px] bg-slate-950 px-3 py-2 font-semibold uppercase text-white"><span>Description</span><span>Qty</span><span className="text-right">Value</span></div>{items.map((item) => <div className="grid grid-cols-[1fr_58px_64px] border-t border-slate-100 px-3 py-3" key={item.id}><span>{item.description || "Item"}</span><span>{item.quantity} {item.unit}</span><span className="text-right">{money(item.value)}</span></div>)}</div><div className="mt-5 flex justify-between border-t border-slate-200 pt-4 text-sm"><span>Total quantity: <strong>{totalQuantity}</strong></span><span>Value: <strong>{money(totalValue)}</strong></span></div><p className="mt-6 text-xs text-slate-500">Reason: {details.reason}</p></div></div></aside>
      </div>
    </section>
  );
}
