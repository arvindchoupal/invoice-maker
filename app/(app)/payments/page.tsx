"use client";

import { useEffect, useState } from "react";
import { CreditCard, RotateCcw } from "lucide-react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Badge, Button, Card, EmptyState, Field, PageHeader, Skeleton, inputClass } from "@/components/ui";

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

interface InvoiceOption {
  id: number;
  invoice_number: string;
  customer_name: string;
  total: number;
  currency: string;
  status: string;
}

function statusTone(status: string) {
  if (status === "paid") return "green";
  if (status === "refunded") return "rose";
  return "blue";
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setPayments(await api<PaymentRow[]>("/payments"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load payments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.all([
      api<PaymentRow[]>("/payments"),
      api<{ data: InvoiceOption[] }>("/invoices?status=all&page=1&pageSize=100&sortBy=created_at&sortDir=desc"),
    ])
      .then(([nextPayments, invoiceResponse]) => {
        setPayments(nextPayments);
        setInvoices(invoiceResponse.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load payment details."))
      .finally(() => setLoading(false));
  }, []);

  async function manualPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const id = form.get("invoiceId");
    try {
      await api(`/payments/${id}/manual`, {
        method: "POST",
        body: JSON.stringify({
          amount: Number(form.get("amount")),
          reference: form.get("reference"),
          note: form.get("note"),
        }),
      });
      event.currentTarget.reset();
      setMessage("Payment recorded.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not record this payment.");
    } finally {
      setSubmitting(false);
    }
  }

  async function refund(paymentId: number) {
    await api(`/payments/${paymentId}/refund`, { method: "POST", body: JSON.stringify({ reason: "Manual refund from dashboard" }) });
    load();
  }

  return (
    <div className="grid gap-5">
      <PageHeader title="Payments" description="Record payments received directly from customers and keep invoice status up to date." />
      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error}</p> : null}
      {message ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">{message}</p> : null}

      <div className="grid gap-5 xl:grid-cols-[1fr_0.7fr]">
        <Card className="p-5">
          <h2 className="text-lg font-semibold">Record manual or partial payment</h2>
          <form onSubmit={manualPayment} className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Invoice"><select className={inputClass} name="invoiceId" required defaultValue=""><option value="" disabled>Select an invoice</option>{invoices.map((invoice) => <option key={invoice.id} value={invoice.id}>{invoice.invoice_number} — {invoice.customer_name} · {currency(Number(invoice.total), invoice.currency)} · {invoice.status}</option>)}</select></Field>
            <Field label="Amount"><input className={inputClass} name="amount" type="number" min="0" step="0.01" required /></Field>
            <Field label="Reference"><input className={inputClass} name="reference" /></Field>
            <Field label="Note"><input className={inputClass} name="note" /></Field>
            <Button className="md:col-span-2" disabled={submitting || !invoices.length}><CreditCard className="h-4 w-4" />{submitting ? "Recording…" : "Record payment"}</Button>
            {!loading && !invoices.length ? <p className="text-sm text-amber-700 md:col-span-2">Create an invoice before recording a payment.</p> : null}
          </form>
        </Card>
        <Card className="border-amber-200 bg-amber-50 p-5 dark:border-amber-300/15 dark:bg-amber-300/[0.06]">
          <h2 className="text-lg font-semibold">Online collection paused</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            InvoiceWala is not creating Stripe or Razorpay payment sessions during the free founding launch. You can still record bank, UPI, cash or other payments received directly from your customer.
          </p>
        </Card>
      </div>

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
          <EmptyState contained title="No payments recorded" body="Record a manual payment or mark an invoice paid to populate payment history." />
        )}
      </Card>
    </div>
  );
}
