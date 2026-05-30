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
  faqs?: Array<[string, string]>;
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-create-gst-invoice-india",
    title: "How to Create a GST Invoice in India (Step-by-Step Guide)",
    description:
      "Learn how to create GST invoice in India with GST invoice format, examples, CGST/SGST/IGST, PDF templates, mistakes and FAQs.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-30",
    author: "InvoiceWala Team",
    tags: ["GST", "Invoicing", "India"],
    readingMinutes: 18,
    relatedToolHref: "/gst-invoice-generator",
    relatedToolLabel: "Create GST invoice",
    faqs: [
      ["What is a GST invoice?", "A GST invoice is a tax invoice issued for taxable goods or services under GST. It shows supplier details, buyer details, GSTIN, invoice number, taxable value, GST rate, tax amount and total invoice value."],
      ["How to create GST invoice online?", "Add your business details, customer details, GSTIN, invoice number, line items, HSN/SAC, tax rate, taxable value and total amount, then download the GST invoice PDF using an online invoice generator."],
      ["Who needs a GST invoice?", "GST registered freelancers, consultants, contractors, agencies, product sellers, service providers and small businesses need GST invoices when they supply taxable goods or services."],
      ["What is GST invoice format?", "GST invoice format is the structure of a GST tax invoice, including supplier details, buyer details, invoice number, date, GSTIN, HSN/SAC, taxable value, CGST/SGST or IGST and total amount."],
      ["Can freelancers create GST invoices?", "Yes. GST registered freelancers can create GST invoices for taxable services such as design, development, consulting, writing, marketing and retainers."],
      ["Can contractors create GST invoices?", "Yes. Contractors can create GST invoices for labor, material, milestones, repair work and service jobs when GST applies."],
      ["What is GSTIN in a GST invoice?", "GSTIN is the Goods and Services Tax Identification Number. A GST invoice should show supplier GSTIN and, for B2B invoices, customer GSTIN when available."],
      ["Is customer GSTIN mandatory?", "Customer GSTIN is important for B2B GST invoices where the buyer wants input tax credit. For B2C transactions, customer GSTIN may not always apply."],
      ["What is HSN code?", "HSN code is a classification code used for goods under GST. It helps identify the product category and relevant tax treatment."],
      ["What is SAC code?", "SAC code is a service classification code used for services under GST."],
      ["What is place of supply?", "Place of supply helps decide whether a transaction is intra-state or inter-state, which affects whether CGST/SGST or IGST applies."],
      ["What is taxable value?", "Taxable value is the amount on which GST is calculated, generally after eligible discounts and before GST is added."],
      ["What is CGST?", "CGST is Central GST. It is generally charged along with SGST for intra-state supplies."],
      ["What is SGST?", "SGST is State GST. It is generally charged along with CGST for supplies within the same state."],
      ["What is IGST?", "IGST is Integrated GST. It is generally charged for inter-state supplies where seller and buyer are in different states."],
      ["How do I calculate GST amount?", "GST Amount = Taxable Value x GST Rate / 100. For example, Rs. 10,000 at 18% GST gives Rs. 1,800 GST."],
      ["Can I download GST invoice PDF?", "Yes. With InvoiceWala, you can create a GST invoice online and download a professional PDF after signup or login."],
      ["Can I use GST invoice template in Excel?", "Yes, but Excel requires manual formulas and formatting. Online GST invoice generators reduce calculation and PDF layout mistakes."],
      ["What is a GST invoice generator?", "A GST invoice generator is an online tool that creates GST invoices with tax fields, item rows, totals, PDF templates and invoice numbers."],
      ["What are common GST rates?", "Common GST rates include 0%, 5%, 12%, 18% and 28%. The correct rate depends on the goods or services supplied."],
      ["Should GST invoice include invoice number?", "Yes. A unique invoice number is important for GST invoice records and payment tracking."],
      ["Can invoice numbers repeat?", "Invoice numbers should not repeat within the same series or financial year."],
      ["What is GST bill format?", "GST bill format is another common phrase for GST invoice format or tax invoice format used by Indian businesses."],
      ["Can I create GST invoice from quotation?", "Yes. A quotation can be converted into a GST invoice when the customer approves the work or sale."],
      ["Is InvoiceWala useful for GST invoices?", "Yes. InvoiceWala helps create GST-ready invoices, calculate totals, generate invoice numbers and download professional PDF invoices."],
    ],
    content: `
## What is a GST Invoice?

A GST invoice is a tax invoice issued by a GST registered business when it supplies taxable goods or services. It records what was sold, who sold it, who bought it, the taxable value, the GST rate, the GST amount and the final invoice value. In simple words, a GST invoice is both a payment request and a tax record.

For Indian businesses, a GST invoice is important because it creates a clear trail for sales, tax calculation, customer records and payment follow-up. It also helps B2B buyers claim Input Tax Credit, commonly called ITC, when they are eligible. If the invoice is missing GSTIN, tax breakup, invoice number or correct customer details, the buyer may face problems while matching records.

A good GST invoice should be easy to read. Your customer should quickly understand your business details, their billing details, what items or services were charged, how GST was calculated and how much they need to pay. This is why GST invoice format matters. The format keeps your invoice structured and reduces mistakes.

GST compliance does not mean the invoice has to look complicated. A freelancer invoice, contractor invoice, service business invoice and product invoice can all follow the same basic structure: supplier details, buyer details, invoice details, item table, tax breakup, total amount, notes and payment terms. The exact fields may change depending on your business type, place of supply and customer type.

If you are creating your first GST invoice, the easiest approach is to use a [GST invoice generator](/gst-invoice-generator). You can enter business details, add customer information, add item rows, apply tax, preview the GST invoice PDF and download a professional invoice without manually fixing formulas in Excel.

## Who Needs a GST Invoice?

GST invoices are used by GST registered businesses and professionals that supply taxable goods or services. If your business is registered under GST and your sale requires a tax invoice, you should issue a GST invoice in the correct format.

Common users include:

- Freelancers who provide design, development, writing, marketing or consulting services
- Consultants who bill retainers, advisory fees or project work
- Contractors who bill labor, materials, repairs or milestones
- Agencies that invoice clients for campaigns, SEO, design, development or monthly retainers
- Service providers such as accountants, technicians, trainers, repair businesses and local service teams
- Product sellers, retail shops, wholesalers, distributors and ecommerce sellers
- Small businesses that need professional invoices for B2B customers
- Indian startups billing clients for software, subscriptions, implementation or services

For example, a web developer registered under GST may need to create a GST invoice for website development services. A contractor may need to create a GST invoice for labor and material. A marketing agency may need to create a monthly GST tax invoice for campaign management. A shop may need to issue a GST bill for product sales.

Even if your customer does not ask for a detailed format, a proper GST invoice helps your own records. It makes revenue tracking, GST calculation, payment reminders and reports easier.

## Mandatory Fields in a GST Invoice

Most GST invoice formats in India include these fields. Requirements can vary by business and transaction type, so confirm exact compliance with your accountant when needed.

### Supplier Name

Supplier name is the legal or trade name of the business issuing the invoice. It should match your business records.

### Supplier Address

The invoice should show the supplier address. This helps identify the place from which the goods or services are supplied.

### GSTIN

GSTIN is the Goods and Services Tax Identification Number. The supplier GSTIN should appear clearly on the GST invoice. For B2B customers, buyer GSTIN should also be included when available.

### Invoice Number

Every GST invoice should have a unique invoice number. A clean format such as INV-2026-001, FY26-001 or CLIENT-001 helps with tracking. You can use the [Invoice Number Generator](/tools/invoice-number-generator) if you are starting a new series.

### Invoice Date

Invoice date shows when the invoice was issued. It is important for payment terms, reporting and customer records.

### Buyer Details

Buyer details include customer name, billing address, email and phone if available. For B2B invoices, the buyer GSTIN should be added.

### GSTIN of Customer

Customer GSTIN is important when the buyer is GST registered and wants to claim ITC. Incorrect GSTIN is one of the most common invoice mistakes.

### HSN Code

HSN code is used for goods. It helps classify products under GST.

### SAC Code

SAC code is used for services. Freelancers, consultants, agencies and service businesses may need SAC codes on GST invoices.

### Place of Supply

Place of supply helps decide whether the transaction is intra-state or inter-state. This affects whether CGST plus SGST or IGST applies.

### Taxable Value

Taxable value is the value on which GST is calculated. It is usually the amount after eligible discount and before GST.

### GST Rate

GST rate is the tax percentage applied to the item or service, such as 5%, 12%, 18% or 28%. The correct rate depends on the goods or services.

### Total Invoice Value

Total invoice value includes taxable value, GST amount and other final adjustments such as round-off if applicable.

## GST Invoice Format

Here is a realistic GST invoice sample table. You can use this as a reference when creating a GST invoice, GST bill format or GST invoice template.

| Field | Example |
|---|---|
| Invoice Number | INV-2026-001 |
| Invoice Date | 30 May 2026 |
| Supplier GSTIN | 29ABCDE1234F1Z5 |
| Customer Name | XYZ Traders |
| Customer GSTIN | 27ABCDE1234F1Z8 |
| Place of Supply | Maharashtra |
| Taxable Value | Rs. 25,000 |
| GST Rate | 18% |
| GST Amount | Rs. 4,500 |
| Final Total | Rs. 29,500 |

A complete GST invoice usually includes an item table like this:

| Item | HSN/SAC | Qty | Rate | Taxable Value | GST % | GST Amount | Total |
|---|---|---:|---:|---:|---:|---:|---:|
| Website design service | 998314 | 1 | Rs. 25,000 | Rs. 25,000 | 18% | Rs. 4,500 | Rs. 29,500 |
| Hosting setup | 998315 | 1 | Rs. 5,000 | Rs. 5,000 | 18% | Rs. 900 | Rs. 5,900 |

[GST Invoice Screenshot]

## GST Invoice Example

### Example 1: Freelancer Invoice

A freelance designer completes a branding project for Rs. 25,000. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Taxable value | Rs. 25,000 |
| GST at 18% | Rs. 4,500 |
| Final invoice value | Rs. 29,500 |

If the client is in the same state, the GST amount may be split into CGST Rs. 2,250 and SGST Rs. 2,250. If the client is in another state, IGST Rs. 4,500 may apply.

### Example 2: Contractor Invoice

A contractor bills Rs. 60,000 for repair work and Rs. 40,000 for materials. Total taxable value is Rs. 100,000. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Labor and service value | Rs. 60,000 |
| Material value | Rs. 40,000 |
| Taxable value | Rs. 100,000 |
| GST at 18% | Rs. 18,000 |
| Final invoice value | Rs. 118,000 |

The contractor should describe labor, material and milestone details clearly so the customer understands the bill.

### Example 3: Service Business Invoice

A marketing agency charges Rs. 75,000 for monthly campaign management. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Monthly retainer | Rs. 75,000 |
| GST at 18% | Rs. 13,500 |
| Final invoice value | Rs. 88,500 |

For repeat services, keep invoice numbers consistent and mention the service period, such as May 2026 campaign management.

## CGST vs SGST vs IGST

GST invoices should show the correct tax split. The split depends on whether the supply is intra-state or inter-state.

| GST Type | Used When | Example on Rs. 10,000 at 18% |
|---|---|---|
| CGST | Centre share for intra-state supply | CGST 9% = Rs. 900 |
| SGST | State share for intra-state supply | SGST 9% = Rs. 900 |
| IGST | Inter-state supply | IGST 18% = Rs. 1,800 |

### Intra-state supply

Intra-state supply generally means seller and buyer are in the same state. For example, a Delhi freelancer billing a Delhi client may show CGST and SGST. On Rs. 10,000 at 18%, CGST is Rs. 900 and SGST is Rs. 900.

### Inter-state supply

Inter-state supply generally means seller and buyer are in different states. For example, a Delhi freelancer billing a Maharashtra client may show IGST. On Rs. 10,000 at 18%, IGST is Rs. 1,800.

Use the [GST Calculator](/tools/gst-calculator) to check inclusive/exclusive GST and tax split before sending the invoice.

[GST Calculator Screenshot]

## Step-by-Step Guide: How to Create GST Invoice

### Step 1: Add supplier details

Start with your business name, address, GSTIN, email, phone number and logo if available. These details identify the seller or service provider.

### Step 2: Add customer details

Add customer name, billing address, email and GSTIN if the customer is GST registered. For B2B customers, GSTIN accuracy matters.

### Step 3: Create a unique invoice number

Use a clear invoice number series. Examples include INV-0001, FY26-001 or IW-2026-001. Avoid duplicate invoice numbers. If you need ideas, use the [Invoice Number Generator](/tools/invoice-number-generator).

### Step 4: Add invoice date and due date

Invoice date shows when the document is issued. Due date tells the customer when payment is expected. Clear payment terms reduce follow-up confusion.

### Step 5: Add line items

Add each product or service with description, HSN/SAC, quantity, rate, discount if any and taxable value. Keep descriptions simple and specific.

### Step 6: Select GST rate

Add the correct GST rate for each item or service. Common rates include 5%, 12%, 18% and 28%, but the correct rate depends on your product or service category.

### Step 7: Choose CGST/SGST or IGST

Use place of supply to decide tax split. Same-state supplies generally use CGST and SGST. Different-state supplies generally use IGST.

### Step 8: Check totals

Review taxable value, GST amount, total invoice value and amount payable. This is where most manual invoice mistakes happen.

### Step 9: Add notes and payment terms

Add bank details, UPI instructions, payment terms, late fee note or project reference if needed.

### Step 10: Preview and download GST invoice PDF

Preview the invoice before sending it. A PDF invoice keeps formatting stable across email, WhatsApp and mobile devices.

[Invoice PDF Screenshot]

You can complete this workflow with [InvoiceWala's GST Invoice Generator](/gst-invoice-generator) and then download a professional GST invoice PDF.

## Common GST Invoice Mistakes

Avoid these common mistakes before sending a GST tax invoice:

- Wrong GSTIN for supplier or customer
- Wrong tax rate for product or service
- Missing HSN or SAC code
- Duplicate invoice numbers
- Wrong place of supply
- Using CGST/SGST when IGST should apply
- Using IGST when CGST/SGST should apply
- Forgetting discount before taxable value
- Incorrect GST calculation
- Broken PDF layout after exporting from Excel

These mistakes can delay payment, confuse customers and create accounting cleanup work. Always preview the invoice before sending.

## GST Invoice PDF

GST invoice PDF is one of the most searched needs because businesses want invoices that are easy to share and difficult to accidentally change. A PDF invoice looks consistent on laptops, phones, email and WhatsApp.

Manual Word or Excel invoices can shift formatting during export. Columns can break, totals can move and logos can look misaligned. An online invoice generator reduces these problems by generating a clean PDF layout from structured invoice data.

With InvoiceWala, you can create a GST invoice online, select a template, preview it and download the GST invoice PDF after signup or login.

## GST Invoice Template

There are three common ways to use a GST invoice template.

### Word templates

Word templates are simple for one-time invoices but require manual editing. Calculations are not automatic unless you manage them separately.

### Excel templates

Excel templates can calculate totals, but formulas can break. Formatting can also become messy when exporting to PDF.

### Online GST invoice generators

Online GST invoice generators are easier for repeat billing. They handle structure, totals, invoice numbers, GST fields and PDF output in one workflow. InvoiceWala also connects invoices with clients, payment status and business records.

## Benefits of Using Online GST Invoice Software

| Method | Strength | Limitation |
|---|---|---|
| Manual Excel | Flexible and familiar | Formula mistakes and PDF layout issues |
| Word template | Easy for simple documents | No automatic tax calculations |
| Online invoice generator | Structured, faster and PDF-ready | Requires choosing a reliable tool |

InvoiceWala is designed for freelancers, agencies, consultants, contractors and small businesses that want to create invoices fast without becoming accounting software experts. You can start with invoice creation, then use tools such as [GST Calculator](/tools/gst-calculator), [Quotation Maker](/quotation-maker), [GST Bill Format](/blog/gst-bill-format), [Tax Invoice Format](/blog/tax-invoice-format), [Invoice Generator](/free-invoice-generator) and [Profit Margin Calculator](/tools/margin-calculator).

## Frequently Asked Questions

### What is a GST invoice?

A GST invoice is a tax invoice issued for taxable goods or services under GST. It shows supplier details, buyer details, GSTIN, invoice number, taxable value, GST rate, tax amount and total invoice value.

### How to create GST invoice online?

Use a GST invoice generator, add business and customer details, add items, select GST rate, check totals and download the GST invoice PDF.

### Who needs a GST invoice?

GST registered freelancers, consultants, contractors, agencies, service providers, product sellers and small businesses may need GST invoices.

### What is GST invoice format?

GST invoice format is the structure of the invoice, including supplier details, buyer details, invoice number, GSTIN, HSN/SAC, taxable value, GST breakup and total.

### Can freelancers create GST invoices?

Yes. GST registered freelancers can create GST invoices for taxable services when GST applies.

### Can contractors create GST invoices?

Yes. Contractors can create GST invoices for labor, materials, milestones and service work when applicable.

### What is GSTIN?

GSTIN is the Goods and Services Tax Identification Number of a registered business.

### Is customer GSTIN mandatory?

Customer GSTIN is important for B2B invoices when the buyer is GST registered and wants input tax credit.

### What is HSN code?

HSN code classifies goods under GST.

### What is SAC code?

SAC code classifies services under GST.

### What is place of supply?

Place of supply helps decide whether CGST/SGST or IGST applies.

### What is taxable value?

Taxable value is the amount on which GST is calculated before adding GST.

### What is CGST?

CGST is Central GST, generally used with SGST for intra-state supplies.

### What is SGST?

SGST is State GST, generally used with CGST for intra-state supplies.

### What is IGST?

IGST is Integrated GST, generally used for inter-state supplies.

### How do I calculate GST amount?

GST Amount = Taxable Value x GST Rate / 100.

### Can I download GST invoice PDF?

Yes. InvoiceWala lets you create GST invoices online and download professional PDF invoices after signup or login.

### Can I use Excel GST invoice templates?

Yes, but online generators reduce formula and formatting mistakes.

### What is a GST invoice generator?

A GST invoice generator is a tool that creates GST invoices with tax fields, item rows, totals and PDF output.

### What GST rates are common?

Common GST rates include 0%, 5%, 12%, 18% and 28%.

### Should invoice number be unique?

Yes. Invoice numbers should be unique within the invoice series.

### Can GST invoice numbers repeat?

No. Repeating invoice numbers can create record and audit confusion.

### What is GST bill format?

GST bill format is a common phrase for GST invoice format or GST tax invoice format.

### Can a quotation become a GST invoice?

Yes. Once the customer approves, quotation details can be used to create a GST invoice.

### Is InvoiceWala good for GST invoices?

Yes. InvoiceWala helps create GST-ready invoices, calculate totals, generate invoice numbers and download PDF invoices.

Ready to create your GST invoice? Use the [GST Invoice Generator](/gst-invoice-generator) and create a professional PDF invoice in minutes.
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

function seoGuide({
  slug,
  title,
  description,
  keyword,
  tags,
  relatedToolHref,
  relatedToolLabel,
  sections,
}: {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  tags: string[];
  relatedToolHref: string;
  relatedToolLabel: string;
  sections: Array<[string, string]>;
}): BlogPost {
  return {
    slug,
    title,
    description,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
    author: "InvoiceWala Team",
    tags,
    readingMinutes: 6,
    relatedToolHref,
    relatedToolLabel,
    content: `
