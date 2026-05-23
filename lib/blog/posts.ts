export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  relatedToolHref?: string;
  relatedToolLabel?: string;
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-create-gst-invoice-india",
    title: "How to Create a GST Invoice in India (Step-by-Step Guide)",
    description:
      "Learn the mandatory GST invoice fields, tax split rules and a simple workflow to create compliant tax invoices for Indian businesses.",
    publishedAt: "2026-05-20",
    author: "InvoiceWala Team",
    tags: ["GST", "Invoicing", "India"],
    readingMinutes: 8,
    relatedToolHref: "/tools/gst-calculator",
    relatedToolLabel: "GST calculator",
    content: `
## What is a GST invoice?

A GST invoice is a tax document issued when you supply taxable goods or services. It must show tax value, GSTIN details and amounts that help the buyer claim input tax credit (ITC) where applicable.

## Mandatory fields on a GST tax invoice

Most B2B GST invoices should include:

- Supplier name, address and GSTIN
- Invoice number and date
- Customer name, address and GSTIN (for B2B)
- HSN/SAC codes for line items
- Taxable value, CGST, SGST or IGST and total
- Place of supply (for inter-state vs intra-state)

## CGST + SGST vs IGST

- **Intra-state supply:** CGST and SGST (each half of the GST rate)
- **Inter-state supply:** IGST (full rate)

Use our [GST calculator](/tools/gst-calculator) to check inclusive vs exclusive amounts before billing.

## Simple workflow with InvoiceWala

1. Add your business GSTIN and logo in settings
2. Create a client with billing address
3. Add line items with tax rates
4. Pick a GST-friendly PDF template
5. Download PDF or share on WhatsApp

## Common mistakes to avoid

- Wrong GSTIN on the invoice
- Missing HSN/SAC on product or service lines
- Using CGST/SGST for an inter-state customer
- Invoice number gaps without audit trail

Ready to bill? [Create your first invoice](/signup) on InvoiceWala in minutes.
`,
  },
  {
    slug: "cgst-sgst-igst-explained",
    title: "CGST, SGST and IGST Explained for Small Businesses",
    description:
      "A plain-language guide to when you charge CGST+SGST vs IGST, with examples for freelancers, shops and service providers in India.",
    publishedAt: "2026-05-18",
    author: "InvoiceWala Team",
    tags: ["GST", "CGST", "IGST"],
    readingMinutes: 6,
    relatedToolHref: "/tools/gst-calculator",
    relatedToolLabel: "Calculate GST split",
    content: `
## Why India uses three components

GST is collected by Centre and States. **CGST** goes to the Centre, **SGST** to the State, and **IGST** is used for inter-state supplies so tax still reaches the right governments.

## Intra-state example

You sell from Delhi to a Delhi customer at 18% GST on ₹10,000 taxable value:

- CGST 9% = ₹900
- SGST 9% = ₹900
- Total GST = ₹1,800

## Inter-state example

Same ₹10,000 sale from Delhi to a Mumbai customer:

- IGST 18% = ₹1,800
- No separate CGST/SGST on the invoice

## How place of supply matters

Place of supply rules decide whether a transaction is inter-state or intra-state. Services often follow special rules — when unsure, confirm with your CA.

## Tool tip

Before sending a quote, run amounts in the [GST calculator](/tools/gst-calculator), then [create the invoice](/invoices/new) with the same tax split.
`,
  },
  {
    slug: "gst-invoice-format-checklist",
    title: "GST Invoice Format Checklist (Free PDF Templates)",
    description:
      "Download-ready GST invoice checklist: numbering, HSN, tax columns, terms and branding tips for compliant billing in India.",
    publishedAt: "2026-05-15",
    author: "InvoiceWala Team",
    tags: ["GST", "Templates", "Compliance"],
    readingMinutes: 7,
    relatedToolHref: "/invoices/new",
    relatedToolLabel: "Create GST invoice",
    content: `
## Header block

- Your logo and legal business name
- Address and GSTIN
- Invoice title (Tax Invoice / Bill of Supply as applicable)
- Invoice number and issue date

## Customer block

- Bill-to name and address
- Customer GSTIN for B2B
- Ship-to address if different

## Line items table

| Column | Why it matters |
|--------|----------------|
| Description | Clear goods or service name |
| HSN/SAC | Required for GST reporting |
| Qty & rate | Audit-friendly pricing |
| Taxable value | Base before tax |
| CGST/SGST or IGST | Correct split |

## Totals and terms

- Subtotal, discount, tax totals, grand total
- Amount in words (optional but professional)
- Payment terms and bank/UPI details
- Authorized signatory for larger deals

## InvoiceWala templates

Choose **GST**, **Corporate** or **Retail** PDF styles when editing an invoice. Styles are saved per invoice so repeat clients get consistent documents.

[Start with a free account](/signup) and generate your first numbered invoice today.
`,
  },
  {
    slug: "send-invoice-on-whatsapp-india",
    title: "How to Send Invoices on WhatsApp in India (Without API Cost)",
    description:
      "Share invoice PDFs on WhatsApp using payment links and clear message templates. Works for freelancers, shops and local service businesses.",
    publishedAt: "2026-05-12",
    author: "InvoiceWala Team",
    tags: ["WhatsApp", "Invoicing", "Payments"],
    readingMinutes: 5,
    relatedToolHref: "/invoices",
    relatedToolLabel: "Open invoices",
    content: `
## Why WhatsApp works for Indian SMBs

Most buyers already use WhatsApp daily. A short message plus PDF link gets faster responses than email alone.

## Message template

> Hi [Name], here is invoice [INV-00042] for ₹12,500. PDF: [link]. Payment due by [date]. Reply if you need a revised copy.

## Steps in InvoiceWala

1. Save the invoice and download PDF (or use saved template)
2. Click **WhatsApp** from the invoice editor or list
3. Confirm amount and due date before sending
4. Mark as **Sent** after delivery

## Follow-up without being pushy

- Day 0: Send invoice
- Day 3: Friendly reminder if unpaid
- Day 7: Final reminder with payment link

Track status inside InvoiceWala so you know what is Draft, Sent, Paid or Overdue.

[Create invoice](/invoices/new) · [Try GST calculator](/tools/gst-calculator)
`,
  },
  {
    slug: "invoice-vs-bill-vs-receipt",
    title: "Invoice vs Bill vs Receipt: What to Issue and When",
    description:
      "Understand the difference between invoices, bills and receipts so you pick the right document for sales, services and advance payments.",
    publishedAt: "2026-05-10",
    author: "InvoiceWala Team",
    tags: ["Invoicing", "Bookkeeping"],
    readingMinutes: 6,
    relatedToolHref: "/tools/invoice-number-generator",
    relatedToolLabel: "Invoice number generator",
    content: `
## Invoice

An **invoice** is a request for payment. It usually includes due date, tax breakup and payment terms. Issue before or at the time of supply for most B2B work.

## Bill / tax invoice

In India, **tax invoice** is the GST term for a taxable supply document. Colloquially people say "bill" — for GST compliance, use the correct invoice type your CA recommends.

## Receipt

A **receipt** confirms payment received. Issue after money hits your account. Useful for retail counters and advance settlements.

## Quotation vs invoice

- **Quotation / estimate:** price proposal, not a demand for payment
- **Invoice:** official payable document after work is agreed

Convert quotes to invoices in one flow instead of retyping line items.

## Numbering tip

Use a consistent prefix (INV, FY25, etc.). Try the [invoice number generator](/tools/invoice-number-generator), then [save the invoice](/signup) in InvoiceWala for history.
`,
  },
];

export function getAllPosts() {
  return [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
