import type { Invoice } from "@/types";
import { calculateInvoice } from "@/lib/invoice";

export function invoiceValidationErrors(invoice: Invoice): string[] {
  const errors: string[] = [];
  const precise = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;
  if (!/^[A-Z]{3}$/.test(invoice.currency)) errors.push("Choose a valid three-letter currency code.");
  if (!invoice.businessName.trim()) errors.push("Business name is required.");
  if (!invoice.customerName.trim()) errors.push("Customer name is required.");
  if (!invoice.issueDate || !invoice.dueDate || invoice.dueDate < invoice.issueDate) errors.push("Choose valid issue and due dates. Due date cannot be before issue date.");
  for (const [label, value] of [["Business email", invoice.businessEmail], ["Customer email", invoice.customerEmail]]) {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push(`${label} is invalid.`);
  }
  if (!invoice.items.length) errors.push("Add at least one line item.");
  invoice.items.forEach((item, index) => {
    if ([item.quantity, item.unitPrice, item.taxRate, item.discountRate].some(v => !precise(Number(v)))) errors.push(`Item ${index + 1}: use up to two decimal places for quantity, rate, tax and discount.`);
    if (!item.name.trim()) errors.push(`Item ${index + 1}: add a name.`);
    if (!Number.isFinite(Number(item.quantity)) || Number(item.quantity) <= 0) errors.push(`Item ${index + 1}: quantity must be greater than zero.`);
    if (!Number.isFinite(Number(item.unitPrice)) || Number(item.unitPrice) < 0) errors.push(`Item ${index + 1}: rate cannot be negative.`);
    for (const [label, value] of [["tax", item.taxRate], ["discount", item.discountRate]] as const) {
      if (!Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > 100) errors.push(`Item ${index + 1}: ${label} must be between 0 and 100.`);
    }
  });
  if (!precise(Number(invoice.amountPaid || 0))) errors.push("Amount paid supports up to two decimal places.");
  const total = calculateInvoice(invoice.items, invoice.taxMode).total;
  if (!Number.isFinite(Number(invoice.amountPaid || 0)) || Number(invoice.amountPaid || 0) < 0 || Number(invoice.amountPaid || 0) > total) errors.push("Amount paid must be between zero and the invoice total.");
  return errors;
}

export async function invoiceLogoData(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image for your logo.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Logo must be smaller than 5 MB.");
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("Could not read this logo image.")); image.src = url; });
    const scale = Math.min(1, 480 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare logo.");
    context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/jpeg", 0.85);
    if (data.length > 400000) throw new Error("Logo is too large. Please use a simpler image.");
    return data;
  } finally { URL.revokeObjectURL(url); }
}

export function invoiceDates() {
  const now = new Date();
  const local = (date: Date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const due = new Date(now); due.setDate(due.getDate() + 14);
  return { issueDate: local(now), dueDate: local(due) };
}