## Search intent: ${keyword}

People searching for **${keyword}** usually want a practical answer quickly: what format to use, which fields matter, and how to create a clean PDF without fighting Word or Excel.

${sections.map(([heading, body]) => `## ${heading}\n\n${body}`).join("\n\n")}

## FAQs

**Can I create this online?** Yes. InvoiceWala lets you create, preview and save invoices or related business documents online.

**Can I download a PDF?** Yes. Create the document, save it to your workspace and choose a PDF template before downloading.

**Is this useful for GST businesses?** Yes. Use GST fields when applicable, and confirm compliance-specific edge cases with your CA.

## Next step

Use InvoiceWala to create a clean document, choose a PDF template and keep the record saved for future tracking.
`,
  };
}

const SEO_BLOG_POSTS: BlogPost[] = [
  seoGuide({
    slug: "free-invoice-templates-small-business",
    title: "10 Free Invoice Templates for Small Businesses (PDF & Word)",
    description: "Explore practical invoice template formats for freelancers, contractors, shops, agencies and GST businesses.",
    keyword: "invoice template free",
    tags: ["Templates", "Small Business", "PDF"],
    relatedToolHref: "/free-invoice",
    relatedToolLabel: "Create free invoice",
    sections: [
      ["Best templates to use", "Small businesses commonly need simple invoice, GST invoice, retail invoice, contractor invoice, agency invoice, consulting invoice, receipt, quotation, purchase order and minimal invoice templates."],
      ["PDF vs Word", "Word templates are easy to edit, but PDF invoices look more professional and are safer to send to customers on WhatsApp or email."],
      ["When to use each format", "Use GST templates for tax billing, contractor templates for labor and materials, and minimal templates for simple freelance work."],
    ],
  }),
  seoGuide({
    slug: "what-is-invoice-generator",
    title: "What Is an Invoice Generator & Why Businesses Use One",
    description: "A beginner-friendly guide to invoice generators, PDF exports, automatic totals, invoice numbers and online billing.",
    keyword: "invoice generator",
    tags: ["Invoice Generator", "Billing", "Automation"],
    relatedToolHref: "/free-invoice-generator",
    relatedToolLabel: "Free invoice generator",
    sections: [
      ["Meaning", "An invoice generator is an online tool that creates invoices from business details, customer details, line items, tax and payment terms."],
      ["Benefits", "It saves time, calculates totals automatically, creates PDF invoices, keeps numbering consistent and helps track payment status."],
      ["Example workflow", "Add client details, enter services or products, preview the PDF, save the invoice and send it to the customer."],
    ],
  }),
  seoGuide({
    slug: "quotation-vs-invoice",
    title: "Quotation vs Invoice: Difference Explained With Examples",
    description: "Understand when to send a quotation and when to send an invoice, with examples and business use cases.",
    keyword: "quotation maker",
    tags: ["Quotation", "Invoice", "Business Documents"],
    relatedToolHref: "/quotation-maker",
    relatedToolLabel: "Quotation maker",
    sections: [
      ["Quick difference", "A quotation is a price proposal before approval. An invoice is a payment request after work is agreed, delivered or billed by milestone."],
      ["Example", "A contractor sends a quotation for estimated labor and material. After work completion, the final payable document is an invoice."],
      ["Best practice", "Use the same line items from quotation to invoice so pricing stays clear and professional."],
    ],
  }),
  seoGuide({
    slug: "freelancer-invoice-guide",
    title: "How Freelancers Should Create Professional Invoices",
    description: "A freelancer invoicing guide covering invoice numbers, payment terms, taxes, late fees, examples and templates.",
    keyword: "freelancer invoice",
    tags: ["Freelancers", "Invoicing", "Payment Terms"],
    relatedToolHref: "/freelancer-invoice-generator",
    relatedToolLabel: "Freelancer invoice generator",
    sections: [
      ["Fields freelancers need", "Add your name, client name, invoice number, issue date, due date, service description, tax if applicable and payment terms."],
      ["Payment terms", "Use clear terms such as due on receipt, due in 7 days, or 50% advance and 50% on delivery."],
      ["Common mistake", "Do not send vague invoices like 'work done'. Mention project, deliverable, period or milestone."],
    ],
  }),
  seoGuide({
    slug: "contractor-invoice-format-guide",
    title: "Invoice Format for Contractors: Complete Guide + Example",
    description: "Learn how contractors should bill clients for labor, materials, milestones, taxes and payment terms.",
    keyword: "contractor invoice",
    tags: ["Contractors", "Invoice Format", "Construction"],
    relatedToolHref: "/contractor-invoice-generator",
    relatedToolLabel: "Contractor invoice generator",
    sections: [
      ["Contractor invoice structure", "Separate labor, materials, site visit charges, milestone payments and tax so customers can understand the bill."],
      ["Example line items", "Labor hours, wiring material, plumbing fittings, site inspection, delivery charge and completion milestone are common rows."],
      ["Template tip", "Use a construction or contractor layout when material and labor breakdown matters."],
    ],
  }),
  seoGuide({
    slug: "gst-bill-format-sample-invoice",
    title: "GST Bill Format Explained With Sample Invoice",
    description: "A detailed guide to GST bill structure, HSN/SAC codes, CGST, SGST, IGST and examples.",
    keyword: "GST bill format",
    tags: ["GST", "GST Bill", "HSN"],
    relatedToolHref: "/gst-invoice-generator",
    relatedToolLabel: "GST invoice generator",
    sections: [
      ["GST bill fields", "Include supplier GSTIN, customer details, invoice number, date, HSN/SAC, taxable value, GST breakup and grand total."],
      ["CGST, SGST and IGST", "Use CGST and SGST for intra-state supply. Use IGST for inter-state supply where applicable."],
      ["Common mistakes", "Missing GSTIN, wrong HSN/SAC, incorrect tax split and unclear item descriptions create avoidable confusion."],
    ],
  }),
  seoGuide({
    slug: "proforma-invoice-meaning-format-sample",
    title: "What Is a Proforma Invoice? Meaning, Format & Sample",
    description: "Learn what a proforma invoice means, how it differs from a normal invoice and when businesses use it.",
    keyword: "proforma invoice",
    tags: ["Proforma Invoice", "Business Documents"],
    relatedToolHref: "/invoice-template-india",
    relatedToolLabel: "Invoice template India",
    sections: [
      ["Meaning", "A proforma invoice is a preliminary document shared before the final sale. It shows expected price, items and terms."],
      ["When to use it", "Use it for exports, custom orders, advance approval or customer budgeting before the final invoice."],
      ["Difference from invoice", "A normal invoice requests payment. A proforma invoice usually informs the buyer before the final transaction."],
    ],
  }),
  seoGuide({
    slug: "estimate-vs-invoice",
    title: "Estimate vs Invoice: Which One Should Businesses Use?",
    description: "Compare estimates and invoices with practical scenarios for shops, consultants, contractors and freelancers.",
    keyword: "estimate generator",
    tags: ["Estimate", "Invoice", "Quotation"],
    relatedToolHref: "/quotation-maker",
    relatedToolLabel: "Make quotation",
    sections: [
      ["Short answer", "Use an estimate before the customer approves work. Use an invoice when payment is due."],
      ["Estimate scenarios", "Repairs, construction work, custom design and projects with uncertain scope often start with estimates."],
      ["Invoice scenarios", "Completed work, product delivery, milestone billing and retainers should use invoices."],
    ],
  }),
  seoGuide({
    slug: "how-to-create-invoice-numbers",
    title: "How to Create Invoice Numbers (With Examples)",
    description: "Learn invoice numbering formats, examples, mistakes to avoid and how automatic invoice numbers help.",
    keyword: "invoice number",
    tags: ["Invoice Number", "Billing"],
    relatedToolHref: "/tools/invoice-number-generator",
    relatedToolLabel: "Invoice number generator",
    sections: [
      ["Examples", "Common formats include INV-00001, FY26-001, GST-2026-0007 and CLIENT-001."],
      ["Mistakes to avoid", "Do not reuse numbers, skip randomly, change prefixes too often or delete records without history."],
      ["Automation", "InvoiceWala can generate invoice numbers automatically when invoices are saved."],
    ],
  }),
  {
    slug: "tax-invoice-format-rules-examples",
    title: "Tax Invoice Explained: Format, Rules & Examples",
    description: "Complete tax invoice guide for India: meaning, format, sample, examples, GST rules, PDF, Excel templates, mistakes and FAQs.",
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-30",
    author: "InvoiceWala Team",
    tags: ["Tax Invoice", "GST", "Compliance"],
    readingMinutes: 22,
    relatedToolHref: "/gst-invoice-generator",
    relatedToolLabel: "Create tax invoice",
    faqs: [
      ["What is a tax invoice?", "A tax invoice is an invoice issued for taxable goods or services. It shows supplier details, buyer details, invoice number, taxable value, tax rate, tax amount and total payable amount."],
      ["What is tax invoice format?", "Tax invoice format is the structure used to prepare a tax invoice with supplier details, customer details, GSTIN, item rows, taxable value, GST rate, tax amount and final total."],
      ["What is the format of tax invoice in India?", "A practical tax invoice format in India includes supplier name, address, GSTIN, invoice number, invoice date, buyer details, place of supply, HSN/SAC, taxable value, GST rate, tax amount and total amount."],
      ["What is a tax invoice sample?", "A tax invoice sample is an example invoice layout with realistic fields and calculations so businesses can understand how to create a proper invoice."],
      ["What is a tax invoice example?", "A tax invoice example shows actual numbers, such as Rs. 10,000 taxable value at 18% GST, Rs. 1,800 tax and Rs. 11,800 final invoice total."],
      ["Is tax invoice required under GST?", "For taxable supplies by GST registered businesses, a tax invoice is generally required. Exact requirements depend on the transaction and GST rules."],
      ["Who needs a tax invoice?", "Freelancers, consultants, contractors, agencies, retail stores, ecommerce sellers, service businesses, product sellers and small businesses may need tax invoices when GST applies."],
      ["Can freelancers issue tax invoices?", "Yes. GST registered freelancers can issue tax invoices for taxable services such as design, writing, development, marketing and consulting."],
      ["Can consultants issue tax invoices?", "Yes. Consultants can issue tax invoices for advisory services, retainers, implementation work and professional services when GST applies."],
      ["Can contractors issue tax invoices?", "Yes. Contractors can create tax invoices for labor, material, repair jobs, construction milestones and service work when applicable."],
      ["What is GST tax invoice?", "A GST tax invoice is a tax invoice that includes GST details such as GSTIN, HSN/SAC, taxable value, GST rate, CGST/SGST or IGST and total invoice value."],
      ["Is tax invoice and GST invoice the same?", "In common usage, people often use both terms similarly. Tax invoice is the formal document for taxable supplies, while GST invoice is a common phrase for an invoice with GST details."],
      ["What fields are mandatory in a tax invoice?", "Important fields include supplier details, buyer details, GSTIN, invoice number, invoice date, place of supply, HSN/SAC, taxable value, GST rate, tax amount and total value."],
      ["What is HSN code in tax invoice?", "HSN code classifies goods under GST. Product sellers, retailers, distributors and manufacturers often use HSN codes on invoices."],
      ["What is SAC code in tax invoice?", "SAC code classifies services under GST. Freelancers, consultants, agencies and service businesses may use SAC codes."],
      ["What is place of supply?", "Place of supply helps decide whether CGST/SGST or IGST applies, especially for transactions between different states."],
      ["What is taxable value?", "Taxable value is the amount on which tax is calculated before GST is added."],
      ["How do I calculate tax amount?", "Tax Amount = Taxable Value x GST Rate / 100. For example, Rs. 10,000 at 18% GST gives Rs. 1,800 tax."],
      ["What is tax invoice PDF?", "A tax invoice PDF is a fixed-format PDF version of the invoice that can be shared by email, WhatsApp or client portals."],
      ["Can I use tax invoice format Excel?", "Yes. Excel tax invoice formats are common, but they require manual formula checks and formatting control."],
      ["What are the risks of Excel tax invoices?", "Excel invoices can have broken formulas, duplicate invoice numbers, wrong totals, formatting issues and inconsistent PDF exports."],
      ["What is a tax invoice template?", "A tax invoice template is a reusable format for creating tax invoices with standard fields, item rows and tax calculations."],
      ["Can I download a tax invoice template?", "You can create a tax invoice online with InvoiceWala and download a professional PDF after signup or login."],
      ["What are common tax invoice mistakes?", "Common mistakes include wrong GSTIN, missing GST details, duplicate invoice numbers, wrong tax calculations, missing customer details and missing HSN/SAC codes."],
      ["Should invoice numbers be unique?", "Yes. Invoice numbers should be unique within the same series or financial year."],
      ["Can invoice numbers repeat?", "No. Repeating invoice numbers creates confusion in business records and audits."],
      ["What GST rates are common in tax invoices?", "Common GST rates include 0%, 5%, 12%, 18% and 28%. The correct rate depends on the goods or services."],
      ["Can a quotation become a tax invoice?", "Yes. After the customer approves a quotation, the same details can be used to create a tax invoice."],
      ["Can I create a tax invoice online?", "Yes. InvoiceWala lets you create tax invoices online with item rows, GST fields, invoice numbers and PDF templates."],
      ["Is InvoiceWala useful for tax invoices?", "Yes. InvoiceWala helps create professional tax invoices, GST invoices, invoice numbers, PDF invoices and related billing documents."],
    ],
    content: `
