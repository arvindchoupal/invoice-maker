"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, MessageCircle, Search, Trash2 } from "lucide-react";
import { api, downloadApiFile } from "@/lib/api";
import { currency } from "@/lib/invoice";
import type { PdfStyleMeta } from "@/lib/pdf-styles";
import { TemplateGallery } from "@/components/TemplateGallery";
import { Badge, Button, Card, EmptyState, LinkButton, PageHeader, Skeleton, inputClass } from "@/components/ui";

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
  pdf_style?: string;
}

interface InvoiceListResponse {
  data: InvoiceRow[];
  pagination: { page: number; pageSize: number; total: number };
  facets: Array<{ status: string; count: number }>;
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
  const [styles, setStyles] = useState<PdfStyleMeta[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [downloadInvoice, setDownloadInvoice] = useState<InvoiceRow | null>(null);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deleteInvoice, setDeleteInvoice] = useState<InvoiceRow | null>(null);

  const selectedTemplate = selectedStyle || styles[0]?.id || "classic";
  const totalPages = Math.max(Math.ceil((response?.pagination.total ?? 0) / (response?.pagination.pageSize ?? 10)), 1);

  const facetMap = useMemo(() => {
    const map = new Map<string, number>();
    response?.facets.forEach((facet) => map.set(facet.status, Number(facet.count)));
    return map;
  }, [response?.facets]);

  async function load(nextSearch = appliedSearch) {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({
      search: nextSearch,
      status,
      sortBy,
      sortDir,
      page: String(page),
      pageSize: "10",
    });
    try {
      const data = await api<InvoiceListResponse>(`/invoices?${params.toString()}`);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load invoices.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams({
      search: appliedSearch,
      status,
      sortBy,
      sortDir,
      page: String(page),
      pageSize: "10",
    });
    api<InvoiceListResponse>(`/invoices?${params.toString()}`)
      .then(setResponse)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load invoices."))
      .finally(() => setLoading(false));
  }, [page, appliedSearch, status, sortBy, sortDir]);

  useEffect(() => {
    const initialSearch = new URLSearchParams(window.location.search).get("search") ?? "";
    if (initialSearch) {
      setSearch(initialSearch);
      setAppliedSearch(initialSearch);
    }
  }, []);

  useEffect(() => {
    api<PdfStyleMeta[]>("/invoices/pdf/styles/list").then((items) => {
      setStyles(items);
      setSelectedStyle(items[0]?.id ?? "classic");
    }).catch(() => setError("Invoice templates could not be loaded."));
  }, []);

  async function remove(id: number) {
    setError("");
    try {
      await api(`/invoices/${id}`, { method: "DELETE" });
      setDeleteInvoice(null);
      setMessage("Invoice deleted.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete invoice.");
    }
  }

  function whatsappUrl(invoice: InvoiceRow) {
    const text = `Hi, invoice ${invoice.invoice_number} for ${currency(Number(invoice.total), invoice.currency)} is ready. Please reply here if you would like me to send the PDF.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  async function downloadPdf(invoice: InvoiceRow, style: string) {
    setError("");
    try {
      await downloadApiFile(`/invoices/${invoice.id}/pdf?style=${encodeURIComponent(style)}`, `${invoice.invoice_number}-${style}.pdf`);
      setDownloadInvoice(null);
      setMessage("PDF downloaded securely.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not download PDF.");
    }
  }

  return (
    <div className="grid gap-5">
      <PageHeader title="Invoices" description="Search, filter, edit, share, and download invoices with real PDF templates." action={<LinkButton href="/invoices/new">Create invoice</LinkButton>} />

      <Card className="p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} w-full pl-10`} placeholder="Search invoice number, client, email, GSTIN" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => {
              if (event.key === "Enter") {
                setPage(1);
                setAppliedSearch(search.trim());
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
            setAppliedSearch(search.trim());
          }}>Apply</Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition ${status === tab ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"}`}
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

      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error} <button className="ml-2 font-semibold underline" onClick={() => load()}>Retry</button></div> : null}
      {message ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">{message}</div> : null}

      <Card className="overflow-hidden">
        {loading ? (
          <div className="grid gap-3 p-5">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        ) : response?.data.length ? (<>
          <div className="hidden overflow-x-auto premium-scrollbar md:block">
            <table className="w-full min-w-[860px] text-left text-sm">
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
                        <Link className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold dark:border-white/10" href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                        <a className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:text-emerald-200" href={whatsappUrl(invoice)} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />WA</a>
                        <Button className="px-3" onClick={() => {
                          setDownloadInvoice(invoice);
                          setSelectedStyle(invoice.pdf_style || styles[0]?.id || "classic");
                        }}><Download className="h-4 w-4" />PDF</Button>
                        <Button variant="danger" className="px-3" onClick={() => setDeleteInvoice(invoice)} aria-label={`Delete invoice ${invoice.invoice_number}`}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 p-3 md:hidden">
            {response.data.map((invoice) => (
              <article className="rounded-2xl border border-slate-200 p-4 dark:border-white/10" key={invoice.id}>
                <div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{invoice.invoice_number}</p><p className="mt-1 text-sm text-slate-500">{invoice.customer_name}</p></div><Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge></div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><p className="text-xs text-slate-500">Due</p><p>{String(invoice.due_date).slice(0, 10)}</p></div><div className="text-right"><p className="text-xs text-slate-500">Total</p><p className="font-semibold">{currency(Number(invoice.total), invoice.currency)}</p></div></div>
                <div className="mt-4 grid grid-cols-2 gap-2"><Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-3 text-sm font-semibold dark:border-white/10" href={`/invoices/${invoice.id}/edit`}>Edit</Link><Button onClick={() => { setDownloadInvoice(invoice); setSelectedStyle(invoice.pdf_style || styles[0]?.id || "classic"); }}><Download className="h-4 w-4" />PDF</Button><a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 px-3 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:text-emerald-200" href={whatsappUrl(invoice)} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a><Button variant="danger" onClick={() => setDeleteInvoice(invoice)}><Trash2 className="h-4 w-4" />Delete</Button></div>
              </article>
            ))}
          </div>
          </>
        ) : (
          <EmptyState contained title="No invoices found" body="Adjust filters or create a new invoice to populate this table." action={<LinkButton href="/invoices/new">New invoice</LinkButton>} />
        )}
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Page {page} of {totalPages} · {response?.pagination.total ?? 0} invoices</p>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((current) => Math.max(current - 1, 1))}>Previous</Button>
          <Button variant="secondary" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button>
        </div>
      </div>

      {downloadInvoice ? (
        <TemplateGallery
          styles={styles}
          selectedId={selectedTemplate}
          onClose={() => setDownloadInvoice(null)}
          onSelect={setSelectedStyle}
          onDownload={(style) => {
            setSelectedStyle(style);
            void downloadPdf(downloadInvoice, style);
          }}
        />
      ) : null}

      {deleteInvoice ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/55 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-invoice-title">
          <Card className="w-full max-w-md p-6"><h2 className="text-lg font-semibold" id="delete-invoice-title">Delete {deleteInvoice.invoice_number}?</h2><p className="mt-2 text-sm text-slate-500">This permanently removes the invoice. This action cannot be undone.</p><div className="mt-6 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDeleteInvoice(null)}>Cancel</Button><Button variant="danger" onClick={() => remove(deleteInvoice.id)}>Delete invoice</Button></div></Card>
        </div>
      ) : null}
    </div>
  );
}
