"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { UserJourneyInsights } from "@/components/UserJourneyInsights";
import { EmptyState, PageHeader, StatCard } from "@/components/ui";

type Row = Record<string, string | number | null>;
type Detail = { user: Row; profile: Row; invoices: Row[]; activity: Row[]; client_count: number; frontend: Row[]; journeys: Row[] };
type Invoice = Row & { items: Row[]; payments: Row[] };
const date = (value: unknown) => value ? new Date(String(value)).toLocaleString() : "Not recorded";
const method = (u: Row) => u.google_login_at && u.email_login_at ? "Google + Email/password" : u.google_login_at ? "Google" : u.email_login_at ? "Email/password" : "Unknown (legacy account)";
const inactive = (u: Row) => !!u.last_seen_at && Date.now() - new Date(String(u.last_seen_at)).getTime() > 30 * 86400000;
const money = (value: unknown, code: unknown) => { try { return new Intl.NumberFormat(undefined, { style: "currency", currency: String(code || "USD") }).format(Number(value || 0)); } catch { return `${code} ${value}`; } };
const panel = "rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900";
const button = "rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

function Fields({ values }: { values: Row }) {
  return <dl className="grid gap-4 sm:grid-cols-2">{Object.entries(values).map(([key, value]) => <div key={key}><dt className="text-xs capitalize text-slate-500">{key.replaceAll("_", " ")}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm">{value === null || value === "" ? "—" : String(value)}</dd></div>)}</dl>;
}

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<Record<string, number> | null>(null);
  const [users, setUsers] = useState<Row[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [invoiceError, setInvoiceError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    Promise.all([api<Record<string, number>>("/admin/analytics"), api<Row[]>("/admin/users")])
      .then(([a, u]) => { setAnalytics(a); setUsers(u); })
      .catch((err) => setError(err instanceof Error ? err.message : "Admin access required"));
  }, []);
  useEffect(() => {
    if (!selected) return;
    let active = true;
    api<Detail>(`/admin/users/${selected}`).then(d => { if (active) setDetail(d); }).catch(e => { if (active) setDetailError(e.message); });
    return () => { active = false; };
  }, [selected]);
  useEffect(() => {
    if (!selected || !invoiceId) return;
    let active = true;
    api<Invoice>(`/admin/users/${selected}/invoices/${invoiceId}`).then(d => { if (active) setInvoice(d); }).catch(e => { if (active) setInvoiceError(e.message); });
    return () => { active = false; };
  }, [selected, invoiceId]);
  const visible = users.filter(u => `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase()) && (filter === "all" || (filter === "inactive" && inactive(u)) || (filter === "no-invoices" && Number(u.invoice_count) === 0) || (filter === "google" && !!u.google_login_at) || (filter === "email" && !!u.email_login_at)));
  return <div className="grid gap-5">
    <PageHeader title="User insights" description="Understand signups, account activity and invoice usage." />
    {error ? <EmptyState title="Unable to load admin data" body={error} /> : <>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Users" value={String(analytics?.users ?? "...")} />
        <StatCard label="Invoices" value={String(analytics?.invoices ?? "...")} tone="slate" />
        <StatCard label="No invoices yet" value={String(users.filter(u => Number(u.invoice_count) === 0).length)} tone="amber" />
        <StatCard label="Inactive 30+ days" value={String(users.filter(inactive).length)} tone="green" />
      </div>
      <section className={panel}>
        <div className="mb-4 flex flex-wrap gap-3">
          <input aria-label="Search users" placeholder="Search name or email…" value={query} onChange={e => setQuery(e.target.value)} className={`${button} min-w-0 flex-1`} />
          <select aria-label="Filter users" value={filter} onChange={e => setFilter(e.target.value)} className={`${button} dark:bg-slate-900`}><option value="all">All users</option><option value="google">Google login</option><option value="email">Email/password login</option><option value="no-invoices">No invoices</option><option value="inactive">Inactive 30+ days</option></select>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm"><thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><tr>{["User", "Created", "Login method", "Last active", "Usage", "Profile"].map(h => <th className="p-3" key={h}>{h}</th>)}</tr></thead><tbody>
          {visible.map(u => <tr key={u.id} className="border-t border-slate-200 dark:border-slate-800"><td className="p-3 font-medium">{u.name}<div className="text-xs text-slate-500">{u.email} · {u.role}</div></td><td className="p-3">{date(u.created_at)}</td><td className="p-3">{method(u)}</td><td className="p-3">{date(u.last_seen_at)}{inactive(u) && <div className="text-xs text-amber-600">Inactive 30+ days</div>}</td><td className="p-3">{u.invoice_count} invoices<div className="text-xs text-slate-500">Last created: {u.last_invoice_at ? date(u.last_invoice_at) : "None"}</div></td><td className="p-3"><button className={button} onClick={() => { setSelected(String(u.id)); setDetail(null); setDetailError(""); setInvoiceId(null); setInvoice(null); }}>View profile</button></td></tr>)}
          {!visible.length && <tr><td colSpan={6} className="p-6 text-center text-slate-500">{analytics ? "No matching users." : "Loading users…"}</td></tr>}
        </tbody></table></div>
      </section>
      {selected && <section className={panel} aria-label="User profile"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold">{detail?.user.name ?? "User profile"}</h2><button className={button} onClick={() => { setSelected(null); setDetail(null); setInvoiceId(null); }}>Close profile</button></div>
        {detailError ? <p role="alert">{detailError}</p> : !detail ? <p>Loading profile…</p> : <div className="grid gap-6">
          <Fields values={{ name: detail.user.name, email: detail.user.email, role: detail.user.role, created: date(detail.user.created_at), login_method: method(detail.user), last_google_login: date(detail.user.google_login_at), last_email_login: date(detail.user.email_login_at), last_active: date(detail.user.last_seen_at), clients: detail.client_count }} />
          <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950 dark:text-amber-100">{!detail.invoices.length ? "No invoices created yet. " : ""}{inactive(detail.user) ? "No recorded activity in the last 30 days. " : ""}Activity tracking starts after this update. Earlier login methods may be unknown. Inactivity is a signal; the reason for stopping requires user feedback.</div>
          <div><h3 className="mb-3 font-semibold">Business profile</h3><Fields values={detail.profile} /></div>
          <div><h3 className="mb-3 font-semibold">Invoices ({detail.invoices.length})</h3><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr>{["Invoice", "Customer", "Status", "Total", "Created", ""].map((h,i) => <th key={i} className="p-2">{h}</th>)}</tr></thead><tbody>{detail.invoices.map(i => <tr key={i.id} className="border-t border-slate-200 dark:border-slate-800"><td className="p-2">{i.invoice_number}</td><td className="p-2">{i.customer_name}</td><td className="p-2">{i.status}</td><td className="p-2">{money(i.total, i.currency)}</td><td className="p-2">{date(i.created_at)}</td><td className="p-2"><button className={button} onClick={() => { setInvoiceId(String(i.id)); setInvoice(null); setInvoiceError(""); }}>Details</button></td></tr>)}</tbody></table></div>{!detail.invoices.length && <p className="text-sm text-slate-500">No invoices yet.</p>}</div>
          {invoiceId && <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"><div className="mb-4 flex justify-between"><h3 className="font-semibold">Invoice details</h3><button className={button} onClick={() => setInvoiceId(null)}>Close invoice</button></div>{invoiceError ? <p role="alert">{invoiceError}</p> : !invoice ? <p>Loading invoice…</p> : <><Fields values={Object.fromEntries(Object.entries(invoice).filter(([k]) => !["items", "payments"].includes(k))) as Row} /><h4 className="my-4 font-semibold">Items</h4>{invoice.items.map(item => <div className="mb-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800" key={item.id}><Fields values={item} /></div>)}<h4 className="my-4 font-semibold">Payments</h4>{invoice.payments.length ? invoice.payments.map(p => <Fields key={p.id} values={p} />) : <p className="text-sm text-slate-500">No payments recorded.</p>}</>}</div>}
          <UserJourneyInsights events={detail.frontend ?? []} journeys={detail.journeys ?? []} />
          <div><h3 className="mb-3 font-semibold">Recent API activity</h3><p className="mb-3 text-xs text-slate-500">Latest 200 authenticated API actions, including failed requests. Resource IDs refer to the affected record.</p><ol className="max-h-96 space-y-3 overflow-y-auto">{detail.activity.map(a => <li key={a.id} className="border-l-2 border-indigo-300 pl-3 text-sm"><div className="font-medium">{a.action}{a.resource ? ` · Record #${a.resource}` : ""}<span className="ml-2 text-xs text-slate-500">HTTP {a.status_code}</span></div><time className="text-xs text-slate-500">{date(a.created_at)}</time></li>)}</ol>{!detail.activity.length && <p className="text-sm text-slate-500">No activity recorded since tracking began.</p>}</div>
        </div>}
      </section>}
    </>}
  </div>;
}
