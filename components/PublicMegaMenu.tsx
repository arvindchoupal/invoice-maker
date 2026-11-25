"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type MenuGroup = { title: string; links: Array<[href: string, label: string, description?: string]> };
type MenuEntry = { label: string; href: string; groups: MenuGroup[] };

const menuEntries: MenuEntry[] = [
  {
    label: "Tools",
    href: "/tools",
    groups: [
      { title: "Create documents", links: [["/free-invoice", "Invoice maker", "Create and download an invoice"], ["/quotation-maker", "Quotation maker"], ["/purchase-order-generator", "Purchase order generator"], ["/receipt-generator", "Receipt generator"]] },
      { title: "Delivery and completion", links: [["/delivery-challan-generator", "Delivery challan generator"], ["/work-completion-certificate-generator", "Work completion certificate"], ["/tools/payment-reminder-generator", "Payment reminder generator"], ["/tools/outstanding-ageing-calculator", "Outstanding ageing report"]] },
      { title: "Check and convert", links: [["/tools/gst-invoice-validator", "GST invoice validator"], ["/tools/invoice-number-generator", "Invoice number generator"], ["/tools/pdf-to-invoice-extractor", "PDF to invoice extractor"], ["/tools/invoice-to-excel-converter", "Invoice to Excel converter"]] },
    ],
  },
  {
    label: "Calculators",
    href: "/tools",
    groups: [
      { title: "GST and tax", links: [["/tools/gst-calculator", "GST calculator"], ["/tools/tax-calculator", "Tax calculator"], ["/tools/hsn-code-finder", "HSN and SAC finder"], ["/tools/gst-invoice-validator", "GST invoice validator"]] },
      { title: "Pricing and profit", links: [["/tools/profit-calculator", "Profit calculator"], ["/tools/margin-calculator", "Margin calculator"], ["/tools/discount-calculator", "Discount calculator"], ["/tools/business-expense-calculator", "Business expense calculator"]] },
      { title: "Payments and finance", links: [["/tools/invoice-due-date-calculator", "Invoice due date calculator"], ["/tools/outstanding-ageing-calculator", "Outstanding ageing calculator"], ["/tools/emi-calculator", "EMI calculator"], ["/tools/business-loan-project-report-generator", "Loan project report"]] },
    ],
  },
  {
    label: "Formats",
    href: "/bill-format",
    groups: [
      { title: "Invoice formats", links: [["/bill-format", "Bill format"], ["/gst-invoice-format", "GST invoice format"], ["/tax-invoice-format", "Tax invoice format"], ["/gst-invoice-format-in-excel", "GST invoice format in Excel"]] },
      { title: "Business documents", links: [["/quotation-maker", "Quotation format"], ["/delivery-challan-generator", "Delivery challan format"], ["/work-completion-certificate-generator", "Completion certificate format"], ["/receipt-generator", "Payment receipt format"]] },
      { title: "Downloads and examples", links: [["/bill-book-format", "Bill book format"], ["/proforma-invoice-template", "Proforma invoice template"], ["/billing-format-in-excel", "Billing format in Excel"], ["/invoice-template-india", "Invoice template India"]] },
    ],
  },
  {
    label: "Templates",
    href: "/invoice-templates",
    groups: [
      { title: "Professionals", links: [["/freelancer-invoice-generator", "Freelancer invoice"], ["/invoice-templates/consultant-invoice-template", "Consultant invoice"], ["/invoice-templates/advocate-invoice-template", "Advocate bill"], ["/invoice-templates/digital-marketing-agency-invoice-template", "Agency invoice"]] },
      { title: "Trades and contractors", links: [["/contractor-invoice-generator", "Contractor invoice"], ["/invoice-templates/electrician-invoice-template", "Electrician invoice"], ["/invoice-templates/plumber-invoice-template", "Plumber invoice"], ["/invoice-templates/transport-invoice-template", "Transport invoice"]] },
      { title: "Shops and services", links: [["/invoice-templates/hotel-invoice-template", "Hotel invoice"], ["/invoice-templates/restaurant-invoice-template", "Restaurant invoice"], ["/bill-book-format", "Shop bill and bill book"], ["/invoice-templates", "View all templates"]] },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    groups: [
      { title: "Guides", links: [["/blog", "Knowledge centre"], ["/blog/gst-bill-format", "GST bill format guide"], ["/blog/what-is-invoice-generator", "What is an invoice generator?"], ["/blog/estimate-vs-invoice", "Estimate vs invoice"]] },
      { title: "Compare", links: [["/invoicewala-vs-excel", "InvoiceWala vs Excel"], ["/invoicewala-vs-zoho", "InvoiceWala vs Zoho"], ["/invoicewala-vs-vyapar", "InvoiceWala vs Vyapar"], ["/pricing", "Pricing and founding offer"]] },
      { title: "Company", links: [["/about", "About InvoiceWala"], ["/contact", "Contact"], ["/press-kit", "Press kit"], ["/tools", "All free tools"]] },
    ],
  },
];

export function PublicMegaMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="relative hidden h-full items-stretch lg:flex" onMouseLeave={() => setOpen(null)}>
        {menuEntries.map((entry) => (
          <div className="flex items-stretch" key={entry.label} onFocus={() => setOpen(entry.label)} onMouseEnter={() => setOpen(entry.label)}>
            <Link aria-expanded={open === entry.label} aria-haspopup="true" className="flex items-center gap-1.5 px-3 text-[15px] font-normal text-slate-700 transition hover:text-blue-700 dark:text-slate-200 dark:hover:text-white" href={entry.href}>
              {entry.label}<ChevronDown className={`h-3.5 w-3.5 transition ${open === entry.label ? "rotate-180" : ""}`} />
            </Link>
            {open === entry.label ? (
              <div className="absolute left-1/2 top-full z-50 w-[min(900px,calc(100vw-32px))] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
                  <div className="grid gap-0 divide-x divide-slate-100 dark:divide-white/10 md:grid-cols-3">
                    {entry.groups.map((group) => (
                      <div className="p-5" key={group.title}>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">{group.title}</p>
                        <div className="mt-3 grid gap-1">
                          {group.links.map(([href, label, description]) => (
                            <Link className="rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white" href={href} key={`${group.title}-${href}`} onClick={() => setOpen(null)}>
                              <span className="block font-medium">{label}</span>
                              {description ? <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</span> : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-300 dark:hover:bg-white/[0.08]" href={entry.href} onClick={() => setOpen(null)}>
                    View all {entry.label.toLowerCase()} <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <button aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10 lg:hidden" onClick={() => setMobileOpen((current) => !current)} type="button">
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {mobileOpen ? (
        <div className="fixed inset-x-0 top-[76px] z-50 max-h-[calc(100vh-76px)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 shadow-2xl dark:border-white/10 dark:bg-slate-950 lg:hidden">
          <div className="mx-auto grid max-w-3xl gap-3">
            {menuEntries.map((entry) => (
              <details className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]" key={entry.label}>
                <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-slate-900 dark:text-white">{entry.label}</summary>
                <div className="grid gap-4 border-t border-slate-200 p-4 dark:border-white/10 sm:grid-cols-2">
                  {entry.groups.map((group) => <div key={group.title}><p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">{group.title}</p><div className="mt-2 grid">{group.links.map(([href, label]) => <Link className="rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-white/10" href={href} key={`${group.title}-${href}`} onClick={() => setMobileOpen(false)}>{label}</Link>)}</div></div>)}
                </div>
              </details>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
