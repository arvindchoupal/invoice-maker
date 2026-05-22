import type { InvoiceItem } from "@/types";

export function calculateInvoice(items: InvoiceItem[]) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.unitPrice), 0);
  const discountTotal = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice) * (Number(item.discountRate) / 100),
    0,
  );
  const taxTotal = items.reduce((sum, item) => {
    const discounted = Number(item.quantity) * Number(item.unitPrice) * (1 - Number(item.discountRate) / 100);
    return sum + discounted * (Number(item.taxRate) / 100);
  }, 0);
  const total = subtotal - discountTotal + taxTotal;
  return {
    subtotal: money(subtotal),
    discountTotal: money(discountTotal),
    taxTotal: money(taxTotal),
    total: money(total),
  };
}

export function money(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function currency(value: number, code = "INR") {
  return new Intl.NumberFormat("en", { style: "currency", currency: code }).format(value);
}
