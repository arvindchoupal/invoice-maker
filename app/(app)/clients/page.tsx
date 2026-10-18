"use client";

import { useEffect, useState } from "react";
import { Mail, Pencil, Phone, Search, Trash2, UserPlus, X } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import type { Client } from "@/types";
import { Badge, Button, Card, EmptyState, Field, PageHeader, Skeleton, inputClass } from "@/components/ui";

function formatDate(value?: string) {
  if (!value) return "No invoices";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<Client | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setClients(await api<Client[]>(`/clients?search=${encodeURIComponent(search)}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load clients.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api<Client[]>("/clients").then(setClients).catch((err) => setError(err instanceof Error ? err.message : "Could not load clients.")).finally(() => setLoading(false));
  }, []);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await api(editing ? `/clients/${editing.id}` : "/clients", {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        taxId: form.get("taxId"),
        billingAddress: form.get("billingAddress"),
          shippingAddress: "",
          notes: "",
        }),
      });
      event.currentTarget.reset();
      setShowForm(false);
      setEditing(null);
      setMessage(editing ? "Client updated." : "Client added.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save client.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeClient() {
    if (!deleting) return;
    setSubmitting(true);
    setError("");
    try {
      await api(`/clients/${deleting.id}`, { method: "DELETE" });
      setMessage("Client deleted.");
      setDeleting(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete client. Remove linked invoices first if required.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-5">
      <PageHeader title="Clients" description="CRM-style client profiles powered by invoice and payment records." action={<Button onClick={() => { setEditing(null); setShowForm((value) => !value); }}><UserPlus className="h-4 w-4" />{showForm ? "Close form" : "Add client"}</Button>} />

      {showForm ? <Card className="p-5">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">{editing ? `Edit ${editing.name}` : "Add a client"}</h2><p className="mt-1 text-sm text-slate-500">Save billing details once and reuse them on invoices.</p></div><button className="grid h-11 w-11 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06]" onClick={() => { setShowForm(false); setEditing(null); }} aria-label="Close client form"><X className="h-5 w-5" /></button></div>
        <form key={editing?.id ?? "new"} onSubmit={create} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Name"><input className={inputClass} name="name" defaultValue={editing?.name ?? ""} required /></Field>
          <Field label="Email"><input className={inputClass} name="email" type="email" defaultValue={editing?.email ?? ""} /></Field>
          <Field label="Phone"><input className={inputClass} name="phone" type="tel" defaultValue={editing?.phone ?? ""} /></Field>
          <Field label="GST/VAT ID"><input className={inputClass} name="taxId" defaultValue={editing?.tax_id ?? ""} /></Field>
          <div className="md:col-span-2 xl:col-span-4"><Field label="Billing address"><textarea className={`${inputClass} min-h-20`} name="billingAddress" defaultValue={editing?.billing_address ?? ""} /></Field></div>
          <Button className="md:col-span-2 xl:col-span-4" disabled={submitting}>{submitting ? "Saving…" : editing ? "Update client" : "Add client"}</Button>
        </form>
      </Card> : null}

      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error}</p> : null}
      {message ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">{message}</p> : null}

      <Card className="p-5">
        <div className="flex gap-3">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} w-full pl-10`} placeholder="Search clients by name or email" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(event) => {
              if (event.key === "Enter") load();
            }} />
          </label>
          <Button onClick={load}>Search</Button>
        </div>
      </Card>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-60" />
          <Skeleton className="h-60" />
          <Skeleton className="h-60" />
        </div>
      ) : clients.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/[0.06]" key={client.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                    {client.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold">{client.name}</h2>
                    <p className="truncate text-xs text-slate-500">{client.tax_id || "No GST/VAT ID"}</p>
                  </div>
                </div>
                <Badge tone={Number(client.outstanding_amount ?? 0) > 0 ? "amber" : "green"}>
                  {Number(client.outstanding_amount ?? 0) > 0 ? "Outstanding" : "Settled"}
                </Badge>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold">{client.invoice_count ?? 0}</p>
                  <p className="text-xs text-slate-500">Invoices</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold">{currency(Number(client.lifetime_value ?? 0))}</p>
                  <p className="text-xs text-slate-500">Revenue</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold">{currency(Number(client.outstanding_amount ?? 0))}</p>
                  <p className="text-xs text-slate-500">Due</p>
                </div>
              </div>

              <div className="mt-5 grid gap-2 text-sm text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" />{client.email || "No email"}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{client.phone || "No phone"}</p>
                <p>Last invoice: {formatDate(client.last_invoice_date)}</p>
              </div>
              <div className="mt-5 flex gap-2"><Button variant="secondary" className="flex-1" onClick={() => { setEditing(client); setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil className="h-4 w-4" />Edit</Button><Button variant="danger" className="flex-1" onClick={() => setDeleting(client)}><Trash2 className="h-4 w-4" />Delete</Button></div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No clients found" body="Add a client to reuse billing details, track outstanding balances, and review invoice history." />
      )}

      {deleting ? <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/55 p-4" role="dialog" aria-modal="true"><Card className="w-full max-w-md p-6"><h2 className="text-lg font-semibold">Delete {deleting.name}?</h2><p className="mt-2 text-sm text-slate-500">This removes the client profile. Linked invoices may prevent deletion.</p><div className="mt-6 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button><Button variant="danger" disabled={submitting} onClick={() => void removeClient()}>{submitting ? "Deleting…" : "Delete client"}</Button></div></Card></div> : null}
    </div>
  );
}
