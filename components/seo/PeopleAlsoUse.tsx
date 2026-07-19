import Link from "next/link";
import { ArrowRight, Calculator, FileText, Hash, MessageSquareText, ReceiptIndianRupee } from "lucide-react";

const defaultItems = [
  {
    href: "/tools/gst-calculator",
    label: "GST calculator",
    body: "Calculate GST, CGST, SGST or IGST before billing.",
    icon: Calculator,
  },
  {
    href: "/tools/invoice-number-generator",
    label: "Invoice number generator",
    body: "Create clean invoice numbers for GST and business records.",
    icon: Hash,
  },
  {
    href: "/tools/payment-reminder-generator",
    label: "Payment reminder generator",
    body: "Write polite WhatsApp, email or SMS payment follow-ups.",
    icon: MessageSquareText,
  },
  {
    href: "/receipt-generator",
    label: "Receipt generator",
    body: "Create receipts after customer payment is received.",
    icon: ReceiptIndianRupee,
  },
];

export function PeopleAlsoUse({
  eventLabel,
  items = defaultItems,
  title = "People also use these tools",
}: {
  eventLabel: string;
  items?: typeof defaultItems;
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Next useful step</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Continue with the next practical step: calculate tax, create invoice numbers, send reminders or issue receipts.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            data-event="people_also_use_create_invoice_click"
            data-event-category="cta"
            data-event-label={eventLabel}
            href="/free-invoice"
          >
            Create invoice <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon ?? FileText;
            return (
              <Link
                className="group rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30"
                data-event="people_also_use_click"
                data-event-category="engagement"
                data-event-label={`${eventLabel} to ${item.href}`}
                href={item.href}
                key={item.href}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold group-hover:text-cyan-200">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
