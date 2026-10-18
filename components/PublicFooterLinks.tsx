"use client";

import Link from "next/link";

const comparisonLinks = [
  { href: "/invoicewala-vs-excel", label: "InvoiceWala vs Excel" },
  { href: "/invoicewala-vs-zoho", label: "InvoiceWala vs Zoho" },
  { href: "/invoicewala-vs-vyapar", label: "InvoiceWala vs Vyapar" },
];

const footerGroups = [
  {
    title: "Invoice tools",
    links: [
      { href: "/invoice-templates", label: "Invoice templates" },
      { href: "/bill-format", label: "Free bill formats" },
      { href: "/free-invoice-generator", label: "Free invoice generator" },
      { href: "/gst-invoice-generator", label: "GST invoice generator" },
      { href: "/freelancer-invoice-generator", label: "Freelancer invoice generator" },
      { href: "/contractor-invoice-generator", label: "Contractor invoice generator" },
    ],
  },
  {
    title: "Business documents",
    links: [
      { href: "/tools/business-loan-project-report-generator", label: "Business loan project report" },
      { href: "/quotation-maker", label: "Quotation maker" },
      { href: "/purchase-order-generator", label: "Purchase order generator" },
      { href: "/receipt-generator", label: "Receipt generator" },
      { href: "/invoice-template-india", label: "Invoice templates India" },
    ],
  },
  {
    title: "Calculators",
    links: [
      { href: "/tools/business-expense-calculator", label: "Business expense calculator" },
      { href: "/tools/gst-calculator", label: "GST calculator" },
      { href: "/tools/hsn-code-finder", label: "HSN and SAC finder" },
      { href: "/tools/profit-calculator", label: "Profit calculator" },
      { href: "/tools/invoice-number-generator", label: "Invoice number generator" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/blog/project-report-for-bank-loan-format", label: "Bank loan project report format" },
      { href: "/blog/gst-bill-format", label: "GST bill format" },
      { href: "/tax-invoice-format", label: "Tax invoice format" },
      { href: "/blog/cgst-sgst-igst-explained", label: "CGST, SGST and IGST" },
      { href: "/blog/what-is-invoice-generator", label: "What is an invoice generator?" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/press-kit", label: "Press kit" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund policy" },
    ],
  },
];

export function PublicFooterLinks() {
  return (
    <div className="grid w-full gap-10 text-sm">
      <div className="flex flex-wrap gap-x-5 gap-y-3 text-slate-300">
        <Link className="transition hover:text-white" href="/tools">Tools</Link>
        <Link className="transition hover:text-white" href="/blog">Blog</Link>
        <Link className="transition hover:text-white" href="/pricing">Founding offer</Link>
        <Link className="transition hover:text-white" href="/login">Log in</Link>
        <Link className="transition hover:text-white" href="/signup?source=founding-1000">Claim free account</Link>
      </div>
      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-base font-semibold text-slate-100">{group.title}</p>
            <div className="mt-4 grid gap-3 leading-6 text-slate-400">
              {group.links.map((link) => (
                <Link className="transition hover:text-slate-200" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="text-base font-semibold text-slate-100">Comparisons</p>
          <div className="mt-4 grid gap-3 leading-6 text-slate-400">
            {comparisonLinks.map((link) => (
              <Link className="transition hover:text-slate-200" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
