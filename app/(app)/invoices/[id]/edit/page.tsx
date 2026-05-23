"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { Invoice } from "@/types";
import { InvoiceForm } from "@/components/InvoiceForm";

export default function EditInvoicePage() {
  const params = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Partial<Invoice> | null>(null);

  useEffect(() => {
    api<Record<string, unknown>>(`/invoices/${params.id}`).then((data) => {
      setInvoice({
        invoiceNumber: String(data.invoice_number ?? ""),
        status: data.status as Invoice["status"],
        issueDate: String(data.issue_date ?? "").slice(0, 10),
        dueDate: String(data.due_date ?? "").slice(0, 10),
        currency: String(data.currency ?? "USD"),
        businessName: String(data.business_name ?? ""),
        businessEmail: String(data.business_email ?? ""),
        businessTaxId: String(data.business_tax_id ?? ""),
        businessAddress: String(data.business_address ?? ""),
        customerName: String(data.customer_name ?? ""),
        customerEmail: String(data.customer_email ?? ""),
        customerTaxId: String(data.customer_tax_id ?? ""),
        customerAddress: String(data.customer_address ?? ""),
        notes: String(data.notes ?? ""),
        terms: String(data.terms ?? ""),
        pdfStyle: String(data.pdf_style ?? "classic"),
        items: (data.items as Array<Record<string, unknown>>).map((item) => ({
          name: String(item.name ?? ""),
          description: String(item.description ?? ""),
          quantity: Number(item.quantity ?? 1),
          unitPrice: Number(item.unit_price ?? 0),
          taxRate: Number(item.tax_rate ?? 0),
          discountRate: Number(item.discount_rate ?? 0),
        })),
      });
    });
  }, [params.id]);

  if (!invoice) return <p className="text-sm text-slate-500">Loading invoice...</p>;

  return (
    <div className="grid gap-6 bg">
      <div>
        <h1 className="text-3xl font-semibold">Edit invoice</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update invoice details and line items.</p>
      </div>
      <InvoiceForm initial={invoice} invoiceId={params.id} />
    </div>
  );
}
