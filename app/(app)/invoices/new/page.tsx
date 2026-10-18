import { InvoiceForm } from "@/components/InvoiceForm";
import { PageHeader } from "@/components/ui";

export default function NewInvoicePage() {
  return (
    <div className="grid gap-5">
      <PageHeader title="Create invoice" description="Build a professional invoice with tax, discounts, notes, and payment status." />
      <InvoiceForm />
    </div>
  );
}
