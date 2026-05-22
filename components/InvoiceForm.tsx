"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Keyboard,
  Maximize2,
  MoveHorizontal,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { API_URL, api, getToken } from "@/lib/api";
import { calculateInvoice, currency } from "@/lib/invoice";
import type { Invoice, InvoiceItem, InvoiceStatus } from "@/types";
import { Badge, Button, Card, Field, inputClass } from "@/components/ui";

type BuilderItem = InvoiceItem & { localId: string };
type BuilderInvoice = Omit<Invoice, "items"> & { items: BuilderItem[] };
type SectionId = "details" | "parties" | "items" | "notes";
type TemplateId = "corporate" | "minimal" | "gst" | "agency" | "construction" | "retail" | "startup";
type BrandingSettings = { logo_url?: string; company_name?: string };

const sectionLabels: Record<SectionId, string> = {
  details: "Document",
  parties: "Parties",
  items: "Items",
  notes: "Notes",
};

const blankItem = (): BuilderItem => ({
  localId: crypto.randomUUID(),
  name: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  taxRate: 0,
  discountRate: 0,
});

const today = new Date().toISOString().slice(0, 10);
const defaultDueDate = new Date(new Date().getTime() + 14 * 86400000).toISOString().slice(0, 10);

const templates: Array<{ id: TemplateId; label: string; structure: string; accent: string; border: string; ink: string; soft: string }> = [
  { id: "corporate", label: "Corporate", structure: "Logo, due badge, payment terms", accent: "bg-blue-600", border: "border-blue-500", ink: "text-blue-700", soft: "bg-blue-50" },
  { id: "minimal", label: "Minimal", structure: "Clean single-column billing", accent: "bg-slate-950", border: "border-slate-400", ink: "text-slate-900", soft: "bg-slate-50" },
  { id: "gst", label: "GST India", structure: "CGST, SGST, IGST, GSTIN", accent: "bg-emerald-600", border: "border-emerald-500", ink: "text-emerald-700", soft: "bg-emerald-50" },
  { id: "agency", label: "Agency", structure: "Project summary and hours", accent: "bg-pink-600", border: "border-pink-500", ink: "text-pink-700", soft: "bg-pink-50" },
  { id: "construction", label: "Construction", structure: "Materials, labor, milestones", accent: "bg-amber-600", border: "border-amber-500", ink: "text-amber-700", soft: "bg-amber-50" },
  { id: "retail", label: "Retail", structure: "HSN, quantity, barcode-style receipt", accent: "bg-violet-600", border: "border-violet-500", ink: "text-violet-700", soft: "bg-violet-50" },
  { id: "startup", label: "Startup", structure: "Modern memo and payment link", accent: "bg-cyan-500", border: "border-cyan-400", ink: "text-cyan-700", soft: "bg-cyan-50" },
];

