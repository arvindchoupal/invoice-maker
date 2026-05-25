module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},81085,a=>{"use strict";var b=a.i(7997);a.s(["JsonLd",0,function({data:a}){return(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(a)}})}])},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},9408,a=>{"use strict";a.s(["PublicNavActions",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call PublicNavActions() from the server but PublicNavActions is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/PublicNavActions.tsx <module evaluation>","PublicNavActions")},18206,a=>{"use strict";a.s(["PublicNavActions",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call PublicNavActions() from the server but PublicNavActions is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/PublicNavActions.tsx","PublicNavActions")},28189,a=>{"use strict";a.i(9408);var b=a.i(18206);a.n(b)},79091,a=>{"use strict";a.s(["PublicPrimaryCta",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call PublicPrimaryCta() from the server but PublicPrimaryCta is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/PublicPrimaryCta.tsx <module evaluation>","PublicPrimaryCta")},4782,a=>{"use strict";a.s(["PublicPrimaryCta",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call PublicPrimaryCta() from the server but PublicPrimaryCta is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/PublicPrimaryCta.tsx","PublicPrimaryCta")},83903,a=>{"use strict";a.i(79091);var b=a.i(4782);a.n(b)},31059,a=>{"use strict";let b=[{slug:"how-to-create-gst-invoice-india",title:"How to Create a GST Invoice in India (Step-by-Step Guide)",description:"Learn the mandatory GST invoice fields, tax split rules and a simple workflow to create compliant tax invoices for Indian businesses.",publishedAt:"2026-05-20",author:"InvoiceWala Team",tags:["GST","Invoicing","India"],readingMinutes:8,relatedToolHref:"/tools/gst-calculator",relatedToolLabel:"GST calculator",content:`
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
`}];a.s(["getAllPosts",0,function(){return[...b].sort((a,b)=>a.publishedAt<b.publishedAt?1:-1)},"getPostBySlug",0,function(a){return b.find(b=>b.slug===a)}])},76789,a=>{a.v("/_next/static/media/apple-icon.08npycw.jx-5j.png"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},59310,a=>{"use strict";let b={src:a.i(76789).default,width:180,height:180};a.s(["default",0,b])},26758,a=>{a.v("/_next/static/media/favicon.0z~mqyikvdruj.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},38872,a=>{"use strict";let b={src:a.i(26758).default,width:48,height:48};a.s(["default",0,b])},71224,a=>{a.v("/_next/static/media/icon.08.to_aok-yqy.png"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},1022,a=>{"use strict";let b={src:a.i(71224).default,width:512,height:512};a.s(["default",0,b])},52519,a=>{"use strict";var b=a.i(7997),c=a.i(95936);a.i(70396);var d=a.i(73727);function e(a){return a.split(/(\[[^\]]+\]\([^)]+\))/g).map((a,d)=>{let e=a.match(/^\[([^\]]+)\]\(([^)]+)\)$/);if(e){let a=e[2];return a.startsWith("/")?(0,b.jsx)(c.default,{className:"font-semibold text-cyan-300 underline-offset-2 hover:underline",href:a,children:e[1]},d):(0,b.jsx)("a",{className:"font-semibold text-cyan-300 underline-offset-2 hover:underline",href:a,rel:"noreferrer",target:"_blank",children:e[1]},d)}return(0,b.jsx)("span",{children:a},d)})}function f({content:a}){let c=a.trim().split(/\n\n+/);return(0,b.jsx)("div",{className:"prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-cyan-300",children:c.map((a,c)=>{let d=a.trim();if(!d)return null;if(d.startsWith("## "))return(0,b.jsx)("h2",{className:"mt-10 text-2xl font-semibold text-white",children:d.slice(3)},c);if(d.startsWith("### "))return(0,b.jsx)("h3",{className:"mt-8 text-xl font-semibold text-white",children:d.slice(4)},c);if(d.startsWith("|")){let a=d.split("\n").filter(a=>a.trim()&&!a.includes("---"));return(0,b.jsx)("div",{className:"mt-6 overflow-x-auto rounded-2xl border border-white/10",children:(0,b.jsx)("table",{className:"w-full min-w-[480px] text-left text-sm",children:(0,b.jsx)("tbody",{children:a.map((a,c)=>{let d=a.split("|").filter(Boolean).map(a=>a.trim()),f=0===c?"th":"td";return(0,b.jsx)("tr",{className:"border-b border-white/10 last:border-0",children:d.map((a,d)=>(0,b.jsx)(f,{className:`px-4 py-3 ${0===c?"font-semibold text-white":"text-slate-300"}`,children:e(a)},d))},a)})})})},c)}if(d.startsWith("- ")){let a=d.split("\n").map(a=>a.replace(/^- /,""));return(0,b.jsx)("ul",{className:"mt-4 list-disc space-y-2 pl-6 text-slate-300",children:a.map(a=>(0,b.jsx)("li",{children:e(a)},a))},c)}return d.startsWith("> ")?(0,b.jsx)("blockquote",{className:"mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 px-5 py-4 text-slate-200",children:e(d.replace(/^> /gm,""))},c):(0,b.jsx)("p",{className:"mt-4 text-base leading-8 text-slate-300",children:e(d)},c)})})}var g=a.i(28189),h=a.i(83903),i=a.i(81085),j=a.i(31059);async function k(){return(0,j.getAllPosts)().map(a=>({slug:a.slug}))}async function l({params:a}){let{slug:b}=await a,c=(0,j.getPostBySlug)(b);return c?{title:`${c.title} | InvoiceWala Blog`,description:c.description,alternates:{canonical:`https://invoicewala.shop/blog/${c.slug}`},openGraph:{title:c.title,description:c.description,type:"article",publishedTime:c.publishedAt,url:`https://invoicewala.shop/blog/${c.slug}`}}:{}}async function m({params:a}){let{slug:e}=await a,k=(0,j.getPostBySlug)(e);k||(0,d.notFound)();let l={"@context":"https://schema.org","@type":"BlogPosting",headline:k.title,description:k.description,datePublished:k.publishedAt,dateModified:k.updatedAt??k.publishedAt,author:{"@type":"Organization",name:k.author},publisher:{"@type":"Organization",name:"InvoiceWala",url:"https://invoicewala.shop"},mainEntityOfPage:`https://invoicewala.shop/blog/${k.slug}`};return(0,b.jsxs)("main",{className:"min-h-screen bg-slate-950 text-white",children:[(0,b.jsx)(i.JsonLd,{data:l}),(0,b.jsx)("section",{className:"border-b border-white/10 px-5 py-6 sm:px-8",children:(0,b.jsxs)("nav",{className:"mx-auto flex max-w-3xl items-center justify-between gap-4",children:[(0,b.jsx)(c.default,{className:"text-sm font-semibold text-cyan-300",href:"/blog",children:"← All articles"}),(0,b.jsx)(g.PublicNavActions,{showBlog:!1})]})}),(0,b.jsxs)("article",{className:"mx-auto max-w-3xl px-5 py-12 sm:px-8",children:[(0,b.jsx)("div",{className:"flex flex-wrap gap-2",children:k.tags.map(a=>(0,b.jsx)("span",{className:"rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold text-cyan-200",children:a},a))}),(0,b.jsx)("h1",{className:"mt-5 text-4xl font-semibold tracking-tight sm:text-5xl",children:k.title}),(0,b.jsx)("p",{className:"mt-4 text-lg leading-8 text-slate-300",children:k.description}),(0,b.jsxs)("p",{className:"mt-4 text-sm text-slate-500",children:[new Date(k.publishedAt).toLocaleDateString("en-IN",{dateStyle:"long"})," · ",k.readingMinutes," min read · ",k.author]}),(0,b.jsx)("div",{className:"mt-10",children:(0,b.jsx)(f,{content:k.content})}),k.relatedToolHref?(0,b.jsxs)("div",{className:"mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6",children:[(0,b.jsx)("p",{className:"text-sm font-semibold uppercase tracking-wide text-cyan-200",children:"Next step"}),(0,b.jsx)("p",{className:"mt-2 text-lg font-semibold text-white",children:"Put this guide into practice"}),(0,b.jsxs)("div",{className:"mt-4 flex flex-wrap gap-3",children:[k.relatedToolHref?(0,b.jsx)(c.default,{className:"rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950",href:k.relatedToolHref,children:k.relatedToolLabel??"Open tool"}):null,(0,b.jsx)(h.PublicPrimaryCta,{guestHref:"/signup",guestLabel:"Create free account",authedHref:"/invoices/new",authedLabel:"Create invoice",className:"rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white"})]})]}):null]})]})}a.s(["default",0,m,"generateMetadata",0,l,"generateStaticParams",0,k],52519)},90857,a=>{a.n(a.i(52519))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ask2oa._.js.map