"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./InvoiceForm.module.css";
import { useRouter } from "next/navigation";
import { useInvoiceJourney } from "@/hooks/useInvoiceJourney";
import { stepForField, type InvoiceStep } from "@/lib/user-tracking";
import {
  ArrowDown,
  ArrowUp,
  Keyboard,
  LayoutGrid,
  Mail,
  Maximize2,
  MessageCircle,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { API_URL, api, downloadApiFile } from "@/lib/api";
import { calculateInvoice, currency } from "@/lib/invoice";
import { type PdfStyleMeta } from "@/lib/pdf-styles";
import type { Client, Invoice, InvoiceItem, InvoiceStatus } from "@/types";
import { InvoicePdfPreview } from "@/components/InvoicePdfPreview";
import { InvoiceAdditionalDetails } from "@/components/InvoiceAdditionalDetails";
import { invoiceValidationErrors, invoiceLogoData, invoiceDates } from "@/lib/invoice-document";
import { TemplateGallery } from "@/components/TemplateGallery";
import { Badge, Button, Card, Field } from "@/components/ui";

type BuilderItem = InvoiceItem & { localId: string };
type BuilderInvoice = Omit<Invoice, "items"> & { items: BuilderItem[] };
type LocalInvoiceDraft = Partial<Invoice> & { localDraftSavedAt?: string };
type SectionId = "details" | "parties" | "items" | "notes";
type BrandingSettings = {
  logo_url?: string;
  logo_snapshot?: string;
  company_name?: string;
  company_email?: string;
  company_tax_id?: string;
  company_address?: string;
  currency?: string;
  tax_rate?: number | string;
  default_pdf_style?: string;
};

const sectionLabels: Record<SectionId, string> = {
  details: "Document",
  parties: "Parties",
  items: "Items",
  notes: "Notes",
};

const supportedCurrencies = [
  { code: "INR", label: "INR - Indian Rupee" },
  { code: "USD", label: "USD - US Dollar" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - British Pound" },
  { code: "AED", label: "AED - UAE Dirham" },
];

function normalizeCurrency(code?: string) {
  const normalized = (code || "INR").trim().toUpperCase();
  return normalized;
}

const blankItem = (taxRate = 0): BuilderItem => ({
  localId: crypto.randomUUID(),
  name: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  taxRate,
  discountRate: 0,
});

function toBuilderInvoice(initial?: Partial<Invoice>): BuilderInvoice {
  return {
    amountPaid: 0, taxMode: "tax", documentTitle: "INVOICE",
    ...invoiceDates(),
    status: "Draft",
    currency: "INR",
    businessName: "",
    businessEmail: "",
    businessTaxId: "",
    businessAddress: "",
    customerName: "",
    customerEmail: "",
    customerTaxId: "",
    customerAddress: "",
    notes: "",
    terms: "Payment is due by the invoice due date.",
    ...initial,
    items: initial?.items?.length ? initial.items.map((item) => ({ ...item, localId: crypto.randomUUID() })) : [blankItem()],
  };
}

function toApiInvoice(invoice: BuilderInvoice, pdfStyle: string): Invoice {
  const items = invoice.items
    .map((item) => ({
      name: item.name.trim(),
      description: item.description?.trim() || undefined,
      quantity: Number(item.quantity),
      hsnCode: item.hsnCode?.trim() || undefined,
      unitPrice: Number(item.unitPrice) || 0,
      taxRate: invoice.taxMode === "none" ? 0 : Number(item.taxRate) || 0,
      discountRate: Number(item.discountRate) || 0,
    }));

  return {
    ...invoice,
    invoiceNumber: invoice.invoiceNumber?.trim() || undefined,
    amountPaid: Number(invoice.amountPaid || 0),
    taxMode: invoice.taxMode || "tax",
    logoData: invoice.logoData ?? null,
    currency: normalizeCurrency(invoice.currency),
    businessName: invoice.businessName.trim(),
    businessEmail: invoice.businessEmail?.trim() || undefined,
    businessTaxId: invoice.businessTaxId?.trim() || undefined,
    businessAddress: invoice.businessAddress?.trim() || undefined,
    customerName: invoice.customerName.trim(),
    customerEmail: invoice.customerEmail?.trim() || undefined,
    customerTaxId: invoice.customerTaxId?.trim() || undefined,
    customerAddress: invoice.customerAddress?.trim() || undefined,
    notes: invoice.notes?.trim() || undefined,
    terms: invoice.terms?.trim() || undefined,
    pdfStyle,
    items,
  };
}

const compactInput = "w-full min-w-0 min-h-10 rounded-md border border-transparent bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 hover:border-slate-200 hover:bg-slate-50 focus:border-blue-500 focus:bg-blue-50 focus:ring-2 focus:ring-blue-100";

function assetUrl(path: string | undefined) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  const base = API_URL.replace(/\/api$/, "");
  if (path.startsWith("/uploads/")) return `${base}${path}`;
  if (path.includes("/uploads/")) return `${base}/uploads/${path.split("/uploads/").pop()}`;
  return "";
}

export function InvoiceForm({ initial, invoiceId }: { initial?: Partial<Invoice>; invoiceId?: string }) {
  const router = useRouter();
  const journey = useInvoiceJourney();
  const persistedId = useRef(invoiceId);
  const saveInFlight = useRef(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfStyle, setPdfStyle] = useState(initial?.pdfStyle ?? "classic");
  const [pdfStyles, setPdfStyles] = useState<PdfStyleMeta[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [autosaveState, setAutosaveState] = useState<"saved" | "saving" | "idle">("idle");
  const [branding, setBranding] = useState<BrandingSettings>({});
  const [defaultTaxRate, setDefaultTaxRate] = useState(0);
  const [invoice, setInvoice] = useState<BuilderInvoice>(() => toBuilderInvoice(initial));
  const [pendingDraft, setPendingDraft] = useState<LocalInvoiceDraft | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const dirty = useRef(false);
  let accountId = "guest";
  try { if (typeof window !== "undefined") accountId = String(JSON.parse(localStorage.getItem("invoice_user") || "null")?.id || "guest"); } catch { /* An unavailable session must not crash the editor. */ }
  const draftKey = `invoicewala-draft-${accountId}-${invoiceId ?? "new"}`;
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(draftKey);
        const draft = raw ? JSON.parse(raw) : null;
        if (draft && Array.isArray(draft.items)) setPendingDraft(draft);
        else setDraftReady(true);
      } catch { setDraftReady(true); }
    }, 0);
    return () => clearTimeout(timer);
  }, [draftKey]);


  const totals = useMemo(() => calculateInvoice(invoice.items, invoice.taxMode), [invoice.items, invoice.taxMode]);
  const validationErrors = useMemo(() => invoiceValidationErrors(toApiInvoice(invoice, pdfStyle)), [invoice, pdfStyle]);
  const styleMeta = pdfStyles.find(item => item.id === pdfStyle);
  const logoSrc = invoice.logoData === undefined ? assetUrl(branding.logo_url) : invoice.logoData || "";

  useEffect(() => {
    api<BrandingSettings>("/settings").then((data) => {
      setBranding(data);
      setDefaultTaxRate(Number(data.tax_rate) || 0);
      setInvoice((current) => {
        const next = { ...current };
        if (next.logoData === undefined) next.logoData = data.logo_snapshot || null;
        if (!invoiceId && !dirty.current) {
          if (!next.businessName) next.businessName = data.company_name ?? "";
          if (!next.businessEmail) next.businessEmail = data.company_email ?? "";
          if (!next.businessTaxId) next.businessTaxId = data.company_tax_id ?? "";
          if (!next.businessAddress) next.businessAddress = data.company_address ?? "";
          if (!initial?.currency && data.currency) next.currency = data.currency;
          next.items = next.items.map((item) => item.taxRate ? item : { ...item, taxRate: Number(data.tax_rate) || 0 });
        }
        return next;
      });
      if (!initial?.pdfStyle && !dirty.current && data.default_pdf_style) setPdfStyle(String(data.default_pdf_style));
    }).catch(() => undefined);
    api<PdfStyleMeta[]>("/invoice-preview/styles").then((items) => {
      setPdfStyles(items);
      if (!initial?.pdfStyle && items[0]) setPdfStyle((current) => current || items[0].id);
    }).catch(() => undefined);
    api<Client[]>("/clients").then(setClients).catch(() => undefined);
  }, [initial?.currency, initial?.pdfStyle, invoiceId]);

  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    if (!draftReady || !dirty.current || loading) return;
    autosaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ ...toApiInvoice(invoice, pdfStyle), localDraftSavedAt: new Date().toISOString() }));
        setAutosaveState("saved");
      } catch { setAutosaveState("idle"); setError("Device storage is unavailable. Save this invoice to your account to keep your changes."); }
    }, 600);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [invoice, draftKey, pdfStyle, draftReady, loading]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (loading) return;
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
      if (meta && event.key === "Enter") {
        event.preventDefault();
        addItem();
      }
      if (meta && event.key.toLowerCase() === "p") {
        event.preventDefault();
        void downloadPdf();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function markDirty(step: InvoiceStep = "items") {
    dirty.current = true;
    journey.change(step);
    setAutosaveState("saving");
  }

  function update<K extends keyof BuilderInvoice>(key: K, value: BuilderInvoice[K]) {
    dirty.current = true;
    journey.change(stepForField(String(key)));
    setAutosaveState("saving");
    setInvoice((current) => ({ ...current, [key]: value }));
  }

  function updateItem(localId: string, patch: Partial<BuilderItem>) {
    markDirty();
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item) => (item.localId === localId ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    markDirty();
    setInvoice((current) => ({ ...current, items: [...current.items, blankItem(defaultTaxRate)] }));
  }

  function removeItem(localId: string) {
    markDirty();
    setInvoice((current) => {
      const next = current.items.filter((item) => item.localId !== localId);
      return { ...current, items: next.length ? next : [blankItem(defaultTaxRate)] };
    });
  }

  function moveItem(localId: string, direction: -1 | 1) {
    markDirty();
    setInvoice((current) => {
      const index = current.items.findIndex((item) => item.localId === localId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.items.length) return current;
      const items = [...current.items];
      const [item] = items.splice(index, 1);
      items.splice(nextIndex, 0, item);
      return { ...current, items };
    });
  }

  function dropItemOn(targetId: string) {
    if (!draggedItemId || draggedItemId === targetId) return;
    markDirty();
    setInvoice((current) => {
      const items = [...current.items];
      const from = items.findIndex((item) => item.localId === draggedItemId);
      const to = items.findIndex((item) => item.localId === targetId);
      if (from < 0 || to < 0) return current;
      const [item] = items.splice(from, 1);
      items.splice(to, 0, item);
      return { ...current, items };
    });
    setDraggedItemId(null);
  }

  async function save(navigate = true, style = pdfStyle) {
    if (saveInFlight.current) return;
    saveInFlight.current = true;
    journey.event("save_attempted", "save");
    let validationPassed = false;
    setLoading(true);
    setError("");
    setShareMessage("");
    try {
      const payload = toApiInvoice(invoice, style);
      const validationErrors = invoiceValidationErrors(payload);
      if (validationErrors.length) throw new Error(validationErrors.join("\n"));
      validationPassed = true;
      const saved = await api<{ id: number; invoiceNumber: string }>(persistedId.current ? `/invoices/${persistedId.current}` : "/invoices", {
        method: persistedId.current ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      journey.event("invoice_saved", "save");
      dirty.current = false;
      localStorage.removeItem(draftKey);
      persistedId.current = String(saved.id);
      setInvoice(current => ({ ...current, invoiceNumber: saved.invoiceNumber }));
      setShareMessage("Invoice saved to your account.");
      if (navigate) router.push(`/invoices/${saved.id}/edit`);
      return String(saved.id);
    } catch (err) {
      journey.event(validationPassed ? "save_failed" : "validation_failed", "save");
      setError(err instanceof Error ? err.message : "Could not save invoice");
    } finally {
      saveInFlight.current = false;
      setLoading(false);
    }
  }

  async function sendEmail() {
    if (!invoiceId) {
      setShareMessage("Save the invoice first to send email.");
      return;
    }
    setShareMessage("");
    try {
      await api(`/invoices/${invoiceId}/email`, { method: "POST" });
      setShareMessage("Invoice email sent.");
    } catch (err) {
      setShareMessage(err instanceof Error ? err.message : "Could not send email");
    }
  }

  function whatsappShareUrl() {
    if (!invoiceId) return "";
    const text = `Hi, invoice ${invoice.invoiceNumber || ""} for ${currency(totals.total, invoice.currency)} is ready. Please reply here if you would like me to send the PDF.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  function applyClient(clientId: string) {
    const client = clients.find((item) => String(item.id) === clientId);
    if (!client) return;
    markDirty("customer");
    setInvoice((current) => ({
      ...current,
      clientId: client.id,
      customerName: client.name,
      customerEmail: client.email ?? "",
      customerTaxId: client.tax_id ?? "",
      customerAddress: client.billing_address ?? "",
    }));
  }

  async function uploadLogo(file: File | null) {
    if (!file) return;
    try { update("logoData", await invoiceLogoData(file)); setShareMessage("Invoice logo updated."); }
    catch (err) { setShareMessage(err instanceof Error ? err.message : "Could not read logo."); }
  }

  async function removeLogo() { update("logoData", null); setShareMessage("Invoice logo removed."); }

  async function downloadPdf(style = pdfStyle) {
    const id = await save(false, style);
    if (!id) return;
    setLoading(true);
    try {
      await downloadApiFile(`/invoices/${id}/pdf`, `${invoice.invoiceNumber || "invoice"}-${style}.pdf`);
      journey.event("pdf_downloaded", "download");
      setShareMessage("Current invoice saved and PDF downloaded.");
    } catch (err) {
      journey.event("pdf_failed", "download");
      setShareMessage(err instanceof Error ? err.message : "Could not download PDF.");
    } finally { setLoading(false); }
  }

  function sectionShell(id: SectionId, children: React.ReactNode) {
    return <section id={`invoice-section-${id}`} className="scroll-mt-28 border-b border-slate-200 py-6 last:border-0" key={id} aria-label={sectionLabels[id]}>{children}</section>;
  }

  function focusDocumentSection(section: "details" | "parties" | "items" | "tax") {
    const target = document.getElementById(`invoice-section-${section}`);
    if (target instanceof HTMLDetailsElement) target.open = true;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function preserveDraftBeforeSettings(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!draftReady || !dirty.current) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ ...toApiInvoice(invoice, pdfStyle), localDraftSavedAt: new Date().toISOString() }));
    } catch {
      event.preventDefault();
      setError("This device could not save the invoice draft. Please save the invoice before leaving this page.");
    }
  }

  function renderSection(id: SectionId) {
    if (id === "details") {
      return sectionShell(id, (
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Issue"><input className={compactInput} type="date" value={invoice.issueDate} onFocus={() => journey.visit(stepForField("issueDate"))} onChange={(e) => update("issueDate", e.target.value)} /></Field>
          <Field label="Due"><input className={compactInput} type="date" value={invoice.dueDate} onFocus={() => journey.visit(stepForField("dueDate"))} onChange={(e) => update("dueDate", e.target.value)} /></Field>
          <Field label="Status"><select className={compactInput} value={invoice.status} onFocus={() => journey.visit(stepForField("status"))} onChange={(e) => update("status", e.target.value as InvoiceStatus)}>{["Draft", "Sent", "Paid", "Overdue"].map((status) => <option key={status}>{status}</option>)}</select></Field>
          <Field label="Currency">
            <select className={compactInput} value={normalizeCurrency(invoice.currency)} onFocus={() => journey.visit(stepForField("currency"))} onChange={(e) => update("currency", e.target.value)}>
              {!supportedCurrencies.some(c => c.code === normalizeCurrency(invoice.currency)) ? <option value={normalizeCurrency(invoice.currency)}>{normalizeCurrency(invoice.currency)}</option> : null}
              {supportedCurrencies.map((currency) => (
                <option key={currency.code} value={currency.code}>{currency.label}</option>
              ))}
            </select>
          </Field>
        </div>
      ));
    }

    if (id === "parties") {
      return sectionShell(id, (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">From</p>
            <p className="mb-3 text-xs text-slate-500">{branding.company_name ? "Prefilled from your company settings. Edit these details for this invoice." : <>Add your business profile in <Link className="font-semibold text-blue-600 underline dark:text-blue-300" href="/settings?returnTo=%2Finvoices%2Fnew" onClick={preserveDraftBeforeSettings}>Settings</Link> to fill these details automatically.</>}</p>
            <div className="grid gap-2">
              <Field label="Business name (required)"><input className={compactInput} autoComplete="organization" required value={invoice.businessName} onFocus={() => journey.visit(stepForField("businessName"))} onChange={(e) => update("businessName", e.target.value)} /></Field>
              <Field label="Business email (optional)"><input className={compactInput} type="email" autoComplete="email" value={invoice.businessEmail} onFocus={() => journey.visit(stepForField("businessEmail"))} onChange={(e) => update("businessEmail", e.target.value)} /></Field>
              <Field label="GSTIN / VAT number (optional)"><input className={compactInput} value={invoice.businessTaxId} onFocus={() => journey.visit(stepForField("businessTaxId"))} onChange={(e) => update("businessTaxId", e.target.value)} /></Field>
              <Field label="Business address (optional)"><textarea className={`${compactInput} min-h-16`} autoComplete="street-address" value={invoice.businessAddress} onFocus={() => journey.visit(stepForField("businessAddress"))} onChange={(e) => update("businessAddress", e.target.value)} /></Field>
            </div>
          </div>
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bill to</p>
              {clients.length ? (
                <select className={`${compactInput} text-xs sm:max-w-[220px]`} defaultValue="" onChange={(e) => applyClient(e.target.value)}>
                  <option value="">Pick saved client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Field label="Customer name (required)"><input className={compactInput} autoComplete="name" required value={invoice.customerName} onFocus={() => journey.visit(stepForField("customerName"))} onChange={(e) => update("customerName", e.target.value)} /></Field>
              <Field label="Customer email (optional)"><input className={compactInput} type="email" autoComplete="email" value={invoice.customerEmail} onFocus={() => journey.visit(stepForField("customerEmail"))} onChange={(e) => update("customerEmail", e.target.value)} /></Field>
              <Field label="Customer GSTIN / VAT number (optional)"><input className={compactInput} value={invoice.customerTaxId} onFocus={() => journey.visit(stepForField("customerTaxId"))} onChange={(e) => update("customerTaxId", e.target.value)} /></Field>
              <Field label="Customer address (optional)"><textarea className={`${compactInput} min-h-16`} autoComplete="street-address" value={invoice.customerAddress} onFocus={() => journey.visit(stepForField("customerAddress"))} onChange={(e) => update("customerAddress", e.target.value)} /></Field>
            </div>
          </div>
        </div>
      ));
    }

    if (id === "items") {
      return sectionShell(id, <div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600"><tr>{["Item / description", "Qty", "Rate", "Tax %", "Disc %", "Amount", ""].map((label, index) => <th key={index} scope="col" className="px-3 py-3 text-left font-semibold">{label || <span className="sr-only">Item actions</span>}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-200">{invoice.items.map((item, index) => <tr key={item.localId} draggable onDragStart={() => setDraggedItemId(item.localId)} onDragOver={event => event.preventDefault()} onDrop={() => dropItemOn(item.localId)} className={draggedItemId === item.localId ? "opacity-50" : ""}>
              <td className="min-w-60 px-2 py-3 align-top"><input aria-label={`Item ${index + 1} name (required)`} className={compactInput} placeholder="Product or service" required value={item.name} onChange={event => updateItem(item.localId, {name:event.target.value})} /><input aria-label={`Item ${index + 1} description`} className={compactInput} placeholder="Additional details (optional)" value={item.description || ""} onChange={event => updateItem(item.localId, {description:event.target.value})} /><details className="px-2 text-xs text-slate-500"><summary className="cursor-pointer py-2">HSN / SAC</summary><input aria-label={`Item ${index + 1} HSN / SAC`} className={compactInput} value={item.hsnCode || ""} onChange={event => updateItem(item.localId, {hsnCode:event.target.value})} /></details></td>
              <td className="w-20 px-1 py-3 align-top"><input aria-label={`Item ${index + 1} quantity`} className={compactInput} type="number" min="0.01" step="0.01" value={item.quantity} onChange={event => updateItem(item.localId,{quantity:Number(event.target.value)})} /></td>
              <td className="w-28 px-1 py-3 align-top"><input aria-label={`Item ${index + 1} rate`} className={compactInput} type="number" min="0" step="0.01" value={item.unitPrice} onChange={event => updateItem(item.localId,{unitPrice:Number(event.target.value)})} /></td>
              <td className="w-20 px-1 py-3 align-top"><input aria-label={`Item ${index + 1} tax percentage`} className={compactInput} type="number" min="0" max="100" step="0.01" disabled={invoice.taxMode === "none"} value={invoice.taxMode === "none" ? 0 : item.taxRate} onChange={event => updateItem(item.localId,{taxRate:Number(event.target.value)})} /></td>
              <td className="w-20 px-1 py-3 align-top"><input aria-label={`Item ${index + 1} discount percentage`} className={compactInput} type="number" min="0" max="100" step="0.01" value={item.discountRate} onChange={event => updateItem(item.localId,{discountRate:Number(event.target.value)})} /></td>
              <td className="whitespace-nowrap px-3 py-5 align-top font-semibold">{currency(calculateInvoice([item], invoice.taxMode).total, invoice.currency)}</td>
              <td className="px-1 py-3 align-top"><div className="flex flex-col"><button type="button" aria-label={`Move item ${index + 1} up`} disabled={index === 0} className="rounded p-2 hover:bg-slate-100 disabled:opacity-30" onClick={() => moveItem(item.localId,-1)}><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" aria-label={`Move item ${index + 1} down`} disabled={index === invoice.items.length-1} className="rounded p-2 hover:bg-slate-100 disabled:opacity-30" onClick={() => moveItem(item.localId,1)}><ArrowDown className="h-3.5 w-3.5" /></button><button type="button" aria-label={`Remove item ${index + 1}`} disabled={invoice.items.length === 1} className="rounded p-2 text-red-600 hover:bg-red-50 disabled:opacity-30" onClick={() => removeItem(item.localId)}><Trash2 className="h-3.5 w-3.5" /></button></div></td>
            </tr>)}</tbody>
          </table>
        </div>
        <button type="button" onClick={addItem} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"><Plus className="h-4 w-4" />Add line item</button>
      </div>);
    }

    return sectionShell(id, (
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Notes"><textarea className={`${compactInput} min-h-20`} value={invoice.notes} onFocus={() => journey.visit(stepForField("notes"))} onChange={(e) => update("notes", e.target.value)} /></Field>
        <Field label="Terms"><textarea className={`${compactInput} min-h-20`} value={invoice.terms} onFocus={() => journey.visit(stepForField("terms"))} onChange={(e) => update("terms", e.target.value)} /></Field>
      </div>
    ));
  }

  return (
    <fieldset disabled={loading} className="relative grid min-w-0 gap-4 border-0 p-0">
      {pendingDraft ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><p className="font-semibold">We found an invoice draft saved on this device.</p><p className="mt-1">Resume it to keep your work, or start a new invoice. Starting fresh removes this saved draft from this device.</p>{pendingDraft.localDraftSavedAt ? <p className="mt-1 text-xs text-amber-800">Last saved {new Date(pendingDraft.localDraftSavedAt).toLocaleString()}</p> : null}<div className="mt-3 flex flex-wrap gap-2"><Button type="button" onClick={() => { setInvoice(toBuilderInvoice(pendingDraft)); setPdfStyle(pendingDraft.pdfStyle || pdfStyle); dirty.current = true; setPendingDraft(null); setDraftReady(true); }}>Resume saved draft</Button><Button type="button" variant="secondary" onClick={() => { localStorage.removeItem(draftKey); setPendingDraft(null); setDraftReady(true); }}>Start a new invoice</Button></div></div> : null}
      <Card className="p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Badge tone={autosaveState === "saved" ? "green" : autosaveState === "saving" ? "amber" : "slate"}>
              {pendingDraft ? "Draft found · choose Resume or Start new" : autosaveState === "saved" ? "Saved on this device" : autosaveState === "saving" ? "Autosaving..." : "Ready"}
            </Badge>
            <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
              <Keyboard className="h-3.5 w-3.5" />
              Ctrl/⌘+S save · Ctrl/⌘+Enter item · Ctrl/⌘+P PDF
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <Button variant="secondary" onClick={() => setShowGallery((open) => !open)}>
              <LayoutGrid className="h-4 w-4" />
              {styleMeta?.label ?? "Template"}
            </Button>
            <label className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]">
              Logo
              <input className="sr-only" type="file" accept="image/png,image/jpeg" onChange={(event) => uploadLogo(event.target.files?.[0] ?? null)} />
            </label>
            {logoSrc ? <Button variant="secondary" onClick={removeLogo}>Remove logo</Button> : null}
            {invoiceId ? (
              <>
                <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]" onClick={() => void downloadPdf()} type="button">
                  Download PDF
                </button>
                <Button variant="secondary" onClick={sendEmail}><Mail className="h-4 w-4" />Email</Button>
                <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100" href={whatsappShareUrl()} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />WhatsApp
                </a>
              </>
            ) : (
              <span className="text-xs text-slate-500">Saves invoice, then downloads PDF</span>
            )}
            <Button variant="secondary" onClick={() => setShowPreview(open => !open)} aria-expanded={showPreview}><Maximize2 className="h-4 w-4" />{showPreview ? "Hide PDF preview" : "Preview PDF"}</Button>
            <Button variant="secondary" onClick={() => void save()}><Save className="h-4 w-4" />Save invoice</Button>
            <Button onClick={() => void downloadPdf()}>Save & download</Button>
          </div>
        </div>
        {shareMessage ? <p role="status" className="mt-2 text-sm text-slate-600 dark:text-slate-300">{shareMessage}</p> : null}
        {error ? <div role="alert" className="mt-3 whitespace-pre-line rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</div> : null}
      </Card>

      {showGallery ? (
        <TemplateGallery
          styles={pdfStyles}
          selectedId={pdfStyle}
          onClose={() => setShowGallery(false)}
          onSelect={(id) => {
            setPdfStyle(id);
            markDirty("template");
          }}
          onDownload={invoiceId ? (id) => {
            journey.change("template");
            setPdfStyle(id);
            void downloadPdf(id);
          } : undefined}
        />
      ) : null}

      <div className="grid min-w-0 items-start gap-5 2xl:grid-cols-[minmax(0,1fr)_240px]">
        <article className={`${styles.paper} min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-lg`} aria-label="Editable invoice document">
          <div className="h-1.5 bg-blue-600" />
          <div className="p-4 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="inline-flex min-h-20 cursor-pointer items-center rounded-xl border border-dashed border-slate-300 px-5 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50">
                {logoSrc ? <Image src={logoSrc} alt="Invoice business logo" width={160} height={64} unoptimized className="max-h-16 max-w-40 object-contain" /> : "+ Add your logo"}
                <input className="sr-only" aria-label="Invoice logo" type="file" accept="image/png,image/jpeg" onChange={event => uploadLogo(event.target.files?.[0] ?? null)} />
              </label>
              <div className="max-w-full sm:max-w-72"><input aria-label="Document title" className={`${compactInput.replace("text-sm", "text-3xl")} text-right font-bold tracking-tight`} value={invoice.documentTitle || "INVOICE"} onChange={event => update("documentTitle", event.target.value)} /><label className="mt-2 flex items-center justify-end gap-2 text-sm text-slate-500"><span>#</span><input aria-label="Invoice number" className={`${compactInput} max-w-48 text-right`} value={invoice.invoiceNumber || ""} placeholder="Assigned on save" onChange={event => update("invoiceNumber", event.target.value)} /></label></div>
            </div>
            {renderSection("parties")}
            {renderSection("details")}
            {renderSection("items")}
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              {renderSection("notes")}
              <section className="py-6 text-sm" aria-label="Invoice totals">
                <dl className="space-y-4">
                  {[["Subtotal", totals.subtotal], ["Discount", -totals.discountTotal], ["Tax", totals.taxTotal], ["Total", totals.total]].map(([label, amount]) => <div key={label} className={`flex justify-between gap-3 ${label === "Total" ? "border-t border-slate-200 pt-4 text-lg font-bold" : ""}`}><dt>{label}</dt><dd className="font-semibold">{currency(Number(amount), invoice.currency)}</dd></div>)}
                </dl>
                <label className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4"><span>Amount paid</span><input aria-label="Amount paid" className={`${compactInput} max-w-32 text-right`} type="number" min="0" step="0.01" value={invoice.amountPaid || 0} onChange={event => update("amountPaid", Number(event.target.value))} /></label>
                <div className="mt-5 flex justify-between gap-3 rounded-xl bg-blue-50 px-4 py-4 text-lg font-bold text-blue-950"><span>Balance due</span><span>{currency(Math.max(0, totals.total - Number(invoice.amountPaid || 0)), invoice.currency)}</span></div>
              </section>
            </div>
          </div>
        </article>
        <aside className="grid min-w-0 gap-4 2xl:sticky 2xl:top-24">
          <Card className="grid gap-3 p-4">
            <p className="text-sm font-semibold">Your invoice</p>
            <p className="text-xs leading-6 text-slate-500">Fill the document directly. Preview the PDF when you are ready to check the final template.</p>
            <Button onClick={() => void downloadPdf()}>Save & download PDF</Button>
            <Button variant="secondary" onClick={() => void save()}><Save className="h-4 w-4" />Save invoice</Button>
            <Button variant="secondary" onClick={() => setShowPreview(open => !open)} aria-expanded={showPreview}>Preview PDF</Button>
          </Card>
          <details id="invoice-section-tax" className="scroll-mt-28 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <summary className="cursor-pointer text-sm font-semibold">Tax, GST & shipping settings</summary>
            <div className="mt-4"><InvoiceAdditionalDetails invoice={invoice} update={(key, value) => { markDirty(stepForField(key)); setInvoice(current => ({ ...current, [key]: value })); }} /></div>
          </details>
          {validationErrors.length ? <p className="text-xs leading-6 text-slate-500">Add the required billing details before saving. Any missing fields will be listed when you save or preview.</p> : <p className="text-sm text-emerald-700 dark:text-emerald-300">Ready to save your invoice.</p>}
        </aside>
      </div>
      {showPreview ? <InvoicePdfPreview invoice={toApiInvoice(invoice, pdfStyle)} onFix={focusDocumentSection} /> : null}

    </fieldset>
  );
}
