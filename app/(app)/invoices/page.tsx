"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Download, Eye, Mail, MessageCircle, Search, Send, Trash2 } from "lucide-react";
import { API_URL, api, getToken } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Badge, Button, Card, EmptyState, LinkButton, Skeleton, inputClass } from "@/components/ui";

interface InvoiceRow {
  id: number;
  invoice_number: string;
  customer_name: string;
  customer_email?: string;
  status: string;
  issue_date: string;
  due_date: string;
  total: number;
  currency: string;
}

interface InvoiceListResponse {
  data: InvoiceRow[];
  pagination: { page: number; pageSize: number; total: number };
  facets: Array<{ status: string; count: number }>;
}

interface PdfStyle {
  id: string;
  label: string;
  accent: string;
  soft: string;
}

const statusTabs = ["all", "Draft", "Sent", "Paid", "Overdue"];

function statusTone(status: string) {
  if (status === "Paid") return "green";
  if (status === "Overdue") return "rose";
  if (status === "Sent") return "blue";
  if (status === "Draft") return "slate";
  return "amber";
}

export default function InvoicesPage() {
  const [response, setResponse] = useState<InvoiceListResponse | null>(null);
  const [styles, setStyles] = useState<PdfStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [previewInvoice, setPreviewInvoice] = useState<InvoiceRow | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const selectedTemplate = selectedStyle || styles[0]?.id || "classic";
  const totalPages = Math.max(Math.ceil((response?.pagination.total ?? 0) / (response?.pagination.pageSize ?? 10)), 1);

  const facetMap = useMemo(() => {
    const map = new Map<string, number>();
    response?.facets.forEach((facet) => map.set(facet.status, Number(facet.count)));
    return map;
  }, [response?.facets]);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      status,
      sortBy,
      sortDir,
      page: String(page),
      pageSize: "10",
    });
    const data = await api<InvoiceListResponse>(`/invoices?${params.toString()}`);
    setResponse(data);
    setLoading(false);
  }

  useEffect(() => {
    const params = new URLSearchParams({
      search,
      status,
      sortBy,
      sortDir,
      page: String(page),
      pageSize: "10",
    });
    api<InvoiceListResponse>(`/invoices?${params.toString()}`)
      .then(setResponse)
      .finally(() => setLoading(false));
  }, [page, search, status, sortBy, sortDir]);

  useEffect(() => {
    api<PdfStyle[]>("/invoices/pdf/styles/list").then((items) => {
      setStyles(items);
      setSelectedStyle(items[0]?.id ?? "classic");
    });
  }, []);

  async function remove(id: number) {
    await api(`/invoices/${id}`, { method: "DELETE" });
    load();
  }

  async function duplicate(id: number) {
    await api(`/invoices/${id}/duplicate`, { method: "POST" });
    load();
  }

  async function sendInvoice(id: number) {
    await api(`/invoices/${id}/email`, { method: "POST" });
  }

  async function sendReminder(id: number) {
    await api(`/invoices/${id}/reminder`, { method: "POST" });
  }

  function pdfUrl(id: number, style = selectedTemplate) {
    return `${API_URL}/invoices/${id}/pdf?token=${getToken()}&style=${encodeURIComponent(style)}`;
  }

  function whatsappUrl(invoice: InvoiceRow) {
    const text = `Hi, here is invoice ${invoice.invoice_number} for ${currency(Number(invoice.total), invoice.currency)}. Download PDF: ${pdfUrl(invoice.id)}`;
    return `https://wa.me/7973974616?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Invoices</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, filter, preview, send, duplicate, and download real invoices.</p>
        </div>
        <LinkButton href="/invoices/new">Create invoice</LinkButton>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} w-full pl-10`} placeholder="Search invoice number, client, email, GSTIN" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => {
              if (event.key === "Enter") {
                setPage(1);
                load();
              }
            }} />
          </label>
          <select className={inputClass} value={`${sortBy}:${sortDir}`} onChange={(event) => {
            const [nextSortBy, nextSortDir] = event.target.value.split(":");
            setSortBy(nextSortBy);
            setSortDir(nextSortDir);
          }}>
            <option value="created_at:desc">Newest first</option>
            <option value="due_date:asc">Due date soonest</option>
            <option value="total:desc">Amount high to low</option>
            <option value="total:asc">Amount low to high</option>
            <option value="invoice_number:asc">Invoice number</option>
          </select>
          <Button onClick={() => {
            setPage(1);
            load();
          }}>Apply</Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${status === tab ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"}`}
              key={tab}
              onClick={() => {
                setStatus(tab);
                setPage(1);
              }}
            >
              {tab === "all" ? "All" : tab}
              <span className="ml-2 text-xs opacity-70">{tab === "all" ? response?.pagination.total ?? 0 : facetMap.get(tab) ?? 0}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="grid gap-3 p-5">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        ) : response?.data.length ? (
          <div className="overflow-x-auto premium-scrollbar">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-white/10 dark:bg-white/[0.04]">
                <tr>
                  <th className="p-4">Invoice</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Issue</th>
                  <th className="p-4">Due</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.data.map((invoice) => (
                  <tr className="group border-b border-slate-100 transition hover:bg-blue-50/40 dark:border-white/5 dark:hover:bg-white/[0.04]" key={invoice.id}>
                    <td className="p-4 font-semibold">{invoice.invoice_number}</td>
                    <td className="p-4">
                      <div className="font-medium">{invoice.customer_name}</div>
                      <div className="text-xs text-slate-500">{invoice.customer_email}</div>
                    </td>
                    <td className="p-4">{String(invoice.issue_date).slice(0, 10)}</td>
                    <td className="p-4">{String(invoice.due_date).slice(0, 10)}</td>
                    <td className="p-4 font-semibold">{currency(Number(invoice.total), invoice.currency)}</td>
                    <td className="p-4"><Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge></td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="secondary" className="px-3" onClick={() => setPreviewInvoice(invoice)}><Eye className="h-4 w-4" />Preview</Button>
                        <Link className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold dark:border-white/10" href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                        <Button variant="secondary" className="px-3" onClick={() => duplicate(invoice.id)}><Copy className="h-4 w-4" /></Button>
                        <Button variant="secondary" className="px-3" onClick={() => sendInvoice(invoice.id)}><Send className="h-4 w-4" /></Button>
                        <Button variant="ghost" className="px-3" onClick={() => sendReminder(invoice.id)}><Mail className="h-4 w-4" /></Button>
                        <a className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:text-emerald-200" href={whatsappUrl(invoice)} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />WA</a>
                        <a className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white" href={pdfUrl(invoice.id)}><Download className="h-4 w-4" />PDF</a>
                        <Button variant="danger" className="px-3" onClick={() => remove(invoice.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-5">
            <EmptyState title="No invoices found" body="Adjust filters or create a new invoice to populate this table." action={<LinkButton href="/invoices/new">New invoice</LinkButton>} />
          </div>
        )}
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Page {page} of {totalPages} · {response?.pagination.total ?? 0} invoices</p>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((current) => Math.max(current - 1, 1))}>Previous</Button>
          <Button variant="secondary" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button>
        </div>
      </div>

      {previewInvoice ? (
        <div className="fixed inset-0 z-50 grid bg-slate-950/70 p-4 backdrop-blur-sm lg:grid-cols-[420px_1fr]">
          <Card className="max-h-full overflow-auto p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">PDF template gallery</h2>
                <p className="mt-1 text-sm text-slate-500">Choose a real template and preview it with invoice {previewInvoice.invoice_number}.</p>
              </div>
              <Button variant="ghost" onClick={() => setPreviewInvoice(null)}>Close</Button>
            </div>
            <div className="mt-5 grid gap-3">
              {styles.map((style) => (
                <button
                  className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${selectedTemplate === style.id ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]"}`}
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{style.label}</span>
                    <span className="h-5 w-5 rounded-full ring-1 ring-slate-200" style={{ background: style.accent }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Preview renders from the selected invoice PDF endpoint.</p>
                </button>
              ))}
            </div>
            <a className="mt-5 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href={pdfUrl(previewInvoice.id)}>
              <Download className="h-4 w-4" />
              Download selected template
            </a>
            <a className="mt-3 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:text-emerald-200" href={whatsappUrl(previewInvoice)} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Share on WhatsApp
            </a>
          </Card>
          <div className="min-h-0 rounded-2xl bg-white p-2">
            <iframe className="h-full min-h-[80vh] w-full rounded-xl" src={pdfUrl(previewInvoice.id)} title="Live PDF preview" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