## What is a Tax Invoice?

A tax invoice is an invoice issued for a taxable supply of goods or services. It records the seller, buyer, invoice number, invoice date, item description, taxable value, tax rate, tax amount and final amount payable. In India, the term tax invoice is closely connected with GST because GST registered businesses issue tax invoices for taxable supplies.

The meaning is simple: a tax invoice tells the customer what they are being charged for and shows the tax included in the transaction. It is more formal than a casual bill because it contains tax details and business identifiers. A professional tax invoice helps both sides maintain clean records.

The purpose of a tax invoice is not only payment collection. It also supports GST compliance, customer accounting, vendor records, payment tracking and business reporting. For B2B buyers, a correct tax invoice can matter for Input Tax Credit records. If the invoice has the wrong GSTIN, missing HSN/SAC, incorrect tax amount or duplicate invoice number, it may create extra work for the buyer and seller.

Tax invoices are used in many business situations. A freelancer may issue a tax invoice for design or development work. A consultant may invoice monthly advisory fees. A contractor may bill labor and material. A retail store may issue a product invoice. An ecommerce seller may create invoices for online orders. A service business may invoice installation, maintenance or repair work.

The legal importance of a tax invoice depends on the transaction and applicable GST rules. This guide gives a practical overview for Indian businesses, but it is not legal or tax advice. For exact compliance, GST rates, HSN/SAC classification and filing requirements, check with your accountant or tax advisor.

