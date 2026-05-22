"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Card, EmptyState, Field, inputClass } from "@/components/ui";

interface RecurringRow {
  id: number;
  client_id?: number;
  template_invoice_id?: number;
  client_name?: string;
  template_invoice_number?: string;
  frequency: string;
  next_run_date: string;
  auto_send: boolean;
  status: string;
}

export default function RecurringPage() {
  const [items, setItems] = useState<RecurringRow[]>([]);

  async function load() {
    setItems(await api<RecurringRow[]>("/recurring"));
  }

  useEffect(() => {
    api<RecurringRow[]>("/recurring").then(setItems);
  }, []);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await api("/recurring", { method: "POST", body: JSON.stringify({ templateInvoiceId: Number(form.get("templateInvoiceId")) || null, clientId: Number(form.get("clientId")) || null, frequency: form.get("frequency"), nextRunDate: form.get("nextRunDate"), autoSend: form.get("autoSend") === "on" }) });
    event.currentTarget.reset();
    load();
  }

  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-semibold tracking-tight">Recurring invoices</h1><p className="mt-1 text-sm text-slate-500">Weekly, monthly, and yearly invoice schedules backed by recurring invoice records.</p></div>
      <Card className="p-5"><form onSubmit={create} className="grid gap-4 md:grid-cols-5"><Field label="Template invoice ID"><input className={inputClass} name="templateInvoiceId" /></Field><Field label="Client ID"><input className={inputClass} name="clientId" /></Field><Field label="Frequency"><select className={inputClass} name="frequency"><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></Field><Field label="Next run"><input className={inputClass} name="nextRunDate" type="date" required /></Field><label className="flex items-end gap-2 text-sm font-semibold"><input name="autoSend" type="checkbox" /> Auto send</label><Button className="md:col-span-5">Create schedule</Button></form></Card>
      <Card className="overflow-hidden">{items.length ? <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Client</th><th className="p-4">Template</th><th className="p-4">Frequency</th><th className="p-4">Next run</th><th className="p-4">Auto send</th><th className="p-4">Status</th></tr></thead><tbody>{items.map((item) => <tr className="border-t border-slate-100 dark:border-white/5" key={item.id}><td className="p-4">{item.client_name || item.client_id}</td><td className="p-4">{item.template_invoice_number || item.template_invoice_id}</td><td className="p-4">{item.frequency}</td><td className="p-4">{String(item.next_run_date).slice(0, 10)}</td><td className="p-4">{item.auto_send ? "Yes" : "No"}</td><td className="p-4">{item.status}</td></tr>)}</tbody></table> : <div className="p-5"><EmptyState title="No recurring invoices" body="Create a recurring schedule from an existing invoice template." /></div>}</Card>
    </div>
  );
}
