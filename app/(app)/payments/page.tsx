"use client";

import { useEffect, useState } from "react";
import { CreditCard, RotateCcw } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Badge, Button, Card, EmptyState, Field, Skeleton, inputClass } from "@/components/ui";

interface PaymentRow {
  id: number;
  invoice_id: number;
  invoice_number: string;
  customer_name: string;
  provider: string;
  provider_ref?: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

function statusTone(status: string) {
  if (status === "paid") return "green";
  if (status === "refunded") return "rose";
  return "blue";
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setPayments(await api<PaymentRow[]>("/payments"));
    setLoading(false);
  }

  useEffect(() => {
    api<PaymentRow[]>("/payments").then(setPayments).finally(() => setLoading(false));
  }, []);

  async function action(provider: "stripe" | "razorpay" | "mark-paid", form: HTMLFormElement) {
    const id = new FormData(form).get("invoiceId");
    const path = provider === "mark-paid" ? `/payments/${id}/mark-paid` : `/payments/${id}/${provider}`;
    const data = await api(path, { method: "POST" });
    setMessage(JSON.stringify(data, null, 2));
    load();
  }

  async function manualPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = form.get("invoiceId");
    const data = await api(`/payments/${id}/manual`, {
      method: "POST",
      body: JSON.stringify({
        amount: Number(form.get("amount")),
        reference: form.get("reference"),
        note: form.get("note"),
      }),
    });
    setMessage(JSON.stringify(data, null, 2));
    event.currentTarget.reset();
    load();
  }

  async function refund(paymentId: number) {
    await api(`/payments/${paymentId}/refund`, { method: "POST", body: JSON.stringify({ reason: "Manual refund from dashboard" }) });
    load();
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Payments</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Payment sessions, manual payments, partial payments, refunds, and status history from the backend.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Provider actions</h2>
          <form className="mt-4" onSubmit={(event) => event.preventDefault()}>
            <Field label="Invoice ID"><input className={inputClass} name="invoiceId" placeholder="1" required /></Field>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={(e) => action("stripe", e.currentTarget.form!)}>Stripe checkout</Button>
              <Button variant="secondary" onClick={(e) => action("razorpay", e.currentTarget.form!)}>Razorpay order</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-500" onClick={(e) => action("mark-paid", e.currentTarget.form!)}>Mark as paid</Button>
            </div>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold">Record manual or partial payment</h2>
          <form onSubmit={manualPayment} className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Invoice ID"><input className={inputClass} name="invoiceId" required /></Field>
            <Field label="Amount"><input className={inputClass} name="amount" type="number" min="0" step="0.01" required /></Field>
            <Field label="Reference"><input className={inputClass} name="reference" /></Field>
            <Field label="Note"><input className={inputClass} name="note" /></Field>
            <Button className="md:col-span-2"><CreditCard className="h-4 w-4" />Record payment</Button>
          </form>
        </Card>
      </div>

      {message ? <pre className="overflow-auto rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm text-slate-100">{message}</pre> : null}

      <Card className="overflow-hidden">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h2 className="text-lg font-semibold">Payment history</h2>
        </div>
        {loading ? (
          <div className="grid gap-3 p-5"><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
        ) : payments.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.04]">
                <tr><th className="p-4">Invoice</th><th className="p-4">Client</th><th className="p-4">Provider</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Date</th><th className="p-4">Actions</th></tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr className="border-t border-slate-100 dark:border-white/5" key={payment.id}>
                    <td className="p-4 font-semibold">{payment.invoice_number}</td>
                    <td className="p-4">{payment.customer_name}</td>
                    <td className="p-4">{payment.provider}</td>
                    <td className="p-4">{currency(Number(payment.amount), payment.currency)}</td>
                    <td className="p-4"><Badge tone={statusTone(payment.status)}>{payment.status}</Badge></td>
                    <td className="p-4">{String(payment.created_at).slice(0, 10)}</td>
                    <td className="p-4">
                      <Button variant="secondary" disabled={payment.status === "refunded"} onClick={() => refund(payment.id)}>
                        <RotateCcw className="h-4 w-4" />Refund
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-5"><EmptyState title="No payments recorded" body="Record a manual payment or mark an invoice paid to populate payment history." /></div>
        )}
      </Card>
    </div>
  );
}
