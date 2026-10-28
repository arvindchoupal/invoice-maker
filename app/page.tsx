import { HeroDesktopWorkspace } from "@/components/HeroDesktopWorkspace";
import { HomeFeatureVisual } from "@/components/HomeFeatureVisual";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Clock3, FileCheck2, FileText, MessageCircle, ReceiptIndianRupee, Send, Sparkles, UploadCloud } from "lucide-react";
import { PublicHeroActions } from "@/components/PublicHeroActions";
import { PublicPrimaryCta } from "@/components/PublicPrimaryCta";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";
import { faqSchema, organizationSchema, toolsItemListSchema, websiteSchema } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Invoice Generator | Create Free GST Invoices Online | InvoiceWala",
  description: "Use InvoiceWala's online invoice generator to create free GST-ready invoices, download professional PDFs, track payments and send reminders. Built for Indian businesses.",
  metadataBase: new URL("https://invoicewala.shop"),
  alternates: { canonical: "https://invoicewala.shop" },
  openGraph: {
    title: "Invoice Generator | Create Free GST Invoices Online",
    description: "Create free, GST-ready invoices online, send PDFs and track payments with InvoiceWala.",
    url: "https://invoicewala.shop",
    siteName: "InvoiceWala",
  },
};

const trustMetrics = [
  { icon: FileCheck2, value: "First PDF free", label: "No signup required" },
  { icon: ReceiptIndianRupee, value: "GST-ready", label: "CGST, SGST and IGST" },
  { icon: MessageCircle, value: "WhatsApp", label: "Share invoices quickly" },
  { icon: Sparkles, value: "₹0 to start", label: "No card required" },
];

const workflow = [
  ["01", "Create", "Add a customer, items, tax and payment terms in one focused invoice editor."],
  ["02", "Send", "Download a polished PDF or share the invoice directly with your customer."],
  ["03", "Track", "See paid, pending and overdue invoices without maintaining another spreadsheet."],
];

const templates = [
  ["/bill-formats/gst-bill-format.webp", "GST bill format", "GST-ready"],
  ["/bill-formats/freelancer-bill-format.webp", "Freelancer invoice", "Professional"],
  ["/bill-formats/retail-shop-bill-format.webp", "Retail shop bill", "Item based"],
];

const faqs: Array<[string, string]> = [
  ["Can I create an invoice without signup?", "Yes. Create an invoice and download your first PDF free without signup. Create a free account only when you want to save history, reuse customers and track payments."],
  ["Does InvoiceWala support GST invoices?", "Yes. InvoiceWala supports GST/VAT fields, CGST, SGST and IGST details, tax-ready invoice data and GST-focused tools for Indian businesses."],
  ["Can I send invoices on WhatsApp?", "Yes. Download the invoice PDF or use the WhatsApp sharing option to send the invoice to your customer."],
  ["Is InvoiceWala full accounting software?", "InvoiceWala is intentionally focused on invoicing and simple business tracking. AI import, expenses and reports are available when you need more automation."],
];

const featuredToolHrefs = new Set(["/tools/gst-calculator", "/tools/gst-bill-format-generator", "/tools/invoice-number-generator", "/quotation-maker"]);
const featuredTools = TOOLS_CATALOG.filter((tool) => featuredToolHrefs.has(tool.href));

function InvoiceWorkspacePreview() {
  return (
    <div className="laptop-preview relative min-w-0" id="demo" aria-label="InvoiceWala invoice preview on laptop and phone screens">
      <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="laptop-display"><div className="laptop-camera" /><div className="laptop-viewport"><div className="laptop-app overflow-hidden bg-white"><HeroDesktopWorkspace />
      </div></div><div className="laptop-chin">InvoiceWala</div></div>
      <div className="laptop-base"><div className="laptop-notch" /></div>
      <div className="laptop-shadow" />
      <div className="hero-phone" aria-label="Mobile invoice preview">
        <div className="hero-phone-island" />
        <div className="hero-phone-content">
          <div className="phone-app-heading"><span className="phone-app-logo">IW</span><b>InvoiceWala</b><span>•••</span></div>
          <p className="phone-eyebrow">INVOICE DETAILS</p>
          <div className="phone-title"><b>INV-0024</b><span>Pending</span></div>
          <div className="phone-customer"><span>AE</span><div><b>Aarav Enterprises</b><p>New Delhi, India</p></div></div>
          <div className="phone-invoice-paper"><div className="phone-paper-head"><b>Northstar Studio</b><FileText size={20}/></div><p>Website design & development</p><div><span>Subtotal</span><b>₹25,000</b></div><div><span>GST · 18%</span><b>₹4,500</b></div><div className="phone-total"><span>Total payable</span><b>₹29,500</b></div></div>
          <p className="phone-due"><Clock3 size={12}/> Due 24 Oct 2026</p>
          <div className="phone-share"><Send size={14}/> Share invoice</div>
          <div className="phone-tabs"><span><FileText size={16}/>Invoices</span><span><CheckCircle2 size={16}/>Payments</span><span><Sparkles size={16}/>Tools</span></div>
        </div>
        <div className="hero-phone-home" />
      </div>
    </div>
  );
}

