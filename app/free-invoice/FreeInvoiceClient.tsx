"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Download,
  ImagePlus,
  Lock,
  Plus,
  Save,
  Send,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import { PublicSiteNav } from "@/components/PublicSiteNav";
import { calculateInvoice, currency } from "@/lib/invoice";
import { getToken } from "@/lib/api";
import { attachPublicInvoiceDraft, savePublicInvoiceDraft } from "@/lib/public-invoice-draft";
import type { Invoice, InvoiceItem } from "@/types";

const today = new Date().toISOString().slice(0, 10);
const defaultDueDate = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const compactFieldClass =
  "w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function numericParam(value: string | undefined) {
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
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
  initialItem?: {
    name?: string;
    taxRate?: string;
    unitPrice?: string;
  };
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-xs font-semibold text-slate-600">{children}</span>;
}

export function FreeInvoiceClient({ initialItem }: FreeInvoiceClientProps) {
  const router = useRouter();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: "INV-001",
    status: "Draft",
    issueDate: today,
    dueDate: defaultDueDate,
    currency: "INR",
    businessName: "",
    businessEmail: "",
    businessAddress: "",
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    notes: "",
    terms: "Payment is due by the invoice due date.",
    pdfStyle: "classic",
    items: [blankItem(initialItem)],
  });

  const totals = useMemo(() => calculateInvoice(invoice.items), [invoice.items]);
  const currencySymbol = useMemo(
    () =>
      new Intl.NumberFormat("en", { style: "currency", currency: invoice.currency })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value || invoice.currency,
    [invoice.currency],
  );
  const balanceDue = Math.max(totals.total - Number(amountPaid || 0), 0);
  const isLoggedIn = Boolean(getToken());

  function update<K extends keyof Invoice>(key: K, value: Invoice[K]) {
    setInvoice((current) => ({ ...current, [key]: value }));
  }

  function updateItem(index: number, patch: Partial<InvoiceItem>) {
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setInvoice((current) => ({ ...current, items: [...current.items, blankItem()] }));
  }

  function applyDiscount(discountRate: number) {
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item) => ({ ...item, discountRate })),
    }));
  }

  function removeItem(index: number) {
    setInvoice((current) => ({
      ...current,
      items: current.items.length > 1 ? current.items.filter((_, itemIndex) => itemIndex !== index) : current.items,
    }));
  }

  function handleLogo(file?: File) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  function continueToAuth(path: "/signup" | "/login") {
    savePublicInvoiceDraft(invoice);
    router.push(path);
  }

  async function openInWorkspace() {
    savePublicInvoiceDraft(invoice);
    const savedDraft = await attachPublicInvoiceDraft().catch(() => null);
    router.push(savedDraft?.id ? `/invoices/${savedDraft.id}/edit` : "/dashboard");
  }

  function handlePrimaryAction() {
    if (isLoggedIn) {
      void openInWorkspace();
      return;
    }
    continueToAuth("/signup");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-6 sm:py-6">
        <PublicSiteNav />
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free invoice generator</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Create a professional invoice online</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Use this free online invoice maker to add your business details, customer details, items and tax. Your totals update automatically before you save or download a PDF.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Your draft stays on this device until you save it.
          </div>
        </div>

        {initialItem?.unitPrice || initialItem?.taxRate ? (
          <div className="mb-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
            Calculator result added: ₹{Number(numericParam(initialItem.unitPrice)).toLocaleString("en-IN")} taxable value with {numericParam(initialItem.taxRate)}% tax.
          </div>
        ) : null}

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
                        onClick={() => setLogo(null)}
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
                    defaultValue="INVOICE"
                  />
                  <label className="mt-3 flex items-center gap-2 sm:justify-end">
                    <span className="text-sm font-semibold text-slate-500">#</span>
                    <input
                      aria-label="Invoice number"
                      className={`${compactFieldClass} max-w-40`}
                      onChange={(event) => update("invoiceNumber", event.target.value)}
                      value={invoice.invoiceNumber || ""}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-7 grid gap-6 border-t border-slate-100 pt-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
                <div>
                  <label>
                    <FieldLabel>Who is this invoice from?</FieldLabel>
                    <input
                      className={fieldClass}
                      onChange={(event) => update("businessName", event.target.value)}
                      placeholder="Your business or name"
                      value={invoice.businessName}
                    />
                  </label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label>
                      <span className="sr-only">Your email</span>
                      <input
                        className={compactFieldClass}
                        onChange={(event) => update("businessEmail", event.target.value)}
                        placeholder="your@email.com"
                        type="email"
                        value={invoice.businessEmail || ""}
                      />
                    </label>
                    <label>
                      <span className="sr-only">Your address</span>
                      <input
                        className={compactFieldClass}
                        onChange={(event) => update("businessAddress", event.target.value)}
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
                        onChange={(event) => update("customerName", event.target.value)}
                        placeholder="Customer or company"
                        value={invoice.customerName}
                      />
                      <input
                        aria-label="Customer email"
                        className={`${compactFieldClass} mt-2`}
                        onChange={(event) => update("customerEmail", event.target.value)}
                        placeholder="customer@email.com"
                        type="email"
                        value={invoice.customerEmail || ""}
                      />
                    </div>
                    <div>
                      <FieldLabel>Ship to</FieldLabel>
                      <textarea
                        className={`${compactFieldClass} min-h-[86px] resize-none`}
                        onChange={(event) => update("customerAddress", event.target.value)}
                        placeholder="Shipping address (optional)"
                        value={invoice.customerAddress || ""}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid content-start gap-3 rounded-xl bg-slate-50 p-4">
                  <label className="grid grid-cols-[96px_1fr] items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Invoice date</span>
                    <input className={compactFieldClass} onChange={(event) => update("issueDate", event.target.value)} type="date" value={invoice.issueDate} />
                  </label>
                  <label className="grid grid-cols-[96px_1fr] items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Due date</span>
                    <input className={compactFieldClass} onChange={(event) => update("dueDate", event.target.value)} type="date" value={invoice.dueDate} />
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
                          onChange={(event) => updateItem(index, { name: event.target.value })}
                          placeholder="Description of item or service"
                          value={item.name}
                        />
                        <input
                          aria-label={`Item ${index + 1} details`}
                          className="mt-1.5 w-full border-0 bg-transparent px-1 text-xs text-slate-500 outline-none placeholder:text-slate-400"
                          onChange={(event) => updateItem(index, { description: event.target.value })}
                          placeholder="Additional details (optional)"
                          value={item.description || ""}
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Quantity</span>
                        <input className={compactFieldClass} min="0" onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })} type="number" value={item.quantity} />
                      </label>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Rate</span>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-sm text-slate-400">{currencySymbol}</span>
                          <input className={`${compactFieldClass} pl-7`} min="0" onChange={(event) => updateItem(index, { unitPrice: Number(event.target.value) })} type="number" value={item.unitPrice} />
                        </div>
                      </label>
                      <label>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Tax</span>
                        <div className="relative">
                          <input className={`${compactFieldClass} pr-7`} min="0" onChange={(event) => updateItem(index, { taxRate: Number(event.target.value) })} type="number" value={item.taxRate} />
                          <span className="absolute right-2.5 top-2 text-sm text-slate-400">%</span>
                        </div>
                      </label>
                      <div>
                        <span className="mb-1 block text-[11px] font-bold uppercase text-slate-500 md:hidden">Amount</span>
                        <p className="py-2 text-right text-sm font-semibold text-slate-900">
                          {currency(Number(item.quantity || 0) * Number(item.unitPrice || 0), invoice.currency)}
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
                      onChange={(event) => update("notes", event.target.value)}
                      placeholder="Any relevant information not already covered"
                      value={invoice.notes || ""}
                    />
                  </label>
                  <label>
                    <FieldLabel>Terms</FieldLabel>
                    <textarea
                      className={`${fieldClass} min-h-20 resize-y`}
                      onChange={(event) => update("terms", event.target.value)}
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
                      onChange={(event) => setAmountPaid(Number(event.target.value))}
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
                onClick={handlePrimaryAction}
                type="button"
              >
                {isLoggedIn ? <Save className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                {isLoggedIn ? "Save invoice" : "Save & download PDF"}
              </button>
              <button
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                onClick={() => (isLoggedIn ? void openInWorkspace() : continueToAuth("/login"))}
                type="button"
              >
                {isLoggedIn ? <Download className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {isLoggedIn ? "Open in workspace" : "Log in to save"}
              </button>
              {!isLoggedIn ? <p className="mt-3 text-center text-xs leading-5 text-slate-400">Create and preview for free. Sign up only when you save the PDF.</p> : null}
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
                    <select className={compactFieldClass} onChange={(event) => update("currency", event.target.value)} value={invoice.currency}>
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="AED">AED — UAE Dirham</option>
                    </select>
                  </label>
                  <p className="text-xs leading-5 text-slate-400">Add tax on each item row. Discount support is available in your saved workspace.</p>
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

      <PublicSiteFooter />
    </main>
  );
}