## Who Needs a Tax Invoice?

Tax invoices are needed by businesses and professionals that sell taxable goods or services, especially when they are GST registered. The format may be simple or detailed, but the invoice should clearly show the transaction and tax details.

Common users include:

- Freelancers billing design, writing, software, marketing or consulting work
- Consultants billing retainers, advisory work or implementation projects
- Contractors billing labor, material, repairs, site visits or milestones
- Agencies billing SEO, ads, creative work, development and monthly retainers
- Retail stores selling taxable products to customers or businesses
- Ecommerce sellers creating invoices for online orders
- Service businesses such as repair teams, technicians, trainers, accountants or local service providers
- Small businesses and Indian startups billing customers professionally

If your customer is a GST registered business, they may ask for a proper gst tax invoice with GSTIN and tax breakup. Even if the customer is not GST registered, a clean tax invoice helps you keep organized records and follow up on payment.

## Tax Invoice Format

A good tax invoice format is clear, consistent and easy to read. It should not force the customer to guess what was sold, what tax was charged or how the final total was calculated.

### Supplier Name

Supplier name is the legal or trade name of the business issuing the tax invoice. It should match your business records and GST registration where applicable.

### Supplier Address

Supplier address identifies the seller or service provider location. It is useful for records, GST details and customer communication.

