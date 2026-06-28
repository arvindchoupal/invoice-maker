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
      { href: "/free-invoice-generator", label: "Free invoice generator" },
      { href: "/gst-invoice-generator", label: "GST invoice generator" },
      { href: "/freelancer-invoice-generator", label: "Freelancer invoice generator" },
      { href: "/contractor-invoice-generator", label: "Contractor invoice generator" },
    ],
  },
  {
    title: "Business documents",
    links: [
      { href: "/quotation-maker", label: "Quotation maker" },
      { href: "/purchase-order-generator", label: "Purchase order generator" },
      { href: "/receipt-generator", label: "Receipt generator" },
      { href: "/invoice-template-india", label: "Invoice templates India" },
    ],
  },
  {
    title: "Calculators",
    links: [
      { href: "/tools/gst-calculator", label: "GST calculator" },
      { href: "/tools/hsn-code-finder", label: "HSN and SAC finder" },
      { href: "/tools/profit-calculator", label: "Profit calculator" },
      { href: "/tools/invoice-number-generator", label: "Invoice number generator" },
    ],
  },
  {
    title: "Guides",
    links: [
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
    <div className="grid w-full gap-8 text-sm">
      <div className="flex flex-wrap gap-x-5 gap-y-3 text-slate-300">
        <Link className="transition hover:text-white" href="/tools">Tools</Link>
        <Link className="transition hover:text-white" href="/blog">Blog</Link>
        <Link className="transition hover:text-white" href="/pricing">Pricing</Link>
        <Link className="transition hover:text-white" href="/login">Log in</Link>
        <Link className="transition hover:text-white" href="/signup">Start free</Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="font-semibold text-slate-200">{group.title}</p>
            <div className="mt-3 grid gap-2 text-slate-500">
              {group.links.map((link) => (
                <Link className="transition hover:text-slate-200" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="font-semibold text-slate-200">Comparisons</p>
          <div className="mt-3 grid gap-2 text-slate-500">
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