function WorkflowPreview() {
  const activity = [
    [FileCheck2, "Created", "10 Oct · 10:30 AM", "text-blue-300", "bg-blue-500/10"],
    [Send, "Sent on WhatsApp", "10 Oct · 10:34 AM", "text-cyan-300", "bg-cyan-500/10"],
    [Clock3, "Payment due", "24 Oct · ₹29,500", "text-amber-300", "bg-amber-500/10"],
  ] as const;
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-sm font-semibold">Invoice activity</p><p className="text-xs text-slate-400">INV-0024 · Aarav Enterprises</p></div><span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">Pending</span></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {activity.map(([Icon, title, body, color, bg]) => <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4" key={title}><div className={`grid h-10 w-10 place-items-center rounded-xl ${bg} ${color}`}><Icon className="h-5 w-5" /></div><p className="mt-5 text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-slate-400">{body}</p></div>)}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-blue-600 p-4 text-white"><MessageCircle className="h-5 w-5" /><div className="min-w-0"><p className="text-sm font-semibold">Friendly payment reminder ready</p><p className="truncate text-xs text-blue-100">Hi Aarav, a quick reminder that invoice INV-0024 is due on 24 Oct…</p></div><span className="ml-auto shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700">Copy</span></div>
    </div>
  );
}

function PaymentPreview() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      <div className="flex items-center justify-between"><div><p className="font-semibold">Invoices</p><p className="text-xs text-slate-400">October overview</p></div><span className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">+ New invoice</span></div>
      <div className="mt-5 grid grid-cols-3 gap-2">{[["₹84,000", "Paid", "text-emerald-300"], ["₹42,500", "Pending", "text-amber-300"], ["₹12,000", "Overdue", "text-rose-300"]].map(([value, label, tone]) => <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3" key={label}><p className={`text-base font-bold sm:text-xl ${tone}`}>{value}</p><p className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">{label}</p></div>)}</div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">{[["Aarav Enterprises", "INV-0024", "₹29,500", "Pending", "text-amber-300"], ["Northstar Studio", "INV-0023", "₹48,000", "Paid", "text-emerald-300"], ["Riya Consulting", "INV-0022", "₹12,000", "Overdue", "text-rose-300"]].map(([customer, invoice, amount, status, tone], index) => <div className={`grid grid-cols-[1fr_auto] gap-3 bg-slate-950/70 p-4 ${index ? "border-t border-white/10" : ""}`} key={invoice}><div><p className="text-sm font-semibold">{customer}</p><p className="mt-1 text-xs text-slate-400">{invoice}</p></div><div className="text-right"><p className="text-sm font-bold">{amount}</p><p className={`mt-1 text-xs font-semibold ${tone}`}>{status}</p></div></div>)}</div>
    </div>
  );
}

function AiImportPreview() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      <div className="rounded-2xl border border-dashed border-blue-400/40 bg-blue-500/5 p-6 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white"><UploadCloud className="h-6 w-6" /></div><p className="mt-4 text-sm font-semibold">Vendor-bill-october.pdf</p><p className="mt-1 text-xs text-slate-400">PDF uploaded · extracting fields</p></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{[["Vendor", "Sharma Office Supplies"], ["Invoice number", "SOS-1842"], ["GST amount", "₹2,196"], ["Total", "₹14,396"]].map(([label, value]) => <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3" key={label}><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>)}</div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-300"><Sparkles className="h-4 w-4" />Review the extracted fields before saving</div>
    </div>
  );
}

