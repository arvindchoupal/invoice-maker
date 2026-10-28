"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useInvoiceJourney } from "@/hooks/useInvoiceJourney";
import { stepForField } from "@/lib/user-tracking";
import {
  ChevronDown,
  Download,
  ImagePlus,
  Plus,
  Save,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import { invoiceValidationErrors, invoiceLogoData, invoiceDates } from "@/lib/invoice-document";
import { calculateInvoice, currency } from "@/lib/invoice";
import { getToken, apiBlob } from "@/lib/api";
import { trackAnalyticsEvent } from "@/lib/client-analytics";
import { attachPublicInvoiceDraft, savePublicInvoiceDraft, getPublicInvoiceDraft, PUBLIC_INVOICE_DRAFT_KEY } from "@/lib/public-invoice-draft";
import type { Invoice, InvoiceItem } from "@/types";

const freePdfStorageKey = "invoicewala-free-pdf-downloaded-v1";

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const compactFieldClass =
  "w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function numericParam(value: string | undefined) {
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
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

function blankItem(initialItem?: FreeInvoiceClientProps["initialItem"]): InvoiceItem {
  return {
    name: initialItem?.name || "",
    description: initialItem?.name ? "Imported from InvoiceWala calculator" : "",
    quantity: 1,
    unitPrice: numericParam(initialItem?.unitPrice),
    taxRate: numericParam(initialItem?.taxRate),
    discountRate: 0,
  };
}

type FreeInvoiceClientProps = {
  initialTaxMode?: "intra" | "inter";
  children?: React.ReactNode;
  initialSaveError?: boolean;
  initialTemplate?: { slug: string; label: string; style: string };
  initialItem?: {
    name?: string;
    taxRate?: string;
    unitPrice?: string;
  };
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-xs font-semibold text-slate-600">{children}</span>;
}

export function FreeInvoiceClient({ children, initialItem, initialTemplate, initialSaveError, initialTaxMode }: FreeInvoiceClientProps) {
  const router = useRouter();
  const journey = useInvoiceJourney();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [hasUsedFreeDownload, setHasUsedFreeDownload] = useState(false);
  const [actionMessage, setActionMessage] = useState(initialSaveError ? "You are signed in, but your invoice was not saved. Resume the draft below, check its details and try saving again." : "");
  const [actionError, setActionError] = useState(!!initialSaveError);
  const invoiceStartedRef = useRef(false);
  const [draftReady, setDraftReady] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<Invoice | null>(null);
  const [invoice, setInvoice] = useState<Invoice>(() => ({
    invoiceNumber: "",
    amountPaid: 0, logoData: null, taxMode: initialTaxMode || "tax", documentTitle: "INVOICE",
    sourceTemplate: initialTemplate?.slug,
    status: "Draft",
    ...invoiceDates(),
    currency: "INR",
    businessName: "",
    businessEmail: "",
    businessAddress: "",
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    notes: "",
    terms: "Payment is due by the invoice due date.",
    pdfStyle: initialTemplate?.style || "classic",
    items: [blankItem(initialItem)],
  }));

  const totals = useMemo(() => calculateInvoice(invoice.items, invoice.taxMode), [invoice.items, invoice.taxMode]);
  const logo = invoice.logoData;
  const amountPaid = invoice.amountPaid || 0;
  const currencySymbol = useMemo(
    () =>
      new Intl.NumberFormat("en", { style: "currency", currency: invoice.currency })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value || invoice.currency,
    [invoice.currency],
  );
  const balanceDue = Math.max(totals.total - Number(amountPaid || 0), 0);
  const isLoggedIn = Boolean(getToken());

  useEffect(() => {
    const syncFreeDownloadState = window.setTimeout(() => {
      setHasUsedFreeDownload(window.localStorage.getItem(freePdfStorageKey) === "1");
      const draft = getPublicInvoiceDraft();
      if (draft && Array.isArray(draft.items)) setPendingDraft(draft);
      else setDraftReady(true);
    }, 0);
    return () => window.clearTimeout(syncFreeDownloadState);
  }, []);

  useEffect(() => {
    if (!draftReady || !invoiceStartedRef.current) return;
    const timer = window.setTimeout(() => {
      try { savePublicInvoiceDraft(invoice); } catch { setActionError(true); setActionMessage("Device storage is unavailable. Download or save your invoice before leaving."); }
    }, 600);
    return () => clearTimeout(timer);
  }, [invoice, draftReady]);

  function markInvoiceStarted(source: string) {
    journey.change(stepForField(source));
    if (invoiceStartedRef.current) return;
    invoiceStartedRef.current = true;
    trackAnalyticsEvent("invoice_started", { source });
  }

  function update<K extends keyof Invoice>(key: K, value: Invoice[K]) {
    markInvoiceStarted(String(key));
    setInvoice((current) => ({ ...current, [key]: value }));
  }

  function updateItem(index: number, patch: Partial<InvoiceItem>) {
    markInvoiceStarted("line_item");
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    markInvoiceStarted("add_item");
    setInvoice((current) => ({ ...current, items: [...current.items, blankItem()] }));
  }

  function applyDiscount(discountRate: number) {
    markInvoiceStarted("discount");
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item) => ({ ...item, discountRate })),
    }));
  }

  function removeItem(index: number) {
    markInvoiceStarted("items");
    setInvoice((current) => ({
      ...current,
      items: current.items.length > 1 ? current.items.filter((_, itemIndex) => itemIndex !== index) : current.items,
    }));
  }

  async function handleLogo(file?: File) {
    if (!file) return;
    try { update("logoData", await invoiceLogoData(file)); }
    catch (error) { setActionError(true); setActionMessage(error instanceof Error ? error.message : "Could not read logo."); }
  }

  function continueToAuth(path: "/signup" | "/login") {
    journey.event("auth_requested", path === "/signup" ? "signup" : "login");
    savePublicInvoiceDraft(invoice);
    trackAnalyticsEvent(path === "/signup" ? "invoice_signup_started" : "invoice_login_started", {
      has_downloaded_free_pdf: hasUsedFreeDownload,
    });
    router.push(path);
  }

  async function openInWorkspace() {
    if (busy) return;
    const errors = invoiceValidationErrors(invoice);
    if (errors.length) { setActionError(true); setActionMessage(errors.join(" ")); journey.event("validation_failed", "save"); return; }
    setBusy(true); setActionError(false); setActionMessage("");
    try {
      savePublicInvoiceDraft(invoice);
      journey.event("save_attempted", "save");
      const saved = await attachPublicInvoiceDraft();
      if (!saved) throw new Error("Could not save this invoice. Your draft is still on this device.");
      journey.event("invoice_saved", "save");
      router.push(`/invoices/${saved.id}/edit`);
    } catch (error) {
      journey.event("save_failed", "save");
      setActionError(true); setActionMessage(error instanceof Error ? error.message : "Could not save invoice. Try again.");
    } finally { setBusy(false); }
  }

  async function downloadFreePdf() {
    if (busy) return;
    const errors = invoiceValidationErrors(invoice);
    if (errors.length) {
      setActionError(true); setActionMessage(errors.join(" "));
      journey.event("validation_failed", "download"); return;
    }
    setBusy(true); setActionMessage("");
    try {
      const blob = await apiBlob("/invoice-preview", { method: "POST", body: JSON.stringify(invoice) });
      downloadBlob(blob, `${(invoice.invoiceNumber || "invoice").replace(/[^a-z0-9-]+/gi, "-")}.pdf`);
      journey.event("pdf_downloaded", "download");
      savePublicInvoiceDraft(invoice);
      window.localStorage.setItem(freePdfStorageKey, "1");
      setHasUsedFreeDownload(true); setActionError(false);
      setActionMessage("PDF downloaded with all items and your invoice details. Save to your account to keep invoice history.");
      trackAnalyticsEvent("free_invoice_pdf_downloaded", { item_count: invoice.items.length });
    } catch (error) {
      journey.event("pdf_failed", "download"); setActionError(true);
      setActionMessage(error instanceof Error ? error.message : "PDF could not be downloaded. Try again.");
    } finally { setBusy(false); }
  }

  function handlePrimaryAction() {
    if (isLoggedIn) {
      void openInWorkspace();
      return;
    }
    if (!hasUsedFreeDownload) {
      void downloadFreePdf();
      return;
    }
    continueToAuth("/signup");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <fieldset disabled={busy} className="contents">


      <section id="invoice-maker" className="mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free invoice generator</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Create a professional invoice online</h1>
          </div>
        </div>

        {initialItem?.unitPrice || initialItem?.taxRate ? (
          <div className="mb-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
            Starting values added: ₹{Number(numericParam(initialItem.unitPrice)).toLocaleString("en-IN")} taxable value with {numericParam(initialItem.taxRate)}% tax.
          </div>
        ) : null}

        {pendingDraft ? <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><p>A previous invoice draft is saved on this device. Resume it or start fresh?</p><div className="mt-3 flex gap-3"><button className="rounded-lg bg-blue-600 px-3 py-2 text-white" onClick={() => { setInvoice({ ...pendingDraft, logoData: pendingDraft.logoData || null }); invoiceStartedRef.current = true; setPendingDraft(null); setDraftReady(true); }}>Resume draft</button><button className="rounded-lg border border-amber-400 px-3 py-2" onClick={() => { localStorage.removeItem(PUBLIC_INVOICE_DRAFT_KEY); setPendingDraft(null); setDraftReady(true); }}>Start fresh</button></div></div> : null}
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-950 shadow-2xl shadow-black/30">
            <div className="h-1.5 bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-500" />
            <div className="p-4 sm:p-7 lg:p-9">
              <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <input
                    ref={logoInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleLogo(event.target.files?.[0])}
                    type="file"
                  />
                  {logo ? (
                    <div className="flex items-start gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Business logo" className="h-20 w-24 rounded-lg border border-slate-200 object-contain p-1" src={logo} />
                      <button
                        aria-label="Remove logo"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-red-600"
                        onClick={() => update("logoData", null)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="group flex h-24 w-32 flex-col items-center justify-center rounded-lg border border-dashed border-blue-300 bg-blue-50/70 text-sm font-semibold text-blue-700 transition hover:border-blue-500 hover:bg-blue-50"
                      onClick={() => logoInputRef.current?.click()}
                      type="button"
                    >
                      <ImagePlus className="mb-2 h-5 w-5 transition group-hover:scale-110" />
                      Add your logo
                    </button>
                  )}
                </div>

                <div className="min-w-[220px] sm:text-right">
                  <input
                    aria-label="Document title"
                    className="w-full bg-transparent text-left text-4xl font-black tracking-tight text-slate-950 outline-none placeholder:text-slate-950 sm:text-right"
                    value={invoice.documentTitle || "INVOICE"}
                    onChange={event => update("documentTitle", event.target.value)}
                  />
                  <label className="mt-3 flex items-center gap-2 sm:justify-end">
                    <span className="text-sm font-semibold text-slate-500">#</span>
                    <input
                      aria-label="Invoice number"
                      placeholder="Assigned on save"
                      className={`${compactFieldClass} max-w-40`}
                      onFocus={() => journey.visit(stepForField("invoiceNumber"))} onChange={(event) => update("invoiceNumber", event.target.value)}
                      value={invoice.invoiceNumber || ""}
                    />
                  </label>
                </div>
              </div>

              {initialTemplate ? <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">Selected template: {initialTemplate.label}. Add your own business and item details below.</p> : null}
              <div className="mt-7 grid gap-6 border-t border-slate-100 pt-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
                <div>
                  <label>
                    <FieldLabel>Who is this invoice from?</FieldLabel>
                    <input
                      className={fieldClass}
                      onFocus={() => journey.visit(stepForField("businessName"))} onChange={(event) => update("businessName", event.target.value)}
                      placeholder="Your business or name"
                      value={invoice.businessName}
                    />
                  </label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label>
                      <span className="sr-only">Your email</span>
                      <input
                        className={compactFieldClass}
                        onFocus={() => journey.visit(stepForField("businessEmail"))} onChange={(event) => update("businessEmail", event.target.value)}
                        placeholder="your@email.com"
                        type="email"
                        value={invoice.businessEmail || ""}
                      />
                    </label>
                    <label>
                      <span className="sr-only">Your address</span>
                      <input
                        className={compactFieldClass}
                        onFocus={() => journey.visit(stepForField("businessAddress"))} onChange={(event) => update("businessAddress", event.target.value)}
                        placeholder="Business address (optional)"
                        value={invoice.businessAddress || ""}
                      />
                    </label>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Bill to</FieldLabel>
                      <input
                        className={compactFieldClass}
                        onFocus={() => journey.visit(stepForField("customerName"))} onChange={(event) => update("customerName", event.target.value)}
                        placeholder="Customer or company"
                        value={invoice.customerName}
                      />
                      <input
                        aria-label="Customer email"
                        className={`${compactFieldClass} mt-2`}
                        onFocus={() => journey.visit(stepForField("customerEmail"))} onChange={(event) => update("customerEmail", event.target.value)}
                        placeholder="customer@email.com"
                        type="email"
                        value={invoice.customerEmail || ""}
                      />
                    </div>
                    <div>
                      <FieldLabel>Billing address</FieldLabel>
                      <textarea
                        className={`${compactFieldClass} min-h-[86px] resize-none`}
                        onFocus={() => journey.visit(stepForField("customerAddress"))} onChange={(event) => update("customerAddress", event.target.value)}
                        placeholder="Customer billing address (optional)"
                        value={invoice.customerAddress || ""}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid content-start gap-3 rounded-xl bg-slate-50 p-4">
                  <label className="grid grid-cols-[96px_1fr] items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Invoice date</span>
                    <input className={compactFieldClass} onFocus={() => journey.visit(stepForField("issueDate"))} onChange={(event) => update("issueDate", event.target.value)} type="date" value={invoice.issueDate} />
                  </label>
                  <label className="grid grid-cols-[96px_1fr] items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Due date</span>
                    <input className={compactFieldClass} onFocus={() => journey.visit(stepForField("dueDate"))} onChange={(event) => update("dueDate", event.target.value)} type="date" value={invoice.dueDate} />
                  </label>
                  <div className="grid grid-cols-[96px_1fr] items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Status</span>
                    <span className="inline-flex w-fit rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Draft</span>
                  </div>
                </div>
              </div>

              <div className="mt-7 overflow-hidden rounded-lg border border-slate-200">
                <div className="hidden grid-cols-[minmax(220px,1fr)_88px_120px_100px_116px_40px] items-center gap-2 bg-slate-950 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-white md:grid">
                  <span>Item</span>
                  <span>Quantity</span>
                  <span>Rate</span>
                  <span>Tax</span>
                  <span className="text-right">Amount</span>
                  <span />
                </div>
                <div className="divide-y divide-slate-100">
                  {invoice.items.map((item, index) => (
                    <div className="grid gap-3 p-3 md:grid-cols-[minmax(220px,1fr)_88px_120px_100px_116px_40px] md:items-start md:gap-2" key={index}>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Item</span>
                        <input
                          className={compactFieldClass}
                          onFocus={() => journey.visit("items")} onChange={(event) => updateItem(index, { name: event.target.value })}
                          placeholder="Description of item or service"
                          value={item.name}
                        />
                        <input
                          aria-label={`Item ${index + 1} details`}
                          className="mt-1.5 w-full border-0 bg-transparent px-1 text-xs text-slate-500 outline-none placeholder:text-slate-400"
                          onFocus={() => journey.visit("items")} onChange={(event) => updateItem(index, { description: event.target.value })}
                          placeholder="Additional details (optional)"
                          value={item.description || ""}
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Quantity</span>
                        <input className={compactFieldClass} min="0" onFocus={() => journey.visit("items")} onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })} type="number" value={item.quantity} />
                      </label>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Rate</span>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-sm text-slate-400">{currencySymbol}</span>
                          <input className={`${compactFieldClass} pl-7`} min="0" onFocus={() => journey.visit("items")} onChange={(event) => updateItem(index, { unitPrice: Number(event.target.value) })} type="number" value={item.unitPrice} />
                        </div>
                      </label>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Tax</span>
                        <div className="relative">
                          <input className={`${compactFieldClass} pr-7`} min="0" onFocus={() => journey.visit("items")} onChange={(event) => updateItem(index, { taxRate: Number(event.target.value) })} type="number" value={item.taxRate} />
                          <span className="absolute right-2.5 top-2 text-sm text-slate-400">%</span>
                        </div>
                      </label>
                      <div>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Amount</span>
                        <p className="py-2 text-right text-sm font-semibold text-slate-900">
                          {currency(calculateInvoice([item], invoice.taxMode).total, invoice.currency)}
                        </p>
                      </div>
                      <button
                        aria-label={`Remove item ${index + 1}`}
                        className="rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                        disabled={invoice.items.length === 1}
                        onClick={() => removeItem(index)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="flex w-full items-center justify-center gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  onClick={addItem}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  Add line item
                </button>
              </div>

              <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="grid gap-4">
                  <label>
                    <FieldLabel>Notes</FieldLabel>
                    <textarea
                      className={`${fieldClass} min-h-20 resize-y`}
                      onFocus={() => journey.visit(stepForField("notes"))} onChange={(event) => update("notes", event.target.value)}
                      placeholder="Any relevant information not already covered"
                      value={invoice.notes || ""}
                    />
                  </label>
                  <label>
                    <FieldLabel>Terms</FieldLabel>
                    <textarea
                      className={`${fieldClass} min-h-20 resize-y`}
                      onFocus={() => journey.visit(stepForField("terms"))} onChange={(event) => update("terms", event.target.value)}
                      placeholder="Payment terms, methods or delivery schedule"
                      value={invoice.terms || ""}
                    />
                  </label>
                </div>

                <div className="text-sm">
                  <div className="grid gap-3 border-b border-slate-200 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Subtotal</span>
                      <strong>{currency(totals.subtotal, invoice.currency)}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {discountOpen ? (
                        <label className="flex items-center gap-2 text-slate-600">
                          <span>Discount</span>
                          <span className="relative">
                            <input
                              aria-label="Discount percentage"
                              className="w-16 rounded-md border border-slate-200 py-1 pl-2 pr-5 text-right text-xs outline-none focus:border-blue-500"
                              min="0"
                              onChange={(event) => applyDiscount(Number(event.target.value))}
                              type="number"
                              value={invoice.items[0]?.discountRate || 0}
                            />
                            <span className="absolute right-1.5 top-1 text-xs text-slate-400">%</span>
                          </span>
                        </label>
                      ) : (
                        <button className="font-semibold text-blue-600 hover:text-blue-500" onClick={() => setDiscountOpen(true)} type="button">
                          + Discount
                        </button>
                      )}
                      <strong className="text-emerald-700">− {currency(totals.discountTotal, invoice.currency)}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Tax</span>
                      <strong>{currency(totals.taxTotal, invoice.currency)}</strong>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 py-4 text-base">
                    <span className="font-bold">Total</span>
                    <strong>{currency(totals.total, invoice.currency)}</strong>
                  </div>
                  <label className="flex items-center justify-between gap-4 border-b border-slate-200 py-4">
                    <span className="text-slate-600">Amount paid</span>
                    <input
                      aria-label="Amount paid"
                      className={`${compactFieldClass} max-w-32 text-right`}
                      min="0"
                      onFocus={() => journey.visit("document")} onChange={(event) => update("amountPaid", Number(event.target.value))}
                      type="number"
                      value={amountPaid}
                    />
                  </label>
                  <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-base text-blue-950">
                    <span className="font-bold">Balance due</span>
                    <strong>{currency(balanceDue, invoice.currency)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="grid gap-3 xl:sticky xl:top-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/20">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                data-event={isLoggedIn ? "invoice_save_click" : hasUsedFreeDownload ? "invoice_signup_after_free_pdf_click" : "free_pdf_download_click"}
                data-event-category="conversion"
                disabled={busy}
                onClick={handlePrimaryAction}
                type="button"
              >
                {isLoggedIn ? <Save className="h-4 w-4" /> : hasUsedFreeDownload ? <Save className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                {isLoggedIn ? "Save invoice" : hasUsedFreeDownload ? "Create free account" : "Download first PDF free"}
              </button>
              <button
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                data-event={isLoggedIn ? "invoice_workspace_click" : "invoice_save_history_click"}
                data-event-category="conversion"
                onClick={() => (isLoggedIn ? void openInWorkspace() : continueToAuth(hasUsedFreeDownload ? "/login" : "/signup"))}
                type="button"
              >
                {isLoggedIn ? <Download className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {isLoggedIn ? "Open in workspace" : hasUsedFreeDownload ? "Log in to saved invoices" : "Save & track invoices"}
              </button>
              {!isLoggedIn ? <p className="mt-3 text-center text-xs leading-5 text-slate-400">No signup for your first PDF. A free account saves history, customers and payment status.</p> : null}
              {actionMessage ? (
                <p className={`mt-3 rounded-lg px-3 py-2 text-xs leading-5 ${actionError ? "bg-red-400/10 text-red-200" : "bg-emerald-400/10 text-emerald-200"}`} role={actionError ? "alert" : "status"}>
                  {actionMessage}
                </p>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
              <button
                aria-expanded={settingsOpen}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                onClick={() => setSettingsOpen((open) => !open)}
                type="button"
              >
                Invoice settings
                <ChevronDown className={`h-4 w-4 transition ${settingsOpen ? "rotate-180" : ""}`} />
              </button>
              {settingsOpen ? (
                <div className="grid gap-3 border-t border-white/10 p-4">
                  <label>
                    <span className="mb-1.5 block text-xs font-semibold text-slate-300">Currency</span>
                    <select className={compactFieldClass} onFocus={() => journey.visit(stepForField("currency"))} onChange={(event) => update("currency", event.target.value)} value={invoice.currency}>
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="AED">AED — UAE Dirham</option>
                    </select>
                  </label>
                  <p className="text-xs leading-5 text-slate-400">Add tax on each item row. Discounts and tax selections are preserved when you save.</p>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-100">
              <p className="font-bold text-white">A clean invoice, in minutes.</p>
              <p className="mt-1 text-xs leading-5 text-cyan-100/70">No complicated setup. Add details, check the total and save.</p>
            </div>
          </aside>
        </div>
      </section>

      </fieldset>
      {children}
      <PublicSiteFooter />
    </main>
  );
}
