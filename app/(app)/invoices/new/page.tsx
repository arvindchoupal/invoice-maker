import { InvoiceForm } from "@/components/InvoiceForm";

export default function NewInvoicePage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Create invoice</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Build a professional invoice with tax, discounts, notes, and payment status.</p>
      </div>
      <InvoiceForm />
    </div>
  );
}
