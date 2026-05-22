"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Search, UserPlus } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import type { Client } from "@/types";
import { Badge, Button, Card, EmptyState, Field, Skeleton, inputClass } from "@/components/ui";

function formatDate(value?: string) {
  if (!value) return "No invoices";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setClients(await api<Client[]>(`/clients?search=${encodeURIComponent(search)}`));
    setLoading(false);
  }

  useEffect(() => {
    api<Client[]>("/clients").then(setClients).finally(() => setLoading(false));
  }, []);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await api("/clients", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        taxId: form.get("taxId"),
        billingAddress: form.get("billingAddress"),
      }),
    });
    event.currentTarget.reset();
    load();
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">CRM-style client profiles powered by invoice and payment records.</p>
        </div>
      </div>

      <Card className="p-5">
        <form onSubmit={create} className="grid gap-4 md:grid-cols-5">
          <Field label="Name"><input className={inputClass} name="name" required /></Field>
          <Field label="Email"><input className={inputClass} name="email" type="email" /></Field>
          <Field label="Phone"><input className={inputClass} name="phone" /></Field>
          <Field label="GST/VAT ID"><input className={inputClass} name="taxId" /></Field>
          <Field label="Billing address"><input className={inputClass} name="billingAddress" /></Field>
          <Button className="md:col-span-5">
            <UserPlus className="h-4 w-4" />
            Add client
          </Button>
        </form>
      </Card>

      <Card className="p-4">
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
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No clients found" body="Add a client to reuse billing details, track outstanding balances, and review invoice history." />
      )}
    </div>
  );
}
