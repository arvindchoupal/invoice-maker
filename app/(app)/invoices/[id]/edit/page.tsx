"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { Invoice } from "@/types";
import { InvoiceForm } from "@/components/InvoiceForm";
import { EmptyState, PageHeader } from "@/components/ui";

export default function EditInvoicePage() {
  const params = useParams<{ id: string }>();
  const [loadedId, setLoadedId] = useState("");
  const [loadError, setLoadError] = useState<{id: string; message: string} | null>(null);
  const [invoice, setInvoice] = useState<Partial<Invoice> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    api<Record<string, unknown>>(`/invoices/${params.id}`, { signal: controller.signal }).then((data) => {
      if (controller.signal.aborted) return;
      setLoadedId(params.id);
      setInvoice({
        logoData: data.logo_data === null ? undefined : String(data.logo_data ?? ""),
        amountPaid: Number(data.amount_paid || 0), shippingAddress: String(data.shipping_address || ""),
        taxMode: (data.tax_mode || "tax") as Invoice["taxMode"], supplierState: String(data.supplier_state || ""), customerState: String(data.customer_state || ""), placeOfSupply: String(data.place_of_supply || ""),
        documentTitle: String(data.document_title || "INVOICE"), sourceTemplate: String(data.source_template || ""),
        clientId: data.client_id ? Number(data.client_id) : null,
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
          hsnCode: String(item.hsn_code || ""),
          name: String(item.name ?? ""),
          description: String(item.description ?? ""),
          quantity: Number(item.quantity ?? 1),
          unitPrice: Number(item.unit_price ?? 0),
          taxRate: Number(item.tax_rate ?? 0),
          discountRate: Number(item.discount_rate ?? 0),
        })),
      });
    }).catch(error => { if (!controller.signal.aborted) setLoadError({id: params.id, message: error instanceof Error ? error.message : "Could not load invoice"}); });
    return () => controller.abort();
  }, [params.id]);

  if (loadError?.id === params.id) return <EmptyState title="Could not load invoice" body={loadError.message} />;
  if (!invoice || loadedId !== params.id) return <p className="text-sm text-slate-500">Loading invoice...</p>;

  return (
    <div className="grid gap-5">
      <PageHeader title="Edit invoice" description="Update invoice details and line items." />
      <InvoiceForm key={params.id} initial={invoice} invoiceId={params.id} />
    </div>
  );
}
