import type { InvoiceItem } from "@/types";

export function calculateInvoice(items: InvoiceItem[], taxMode = "tax") {
  const lines = items.map(item => {
    const base = money(Number(item.quantity) * Number(item.unitPrice));
    const discount = money(base * Number(item.discountRate || 0) / 100);
    const tax = taxMode === "none" ? 0 : money((base - discount) * Number(item.taxRate || 0) / 100);
    return { base, discount, tax, total: money(base - discount + tax) };
  });
  return {
    subtotal: money(lines.reduce((n, l) => n + l.base, 0)),
    discountTotal: money(lines.reduce((n, l) => n + l.discount, 0)),
    taxTotal: money(lines.reduce((n, l) => n + l.tax, 0)),
    total: money(lines.reduce((n, l) => n + l.total, 0)),
  };
}

export function money(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function currency(value: number, code = "INR") {
  return new Intl.NumberFormat("en", { style: "currency", currency: code }).format(value);
}