### GSTIN

GSTIN is the Goods and Services Tax Identification Number. A GST registered supplier should show GSTIN on the invoice. For B2B invoices, buyer GSTIN should also be added when available.

### Invoice Number

Invoice number is a unique identifier for the invoice. Use a clean series such as INV-2026-001, FY26-001 or CLIENT-001. Avoid repeating invoice numbers. You can use the [Invoice Number Generator](/tools/invoice-number-generator) to plan a simple numbering format.

### Invoice Date

Invoice date shows when the invoice was issued. It is important for payment due dates, accounting records and GST reporting.

### Buyer Details

Buyer details include customer name, billing address, email, phone and GSTIN for registered B2B customers. Missing buyer details can create confusion later.

### Place of Supply

Place of supply helps decide whether CGST/SGST or IGST applies. This is especially important when the seller and buyer are in different states.

### HSN Code

HSN code is used for goods. Retailers, product sellers, distributors and manufacturers commonly use HSN codes in tax invoices.

### SAC Code

SAC code is used for services. Freelancers, consultants, agencies and service businesses may need SAC codes on tax invoices.

### Taxable Value

Taxable value is the amount on which tax is calculated. It is usually the item value after eligible discount and before GST is added.

### GST Rate

GST rate is the tax percentage applied to the taxable value. Common GST rates include 0%, 5%, 12%, 18% and 28%. The correct rate depends on the product or service.

