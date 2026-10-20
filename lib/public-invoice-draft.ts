import { api, getToken } from "@/lib/api";
import { invoiceValidationErrors } from "@/lib/invoice-document";
import { trackAttachedPublicInvoice } from "@/lib/user-tracking";
import type { Invoice } from "@/types";

export const PUBLIC_INVOICE_DRAFT_KEY = "ledgerly_public_invoice_draft";

function owner() {
  try { return getToken() ? String(JSON.parse(localStorage.getItem("invoice_user") || "null")?.id || "") : null; } catch { return null; }
}

export function savePublicInvoiceDraft(invoice: Invoice) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PUBLIC_INVOICE_DRAFT_KEY, JSON.stringify({ owner: owner(), invoice }));
}

export function getPublicInvoiceDraft() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PUBLIC_INVOICE_DRAFT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.owner && parsed.owner !== owner()) return null;
    const invoice = (parsed.invoice || parsed) as Invoice;
    if (typeof invoice.businessName !== "string" || typeof invoice.customerName !== "string" || !Array.isArray(invoice.items) || !invoice.items.every(item => item && typeof item.name === "string")) return null;
    return invoice;
  } catch {
    localStorage.removeItem(PUBLIC_INVOICE_DRAFT_KEY);
    return null;
  }
}

let attachment: Promise<{ id: number } | null> | null = null;
export function attachPublicInvoiceDraft() {
  if (!attachment) attachment = attachDraft().finally(() => { attachment = null; });
  return attachment;
}

async function attachDraft() {
  const draft = getPublicInvoiceDraft();
  if (!draft) return null;

  const errors = invoiceValidationErrors(draft);
  if (errors.length) return null;

  const saved = await api<{ id: number }>("/invoices", {
    method: "POST",
    body: JSON.stringify({
      ...draft,
      invoiceNumber: draft.invoiceNumber?.trim() || undefined,
      status: draft.status || "Draft",
      pdfStyle: draft.pdfStyle || "classic",
      currency: draft.currency || "INR",
      terms: draft.terms,
      notes: draft.notes,
    }),
  });

  trackAttachedPublicInvoice("invoice_saved");
  if (JSON.stringify(getPublicInvoiceDraft()) === JSON.stringify(draft)) localStorage.removeItem(PUBLIC_INVOICE_DRAFT_KEY);
  return saved;
}