const businessFeatures = [
  { id: "quotations", eyebrow: "Estimates & quotations", title: "Start every project with a clear quotation.", body: "Give customers a clear breakdown before work begins. Add your services, quantities, GST, discounts and payment terms to a professional quotation. Review the totals and download a PDF that makes your proposal easy to understand and approve.", href: "/quotation-maker", cta: "Create a quotation", heading: "Project quotation", subtitle: "Website redesign · QT-0042", rows: [["Design & development", "₹35,000"], ["Content setup", "₹5,000"], ["GST · 18%", "₹7,200"]], total: "Quotation total", amount: "₹47,200", note: "Valid for 15 days · 50% advance" },
  { id: "customers", eyebrow: "Customer management", title: "Keep customer details ready for the next invoice.", body: "Build a useful customer history as your business grows. Save billing addresses, contact details and GST information with your account, then reuse them when you prepare another invoice. Spend less time entering the same information and keep your business records consistent.", href: "/signup", cta: "Organize your customers", heading: "Your customers", subtitle: "Billing details, together in one place", rows: [["Aarav Enterprises", "New Delhi"], ["Northstar Studio", "Bengaluru"], ["Riya Consulting", "Mumbai"]], total: "Ready for your next invoice", amount: "3 clients", note: "Sample customer records" },
  { id: "reports", eyebrow: "Business reports", title: "See the numbers behind your daily work.", body: "Bring invoice activity and payment information into a clearer business overview. Use your account to review reports and understand your records, then explore our free calculators when you need to check margins, tax or expenses. Keep everyday decisions grounded in the figures you already have.", href: "/tools/business-expense-calculator", cta: "Calculate business expenses", heading: "Business overview", subtitle: "October · illustrative figures", rows: [["Invoices issued", "₹1,38,500"], ["Payments received", "₹84,000"], ["Outstanding balance", "₹54,500"]], total: "Payments received", amount: "₹84,000", note: "Illustrative report · sample data" },
  { id: "receipts", eyebrow: "Payment receipts", title: "Give every payment a professional receipt.", body: "Help customers keep a clear record of what they have paid. Create a receipt with business details, payment information and a description of the goods or services. Check the amount and download a PDF for your customer, whether you work independently or run a growing local business.", href: "/receipt-generator", cta: "Generate a receipt", heading: "Payment receipt", subtitle: "RCT-0018 · Aarav Enterprises", rows: [["Payment for", "INV-0024"], ["Payment method", "Bank transfer"], ["Amount received", "₹29,500"]], total: "Payment recorded", amount: "₹29,500", note: "Thank you for your business" },
  { id: "sharing", eyebrow: "Download & share", title: "Send a polished invoice wherever business happens.", body: "Prepare your invoice in the browser and download a professional PDF when it is ready. Share the document with your customer on WhatsApp or through your usual business channels. From the first quote to the final payment reminder, keep the next step simple and easy to follow.", href: "/tools/payment-reminder-generator", cta: "Prepare a payment reminder", heading: "Ready to share", subtitle: "INV-0024 · Professional PDF", rows: [["Customer", "Aarav Enterprises"], ["Document", "GST invoice"], ["Next step", "Download & share"]], total: "Invoice total", amount: "₹29,500", note: "Your details · your logo · your invoice" },
];

