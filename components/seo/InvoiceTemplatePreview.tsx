import type { InvoiceTemplatePage } from "@/lib/invoice-template-pages";

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function InvoiceTemplatePreview({ page }: { page: InvoiceTemplatePage }) {
  const subtotal = page.sampleItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <figure>
      <div className="overflow-hidden rounded-[1.75rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/30 sm:p-7">
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 pb-5">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">IW</div>
            <p className="mt-3 text-lg font-bold">{page.sampleBusiness}</p>
            <p className="text-xs text-slate-500">Sample GST invoice</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black tracking-tight text-blue-600">INVOICE</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">INV-SAMPLE-001</p>
            <p className="text-xs text-slate-500">05 Jul 2026</p>
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Bill to</p>
            <p className="mt-1 text-sm font-bold">{page.sampleCustomer}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Billing model</p>
            <p className="mt-1 text-sm font-semibold">{page.billingModel}</p>
          </div>
        </div>

        <div className="py-5">
          <div className="grid grid-cols-[1fr_88px] rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white">
            <span>Description</span>
            <span className="text-right">Amount</span>
          </div>
          {page.sampleItems.map((item) => (
            <div className="grid grid-cols-[1fr_88px] border-b border-slate-100 px-3 py-3 text-xs" key={item.name}>
              <div>
                <p className="font-bold text-slate-800">{item.name}</p>
                <p className="mt-0.5 text-slate-500">{item.detail}</p>
              </div>
              <p className="text-right font-semibold">{formatter.format(item.amount)}</p>
            </div>
          ))}
        </div>

        <div className="ml-auto grid max-w-[230px] gap-2 text-xs">
          <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatter.format(subtotal)}</span></div>
          <div className="flex justify-between text-slate-500"><span>Sample GST (18%)</span><span>{formatter.format(tax)}</span></div>
          <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-black"><span>Total</span><span>{formatter.format(total)}</span></div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-5 text-slate-500">
        Sample {page.profession.toLowerCase()} invoice preview. Names and amounts are illustrative; confirm the applicable tax rate.
      </figcaption>
    </figure>
  );
}
