"use client";

import { useMemo, useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";

type Item = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
};

const initialItems: Item[] = [
  { id: 1, name: "Office Chairs", description: "Ergonomic chairs with arm support", quantity: 10, unitPrice: 5000, taxRate: 18 },
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
    .slice(0, 120);
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

export function PurchaseOrderGeneratorClient() {
  const [poNumber, setPoNumber] = useState("PO-2026-001");
  const [issueDate, setIssueDate] = useState("2026-06-02");
  const [deliveryDate, setDeliveryDate] = useState("2026-06-12");
  const [buyer, setBuyer] = useState({
    name: "ABC Technologies",
    address: "Bengaluru, Karnataka",
    email: "purchase@abctech.example",
    phone: "+91 98765 43210",
    gstin: "29ABCDE1234F1Z5",
  });
  const [supplier, setSupplier] = useState({
    name: "XYZ Office Supplies",
    address: "Pune, Maharashtra",
    email: "sales@xyzoffice.example",
    phone: "+91 91234 56780",
    gstin: "27XYZAB1234C1Z8",
  });
  const [items, setItems] = useState<Item[]>(initialItems);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("Please confirm stock availability and delivery schedule before dispatch.");
  const [terms, setTerms] = useState("Purchase order is valid for 15 days. Supplier invoice should mention the PO number.");

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxable = Math.max(subtotal - discount, 0);
    const itemTaxBase = subtotal || 1;
    const gst = items.reduce((sum, item) => {
      const itemAmount = item.quantity * item.unitPrice;
      const proportionalDiscount = discount * (itemAmount / itemTaxBase);
      return sum + Math.max(itemAmount - proportionalDiscount, 0) * (item.taxRate / 100);
    }, 0);
    return { subtotal, taxable, gst, grandTotal: taxable + gst };
  }, [discount, items]);

  function updateItem(id: number, patch: Partial<Item>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((current) => [
      ...current,
      { id: Date.now(), name: "", description: "", quantity: 1, unitPrice: 0, taxRate: 18 },
    ]);
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
    text(buyer.name || "Buyer business", 42, 745, 18, "F2");
    text(buyer.email, 42, 727);
    text(buyer.phone, 42, 712);
    text(buyer.address, 42, 697);
    text(`GSTIN: ${buyer.gstin || "-"}`, 42, 682);
    text("PURCHASE ORDER", 330, 790, 24, "F2");
    text(poNumber, 430, 768, 11, "F2");
    text(`Issue: ${issueDate}`, 430, 750);
    text(`Delivery: ${deliveryDate}`, 430, 735);

    rect(42, 610, 511, 52);
    text("SUPPLIER", 58, 645, 9, "F2");
    text(supplier.name || "Supplier name", 58, 628, 14, "F2");
    text(`${supplier.email} | ${supplier.phone}`, 270, 628);
    text(`${supplier.address} | GSTIN: ${supplier.gstin || "-"}`, 270, 613);

    rect(42, 565, 511, 24, "0.06 0.09 0.16");
    text("ITEM", 52, 573, 9, "F2");
    text("QTY", 286, 573, 9, "F2");
    text("UNIT PRICE", 338, 573, 9, "F2");
    text("TAX", 424, 573, 9, "F2");
    text("AMOUNT", 485, 573, 9, "F2");

    let y = 540;
    items.slice(0, 12).forEach((item) => {
      text(item.name || "Item name", 52, y, 10, "F2");
      text(item.description, 52, y - 14, 8);
      text(String(item.quantity), 290, y);
      text(pdfMoney(item.unitPrice), 338, y);
      text(`${item.taxRate}%`, 426, y);
      text(pdfMoney(item.quantity * item.unitPrice), 470, y);
      commands.push("0.88 0.91 0.95 RG 42 " + (y - 24) + " 511 0.5 re S");
      y -= 42;
    });

    y = Math.min(y, 205);
    text("Subtotal", 350, y, 10);
    text(pdfMoney(totals.subtotal), 450, y, 10, "F2");
    text("Discount", 350, y - 18, 10);
    text(pdfMoney(discount), 450, y - 18, 10, "F2");
    text("GST", 350, y - 36, 10);
    text(pdfMoney(totals.gst), 450, y - 36, 10, "F2");
    commands.push(`0.88 0.91 0.95 RG 350 ${y - 50} 180 0.8 re S`);
    text("Total", 350, y - 72, 16, "F2");
    text(pdfMoney(totals.grandTotal), 450, y - 72, 16, "F2");

    rect(42, 70, 238, 76);
    rect(300, 70, 253, 76);
    text("NOTES", 58, 124, 9, "F2");
    text(notes, 58, 106, 9);
    text("TERMS & CONDITIONS", 316, 124, 9, "F2");
    text(terms, 316, 106, 9);

    const stream = commands.join("\n");
    const blob = createPdfBlob(stream);
    const safeName = (poNumber || "purchase-order").replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
    downloadBlob(blob, `${safeName}.pdf`);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6" id="purchase-order-tool">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Tool builder</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Create a purchase order online</h2>
            </div>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              onClick={downloadPdf}
              type="button"
            >
              <Printer className="h-4 w-4" />
              Download PDF
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <label>
              <span className={labelClass()}>Purchase Order Number</span>
              <input className={inputClass()} value={poNumber} onChange={(event) => setPoNumber(event.target.value)} />
            </label>
            <label>
              <span className={labelClass()}>Issue Date</span>
              <input className={inputClass()} type="date" value={issueDate} onChange={(event) => setIssueDate(event.target.value)} />
            </label>
            <label>
              <span className={labelClass()}>Expected Delivery Date</span>
              <input className={inputClass()} type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} />
            </label>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-semibold">Buyer Details</h3>
              {(["name", "address", "email", "phone", "gstin"] as const).map((key) => (
                <label className="mt-3 block" key={key}>
                  <span className={labelClass()}>{key === "gstin" ? "GSTIN" : key.replace(/^./, (letter) => letter.toUpperCase())}</span>
                  <input className={inputClass()} value={buyer[key]} onChange={(event) => setBuyer((current) => ({ ...current, [key]: event.target.value }))} />
                </label>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-semibold">Supplier Details</h3>
              {(["name", "address", "email", "phone", "gstin"] as const).map((key) => (
                <label className="mt-3 block" key={key}>
                  <span className={labelClass()}>{key === "gstin" ? "GSTIN" : key.replace(/^./, (letter) => letter.toUpperCase())}</span>
                  <input className={inputClass()} value={supplier[key]} onChange={(event) => setSupplier((current) => ({ ...current, [key]: event.target.value }))} />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">Items Table</h3>
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
                  <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_90px_120px_90px]">
                    <label>
                      <span className={labelClass()}>Item Name</span>
                      <input className={inputClass()} value={item.name} onChange={(event) => updateItem(item.id, { name: event.target.value })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Description</span>
                      <input className={inputClass()} value={item.description} onChange={(event) => updateItem(item.id, { description: event.target.value })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Qty</span>
                      <input className={inputClass()} min="0" type="number" value={item.quantity} onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Unit Price</span>
                      <input className={inputClass()} min="0" type="number" value={item.unitPrice} onChange={(event) => updateItem(item.id, { unitPrice: Number(event.target.value) })} />
                    </label>
                    <label>
                      <span className={labelClass()}>Tax %</span>
                      <input className={inputClass()} min="0" type="number" value={item.taxRate} onChange={(event) => updateItem(item.id, { taxRate: Number(event.target.value) })} />
                    </label>
                  </div>
                  <p className="mt-3 text-right text-sm font-semibold text-cyan-300">Amount: {money(item.quantity * item.unitPrice)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[220px_1fr_1fr]">
            <label>
              <span className={labelClass()}>Discount</span>
              <input className={inputClass()} min="0" type="number" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} />
            </label>
            <label>
              <span className={labelClass()}>Notes</span>
              <textarea className={`${inputClass()} min-h-24 py-3`} value={notes} onChange={(event) => setNotes(event.target.value)} />
            </label>
            <label>
              <span className={labelClass()}>Terms & Conditions</span>
              <textarea className={`${inputClass()} min-h-24 py-3`} value={terms} onChange={(event) => setTerms(event.target.value)} />
            </label>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start" id="po-document">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4">
            <div className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="h-10 w-10 rounded-2xl bg-cyan-600" />
                  <h3 className="mt-4 text-xl font-bold">{buyer.name || "Buyer business"}</h3>
                  <p className="text-xs text-slate-500">{buyer.email}</p>
                  <p className="mt-1 text-xs text-slate-500">{buyer.address}</p>
                  <p className="mt-1 text-xs text-slate-500">GSTIN: {buyer.gstin || "-"}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-700">PURCHASE ORDER</p>
                  <p className="text-sm text-slate-500">{poNumber}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Supplier</p>
                  <p className="mt-2 font-semibold">{supplier.name || "Supplier name"}</p>
                  <p className="text-xs text-slate-500">{supplier.email}</p>
                  <p className="text-xs text-slate-500">{supplier.address}</p>
                  <p className="text-xs text-slate-500">GSTIN: {supplier.gstin || "-"}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p><span className="text-slate-500">Issue:</span> {issueDate}</p>
                  <p className="mt-2"><span className="text-slate-500">Delivery:</span> {deliveryDate}</p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 text-sm">
                <div className="grid grid-cols-[1fr_50px_80px_80px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                  <span>Item</span><span>Qty</span><span>Tax</span><span className="text-right">Amount</span>
                </div>
                {items.map((item) => (
                  <div className="grid grid-cols-[1fr_50px_80px_80px] border-t border-slate-100 px-3 py-3" key={item.id}>
                    <span>
                      <span className="block font-semibold">{item.name || "Item name"}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                    <span>{item.quantity}</span>
                    <span>{item.taxRate}%</span>
                    <span className="text-right">{money(item.quantity * item.unitPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="ml-auto mt-5 max-w-xs space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
                <div className="flex justify-between"><span>Discount</span><strong>{money(discount)}</strong></div>
                <div className="flex justify-between"><span>GST</span><strong>{money(totals.gst)}</strong></div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-lg"><span>Total</span><strong>{money(totals.grandTotal)}</strong></div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold">Notes</p>
                <p className="mt-1 text-slate-600">{notes}</p>
              </div>
              <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold">Terms & Conditions</p>
                <p className="mt-1 text-slate-600">{terms}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
