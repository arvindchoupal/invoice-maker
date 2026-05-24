import { api } from "@/lib/api";
import type { Invoice } from "@/types";

export const PUBLIC_INVOICE_DRAFT_KEY = "ledgerly_public_invoice_draft";

export function savePublicInvoiceDraft(invoice: Invoice) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PUBLIC_INVOICE_DRAFT_KEY, JSON.stringify(invoice));
}

export function getPublicInvoiceDraft() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PUBLIC_INVOICE_DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Invoice;
  } catch {
    localStorage.removeItem(PUBLIC_INVOICE_DRAFT_KEY);
    return null;
  }
}

export async function attachPublicInvoiceDraft() {
  const draft = getPublicInvoiceDraft();
  if (!draft) return null;

  const hasRequiredData =
    draft.businessName?.trim() &&
    draft.customerName?.trim() &&
    draft.items?.some((item) => item.name?.trim() && Number(item.quantity) > 0 && Number(item.unitPrice) >= 0);

  if (!hasRequiredData) return null;

  const saved = await api<{ id: number }>("/invoices", {
    method: "POST",
    body: JSON.stringify({
      ...draft,
      invoiceNumber: undefined,
      status: "Draft",
      pdfStyle: draft.pdfStyle || "classic",
      currency: draft.currency || "INR",
      terms: draft.terms || "Payment is due by the invoice due date.",
      notes: draft.notes || "Created from the public invoice maker.",
    }),
  });

  localStorage.removeItem(PUBLIC_INVOICE_DRAFT_KEY);
  return saved;
}