function BusinessFeatureSections() {
  return businessFeatures.map((feature, index) => (
    <section id={feature.id} key={feature.id} className={`border-t border-white/10 ${index % 2 ? "bg-white/[0.025]" : ""}`}>
      <div className="homepage-container mx-auto grid items-center gap-12 px-3 py-[100px] lg:min-h-[650px] lg:grid-cols-2 lg:gap-20">
        <div className={index % 2 ? "lg:order-2" : ""}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">{feature.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-[33.6px] font-bold leading-[1.2]">{feature.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-6 text-slate-300">{feature.body}</p>
          <Link href={feature.href} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white hover:bg-blue-500">{feature.cta}<ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div id={`visual-${feature.id}`} className={`min-w-0 ${index % 2 ? "lg:order-1" : ""}`}><HomeFeatureVisual kind={feature.id} /></div>
      </div>
    </section>
  ));
}

export default function Home() {
  return (
    <main className="invoice-home min-h-screen overflow-x-clip bg-slate-950 text-white">
      <JsonLd data={[organizationSchema(), websiteSchema(), toolsItemListSchema(), faqSchema(faqs)]} />


      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_70%_18%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_15%_8%,rgba(34,211,238,0.06),transparent_26%)]" />
        <div className="relative mx-auto w-full homepage-container px-3 py-5 sm:px-3 sm:py-6">
          <div className="mx-auto grid min-w-0 items-center gap-14 py-14 sm:py-20 lg:max-w-[1120px]">
            <div className="hero-copy mx-auto min-w-0 lg:max-w-[800px] lg:text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-sm font-semibold text-cyan-100"><Sparkles className="h-4 w-4" />Your first invoice PDF is free</div>
              <h1 className="mx-auto mt-6 max-w-3xl text-[48px] font-bold leading-[1.2] tracking-normal">Invoice Maker for Small Businesses</h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-6 text-slate-300">Create professional GST invoices in minutes with InvoiceWala. Manage customers, calculate taxes, download polished PDFs and track payments in one place, giving your small business more time to focus on what matters.</p>
              <PublicHeroActions />
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">{["Instant PDF download", "Add your own logo", "GST-ready fields"].map((item) => <span className="inline-flex items-center gap-1.5" key={item}><Check className="h-4 w-4 text-emerald-400" />{item}</span>)}</div>
            </div>
            <InvoiceWorkspacePreview />
          </div>
          <div className="grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">{trustMetrics.map(({ icon: Icon, value, label }) => <div className="flex items-center gap-3 border-white/10 px-4 py-5 sm:border-r sm:last:border-r-0" key={label}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-300"><Icon className="h-5 w-5" /></span><div><p className="text-base font-semibold">{value}</p><p className="mt-1 text-sm text-slate-300">{label}</p></div></div>)}</div>
        </div>
      </section>

      <section className="mx-auto homepage-container scroll-mt-8 px-3 pt-[120px] pb-[100px] sm:px-3" id="workflow">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">One clean workflow</p><h2 className="mt-4 text-[33.6px] font-bold leading-[1.2] tracking-normal">From work completed to payment tracked.</h2><p className="mt-5 text-base leading-6 text-slate-300">No accounting maze. Complete the invoice, share it with your customer and always know what needs attention.</p></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="grid gap-3">{workflow.map(([number, title, body], index) => <div className={`rounded-2xl border p-5 ${index === 0 ? "border-blue-400/40 bg-blue-500/10" : "border-white/10 bg-white/[0.04]"}`} key={number}><div className="flex gap-4"><span className="text-sm font-black text-cyan-300">{number}</span><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-300">{body}</p></div></div></div>)}</div>
          <WorkflowPreview />
        </div>
      </section>

      <section id="templates" className="border-y border-blue-100 bg-blue-50 pt-[120px] pb-[100px] dark:border-white/10 dark:bg-white/[0.025]">
        <div className="mx-auto homepage-container px-3 sm:px-3">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Invoice templates</p><h2 className="mt-4 max-w-2xl text-[32px] font-bold leading-[1.2] tracking-normal">Professional Invoice Templates Made Simple</h2><p className="mt-5 max-w-2xl text-base leading-6 text-slate-300">Find the right invoice format for your business, from GST billing to freelance projects and retail sales. Add your logo, update customer details and download a clear, professional PDF that is ready to share.</p></div><Link className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-xl border border-white/15 px-4 text-sm font-semibold text-white transition hover:bg-white/10 sm:self-auto" href="/bill-format">Explore bill formats <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{templates.map(([src, title, badge], index) => <Link className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white p-3 shadow-2xl shadow-black/15 transition hover:-translate-y-1 ${index === 1 ? "md:-translate-y-5 md:hover:-translate-y-6" : ""}`} href="/bill-format" key={src}><div className="absolute left-6 top-6 z-10 rounded-full bg-slate-950/90 px-3 py-1.5 text-xs font-bold text-white">{badge}</div><Image alt={`${title} preview`} className="h-auto w-full rounded-2xl" height={1698} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 30vw, 476px" src={src} width={1200} /><div className="flex items-center justify-between px-2 pb-1 pt-4 text-slate-950"><p className="font-semibold">{title}</p><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div></Link>)}</div>
        </div>
      </section>

      <section className="mx-auto grid homepage-container gap-10 px-3 pt-[120px] pb-[100px] sm:px-3 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <PaymentPreview />
        <div className="lg:pl-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Payment tracking</p><h2 className="mt-4 text-[33.6px] font-bold leading-[1.2] tracking-normal">Know what is paid, pending and overdue.</h2><p className="mt-5 text-base leading-6 text-slate-300">Keep your invoices and payment details organized in one place. Check which customers have paid, see outstanding amounts and identify overdue invoices without searching through spreadsheets. When a payment needs a follow-up, prepare a polite WhatsApp reminder and keep the conversation moving.</p><div className="mt-7 grid gap-3 text-sm text-slate-300">{["See every invoice status at a glance", "Keep customer and amount details together", "Prepare a polite WhatsApp payment reminder"].map((item) => <p className="flex items-center gap-3" key={item}><span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/10 text-emerald-300"><Check className="h-3.5 w-3.5" /></span>{item}</p>)}</div><Link className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200" href="/tools/payment-reminder-generator">Create a payment reminder <ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50 dark:border-white/10 dark:bg-white/[0.025]"><div className="mx-auto grid homepage-container gap-12 px-3 pt-[120px] pb-[100px] sm:px-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">AI bill import</p><h2 className="mt-4 text-[33.6px] font-bold leading-[1.2] tracking-normal">Turn a vendor bill into structured data.</h2><p className="mt-5 text-base leading-6 text-slate-300">Bring your vendor bills, receipts and GST invoices into one clear workflow. Upload a document and let InvoiceWala extract vendor details, invoice dates, taxes and totals. Review the information, correct anything that needs attention and save the details without typing every field from scratch.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 text-sm font-semibold text-white transition hover:bg-blue-500" href="/tools/pdf-to-invoice-extractor"><UploadCloud className="h-4 w-4" />Upload bill or receipt</Link><Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-3 text-sm font-semibold text-white transition hover:bg-white/10" href="/free-invoice"><ReceiptIndianRupee className="h-4 w-4" />Create invoice manually</Link></div></div><AiImportPreview /></div></section>

      <BusinessFeatureSections />

      <section className="mx-auto homepage-container px-3 pt-[120px] pb-[100px] sm:px-3">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Free business tools</p><h2 className="mt-4 text-[33.6px] font-bold leading-[1.2] tracking-normal">Solve the job around the invoice.</h2></div><Link className="inline-flex items-center gap-2 self-start text-sm font-bold text-cyan-300 hover:text-cyan-200 sm:self-auto" href="/tools">View all tools <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredTools.map((tool, index) => { const icons = [ReceiptIndianRupee, FileText, FileCheck2, Send]; const ToolIcon = icons[index]; return <Link className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-blue-400/40" href={tool.href} key={tool.href}><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"><ToolIcon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-semibold">{tool.title}</h3><p className="mt-2 text-base leading-6 text-slate-300">{tool.body}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-cyan-300">Open tool <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></Link>; })}</div>
      </section>

      <section className="mx-auto homepage-container px-3 pb-[100px] sm:px-3"><div className="overflow-hidden rounded-[2rem] border border-blue-400/25 bg-blue-600 p-7 text-white sm:p-10"><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">Founding customer offer</p><h2 className="mt-3 max-w-4xl text-[33.6px] font-bold leading-[1.2] tracking-normal">Create your first invoice free. Save your work with Founding Pro.</h2><p className="mt-4 max-w-3xl text-blue-100">The first 1,000 accounts get saved invoices, reminders, reports and business tracking for ₹0. No card or automatic charge.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><PublicPrimaryCta guestHref="/free-invoice" guestLabel="Create free invoice" authedHref="/invoices/new" authedLabel="Create invoice" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-3 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50" /><Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-3 text-sm font-bold text-white transition hover:bg-white/10" href="/pricing">See what is included</Link></div></div></div></section>

      <section id="faq" className="mx-auto homepage-container px-3 pb-[100px] sm:px-3"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Frequently asked</p><h2 className="mt-4 text-[33.6px] font-bold leading-[1.2] tracking-normal">Questions before your first invoice?</h2></div><div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">{faqs.map(([question, answer], index) => <details className="group p-5 sm:p-6" key={question} open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"><span>{question}</span><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-lg text-cyan-300 transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-4xl text-base leading-6 text-slate-300">{answer}</p></details>)}</div></section>

      <PublicSiteFooter />
    </main>
  );
}
