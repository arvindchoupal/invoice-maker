"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Client } from "@/types";
import { Badge, Button, Card, EmptyState, Field, PageHeader, Skeleton, inputClass } from "@/components/ui";

interface RecurringRow { id: number; client_id?: number; template_invoice_id?: number; client_name?: string; template_invoice_number?: string; frequency: string; next_run_date: string; auto_send: boolean; status: string }
interface InvoiceOption { id: number; invoice_number: string; customer_name: string }
interface InvoiceResponse { data: InvoiceOption[] }

export default function RecurringPage() {
  const [items, setItems] = useState<RecurringRow[]>([]); const [clients, setClients] = useState<Client[]>([]); const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [loading, setLoading] = useState(true); const [submitting, setSubmitting] = useState(false); const [showForm, setShowForm] = useState(false); const [editing, setEditing] = useState<RecurringRow | null>(null); const [deleting, setDeleting] = useState<RecurringRow | null>(null); const [error, setError] = useState(""); const [message, setMessage] = useState("");

  async function load() {
    setLoading(true); setError("");
    try { const [schedules, clientRows, invoiceRows] = await Promise.all([api<RecurringRow[]>("/recurring"), api<Client[]>("/clients"), api<InvoiceResponse>("/invoices?pageSize=100&status=all")]); setItems(schedules); setClients(clientRows); setInvoices(invoiceRows.data); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load recurring invoices."); } finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError(""); const form = new FormData(event.currentTarget);
    try { await api(editing ? `/recurring/${editing.id}` : "/recurring", { method: editing ? "PUT" : "POST", body: JSON.stringify({ templateInvoiceId: Number(form.get("templateInvoiceId")), clientId: Number(form.get("clientId")), frequency: form.get("frequency"), nextRunDate: form.get("nextRunDate"), autoSend: form.get("autoSend") === "on", status: form.get("status") ?? "active" }) }); setMessage(editing ? "Schedule updated." : "Schedule created."); setShowForm(false); setEditing(null); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not save recurring schedule."); } finally { setSubmitting(false); }
  }

  async function setStatus(item: RecurringRow, status: "active" | "paused") {
    setSubmitting(true); setError("");
    try { await api(`/recurring/${item.id}`, { method: "PUT", body: JSON.stringify({ clientId: item.client_id, templateInvoiceId: item.template_invoice_id, frequency: item.frequency, nextRunDate: String(item.next_run_date).slice(0, 10), autoSend: item.auto_send, status }) }); setMessage(status === "paused" ? "Schedule paused." : "Schedule resumed."); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not update schedule."); } finally { setSubmitting(false); }
  }

  async function remove() { if (!deleting) return; setSubmitting(true); try { await api(`/recurring/${deleting.id}`, { method: "DELETE" }); setDeleting(null); setMessage("Schedule deleted."); await load(); } catch (err) { setError(err instanceof Error ? err.message : "Could not delete schedule."); } finally { setSubmitting(false); } }

  return <div className="grid gap-5">
    <PageHeader title="Recurring invoices" description="Choose a saved client and invoice, then control when it repeats." action={<Button onClick={() => { setEditing(null); setShowForm((value) => !value); }}><Plus className="h-4 w-4" />{showForm ? "Close form" : "New schedule"}</Button>} />
    {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error} <button className="font-semibold underline" onClick={() => void load()}>Retry</button></p> : null}{message ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">{message}</p> : null}
    {showForm ? <Card className="p-5"><form key={editing?.id ?? "new"} onSubmit={save} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Field label="Invoice template"><select className={inputClass} name="templateInvoiceId" defaultValue={editing?.template_invoice_id ?? ""} required><option value="" disabled>Select an invoice</option>{invoices.map((invoice) => <option key={invoice.id} value={invoice.id}>{invoice.invoice_number} — {invoice.customer_name}</option>)}</select></Field><Field label="Client"><select className={inputClass} name="clientId" defaultValue={editing?.client_id ?? ""} required><option value="" disabled>Select a client</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></Field><Field label="Frequency"><select className={inputClass} name="frequency" defaultValue={editing?.frequency ?? "monthly"}><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></Field><Field label="Next run"><input className={inputClass} name="nextRunDate" type="date" defaultValue={editing ? String(editing.next_run_date).slice(0, 10) : ""} required /></Field><input type="hidden" name="status" value={editing?.status ?? "active"} /><label className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm font-semibold dark:border-white/10 md:col-span-2 xl:col-span-4"><input className="h-5 w-5" name="autoSend" type="checkbox" defaultChecked={Boolean(editing?.auto_send)} />Automatically email the generated invoice to the selected client.<span className="font-normal text-slate-500">You can pause this anytime.</span></label><Button className="md:col-span-2 xl:col-span-4" disabled={submitting || !clients.length || !invoices.length}>{submitting ? "Saving…" : editing ? "Update schedule" : "Create schedule"}</Button>{!clients.length || !invoices.length ? <p className="text-sm text-amber-700 md:col-span-2 xl:col-span-4">Create at least one client and invoice before making a recurring schedule.</p> : null}</form></Card> : null}
    {loading ? <div className="grid gap-3"><Skeleton className="h-28" /><Skeleton className="h-28" /></div> : items.length ? <div className="grid gap-3">{items.map((item) => <Card className="p-5" key={item.id}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2"><h2 className="font-semibold">{item.template_invoice_number || "Invoice template"}</h2><Badge tone={item.status === "active" ? "green" : "amber"}>{item.status}</Badge></div><p className="mt-2 text-sm text-slate-500">{item.client_name || "No client"} · {item.frequency[0].toUpperCase() + item.frequency.slice(1)} · Next {String(item.next_run_date).slice(0, 10)}</p><p className="mt-1 text-xs text-slate-500">Email delivery: {item.auto_send ? "Automatic" : "Manual"}</p></div><div className="flex flex-wrap gap-2"><Button variant="secondary" onClick={() => { setEditing(item); setShowForm(true); }}><Pencil className="h-4 w-4" />Edit</Button><Button variant="secondary" disabled={submitting} onClick={() => void setStatus(item, item.status === "active" ? "paused" : "active")}>{item.status === "active" ? "Pause" : "Resume"}</Button><Button variant="danger" onClick={() => setDeleting(item)} aria-label={`Delete recurring schedule ${item.template_invoice_number ?? item.id}`}><Trash2 className="h-4 w-4" /></Button></div></div></Card>)}</div> : <EmptyState title="No recurring invoices" body="Create a recurring schedule from an existing invoice and client." />}
    {deleting ? <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/55 p-4" role="dialog" aria-modal="true"><Card className="w-full max-w-md p-6"><h2 className="text-lg font-semibold">Delete this recurring schedule?</h2><p className="mt-2 text-sm text-slate-500">Future invoices will no longer be generated.</p><div className="mt-6 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button><Button variant="danger" disabled={submitting} onClick={() => void remove()}>{submitting ? "Deleting…" : "Delete schedule"}</Button></div></Card></div> : null}
  </div>;
}
