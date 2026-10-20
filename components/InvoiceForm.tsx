"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useInvoiceJourney } from "@/hooks/useInvoiceJourney";
import { stepForField, type InvoiceStep } from "@/lib/user-tracking";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Keyboard,
  LayoutGrid,
  Mail,
  Maximize2,
  MessageCircle,
  MoveHorizontal,
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
import { Badge, Button, Card, Field, inputClass } from "@/components/ui";

type BuilderItem = InvoiceItem & { localId: string };
type BuilderInvoice = Omit<Invoice, "items"> & { items: BuilderItem[] };
type SectionId = "details" | "parties" | "items" | "notes";
type BrandingSettings = { logo_url?: string; logo_snapshot?: string; company_name?: string; default_pdf_style?: string };

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

const blankItem = (): BuilderItem => ({
  localId: crypto.randomUUID(),
  name: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  taxRate: 0,
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

const compactInput = `${inputClass} w-full min-w-0 min-h-9 rounded-lg border-transparent bg-transparent px-2 py-1 shadow-none hover:border-slate-200 hover:bg-white focus:border-blue-500 dark:hover:border-white/10 dark:hover:bg-white/[0.04]`;

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
  const shellRef = useRef<HTMLDivElement | null>(null);
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
  const [editorWidth, setEditorWidth] = useState(56);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<SectionId | null>(null);
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(["details", "parties", "items", "notes"]);
  const [autosaveState, setAutosaveState] = useState<"saved" | "saving" | "idle">("idle");
  const [branding, setBranding] = useState<BrandingSettings>({});
  const [invoice, setInvoice] = useState<BuilderInvoice>(() => toBuilderInvoice(initial));
  const [pendingDraft, setPendingDraft] = useState<Partial<Invoice> | null>(null);
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
  const styleMeta = pdfStyles.find(item => item.id === pdfStyle);
  const logoSrc = invoice.logoData === undefined ? assetUrl(branding.logo_url) : invoice.logoData || "";

  useEffect(() => {
    api<BrandingSettings>("/settings").then((data) => {
      setBranding(data);
      setInvoice(current => current.logoData === undefined ? { ...current, logoData: data.logo_snapshot || null } : current);
      if (!initial?.pdfStyle && !dirty.current && data.default_pdf_style) setPdfStyle(String(data.default_pdf_style));
    }).catch(() => undefined);
    api<PdfStyleMeta[]>("/invoice-preview/styles").then((items) => {
      setPdfStyles(items);
      if (!initial?.pdfStyle && items[0]) setPdfStyle((current) => current || items[0].id);
    }).catch(() => undefined);
    api<Client[]>("/clients").then(setClients).catch(() => undefined);
  }, [initial?.pdfStyle]);

  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    if (!draftReady || !dirty.current || loading) return;
    autosaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify(toApiInvoice(invoice, pdfStyle)));
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
    setInvoice((current) => ({ ...current, items: [...current.items, blankItem()] }));
  }

  function removeItem(localId: string) {
    markDirty();
    setInvoice((current) => {
      const next = current.items.filter((item) => item.localId !== localId);
      return { ...current, items: next.length ? next : [blankItem()] };
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

  function moveSection(section: SectionId, direction: -1 | 1) {
    setSectionOrder((current) => {
      const index = current.indexOf(section);
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  }

  function dropSectionOn(target: SectionId) {
    if (!draggedSection || draggedSection === target) return;
    setSectionOrder((current) => {
      const next = [...current];
      const from = next.indexOf(draggedSection);
      const to = next.indexOf(target);
      if (from < 0 || to < 0) return current;
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setDraggedSection(null);
  }

  function startSplitterDrag() {
    function onPointerMove(event: PointerEvent) {
      if (!shellRef.current) return;
      const rect = shellRef.current.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      setEditorWidth(Math.min(Math.max(next, 44), 60));
    }
    function onPointerUp() {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
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
    return (
      <Card
        className="p-3 sm:p-4"
        key={id}
      >
        <div
          draggable
          onDragStart={() => setDraggedSection(id)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => dropSectionOn(id)}
          className="mb-3 flex cursor-grab items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/[0.04]"
        >
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">{sectionLabels[id]}</h2>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" className="min-h-8 px-2" onClick={() => moveSection(id, -1)}><ArrowUp className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" className="min-h-8 px-2" onClick={() => moveSection(id, 1)}><ArrowDown className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
        {children}
      </Card>
    );
  }

  function renderSection(id: SectionId) {
    if (id === "details") {
      return sectionShell(id, (
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          <Field label="Document title"><input className={compactInput} value={invoice.documentTitle || "INVOICE"} onChange={e => update("documentTitle", e.target.value)} /></Field>
          <Field label="Invoice #"><input className={compactInput} value={invoice.invoiceNumber ?? ""} placeholder="Auto" onFocus={() => journey.visit(stepForField("invoiceNumber"))} onChange={(e) => update("invoiceNumber", e.target.value)} /></Field>
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
        <div className="grid gap-3 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">From</p>
            <div className="grid gap-2">
              <input className={compactInput} placeholder="Business name" value={invoice.businessName} onFocus={() => journey.visit(stepForField("businessName"))} onChange={(e) => update("businessName", e.target.value)} />
              <input className={compactInput} type="email" placeholder="Business email" value={invoice.businessEmail} onFocus={() => journey.visit(stepForField("businessEmail"))} onChange={(e) => update("businessEmail", e.target.value)} />
              <input className={compactInput} placeholder="GST/VAT ID" value={invoice.businessTaxId} onFocus={() => journey.visit(stepForField("businessTaxId"))} onChange={(e) => update("businessTaxId", e.target.value)} />
              <textarea className={`${compactInput} min-h-16`} placeholder="Business address" value={invoice.businessAddress} onFocus={() => journey.visit(stepForField("businessAddress"))} onChange={(e) => update("businessAddress", e.target.value)} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
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
              <input className={compactInput} placeholder="Client name" value={invoice.customerName} onFocus={() => journey.visit(stepForField("customerName"))} onChange={(e) => update("customerName", e.target.value)} />
              <input className={compactInput} type="email" placeholder="Client email" value={invoice.customerEmail} onFocus={() => journey.visit(stepForField("customerEmail"))} onChange={(e) => update("customerEmail", e.target.value)} />
              <input className={compactInput} placeholder="Client GST/VAT ID" value={invoice.customerTaxId} onFocus={() => journey.visit(stepForField("customerTaxId"))} onChange={(e) => update("customerTaxId", e.target.value)} />
              <textarea className={`${compactInput} min-h-16`} placeholder="Client address" value={invoice.customerAddress} onFocus={() => journey.visit(stepForField("customerAddress"))} onChange={(e) => update("customerAddress", e.target.value)} />
            </div>
          </div>
        </div>
      ));
    }

    if (id === "items") {
      return sectionShell(id, (
        <div className="grid gap-3">
          {invoice.items.map((item, index) => (
            <div
              className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-blue-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] ${draggedItemId === item.localId ? "opacity-50" : ""}`}
              draggable
              key={item.localId}
              onDragStart={() => setDraggedItemId(item.localId)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => dropItemOn(item.localId)}
            >
              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <GripVertical className="h-5 w-5 cursor-grab" />
                    <span className="text-xs font-semibold">Line {index + 1}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button variant="ghost" className="min-h-8 px-2" onClick={() => moveItem(item.localId, -1)}><ArrowUp className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" className="min-h-8 px-2" onClick={() => moveItem(item.localId, 1)}><ArrowDown className="h-3.5 w-3.5" /></Button>
                    <Button variant="danger" className="min-h-8 px-2" onClick={() => removeItem(item.localId)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <div className="grid min-w-0 gap-3">
                  <div className="grid min-w-0 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <input className={`${compactInput} w-full min-w-0`} placeholder="Service or product" value={item.name} onFocus={() => journey.visit("items")} onChange={(e) => updateItem(item.localId, { name: e.target.value })} />
                    <input className={`${compactInput} w-full min-w-0`} placeholder="Description" value={item.description} onFocus={() => journey.visit("items")} onChange={(e) => updateItem(item.localId, { description: e.target.value })} />
                  </div>
                  <Field label="HSN / SAC (optional)"><input className={compactInput} value={item.hsnCode || ""} onChange={e => updateItem(item.localId, { hsnCode: e.target.value })} /></Field>
                  <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
                    <Field label="Qty"><input className={`${compactInput} w-full min-w-0`} aria-label="Quantity" type="number" min="0" step="0.01" value={item.quantity} onFocus={() => journey.visit("items")} onChange={(e) => updateItem(item.localId, { quantity: Number(e.target.value) })} /></Field>
                    <Field label="Rate"><input className={`${compactInput} w-full min-w-0`} aria-label="Unit price" type="number" min="0" step="0.01" value={item.unitPrice} onFocus={() => journey.visit("items")} onChange={(e) => updateItem(item.localId, { unitPrice: Number(e.target.value) })} /></Field>
                    <Field label="Tax %"><input className={`${compactInput} w-full min-w-0`} aria-label="Tax rate" type="number" min="0" step="0.01" value={item.taxRate} onFocus={() => journey.visit("items")} onChange={(e) => updateItem(item.localId, { taxRate: Number(e.target.value) })} /></Field>
                    <Field label="Disc %"><input className={`${compactInput} w-full min-w-0`} aria-label="Discount rate" type="number" min="0" step="0.01" value={item.discountRate} onFocus={() => journey.visit("items")} onChange={(e) => updateItem(item.localId, { discountRate: Number(e.target.value) })} /></Field>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={addItem}><Plus className="h-4 w-4" />Add line item</Button>
        </div>
      ));
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
      {pendingDraft ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><p>A previous draft is saved on this device. Resume it, or start from the current invoice details?</p><div className="mt-3 flex gap-2"><Button onClick={() => { setInvoice(toBuilderInvoice(pendingDraft)); setPdfStyle(pendingDraft.pdfStyle || pdfStyle); dirty.current = true; setPendingDraft(null); setDraftReady(true); }}>Resume draft</Button><Button variant="secondary" onClick={() => { localStorage.removeItem(draftKey); setPendingDraft(null); setDraftReady(true); }}>Start fresh</Button></div></div> : null}
      <Card className="p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Badge tone={autosaveState === "saved" ? "green" : autosaveState === "saving" ? "amber" : "slate"}>
              {autosaveState === "saved" ? "Saved on this device" : autosaveState === "saving" ? "Autosaving..." : "Ready"}
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
                <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]" onClick={() => setShowGallery(true)} type="button">
                  Download PDF
                </button>
                <Button variant="secondary" onClick={sendEmail}><Mail className="h-4 w-4" />Email</Button>
                <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100" href={whatsappShareUrl()} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />WhatsApp
                </a>
              </>
            ) : (
              <span className="text-xs text-slate-500">Save to download PDF or share</span>
            )}
            <Button variant="secondary" onClick={() => void downloadPdf()}><Maximize2 className="h-4 w-4" />Save & download</Button>
            <Button disabled={loading} onClick={() => void save()}><Save className="h-4 w-4" />{loading ? "Saving..." : "Save"}</Button>
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

      <div ref={shellRef} className="grid gap-3 lg:flex lg:items-start">
        <div className="grid w-full min-w-0 gap-3 lg:w-[var(--editor-width)]" style={{ "--editor-width": `${editorWidth}%` } as React.CSSProperties}>
          <Card className="p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Document sections</p>
            <div className="flex flex-wrap gap-2">
              {sectionOrder.map((section) => (
                <button
                  draggable
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]"
                  key={section}
                  onDragStart={() => setDraggedSection(section)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => dropSectionOn(section)}
                >
                  <GripVertical className="h-3.5 w-3.5 text-slate-400" />
                  {sectionLabels[section]}
                </button>
              ))}
            </div>
          </Card>
          {sectionOrder.map(renderSection)}
          <InvoiceAdditionalDetails invoice={invoice} update={(key, value) => { markDirty(stepForField(key)); setInvoice(current => ({ ...current, [key]: value })); }} />
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><p className="text-xs text-slate-500">Subtotal</p><strong>{currency(totals.subtotal, invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Discount</p><strong>{currency(totals.discountTotal, invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Tax</p><strong>{currency(totals.taxTotal, invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Total</p><strong>{currency(totals.total, invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Amount paid</p><strong>{currency(Number(invoice.amountPaid || 0), invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Balance due</p><strong>{currency(totals.total - Number(invoice.amountPaid || 0), invoice.currency)}</strong></div>
              </div>
              <Button disabled={loading} onClick={() => void save()}><Save className="h-4 w-4" />{loading ? "Saving..." : "Save invoice"}</Button>
            </div>

          </Card>
        </div>

        <button
          className="hidden h-[calc(100vh-9rem)] w-3 cursor-col-resize items-center justify-center rounded-full bg-slate-200 text-slate-500 transition hover:bg-blue-200 dark:bg-white/10 lg:flex"
          onPointerDown={startSplitterDrag}
          type="button"
          aria-label="Resize editor and preview"
        >
          <MoveHorizontal className="h-3.5 w-3.5 rotate-90" />
        </button>

        <aside className="min-w-0 lg:sticky lg:top-24" style={{ flexBasis: `${100-editorWidth}%` }}>
          <InvoicePdfPreview invoice={toApiInvoice(invoice, pdfStyle)} />
        </aside>
      </div>

    </fieldset>
  );
}
