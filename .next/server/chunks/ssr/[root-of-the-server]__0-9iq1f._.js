module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},85305,a=>{"use strict";let b=[{href:"/tools/gst-calculator",title:"GST calculator India",body:"Calculate exclusive or inclusive GST with CGST, SGST and IGST split.",tag:"GST",intent:"Best for tax invoices",metaTitle:"GST Calculator India | Inclusive, Exclusive, CGST, SGST, IGST",metaDescription:"Free GST calculator for India. Calculate inclusive or exclusive GST, split CGST/SGST or IGST, share results, download a breakdown and create GST invoices on InvoiceWala.",headline:"Calculate GST, split tax and create invoices faster.",highlights:["Live CGST, SGST and IGST split","Inclusive or exclusive GST modes","Share, export CSV and create invoices"],signupSource:"gst-calculator"},{href:"/tools/profit-calculator",title:"Profit calculator",body:"See profit, profit margin and markup before sending a quote or invoice.",tag:"Finance",intent:"Best for pricing work",metaTitle:"Profit Calculator | Margin, Markup and Net Profit",metaDescription:"Free profit calculator for freelancers and small businesses. Calculate net profit, profit margin and markup from revenue and expenses, then turn results into invoices.",headline:"Know your profit and margin before you send the invoice.",highlights:["Revenue vs expense profit view","Margin percentage in one step","Move from quote to invoice quickly"],signupSource:"profit-calculator"},{href:"/tools/margin-calculator",title:"Margin calculator",body:"Convert cost and selling price into clean margin and markup numbers.",tag:"Finance",intent:"Best for agencies and shops",metaTitle:"Margin Calculator | Cost, Selling Price and Markup",metaDescription:"Free margin calculator for agencies, retailers and service businesses. Find margin percentage and profit from cost and selling price.",headline:"Price with confidence using real margin and markup numbers.",highlights:["Cost vs selling price margin","Instant profit amount","Useful for quotes and invoices"],signupSource:"margin-calculator"},{href:"/tools/invoice-number-generator",title:"Invoice number generator",body:"Generate professional invoice numbering formats for FY, monthly and GST workflows.",tag:"Invoice",intent:"Best for new businesses",metaTitle:"Invoice Number Generator | GST and Business Invoice IDs",metaDescription:"Generate invoice numbers with custom prefixes and sequential formats for GST invoices, quotations and billing workflows in India.",headline:"Create clean invoice numbers before your first bill goes out.",highlights:["Custom prefix support","Sequential invoice IDs","Ready for GST invoice formats"],signupSource:"invoice-number-generator"},{href:"/tools/pdf-to-invoice-extractor",title:"PDF to invoice extractor",body:"Paste invoice text or upload supported files to structure bill data faster.",tag:"AI",intent:"Best for bookkeeping",metaTitle:"PDF to Invoice Extractor | Paste Text and Structure Bills",metaDescription:"Extract invoice email, totals and bill text from pasted PDF or OCR content. Structure vendor invoice data faster before saving in InvoiceWala.",headline:"Turn pasted invoice text into structured bill data in seconds.",highlights:["Paste OCR or PDF text","Detect totals and email","Upgrade to AI import for files"],signupSource:"pdf-to-invoice-extractor"},{href:"/tools/invoice-to-excel-converter",title:"Invoice to Excel converter",body:"Turn invoice line items into spreadsheet-ready CSV for accounting reviews.",tag:"Export",intent:"Best for reports",metaTitle:"Invoice to Excel Converter | CSV Export for Line Items",metaDescription:"Convert invoice line items into CSV for Excel, accounting reviews and GST reporting. Free invoice to spreadsheet converter for small businesses.",headline:"Export invoice line items to CSV without manual retyping.",highlights:["CSV-ready output","Item, quantity and amount rows","Download and share with your CA"],signupSource:"invoice-to-excel-converter"},{href:"/tools/emi-calculator",title:"EMI calculator",body:"Calculate loan EMI, interest and repayment totals for business purchases.",tag:"Finance",intent:"Best for cash flow",metaTitle:"EMI Calculator India | Loan EMI and Interest Breakdown",metaDescription:"Free EMI calculator for business loans and equipment purchases. Calculate monthly EMI, total interest and repayment amount before you buy.",headline:"Plan business purchases with a clear EMI breakdown.",highlights:["Monthly EMI estimate","Total payable amount","Useful for asset and loan planning"],signupSource:"emi-calculator"},{href:"/tools/tax-calculator",title:"Tax calculator",body:"Calculate custom tax amounts for service bills, purchase orders and estimates.",tag:"Tax",intent:"Best for quick checks",metaTitle:"Tax Calculator | Inclusive and Exclusive Tax Amounts",metaDescription:"Calculate tax on any amount with inclusive or exclusive modes. Quick tax calculator for service bills, estimates and purchase orders.",headline:"Check tax amounts before you finalize a bill or quote.",highlights:["Inclusive or exclusive tax","Custom tax rate support","Fast total calculation"],signupSource:"tax-calculator"}];a.s(["TOOLS_CATALOG",0,b,"toolByHref",0,function(a){return b.find(b=>b.href===a)}])},31059,a=>{"use strict";let b=[{slug:"how-to-create-gst-invoice-india",title:"How to Create a GST Invoice in India (Step-by-Step Guide)",description:"Learn the mandatory GST invoice fields, tax split rules and a simple workflow to create compliant tax invoices for Indian businesses.",publishedAt:"2026-05-20",author:"InvoiceWala Team",tags:["GST","Invoicing","India"],readingMinutes:8,relatedToolHref:"/tools/gst-calculator",relatedToolLabel:"GST calculator",content:`
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
`},{slug:"cgst-sgst-igst-explained",title:"CGST, SGST and IGST Explained for Small Businesses",description:"A plain-language guide to when you charge CGST+SGST vs IGST, with examples for freelancers, shops and service providers in India.",publishedAt:"2026-05-18",author:"InvoiceWala Team",tags:["GST","CGST","IGST"],readingMinutes:6,relatedToolHref:"/tools/gst-calculator",relatedToolLabel:"Calculate GST split",content:`
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
`},{slug:"gst-invoice-format-checklist",title:"GST Invoice Format Checklist (Free PDF Templates)",description:"Download-ready GST invoice checklist: numbering, HSN, tax columns, terms and branding tips for compliant billing in India.",publishedAt:"2026-05-15",author:"InvoiceWala Team",tags:["GST","Templates","Compliance"],readingMinutes:7,relatedToolHref:"/invoices/new",relatedToolLabel:"Create GST invoice",content:`
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
`},{slug:"send-invoice-on-whatsapp-india",title:"How to Send Invoices on WhatsApp in India (Without API Cost)",description:"Share invoice PDFs on WhatsApp using payment links and clear message templates. Works for freelancers, shops and local service businesses.",publishedAt:"2026-05-12",author:"InvoiceWala Team",tags:["WhatsApp","Invoicing","Payments"],readingMinutes:5,relatedToolHref:"/invoices",relatedToolLabel:"Open invoices",content:`
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

[Create invoice](/invoices/new) \xb7 [Try GST calculator](/tools/gst-calculator)
`},{slug:"invoice-vs-bill-vs-receipt",title:"Invoice vs Bill vs Receipt: What to Issue and When",description:"Understand the difference between invoices, bills and receipts so you pick the right document for sales, services and advance payments.",publishedAt:"2026-05-10",author:"InvoiceWala Team",tags:["Invoicing","Bookkeeping"],readingMinutes:6,relatedToolHref:"/tools/invoice-number-generator",relatedToolLabel:"Invoice number generator",content:`
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
`}];a.s(["getAllPosts",0,function(){return[...b].sort((a,b)=>a.publishedAt<b.publishedAt?1:-1)},"getPostBySlug",0,function(a){return b.find(b=>b.slug===a)}])},26758,a=>{a.v("/_next/static/media/favicon.0z~mqyikvdruj.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},38872,a=>{"use strict";let b={src:a.i(26758).default,width:48,height:48};a.s(["default",0,b])},71224,a=>{a.v("/_next/static/media/icon.08.to_aok-yqy.png"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},1022,a=>{"use strict";let b={src:a.i(71224).default,width:512,height:512};a.s(["default",0,b])},76789,a=>{a.v("/_next/static/media/apple-icon.08npycw.jx-5j.png"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},59310,a=>{"use strict";let b={src:a.i(76789).default,width:180,height:180};a.s(["default",0,b])},52289,a=>{"use strict";var b=a.i(7997),c=a.i(95936),d=a.i(95410),e=a.i(28189),f=a.i(81085),g=a.i(31059),h=a.i(54320);a.s(["default",0,function(){let a=(0,g.getAllPosts)(),i={"@context":"https://schema.org","@type":"Blog",name:"InvoiceWala Blog",url:"https://invoicewala.shop/blog",description:"Practical guides on GST invoices, CGST SGST IGST, WhatsApp billing, invoice formats and small-business finance workflows in India.",blogPost:a.map(a=>({"@type":"BlogPosting",headline:a.title,description:a.description,datePublished:a.publishedAt,url:`https://invoicewala.shop/blog/${a.slug}`,author:{"@type":"Organization",name:a.author}}))};return(0,b.jsxs)("main",{className:"min-h-screen bg-slate-950 text-white",children:[(0,b.jsx)(f.JsonLd,{data:[(0,h.websiteSchema)(),i]}),(0,b.jsxs)("section",{className:"border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%)] px-5 py-6 sm:px-8",children:[(0,b.jsxs)("nav",{className:"mx-auto flex max-w-7xl items-center justify-between gap-4",children:[(0,b.jsx)(d.BrandLogo,{href:"/",imageClassName:"h-9 w-9",tagline:""}),(0,b.jsx)(e.PublicNavActions,{showBlog:!1})]}),(0,b.jsxs)("div",{className:"mx-auto max-w-7xl py-16",children:[(0,b.jsx)("p",{className:"text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300",children:"Blog"}),(0,b.jsx)("h1",{className:"mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl",children:"GST, invoicing and payment guides for Indian businesses"}),(0,b.jsx)("p",{className:"mt-5 max-w-2xl text-lg leading-8 text-slate-300",children:"SEO-friendly articles that answer real search queries — then connect readers to free calculators and InvoiceWala workflows."})]})]}),(0,b.jsx)("section",{className:"mx-auto max-w-7xl px-5 py-14 sm:px-8",children:(0,b.jsx)("div",{className:"grid gap-5 md:grid-cols-2",children:a.map(a=>(0,b.jsxs)("article",{className:"rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.06]",children:[(0,b.jsx)("div",{className:"flex flex-wrap gap-2",children:a.tags.map(a=>(0,b.jsx)("span",{className:"rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold text-cyan-200",children:a},a))}),(0,b.jsx)("h2",{className:"mt-4 text-2xl font-semibold tracking-tight",children:(0,b.jsx)(c.default,{className:"hover:text-cyan-200",href:`/blog/${a.slug}`,children:a.title})}),(0,b.jsx)("p",{className:"mt-3 text-sm leading-7 text-slate-400",children:a.description}),(0,b.jsxs)("div",{className:"mt-5 flex items-center justify-between gap-3 text-xs text-slate-500",children:[(0,b.jsxs)("span",{children:[new Date(a.publishedAt).toLocaleDateString("en-IN",{dateStyle:"medium"})," · ",a.readingMinutes," min read"]}),(0,b.jsx)(c.default,{className:"font-semibold text-cyan-300",href:`/blog/${a.slug}`,children:"Read article →"})]})]},a.slug))})})]})},"metadata",0,{title:"Invoice & GST Guides for Indian Businesses | InvoiceWala Blog",description:"Practical guides on GST invoices, CGST SGST IGST, WhatsApp billing, invoice formats and small-business finance workflows in India.",alternates:{canonical:"https://invoicewala.shop/blog"}}])},52921,a=>{a.n(a.i(52289))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-9iq1f._.js.map