function toBuilderInvoice(initial?: Partial<Invoice>): BuilderInvoice {
  return {
    issueDate: today,
    dueDate: defaultDueDate,
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

function toApiInvoice(invoice: BuilderInvoice): Invoice {
  return {
    ...invoice,
    items: invoice.items.map((item) => ({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxRate: item.taxRate,
      discountRate: item.discountRate,
    })),
  };
}

const compactInput = `${inputClass} min-h-9 rounded-lg border-transparent bg-transparent px-2 py-1 shadow-none hover:border-slate-200 hover:bg-white focus:border-blue-500 dark:hover:border-white/10 dark:hover:bg-white/[0.04]`;
const previewInput = "w-full rounded-md border border-transparent bg-transparent px-1 py-0.5 outline-none transition hover:border-slate-200 hover:bg-slate-50 focus:border-blue-400 focus:bg-white";

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
  const shellRef = useRef<HTMLDivElement | null>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [template, setTemplate] = useState<TemplateId>("corporate");
  const [editorWidth, setEditorWidth] = useState(56);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<SectionId | null>(null);
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(["details", "parties", "items", "notes"]);
  const [autosaveState, setAutosaveState] = useState<"saved" | "saving" | "idle">("idle");
  const [branding, setBranding] = useState<BrandingSettings>({});
  const [invoice, setInvoice] = useState<BuilderInvoice>(() => {
    const key = `ledgerly-draft-${invoiceId ?? "new"}`;
    if (typeof window !== "undefined") {
      const draft = localStorage.getItem(key);
      if (draft) {
        try {
          return toBuilderInvoice(JSON.parse(draft) as Partial<Invoice>);
        } catch {
          return toBuilderInvoice(initial);
        }
      }
    }
    return toBuilderInvoice(initial);
  });

  const totals = useMemo(() => calculateInvoice(invoice.items), [invoice.items]);
  const selectedTemplate = templates.find((item) => item.id === template) ?? templates[0];
  const templateIs = (id: TemplateId) => selectedTemplate.id === id;
  const logoSrc = assetUrl(branding.logo_url);
  const taxSplit = {
    cgst: totals.taxTotal / 2,
    sgst: totals.taxTotal / 2,
    igst: totals.taxTotal,
  };

  useEffect(() => {
    api<BrandingSettings>("/settings").then(setBranding).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      localStorage.setItem(`ledgerly-draft-${invoiceId ?? "new"}`, JSON.stringify(toApiInvoice(invoice)));
      setAutosaveState("saved");
    }, 600);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [invoice, invoiceId]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
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
        window.print();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function markDirty() {
    setAutosaveState("saving");
  }

  function update<K extends keyof BuilderInvoice>(key: K, value: BuilderInvoice[K]) {
    markDirty();
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

  async function save() {
    setLoading(true);
    setError("");
    try {
      await api(invoiceId ? `/invoices/${invoiceId}` : "/invoices", {
        method: invoiceId ? "PUT" : "POST",
        body: JSON.stringify(toApiInvoice(invoice)),
      });
      localStorage.removeItem(`ledgerly-draft-${invoiceId ?? "new"}`);
      router.push("/invoices");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save invoice");
    } finally {
      setLoading(false);
    }
  }

  async function uploadLogo(file: File | null) {
    if (!file) return;
    const form = new FormData();
    form.append("logo", file);
    const data = await api<{ logoUrl: string }>("/settings/logo", { method: "POST", body: form });
    setBranding((current) => ({ ...current, logo_url: data.logoUrl }));
  }

  function pdfDownloadUrl() {
    if (!invoiceId) return "";
    return `${API_URL}/invoices/${invoiceId}/pdf?token=${getToken()}&style=${encodeURIComponent(template)}`;
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
        <div className="grid gap-3 sm:grid-cols-5">
          <Field label="Invoice #"><input className={compactInput} value={invoice.invoiceNumber ?? ""} placeholder="Auto" onChange={(e) => update("invoiceNumber", e.target.value)} /></Field>
          <Field label="Issue"><input className={compactInput} type="date" value={invoice.issueDate} onChange={(e) => update("issueDate", e.target.value)} /></Field>
          <Field label="Due"><input className={compactInput} type="date" value={invoice.dueDate} onChange={(e) => update("dueDate", e.target.value)} /></Field>
          <Field label="Status"><select className={compactInput} value={invoice.status} onChange={(e) => update("status", e.target.value as InvoiceStatus)}>{["Draft", "Sent", "Paid", "Overdue"].map((status) => <option key={status}>{status}</option>)}</select></Field>
          <Field label="Currency"><input className={compactInput} value={invoice.currency} maxLength={3} onChange={(e) => update("currency", e.target.value.toUpperCase())} /></Field>
        </div>
      ));
    }

    if (id === "parties") {
      return sectionShell(id, (
        <div className="grid gap-3 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">From</p>
            <div className="grid gap-2">
              <input className={compactInput} placeholder="Business name" value={invoice.businessName} onChange={(e) => update("businessName", e.target.value)} />
              <input className={compactInput} placeholder="Business email" value={invoice.businessEmail} onChange={(e) => update("businessEmail", e.target.value)} />
              <input className={compactInput} placeholder="GST/VAT ID" value={invoice.businessTaxId} onChange={(e) => update("businessTaxId", e.target.value)} />
              <textarea className={`${compactInput} min-h-16`} placeholder="Business address" value={invoice.businessAddress} onChange={(e) => update("businessAddress", e.target.value)} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Bill to</p>
            <div className="grid gap-2">
              <input className={compactInput} placeholder="Client name" value={invoice.customerName} onChange={(e) => update("customerName", e.target.value)} />
              <input className={compactInput} placeholder="Client email" value={invoice.customerEmail} onChange={(e) => update("customerEmail", e.target.value)} />
              <input className={compactInput} placeholder="Client GST/VAT ID" value={invoice.customerTaxId} onChange={(e) => update("customerTaxId", e.target.value)} />
              <textarea className={`${compactInput} min-h-16`} placeholder="Client address" value={invoice.customerAddress} onChange={(e) => update("customerAddress", e.target.value)} />
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
                    <input className={`${compactInput} w-full min-w-0`} placeholder="Service or product" value={item.name} onChange={(e) => updateItem(item.localId, { name: e.target.value })} />
                    <input className={`${compactInput} w-full min-w-0`} placeholder="Description" value={item.description} onChange={(e) => updateItem(item.localId, { description: e.target.value })} />
                  </div>
                  <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
                    <Field label="Qty"><input className={`${compactInput} w-full min-w-0`} aria-label="Quantity" type="number" min="0" step="0.01" value={item.quantity} onChange={(e) => updateItem(item.localId, { quantity: Number(e.target.value) })} /></Field>
                    <Field label="Rate"><input className={`${compactInput} w-full min-w-0`} aria-label="Unit price" type="number" min="0" step="0.01" value={item.unitPrice} onChange={(e) => updateItem(item.localId, { unitPrice: Number(e.target.value) })} /></Field>
                    <Field label="Tax %"><input className={`${compactInput} w-full min-w-0`} aria-label="Tax rate" type="number" min="0" step="0.01" value={item.taxRate} onChange={(e) => updateItem(item.localId, { taxRate: Number(e.target.value) })} /></Field>
                    <Field label="Disc %"><input className={`${compactInput} w-full min-w-0`} aria-label="Discount rate" type="number" min="0" step="0.01" value={item.discountRate} onChange={(e) => updateItem(item.localId, { discountRate: Number(e.target.value) })} /></Field>
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
        <Field label="Notes"><textarea className={`${compactInput} min-h-20`} value={invoice.notes} onChange={(e) => update("notes", e.target.value)} /></Field>
        <Field label="Terms"><textarea className={`${compactInput} min-h-20`} value={invoice.terms} onChange={(e) => update("terms", e.target.value)} /></Field>
      </div>
    ));
  }

  return (
    <div className="relative grid gap-3">
      <Card className="sticky top-[76px] z-20 p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Badge tone={autosaveState === "saved" ? "green" : autosaveState === "saving" ? "amber" : "slate"}>
              {autosaveState === "saved" ? "Draft saved" : autosaveState === "saving" ? "Autosaving..." : "Ready"}
            </Badge>
            <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
              <Keyboard className="h-3.5 w-3.5" />
              Ctrl/⌘+S save · Ctrl/⌘+Enter item · Ctrl/⌘+P print
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select className={inputClass} value={template} onChange={(event) => setTemplate(event.target.value as TemplateId)}>
              {templates.map((item) => <option key={item.id} value={item.id}>{item.label} - {item.structure}</option>)}
            </select>
            <label className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]">
              Logo
              <input className="sr-only" type="file" accept="image/png,image/jpeg" onChange={(event) => uploadLogo(event.target.files?.[0] ?? null)} />
            </label>
            {invoiceId ? (
              <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]" href={pdfDownloadUrl()}>
                Download PDF
              </a>
            ) : null}
            <Button variant="secondary" onClick={() => window.print()}><Maximize2 className="h-4 w-4" />Print</Button>
            <Button disabled={loading} onClick={save}><Save className="h-4 w-4" />{loading ? "Saving..." : "Save"}</Button>
          </div>
        </div>
      </Card>

      <div ref={shellRef} className="grid gap-3 lg:flex lg:items-start">
        <div className="grid min-w-0 gap-3" style={{ width: typeof window === "undefined" ? undefined : `${editorWidth}%` }}>
          <Card className="p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Section order</p>
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
          <div className="sticky bottom-3 z-30 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><p className="text-xs text-slate-500">Subtotal</p><strong>{currency(totals.subtotal, invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Tax</p><strong>{currency(totals.taxTotal, invoice.currency)}</strong></div>
                <div><p className="text-xs text-slate-500">Total</p><strong>{currency(totals.total, invoice.currency)}</strong></div>
              </div>
              <Button disabled={loading} onClick={save}><Save className="h-4 w-4" />{loading ? "Saving..." : "Save invoice"}</Button>
            </div>
            {error ? <p className="mt-2 rounded-xl bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p> : null}
          </div>
        </div>

        <button
          className="hidden h-[calc(100vh-9rem)] w-3 cursor-col-resize items-center justify-center rounded-full bg-slate-200 text-slate-500 transition hover:bg-blue-200 dark:bg-white/10 lg:flex"
          onPointerDown={startSplitterDrag}
          type="button"
          aria-label="Resize editor and preview"
        >
          <MoveHorizontal className="h-3.5 w-3.5 rotate-90" />
        </button>

        <aside className="min-w-[380px] flex-1 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)]">
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 p-3 dark:border-white/10">
              <div>
                <h2 className="font-semibold">Editable live preview</h2>
                <p className="text-xs text-slate-500">Click text in preview to edit directly.</p>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Badge tone="blue">{selectedTemplate.label}</Badge>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">{selectedTemplate.structure}</span>
              </div>
            </div>

            <div className="premium-scrollbar flex-1 overflow-auto bg-slate-100 p-2 dark:bg-slate-950/60">
              <div className={`mx-auto min-h-[800px] w-full max-w-[920px] border-t-8 ${selectedTemplate.border} bg-white p-5 text-slate-950 shadow-2xl sm:p-7`}>
                <div className={`grid gap-6 ${templateIs("minimal") ? "" : "sm:grid-cols-[1fr_auto]"}`}>
                  <div>
                    {logoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="Company logo" className="mb-3 h-12 w-12 rounded-2xl object-contain ring-1 ring-slate-200" src={logoSrc} />
                    ) : (
                      <div className={`mb-3 h-10 w-10 rounded-2xl ${selectedTemplate.accent}`} />
                    )}
                    <input className={`${previewInput} text-2xl font-bold`} value={invoice.businessName || ""} placeholder="Your business" onChange={(e) => update("businessName", e.target.value)} />
                    <input className={`${previewInput} mt-1 text-xs text-slate-500`} value={invoice.businessEmail || ""} placeholder="business@email.com" onChange={(e) => update("businessEmail", e.target.value)} />
                    <textarea className={`${previewInput} mt-2 min-h-12 resize-none text-xs text-slate-500`} value={invoice.businessAddress || ""} placeholder="Business address" onChange={(e) => update("businessAddress", e.target.value)} />
                  </div>
                  <div className="text-left sm:text-right">
                    <p className={`text-4xl font-bold ${selectedTemplate.ink}`}>INVOICE</p>
                    <input className={`${previewInput} mt-1 text-sm text-slate-500 sm:text-right`} value={invoice.invoiceNumber ?? ""} placeholder="Auto-generated" onChange={(e) => update("invoiceNumber", e.target.value)} />
                    <Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge>
                    {templateIs("corporate") ? <div className="mt-3 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">Due badge · {String(invoice.dueDate).slice(0, 10)}</div> : null}
                  </div>
                </div>

                {templateIs("agency") ? (
                  <div className="mt-6 grid gap-3 rounded-2xl bg-pink-50 p-4 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold uppercase text-pink-700">Project summary</p>
                      <p className="mt-2 text-sm text-slate-700">Creative, consulting or service work billed by deliverable, retainer or hours.</p>
                    </div>
                    <div className="rounded-xl bg-white p-3 text-sm shadow-sm">
                      <p className="text-xs text-slate-500">Estimated hours</p>
                      <strong>{invoice.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0).toFixed(2)}</strong>
                    </div>
                  </div>
                ) : null}

                {templateIs("construction") ? (
                  <div className="mt-6 grid gap-3 rounded-2xl bg-amber-50 p-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase text-amber-700">Materials</p>
                      <p className="mt-2 text-lg font-semibold">{currency(totals.subtotal * 0.58, invoice.currency)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-amber-700">Labor</p>
                      <p className="mt-2 text-lg font-semibold">{currency(totals.subtotal * 0.42, invoice.currency)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-amber-700">Milestone</p>
                      <p className="mt-2 text-sm font-semibold">Work completion billing</p>
                    </div>
                  </div>
                ) : null}

                {templateIs("startup") ? (
                  <div className="mt-6 rounded-2xl bg-cyan-50 p-4">
                    <p className="text-xs font-semibold uppercase text-cyan-700">Payment link memo</p>
                    <p className="mt-2 text-sm text-slate-700">Pay online by card, UPI, Razorpay or Stripe once payment integrations are enabled.</p>
                  </div>
                ) : null}

                <div className="mt-7 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">Bill to</p>
                    <input className={`${previewInput} mt-2 font-semibold`} value={invoice.customerName || ""} placeholder="Client name" onChange={(e) => update("customerName", e.target.value)} />
                    <input className={`${previewInput} text-xs text-slate-500`} value={invoice.customerEmail || ""} placeholder="client@email.com" onChange={(e) => update("customerEmail", e.target.value)} />
                    <textarea className={`${previewInput} mt-2 min-h-12 resize-none text-xs text-slate-500`} value={invoice.customerAddress || ""} placeholder="Client address" onChange={(e) => update("customerAddress", e.target.value)} />
                  </div>
                  <div className="grid gap-2 text-sm sm:text-right">
                    <label>Issue <input className={`${previewInput} w-auto sm:text-right`} type="date" value={invoice.issueDate} onChange={(e) => update("issueDate", e.target.value)} /></label>
                    <label>Due <input className={`${previewInput} w-auto sm:text-right`} type="date" value={invoice.dueDate} onChange={(e) => update("dueDate", e.target.value)} /></label>
                    <label>GST/VAT <input className={`${previewInput} w-auto sm:text-right`} value={invoice.customerTaxId || ""} placeholder="—" onChange={(e) => update("customerTaxId", e.target.value)} /></label>
                    {templateIs("gst") ? <label>Place of supply <input className={`${previewInput} w-auto sm:text-right`} value="India" readOnly /></label> : null}
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                  <div className={`grid ${templateIs("gst") || templateIs("retail") ? "grid-cols-[1.4fr_54px_64px_64px_86px]" : templateIs("agency") ? "grid-cols-[1.5fr_64px_90px_90px]" : "grid-cols-[1.7fr_56px_92px_92px]"} bg-slate-950 px-3 py-2 text-xs font-semibold uppercase text-white sm:px-4`}>
                    <span>{templateIs("agency") ? "Deliverable" : templateIs("construction") ? "Material / labor" : "Item"}</span>
                    <span>{templateIs("agency") ? "Hours" : "Qty"}</span>
                    {(templateIs("gst") || templateIs("retail")) ? <span>HSN</span> : null}
                    <span>Rate</span>
                    <span>Total</span>
                  </div>
                  {invoice.items.map((item, index) => (
                    <div
                      className={`grid ${templateIs("gst") || templateIs("retail") ? "grid-cols-[1.4fr_54px_64px_64px_86px]" : templateIs("agency") ? "grid-cols-[1.5fr_64px_90px_90px]" : "grid-cols-[1.7fr_56px_92px_92px]"} border-t border-slate-100 px-3 py-2 text-sm transition hover:bg-slate-50 sm:px-4`}
                      draggable
                      key={item.localId}
                      onDragStart={() => setDraggedItemId(item.localId)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => dropItemOn(item.localId)}
                    >
                      <span>
                        <input className={`${previewInput} font-semibold`} value={item.name || ""} placeholder="Untitled item" onChange={(e) => updateItem(item.localId, { name: e.target.value })} />
                        <input className={`${previewInput} text-xs text-slate-500`} value={item.description || ""} placeholder="Description" onChange={(e) => updateItem(item.localId, { description: e.target.value })} />
                      </span>
                      <input className={`${previewInput} text-center`} type="number" value={item.quantity} onChange={(e) => updateItem(item.localId, { quantity: Number(e.target.value) })} />
                      {(templateIs("gst") || templateIs("retail")) ? <span className="py-1 text-xs text-slate-500">{templateIs("retail") ? `89${index}1` : `99${index}0`}</span> : null}
                      <input className={`${previewInput} text-right`} type="number" value={item.unitPrice} onChange={(e) => updateItem(item.localId, { unitPrice: Number(e.target.value) })} />
                      <span className="py-1 text-right">{currency(Number(item.quantity) * Number(item.unitPrice), invoice.currency)}</span>
                    </div>
                  ))}
                </div>

                {templateIs("retail") ? (
                  <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-violet-50 p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-violet-700">Retail receipt marker</p>
                      <p className="mt-1 text-sm text-slate-600">HSN + item quantity layout for product sales.</p>
                    </div>
                    <div className="flex h-12 items-end gap-1">
                      {[8, 18, 10, 24, 14, 28, 9, 20, 12].map((height, index) => <span className="w-1.5 bg-slate-950" style={{ height }} key={index} />)}
                    </div>
                  </div>
                ) : null}

                <div className="ml-auto mt-6 grid max-w-xs gap-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><strong>{currency(totals.subtotal, invoice.currency)}</strong></div>
                  <div className="flex justify-between"><span>Discount</span><strong>{currency(totals.discountTotal, invoice.currency)}</strong></div>
                  <div className="flex justify-between"><span>Tax</span><strong>{currency(totals.taxTotal, invoice.currency)}</strong></div>
                  {templateIs("gst") ? (
                    <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900">
                      <div className="flex justify-between"><span>CGST</span><strong>{currency(taxSplit.cgst, invoice.currency)}</strong></div>
                      <div className="mt-1 flex justify-between"><span>SGST</span><strong>{currency(taxSplit.sgst, invoice.currency)}</strong></div>
                      <div className="mt-1 flex justify-between"><span>IGST</span><strong>{currency(taxSplit.igst, invoice.currency)}</strong></div>
                    </div>
                  ) : null}
                  <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-lg"><span>Total</span><strong>{currency(totals.total, invoice.currency)}</strong></div>
                </div>

                {templateIs("corporate") ? (
                  <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-950">
                    <p className="font-semibold">Payment terms</p>
                    <p className="mt-1">{invoice.terms || "Payment is due by the invoice due date."}</p>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-3 text-xs text-slate-500">
                  <label><strong className="text-slate-700">Notes:</strong><textarea className={`${previewInput} mt-1 min-h-12 resize-none`} value={invoice.notes} onChange={(e) => update("notes", e.target.value)} /></label>
                  <label><strong className="text-slate-700">Terms:</strong><textarea className={`${previewInput} mt-1 min-h-12 resize-none`} value={invoice.terms} onChange={(e) => update("terms", e.target.value)} /></label>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>

    </div>
  );
}

function statusTone(status: string) {
  if (status === "Paid") return "green";
  if (status === "Overdue") return "rose";
  if (status === "Sent") return "blue";
  return "slate";
}