### Tax Amount

Tax amount is calculated from taxable value and GST rate. For example, Rs. 10,000 at 18% GST gives Rs. 1,800 tax.

### Total Amount

Total amount is the final amount payable by the customer after adding tax and other applicable charges.

### Payment Terms

Payment terms explain when and how the customer should pay. Examples include due on receipt, due within 7 days, bank transfer details or UPI details.

## Tax Invoice Sample

Here is a realistic tax invoice sample for an Indian service business.

| Field | Example |
|---|---|
| Invoice Number | INV-2026-001 |
| Date | 30 May 2026 |
| Supplier GSTIN | 29ABCDE1234F1Z5 |
| Customer | XYZ Traders |
| Customer GSTIN | 27ABCDE1234F1Z8 |
| Place of Supply | Maharashtra |
| Description | Website development service |
| Taxable Value | Rs. 40,000 |
| GST % | 18% |
| Tax Amount | Rs. 7,200 |
| Final Total | Rs. 47,200 |

A line item table may look like this:

| Description | HSN/SAC | Qty | Rate | Taxable Value | GST % | Tax Amount | Total |
|---|---|---:|---:|---:|---:|---:|---:|
| Website development | 998314 | 1 | Rs. 40,000 | Rs. 40,000 | 18% | Rs. 7,200 | Rs. 47,200 |
| Maintenance support | 998313 | 1 | Rs. 8,000 | Rs. 8,000 | 18% | Rs. 1,440 | Rs. 9,440 |

This sample is simplified. A real invoice may also include shipping address, amount in words, reverse charge note, bank details, terms and authorized signatory.

## Tax Invoice Examples

### 1. Freelancer Tax Invoice

A freelance designer completes a logo and brand kit project for Rs. 25,000. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Taxable value | Rs. 25,000 |
| GST at 18% | Rs. 4,500 |
| Final invoice total | Rs. 29,500 |

The freelancer should mention service description, SAC code if applicable, invoice number, customer details and payment terms.

### 2. Consultant Tax Invoice

A business consultant charges Rs. 60,000 for monthly advisory services. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Advisory fee | Rs. 60,000 |
| GST at 18% | Rs. 10,800 |
| Total payable | Rs. 70,800 |

Consultants should mention service period, scope reference and due date so the client understands what the invoice covers.

### 3. Contractor Tax Invoice

A contractor bills Rs. 80,000 for labor and Rs. 40,000 for materials. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Labor value | Rs. 80,000 |
| Material value | Rs. 40,000 |
| Taxable value | Rs. 120,000 |
| GST at 18% | Rs. 21,600 |
| Final invoice total | Rs. 141,600 |

Contractor invoices should separate labor, material and milestones when possible because customers often want a clear breakdown.

### 4. Service Business Tax Invoice

A repair service business charges Rs. 3,500 for a site visit and Rs. 6,500 for repair service. GST rate is 18%.

| Calculation | Amount |
|---|---:|
| Site visit | Rs. 3,500 |
| Repair service | Rs. 6,500 |
| Taxable value | Rs. 10,000 |
| GST at 18% | Rs. 1,800 |
| Final invoice total | Rs. 11,800 |

Service businesses should add customer address, job reference and service notes for clarity.

### 5. Product Seller Tax Invoice

A retailer sells products worth Rs. 50,000. GST rate is 12%.

| Calculation | Amount |
|---|---:|
| Product value | Rs. 50,000 |
| GST at 12% | Rs. 6,000 |
| Final invoice total | Rs. 56,000 |

Product sellers should include HSN code, quantity, rate, discount and GST breakup item by item where needed.

## Tax Invoice Format PDF

Tax invoice PDF is one of the most practical formats for sharing invoices. A PDF invoice keeps the layout stable across devices. Customers can open it on phone, laptop, email or WhatsApp without the columns shifting.

Benefits of tax invoice PDF:

- Professional presentation
- Consistent layout
- Easy email and WhatsApp sharing
- Better for customer records
- Reduced risk of accidental edits
- Cleaner than screenshots or copied spreadsheet rows

With InvoiceWala, you can create a tax invoice online, preview the invoice and download a professional PDF after signup or login. This is useful for freelancers, agencies, contractors and small businesses that want a clean invoice without manually designing a PDF.

## Tax Invoice Format Excel

Tax invoice format Excel is common because many businesses already use spreadsheets. Excel can calculate totals and can be customized for different invoice styles.

Advantages of Excel tax invoice templates:

- Familiar to many users
- Flexible columns
- Basic formulas
- Easy local editing

Limitations of Excel tax invoice templates:

- Formulas can break
- GST calculations can be wrong
- Invoice numbers may repeat
- PDF export can look messy
- Logo and table formatting can shift
- Hard to track sent, paid and overdue status

Excel works for occasional invoices. But if you create invoices regularly, an online invoice generator is usually faster and safer.

## Tax Invoice vs GST Invoice

| Area | Tax Invoice | GST Invoice |
|---|---|---|
| Meaning | Formal invoice for taxable supply | Common phrase for invoice with GST details |
| Used by | Businesses selling taxable goods or services | GST registered businesses in common language |
| Key fields | Supplier, buyer, invoice number, taxable value, tax, total | GSTIN, HSN/SAC, CGST/SGST or IGST, tax breakup |
| Document title | Often titled Tax Invoice | Often titled Tax Invoice or GST Invoice |
| Purpose | Tax record and payment request | GST-ready tax record and payment request |

In India, many people use tax invoice and GST invoice interchangeably. The important point is that the invoice should include correct tax details and required fields.

## Mandatory Fields in a Tax Invoice

Use this checklist before sending a tax invoice:

