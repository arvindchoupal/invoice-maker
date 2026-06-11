"use client";

import { useMemo, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";

type Item = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
};

const initialItems: Item[] = [
  { id: 1, name: "Service payment", quantity: 1, unitPrice: 2500, taxRate: 0 },
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
}

function inputClass() {
  return "mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60";
}

function labelClass() {
  return "text-xs font-semibold uppercase tracking-wide text-slate-400";
}

function pdfMoney(value: number) {
  return `INR ${(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function pdfString(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .slice(0, 140);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createPdfBlob(stream: string) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

export function ReceiptGeneratorClient() {
  const [receiptNumber, setReceiptNumber] = useState("RCPT-2026-001");
  const [receiptDate, setReceiptDate] = useState("2026-06-11");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [reference, setReference] = useState("UPI-123456789");
  const [business, setBusiness] = useState({
    name: "Your Business",
    address: "Business address",
    email: "business@email.com",
    phone: "+91 98765 43210",
    gstin: "",
  });
  const [customer, setCustomer] = useState({
    name: "Customer Name",
    address: "Customer address",
    email: "customer@email.com",
    phone: "",
  });
  const [items, setItems] = useState<Item[]>(initialItems);
  const [notes, setNotes] = useState("Payment received. Thank you for your business.");

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = items.reduce((sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100), 0);
    return { subtotal, tax, total: subtotal + tax };
  }, [items]);

  function updateItem(id: number, patch: Partial<Item>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((current) => [...current, { id: Date.now(), name: "", quantity: 1, unitPrice: 0, taxRate: 0 }]);
  }

  function removeItem(id: number) {
    setItems((current) => (current.length === 1 ? current : current.filter((item) => item.id !== id)));
  }

  function downloadPdf() {
    const commands: string[] = [];
    const text = (value: string, x: number, y: number, size = 10, font = "F1") => {
      commands.push(`BT /${font} ${size} Tf ${x} ${y} Td (${pdfString(value)}) Tj ET`);
    };
    const rect = (x: number, y: number, width: number, height: number, color = "0.95 0.98 0.99") => {
      commands.push(`${color} rg ${x} ${y} ${width} ${height} re f`);
    };

    rect(42, 770, 42, 42, "0.03 0.57 0.70");
    text(business.name || "Business name", 42, 745, 18, "F2");
    text(business.email, 42, 727);
    text(business.phone, 42, 712);
    text(business.address, 42, 697);
    text(`GSTIN: ${business.gstin || "-"}`, 42, 682);
    text("RECEIPT", 390, 790, 28, "F2");
    text(receiptNumber, 420, 765, 11, "F2");
    text(`Date: ${receiptDate}`, 420, 747);
    text(`Mode: ${paymentMode}`, 420, 729);

    rect(42, 612, 511, 56);
    text("RECEIVED FROM", 58, 648, 9, "F2");
    text(customer.name || "Customer name", 58, 628, 15, "F2");
    text(`${customer.email} ${customer.phone ? "| " + customer.phone : ""}`, 270, 632);
    text(customer.address, 270, 615);

    rect(42, 560, 511, 26, "0.06 0.09 0.16");
    text("DESCRIPTION", 52, 570, 9, "F2");
    text("QTY", 300, 570, 9, "F2");
    text("RATE", 360, 570, 9, "F2");
    text("TAX", 430, 570, 9, "F2");
    text("AMOUNT", 490, 570, 9, "F2");

    let y = 532;
    items.slice(0, 12).forEach((item) => {
      text(item.name || "Receipt item", 52, y, 10, "F2");
      text(String(item.quantity), 302, y);
      text(pdfMoney(item.unitPrice), 350, y);
      text(`${item.taxRate}%`, 432, y);
      text(pdfMoney(item.quantity * item.unitPrice), 470, y);
      commands.push(`0.88 0.91 0.95 RG 42 ${y - 18} 511 0.5 re S`);
      y -= 34;
    });

    y = Math.min(y, 250);
    text("Subtotal", 350, y, 10);
    text(pdfMoney(totals.subtotal), 450, y, 10, "F2");
    text("Tax", 350, y - 20, 10);
    text(pdfMoney(totals.tax), 450, y - 20, 10, "F2");
    commands.push(`0.88 0.91 0.95 RG 350 ${y - 36} 180 0.8 re S`);
    text("Amount Received", 350, y - 60, 15, "F2");
    text(pdfMoney(totals.total), 450, y - 60, 15, "F2");

    rect(42, 118, 238, 78);
    rect(300, 118, 253, 78);
    text("PAYMENT REFERENCE", 58, 170, 9, "F2");
    text(reference || "-", 58, 150, 11);
    text("NOTES", 316, 170, 9, "F2");
    text(notes, 316, 150, 9);
    text("This receipt confirms payment received.", 42, 72, 9);

    const blob = createPdfBlob(commands.join("\n"));
    const safeName = (receiptNumber || "receipt").replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
    downloadBlob(blob, `${safeName}.pdf`);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6" id="receipt-tool">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Receipt builder</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Create a receipt online</h2>
            </div>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              onClick={downloadPdf}
              type="button"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label>
              <span className={labelClass()}>Receipt Number</span>
              <input className={inputClass()} value={receiptNumber} onChange={(event) => setReceiptNumber(event.target.value)} />
            </label>
            <label>
              <span className={labelClass()}>Receipt Date</span>
              <input className={inputClass()} type="date" value={receiptDate} onChange={(event) => setReceiptDate(event.target.value)} />
            </label>
            <label>
              <span className={labelClass()}>Payment Mode</span>
              <select className={inputClass()} value={paymentMode} onChange={(event) => setPaymentMode(event.target.value)}>
                <option>UPI</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Card</option>
                <option>Cheque</option>
              </select>
            </label>
            <label>
              <span className={labelClass()}>Reference</span>
              <input className={inputClass()} value={reference} onChange={(event) => setReference(event.target.value)} />
            </label>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-semibold">Business Details</h3>
              {(["name", "address", "email", "phone", "gstin"] as const).map((key) => (
                <label className="mt-3 block" key={key}>
                  <span className={labelClass()}>{key === "gstin" ? "GSTIN" : key.replace(/^./, (letter) => letter.toUpperCase())}</span>
                  <input className={inputClass()} value={business[key]} onChange={(event) => setBusiness((current) => ({ ...current, [key]: event.target.value }))} />
                </label>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-semibold">Customer Details</h3>
              {(["name", "address", "email", "phone"] as const).map((key) => (
                <label className="mt-3 block" key={key}>
                  <span className={labelClass()}>{key.replace(/^./, (letter) => letter.toUpperCase())}</span>
                  <input className={inputClass()} value={customer[key]} onChange={(event) => setCustomer((current) => ({ ...current, [key]: event.target.value }))} />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">Payment Items</h3>
              <button className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-cyan-300 px-3 text-sm font-semibold text-slate-950" onClick={addItem} type="button">
                <Plus className="h-4 w-4" />
                Add item
              </button>
            </div>
            <div className="mt-4 grid gap-4">
              {items.map((item, index) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4" key={item.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-300">Item {index + 1}</p>
                    <button className="rounded-xl border border-red-400/30 p-2 text-red-300 hover:bg-red-400/10" onClick={() => removeItem(item.id)} type="button" aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-[1fr_90px_140px_90px]">
                    <label>
                      <span className={labelClass()}>Description</span>
                      <input className={inputClass()} value={item.name} onChange={(event) => updateItem(item.id, { name: event.target.value })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Qty</span>
                      <input className={inputClass()} min="0" type="number" value={item.quantity} onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Amount</span>
                      <input className={inputClass()} min="0" type="number" value={item.unitPrice} onChange={(event) => updateItem(item.id, { unitPrice: Number(event.target.value) })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Tax %</span>
                      <input className={inputClass()} min="0" type="number" value={item.taxRate} onChange={(event) => updateItem(item.id, { taxRate: Number(event.target.value) })} />
                    </label>
                  </div>
                  <p className="mt-3 text-right text-sm font-semibold text-cyan-300">Line total: {money(item.quantity * item.unitPrice)}</p>
                </div>
              ))}
            </div>
          </div>

          <label className="mt-6 block">
            <span className={labelClass()}>Receipt Notes</span>
            <textarea className={`${inputClass()} min-h-24 py-3`} value={notes} onChange={(event) => setNotes(event.target.value)} />
          </label>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4">
            <div className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="h-10 w-10 rounded-2xl bg-cyan-600" />
                  <h3 className="mt-4 text-xl font-bold">{business.name || "Business name"}</h3>
                  <p className="text-xs text-slate-500">{business.email}</p>
                  <p className="mt-1 text-xs text-slate-500">{business.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-cyan-700">RECEIPT</p>
                  <p className="text-sm text-slate-500">{receiptNumber}</p>
                  <p className="mt-2 text-xs text-slate-500">{receiptDate}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Received from</p>
                  <p className="mt-2 font-semibold">{customer.name || "Customer name"}</p>
                  <p className="text-xs text-slate-500">{customer.email}</p>
                  <p className="text-xs text-slate-500">{customer.address}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p><span className="text-slate-500">Mode:</span> {paymentMode}</p>
                  <p className="mt-2"><span className="text-slate-500">Ref:</span> {reference || "-"}</p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_50px_90px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Description</span><span>Qty</span><span className="text-right">Amount</span>
                </div>
                {items.map((item) => (
                  <div className="grid grid-cols-[1fr_50px_90px] border-t border-slate-100 px-3 py-3" key={item.id}>
                    <span className="font-semibold">{item.name || "Receipt item"}</span>
                    <span>{item.quantity}</span>
                    <span className="text-right">{money(item.quantity * item.unitPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="ml-auto mt-5 max-w-xs space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
                <div className="flex justify-between"><span>Tax</span><strong>{money(totals.tax)}</strong></div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-lg"><span>Received</span><strong>{money(totals.total)}</strong></div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold">Notes</p>
                <p className="mt-1 text-slate-600">{notes}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
