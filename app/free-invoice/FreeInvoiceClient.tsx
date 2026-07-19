"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, FileText, Lock, Plus, Trash2 } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { Badge, Button, Field, inputClass } from "@/components/ui";
import { calculateInvoice, currency } from "@/lib/invoice";
import { getToken } from "@/lib/api";
import { attachPublicInvoiceDraft, savePublicInvoiceDraft } from "@/lib/public-invoice-draft";
import type { Invoice, InvoiceItem } from "@/types";

const today = new Date().toISOString().slice(0, 10);
const defaultDueDate = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);

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

export function FreeInvoiceClient({ initialItem }: FreeInvoiceClientProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [invoice, setInvoice] = useState<Invoice>({
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

  function removeItem(index: number) {
    setInvoice((current) => ({ ...current, items: current.items.length > 1 ? current.items.filter((_, itemIndex) => itemIndex !== index) : current.items }));
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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <div className="flex items-center gap-2">
            <Link className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10" data-event="pricing_click" data-event-category="cta" data-event-label="free invoice header" href="/pricing">Pricing</Link>
            <Link className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-950" data-event={isLoggedIn ? "dashboard_click" : "login_click"} data-event-category={isLoggedIn ? "navigation" : "auth"} data-event-label="free invoice header" href={isLoggedIn ? "/dashboard" : "/login"}>
              {isLoggedIn ? "Dashboard" : "Log in"}
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,640px)_1fr]">
        <div className="grid gap-5">
          <div>
            <Badge tone="blue">Free invoice maker</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Make an invoice first. Sign up only when you want the PDF.</h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              For freelancing, selling products, repair work, consulting or any simple customer bill. Fill only what matters, preview the invoice, then save it to your account.
            </p>
            {initialItem?.unitPrice || initialItem?.taxRate ? (
              <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
                GST calculator result added: taxable amount ₹{Number(numericParam(initialItem.unitPrice)).toLocaleString("en-IN")} with {numericParam(initialItem.taxRate)}% GST. You can edit it before preview.
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-sm">
            {["Business", "Items", "Preview"].map((label, index) => {
              const active = step === index + 1;
              return (
                <button className={`rounded-xl px-3 py-2 font-semibold ${active ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10"}`} data-event="free_invoice_step_click" data-event-category="engagement" data-event-label={`step ${index + 1} ${label}`} key={label} onClick={() => setStep(index + 1)}>
                  {index + 1}. {label}
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
            {step === 1 ? (
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">Who is this invoice from and to?</h2>
                <Field label="Your business or name"><input className={inputClass} value={invoice.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Example: Arvind Design Studio" /></Field>
                <Field label="Your email"><input className={inputClass} value={invoice.businessEmail} onChange={(event) => update("businessEmail", event.target.value)} placeholder="you@example.com" type="email" /></Field>
                <Field label="Customer name"><input className={inputClass} value={invoice.customerName} onChange={(event) => update("customerName", event.target.value)} placeholder="Customer or company name" /></Field>
                <Field label="Customer email"><input className={inputClass} value={invoice.customerEmail} onChange={(event) => update("customerEmail", event.target.value)} placeholder="customer@example.com" type="email" /></Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Issue date"><input className={inputClass} type="date" value={invoice.issueDate} onChange={(event) => update("issueDate", event.target.value)} /></Field>
                  <Field label="Due date"><input className={inputClass} type="date" value={invoice.dueDate} onChange={(event) => update("dueDate", event.target.value)} /></Field>
                </div>
                <Button className="w-full" data-event="free_invoice_business_completed" data-event-category="funnel" onClick={() => setStep(2)}>Next: add items <ArrowRight className="h-4 w-4" /></Button>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">What are you charging for?</h2>
                {invoice.items.map((item, index) => (
                  <div className="grid min-w-0 gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-3" key={index}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-300">Item {index + 1}</p>
                      <button className="rounded-lg p-2 text-red-200 hover:bg-red-500/10" onClick={() => removeItem(index)} type="button"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <Field label="Product or service"><input className={`${inputClass} w-full min-w-0`} value={item.name} onChange={(event) => updateItem(index, { name: event.target.value })} placeholder="Website design, keyboard, repair service..." /></Field>
                    <div className="grid min-w-0 grid-cols-2 gap-3 md:grid-cols-4">
                      <Field label="Qty"><input className={`${inputClass} w-full min-w-0`} min="0" type="number" value={item.quantity} onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })} /></Field>
                      <Field label="Rate"><input className={`${inputClass} w-full min-w-0`} min="0" type="number" value={item.unitPrice} onChange={(event) => updateItem(index, { unitPrice: Number(event.target.value) })} /></Field>
                      <Field label="Tax %"><input className={`${inputClass} w-full min-w-0`} min="0" type="number" value={item.taxRate} onChange={(event) => updateItem(index, { taxRate: Number(event.target.value) })} /></Field>
                      <Field label="Disc %"><input className={`${inputClass} w-full min-w-0`} min="0" type="number" value={item.discountRate} onChange={(event) => updateItem(index, { discountRate: Number(event.target.value) })} /></Field>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" data-event="free_invoice_add_item" data-event-category="engagement" onClick={addItem}><Plus className="h-4 w-4" />Add another item</Button>
                <Button className="w-full" data-event="free_invoice_preview_click" data-event-category="funnel" onClick={() => setStep(3)}>Preview invoice <ArrowRight className="h-4 w-4" /></Button>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">Your invoice is ready to save</h2>
                <Field label="Notes"><textarea className={inputClass} value={invoice.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Optional message for your customer" /></Field>
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">
                  <p className="font-semibold">PDF download is unlocked after signup or login.</p>
                  <p className="mt-1 text-cyan-100/80">We will attach this invoice to your account automatically, so you don’t have to type it again.</p>
                </div>
                {isLoggedIn ? (
                  <Button className="w-full" data-event="free_invoice_save_click" data-event-category="funnel" onClick={openInWorkspace}><FileText className="h-4 w-4" />Save this invoice to my workspace</Button>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button className="w-full" data-event="signup_click" data-event-category="auth" data-event-label="free invoice download gate" onClick={() => continueToAuth("/signup")}><Lock className="h-4 w-4" />Sign up to download</Button>
                    <Button className="w-full" variant="secondary" data-event="login_click" data-event-category="auth" data-event-label="free invoice attach gate" onClick={() => continueToAuth("/login")}>Log in and attach</Button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-blue-600" />
                <h2 className="mt-4 text-2xl font-bold">{invoice.businessName || "Your business"}</h2>
                <p className="text-sm text-slate-500">{invoice.businessEmail || "business@email.com"}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-blue-600">INVOICE</p>
                <p className="mt-1 text-sm text-slate-500">Draft preview</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                <p className="mt-2 font-semibold">{invoice.customerName || "Customer name"}</p>
                <p className="text-sm text-slate-500">{invoice.customerEmail || "customer@email.com"}</p>
              </div>
              <div className="text-sm sm:text-right">
                <p>Issue: {invoice.issueDate}</p>
                <p className="mt-2">Due: {invoice.dueDate}</p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-[1fr_56px_90px_100px] bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white">
                <span>Item</span><span>Qty</span><span>Rate</span><span className="text-right">Total</span>
              </div>
              {invoice.items.map((item, index) => (
                <div className="grid grid-cols-[1fr_56px_90px_100px] border-t border-slate-100 px-3 py-3 text-sm" key={index}>
                  <span className="font-medium">{item.name || "Service or product"}</span>
                  <span>{item.quantity || 0}</span>
                  <span>{Number(item.unitPrice || 0).toFixed(2)}</span>
                  <span className="text-right">{currency(Number(item.quantity || 0) * Number(item.unitPrice || 0), invoice.currency)}</span>
                </div>
              ))}
            </div>

            <div className="ml-auto mt-6 grid max-w-xs gap-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><strong>{currency(totals.subtotal, invoice.currency)}</strong></div>
              <div className="flex justify-between"><span>Discount</span><strong>{currency(totals.discountTotal, invoice.currency)}</strong></div>
              <div className="flex justify-between"><span>Tax</span><strong>{currency(totals.taxTotal, invoice.currency)}</strong></div>
              <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-lg"><span>Total</span><strong>{currency(totals.total, invoice.currency)}</strong></div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Terms</p>
              <p className="mt-1">{invoice.terms}</p>
              {invoice.notes ? <p className="mt-3"><strong>Notes:</strong> {invoice.notes}</p> : null}
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-700">
              <Check className="h-4 w-4" />
              Preview is free. PDF download unlocks after account creation.
            </div>
          </div>
        </aside>
      </section>
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · free invoice maker</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