- Supplier name
- Supplier address
- Supplier GSTIN
- Invoice number
- Invoice date
- Buyer name
- Buyer address
- Buyer GSTIN for B2B invoices
- Place of supply
- Item or service description
- HSN code for goods
- SAC code for services
- Quantity and unit
- Rate
- Discount if any
- Taxable value
- GST rate
- CGST/SGST or IGST
- Tax amount
- Total invoice value
- Payment terms
- Notes or terms
- Authorized signatory where required

## Tax Invoice Rules in India

Tax invoice rules in India focus on accurate information, proper numbering, tax details and record keeping. This is a high-level overview.

### Invoice numbering

Use a unique invoice number for every invoice. Keep the sequence consistent. Do not repeat numbers within the same series.

### GST requirements

GST registered businesses should include GSTIN, taxable value, GST rate, tax amount and tax split where applicable.

### HSN/SAC codes

Use HSN codes for goods and SAC codes for services where applicable. These codes help classify the supply.

### Record keeping

Keep copies of invoices for your records. PDF invoices are easier to store and share than manually edited files.

### Compliance basics

Use correct GST rates, correct place of supply and accurate buyer details. If you are unsure about classification or tax treatment, confirm with your accountant.

## Common Tax Invoice Mistakes

Avoid these mistakes:

- Wrong GSTIN for supplier or buyer
- Missing GST details
- Duplicate invoice numbers
- Wrong tax calculations
- Missing customer details
- Missing HSN/SAC codes
- Wrong GST rate
- Incorrect place of supply
- Not showing discount clearly
- Broken PDF after Excel export
- Missing payment terms
- Unclear service or product description

These mistakes can delay payments and create extra accounting work.

## How to Create a Tax Invoice Online

Here is a practical workflow:

1. Open an online invoice generator such as [InvoiceWala](/online-invoice-maker).
2. Add supplier name, address, GSTIN and contact details.
3. Add customer name, billing address and GSTIN if available.
4. Create or auto-generate a unique invoice number.
5. Add invoice date and due date.
6. Add product or service line items.
7. Add HSN/SAC codes where applicable.
8. Enter quantity, rate, discount and taxable value.
9. Select GST rate and tax split.
10. Review tax amount and total amount.
11. Add notes, payment terms and bank or UPI details.
12. Preview the invoice.
13. Download the tax invoice PDF and send it to the customer.

InvoiceWala helps with invoice creation, GST-ready fields, invoice numbers, PDF templates and payment tracking. You can also use the [GST Calculator](/tools/gst-calculator) before creating the invoice.

## Download Tax Invoice Template

If you need a tax invoice template, you can use three options.

### Word template

Word templates are useful for simple documents but do not calculate tax automatically.

### Excel template

Excel templates can calculate totals, but formulas and PDF layout need careful checking.

### Online tax invoice generator

Online tools create structured invoices, calculate totals and generate PDF invoices more reliably. With InvoiceWala, you can create a tax invoice, generate invoice numbers and download PDF invoices without manually formatting every document.

Useful links:

- [GST Invoice Generator](/gst-invoice-generator)
- [GST Bill Format](/blog/gst-bill-format)
- [GST Calculator](/tools/gst-calculator)
- [Invoice Number Generator](/tools/invoice-number-generator)
- [Quotation Maker](/quotation-maker)
- [Invoice Format](/invoice-template-india)
- [Profit Margin Calculator](/tools/margin-calculator)

## Frequently Asked Questions

### What is a tax invoice?

A tax invoice is an invoice issued for taxable goods or services. It shows supplier details, buyer details, invoice number, taxable value, tax rate, tax amount and total payable amount.

### What is tax invoice format?

Tax invoice format is the structure used to prepare a tax invoice with supplier details, customer details, GSTIN, item rows, taxable value, GST rate, tax amount and final total.

### What is the format of tax invoice in India?

A practical tax invoice format in India includes supplier name, address, GSTIN, invoice number, invoice date, buyer details, place of supply, HSN/SAC, taxable value, GST rate, tax amount and total amount.

### What is a tax invoice sample?

A tax invoice sample is an example invoice layout with realistic fields and calculations.

### What is a tax invoice example?

A tax invoice example shows actual numbers, such as Rs. 10,000 taxable value at 18% GST, Rs. 1,800 tax and Rs. 11,800 final invoice total.

### Is tax invoice required under GST?

For taxable supplies by GST registered businesses, a tax invoice is generally required.

### Who needs a tax invoice?

Freelancers, consultants, contractors, agencies, retail stores, ecommerce sellers, service businesses and small businesses may need tax invoices.

### Can freelancers issue tax invoices?

Yes. GST registered freelancers can issue tax invoices for taxable services when GST applies.

### Can consultants issue tax invoices?

Yes. Consultants can issue tax invoices for advisory services, retainers and professional services.

### Can contractors issue tax invoices?

Yes. Contractors can create tax invoices for labor, material, repair jobs and service work.

### What is GST tax invoice?

A GST tax invoice is a tax invoice that includes GST details such as GSTIN, HSN/SAC, taxable value, GST rate and tax amount.

### Is tax invoice and GST invoice the same?

In common usage, people often use both terms similarly. Tax invoice is the formal document for taxable supplies.

### What fields are mandatory in a tax invoice?

Important fields include supplier details, buyer details, GSTIN, invoice number, date, place of supply, HSN/SAC, taxable value, GST rate, tax amount and total.

### What is HSN code in tax invoice?

HSN code classifies goods under GST.

### What is SAC code in tax invoice?

SAC code classifies services under GST.

### What is place of supply?

Place of supply helps decide whether CGST/SGST or IGST applies.

### What is taxable value?

Taxable value is the amount on which tax is calculated before GST is added.

### How do I calculate tax amount?

Tax Amount = Taxable Value x GST Rate / 100.

### What is tax invoice PDF?

A tax invoice PDF is a fixed-format PDF version of the invoice that can be shared by email, WhatsApp or client portals.

### Can I use tax invoice format Excel?

Yes. Excel tax invoice formats are common, but they require manual formula checks and formatting control.

### What are the risks of Excel tax invoices?

Excel invoices can have broken formulas, duplicate invoice numbers, wrong totals and formatting issues.

### What is a tax invoice template?

A tax invoice template is a reusable format for creating tax invoices with standard fields, item rows and tax calculations.

### Can I download a tax invoice template?

You can create a tax invoice online with InvoiceWala and download a professional PDF after signup or login.

### What are common tax invoice mistakes?

Common mistakes include wrong GSTIN, missing GST details, duplicate invoice numbers, wrong tax calculations, missing customer details and missing HSN/SAC codes.

### Should invoice numbers be unique?

Yes. Invoice numbers should be unique within the same series or financial year.

### Can invoice numbers repeat?

No. Repeating invoice numbers creates confusion in business records and audits.

### What GST rates are common in tax invoices?

Common GST rates include 0%, 5%, 12%, 18% and 28%.

### Can a quotation become a tax invoice?

Yes. After the customer approves a quotation, the same details can be used to create a tax invoice.

### Can I create a tax invoice online?

Yes. InvoiceWala lets you create tax invoices online with item rows, GST fields, invoice numbers and PDF templates.

### Is InvoiceWala useful for tax invoices?

Yes. InvoiceWala helps create professional tax invoices, GST invoices, invoice numbers, PDF invoices and related billing documents.

Ready to create one? Use the [GST Invoice Generator](/gst-invoice-generator) or start with the [online invoice maker](/online-invoice-maker).
`,
  },
  seoGuide({
    slug: "best-free-invoice-tools-small-business-india",
    title: "Best Free Invoice Tools for Small Businesses in India",
    description: "Compare features Indian small businesses need in free invoice tools: GST fields, PDF export and templates.",
    keyword: "small business invoicing",
    tags: ["Small Business", "Invoice Tools", "India"],
    relatedToolHref: "/free-invoice",
    relatedToolLabel: "Try InvoiceWala",
    sections: [
      ["Features to compare", "Look for free preview, PDF export, GST fields, payment status, client history and WhatsApp sharing."],
      ["Excel vs online tools", "Excel works for basic templates, but online tools reduce formatting errors and help track payments."],
      ["Who should use them", "Freelancers, agencies, contractors, shops and GST businesses can all benefit from structured invoicing."],
    ],
  }),
  seoGuide({
    slug: "plumber-invoice-template",
    title: "Free Invoice Template for Plumbers",
    description: "A plumber invoice guide with sample charges, line items, payment terms and template tips.",
    keyword: "plumber invoice",
    tags: ["Plumber", "Invoice Template", "Local Business"],
    relatedToolHref: "/free-invoice",
    relatedToolLabel: "Create plumber invoice",
    sections: [
      ["What to bill", "Site visit, labor, pipe fittings, emergency repair fees and material charges are common rows."],
      ["Example", "Leakage repair labor, fittings, drain cleaning and inspection can be shown as separate line items."],
      ["Terms", "Mention warranty, payment due date and whether material charges are final or estimated."],
    ],
  }),
  seoGuide({
    slug: "electrician-invoice-template",
    title: "Electrician Invoice Template + Billing Guide",
    description: "Learn how electricians can bill professionally for labor, parts, site visits, GST and payment terms.",
    keyword: "electrician invoice",
    tags: ["Electrician", "Invoice Template", "Local Business"],
    relatedToolHref: "/free-invoice",
    relatedToolLabel: "Create electrician invoice",
    sections: [
      ["Fields", "Customer address, work location, labor hours, parts, service charge, tax and total should be included."],
      ["Example line items", "Inspection, wiring, switchboard repair, parts and emergency callout fee can be billed separately."],
      ["Professional note", "Add a short description of completed work so the customer understands the bill."],
    ],
  }),
  seoGuide({
    slug: "web-developer-invoice-guide",
    title: "How Web Developers Should Invoice Clients",
    description: "A practical invoicing guide for developers covering milestones, retainers, maintenance and taxes.",
    keyword: "web developer invoice",
    tags: ["Web Developer", "Freelancer", "Invoice"],
    relatedToolHref: "/freelancer-invoice-generator",
    relatedToolLabel: "Create developer invoice",
    sections: [
      ["Common items", "Website design, frontend development, backend work, hosting setup, maintenance and bug fixes are common rows."],
      ["Milestones", "Split large projects into discovery, design, development and launch milestones."],
      ["Retainers", "For monthly maintenance, create repeat invoices with fixed scope and clear due date."],
    ],
  }),
  seoGuide({
    slug: "professional-quotation-format-india",
    title: "Professional Quotation Format for Indian Businesses",
    description: "Create professional quotations with item details, validity, GST notes, terms, examples and FAQs.",
    keyword: "quotation format",
    tags: ["Quotation", "India", "Templates"],
    relatedToolHref: "/quotation-maker",
    relatedToolLabel: "Create quotation",
    sections: [
      ["Format", "Business details, customer details, quotation number, item list, price, tax, validity and terms should be included."],
      ["Validity", "Mention how long the quote is valid, especially when material prices may change."],
      ["Conversion", "Once accepted, use the quotation details to create an invoice."],
    ],
  }),
  seoGuide({
    slug: "convert-invoices-to-pdf-automatically",
    title: "How to Convert Invoices to PDF Automatically",
    description: "Learn why PDF invoices are useful and how online invoice tools create professional PDFs automatically.",
    keyword: "invoice PDF",
    tags: ["Invoice PDF", "PDF", "Automation"],
    relatedToolHref: "/free-invoice",
    relatedToolLabel: "Create PDF invoice",
    sections: [
      ["Why PDF", "PDF invoices look consistent on phones, laptops and printouts. They are easy to send on WhatsApp and email."],
      ["Automatic generation", "Online tools generate PDFs from structured invoice data, reducing broken spacing and manual formatting."],
      ["Template choice", "Choose the PDF template before downloading so the invoice matches your business style."],
    ],
  }),
  seoGuide({
    slug: "startup-invoicing-mistakes",
    title: "Invoice Mistakes Startups Make (And How to Avoid Them)",
    description: "Common startup invoicing mistakes: unclear terms, missing tax details, inconsistent numbering and late follow-ups.",
    keyword: "startup invoicing",
    tags: ["Startups", "Invoicing", "Payments"],
    relatedToolHref: "/free-invoice",
    relatedToolLabel: "Create invoice",
    sections: [
      ["No payment terms", "Always mention due date, payment method and any late fee policy."],
      ["Random invoice numbers", "Use a predictable sequence so records are easy to audit."],
      ["Late follow-ups", "Track Sent, Paid and Overdue status so pending invoices do not disappear."],
    ],
  }),
  seoGuide({
    slug: "handle-late-invoice-payments",
    title: "How to Handle Late Invoice Payments Professionally",
    description: "A guide to overdue invoices, polite reminders, penalties, follow-up timing and payment reminder examples.",
    keyword: "late payment",
    tags: ["Late Payment", "Reminders", "Cash Flow"],
    relatedToolHref: "/payment-reminder",
    relatedToolLabel: "Payment reminder guide",
    sections: [
      ["Reminder timeline", "Send a polite reminder on due date, follow up after 3 days, then request a payment date if it remains overdue."],
      ["Message example", "Hi [Name], this is a reminder for invoice [INV-001] of ₹[amount], due on [date]. Please confirm once paid."],
      ["Prevention", "Clear payment terms and quick invoice sending reduce late payments."],
    ],
  }),
  seoGuide({
    slug: "e-invoicing-india-guide",
    title: "Everything About E-Invoicing in India (Updated Guide)",
    description: "Understand GST e-invoicing in India, IRN, QR code, applicability, thresholds and what businesses should check.",
    keyword: "e-invoice India",
    tags: ["E-Invoice", "GST", "India"],
    relatedToolHref: "/gst-invoice-generator",
    relatedToolLabel: "GST invoice generator",
    sections: [
      ["Meaning", "GST e-invoicing is a system where notified B2B invoices are reported to the Invoice Registration Portal and receive an IRN and signed QR code."],
      ["Threshold note", "GSTN material states e-invoicing moved to businesses with turnover of ₹5 crore and above from 1 August 2023. Verify current applicability with the GST portal or your CA."],
      ["Why prepare early", "Clean GSTIN, invoice number, taxable value and tax breakup make future compliance easier even before e-invoicing applies."],
    ],
  }),
];

function allPosts() {
  return [...BLOG_POSTS, ...SEO_BLOG_POSTS];
}

export function getAllPosts() {
  return allPosts().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return allPosts().find((post) => post.slug === slug);
}
