"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { invoiceNumberFaqs } from "@/lib/invoice-number-content";
import { toolByHref } from "@/lib/tools-catalog";
import { Field, inputClass } from "@/components/ui";

const tool = toolByHref("/tools/invoice-number-generator")!;

export default function InvoiceNumberGeneratorClient() {
  const [prefix, setPrefix] = useState("INV");
  const [next, setNext] = useState(1);
  const [digits, setDigits] = useState(4);
  const [copied, setCopied] = useState(false);
  const cleanPrefix = prefix.trim().toUpperCase().replace(/\s+/g, "-") || "INV";
  const safeNext = Number.isFinite(next) ? Math.max(0, next) : 1;
  const number = `${cleanPrefix}-${String(safeNext).padStart(digits, "0")}`;

  async function copyNumber() {
    await navigator.clipboard.writeText(number);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <ToolPageLayout after={<InvoiceNumberSeoSections />} tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Free invoice number generator</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Create a copy-ready invoice ID for GST bills, freelancers, agencies and small businesses.</p>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["INV", "Simple"],
              ["FY26", "Financial year"],
              ["GST-2026", "GST series"],
              ["CLIENT", "Client-wise"],
            ].map(([value, label]) => (
              <button
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100"
                key={value}
                onClick={() => setPrefix(value)}
                type="button"
              >
                <span className="block font-semibold text-white">{value}</span>
                <span className="text-xs text-slate-500">{label}</span>
              </button>
            ))}
          </div>
          <Field label="Prefix">
            <input className={inputClass} value={prefix} onChange={(e) => setPrefix(e.target.value.toUpperCase())} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Next number">
              <input className={inputClass} min={0} type="number" value={next} onChange={(e) => setNext(Number(e.target.value))} />
            </Field>
            <Field label="Digits">
              <select className={inputClass} value={digits} onChange={(e) => setDigits(Number(e.target.value))}>
                {[3, 4, 5, 6].map((value) => <option className="bg-slate-950" key={value} value={value}>{value} digits</option>)}
              </select>
            </Field>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Generated invoice number</p>
            <p className="mt-2 break-all text-3xl font-semibold text-white">{number}</p>
          </div>
          <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/10" onClick={copyNumber} type="button">
            {copied ? "Copied" : "Copy invoice number"}
          </button>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/invoices/new">
            Create invoice with this number
          </Link>
          <Link className="text-center text-sm font-semibold text-cyan-300 underline-offset-2 hover:underline" href="/tools/gst-bill-format-generator">
            Need GST fields too? Open GST bill format generator
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}

const formatExamples = [
  ["Sequential", "INV-0001"],
  ["Monthly", "INV-2026-05-001"],
  ["Financial Year", "FY26-0001"],
  ["Client Based", "ABC-0001"],
  ["GST Invoice", "GST-2026-0001"],
];

const realExamples = [
  "INV-0001",
  "INV-0002",
  "INV-2026-001",
  "INV-2026-05-001",
  "FY26-0001",
  "FY26-DEL-001",
  "GST-2026-0001",
  "GST-FY26-001",
  "ABC-0001",
  "CLIENT-RAJ-001",
  "AGENCY-001",
  "CONSULT-2026-001",
  "CONTRACT-0001",
  "TAX-INV-001",
  "IW-2026-0001",
];

function InvoiceNumberSeoSections() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Guide</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Invoice Number Generator</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              An invoice number generator helps create clean, unique invoice numbers for business billing. Invoice numbers matter because every invoice needs a reference that can be searched, shared with customers, matched with payments and used in accounting records.
            </p>
            <p>
              For Indian businesses, freelancers, agencies, contractors and GST billing, a consistent invoice numbering system is especially useful. It helps avoid duplicate invoices, keeps customer support easier and creates a clearer audit trail. Whether you use a simple invoice number format like INV-0001 or a financial year format like FY26-0001, the goal is the same: every invoice should have one unique reference number.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">What Is an Invoice Number?</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              An invoice number is a unique identifier assigned to an invoice. It can include letters, numbers, dates, financial year codes or client codes. Examples include INV-0001, FY26-0001 and GST-2026-0001.
            </p>
            <p>
              The accounting purpose of an invoice number is simple: it connects the invoice, customer, payment and business record. When a customer calls about a bill, they can mention the invoice reference number. When you check your bank statement, you can match payment to invoice. When your accountant reviews records, a proper invoice numbering format makes the trail easier to follow.
            </p>
          </div>
        </article>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Why Every Invoice Needs a Unique Invoice Number</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ["Record keeping", "Unique invoice numbers make it easier to search old invoices and organize monthly or yearly billing records."],
              ["GST compliance", "GST invoices should follow a clear invoice sequence so records are easier to explain and review."],
              ["Faster customer support", "Customers can quote an invoice reference number instead of describing the whole job or purchase."],
              ["Easier bookkeeping", "Invoice numbers help match payments, invoices, client records and reports."],
            ].map(([title, body]) => (
              <InfoCard body={body} title={title} key={title} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Invoice Number Format Examples</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-3">Format</th><th className="p-3">Example</th></tr>
              </thead>
              <tbody>
                {formatExamples.map(([format, example]) => (
                  <tr className="border-t border-white/10" key={format}>
                    <td className="p-3 font-semibold text-white">{format}</td>
                    <td className="p-3 text-slate-300">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Invoice Numbering System for Small Businesses</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              A small business invoice numbering system should be simple enough to use every day. Start with a prefix such as INV, add a year or financial year if useful, and use a sequential number with enough digits. For example, a freelancer can use INV-0001, while a GST business may prefer FY26-0001. Agencies and contractors may add client or project codes, but avoid making the format too long.
            </p>
            <p>
              The best invoice numbering format India users can choose is usually the one that their team can follow consistently. A solo consultant does not need a complex invoice ID generator format. INV-0001 may be enough. A growing agency may prefer AGENCY-FY26-001 because it shows business type and financial year. A contractor handling multiple sites may use PROJECT-001 or CLIENT-001, but only if those codes are easy to understand later.
            </p>
            <p>
              Keep your invoice numbering system separate from quotations, purchase orders and receipts. For example, use QT-0001 for quotations and INV-0001 for invoices. This keeps records cleaner when a quotation is approved and later converted into a tax invoice. If you use InvoiceWala for billing, you can generate the invoice reference number first, then create the invoice with the same number.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">GST Invoice Number Format in India</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              GST invoice number format in India should be consecutive and easy to track. Many businesses use financial year logic such as FY26-0001 or GST-2026-0001. The exact format can be chosen by the business, but duplicate numbers and random sequences should be avoided.
            </p>
            <p>
              GST record requirements make consistency important. If an invoice is cancelled, keep a record instead of reusing the number for a different invoice. If you need GST calculations before billing, use the [GST Calculator](/tools/gst-calculator). For GST-ready billing, use the [GST Invoice Maker](/gst-invoice-generator).
            </p>
            <p>
              A GST invoice number does not need to be complicated, but it should make sense when you look back after months. A format such as GST-FY26-0001 clearly shows that it is a GST invoice series for financial year 2025-26. A format such as INV-2026-05-001 can be useful if you want monthly grouping. Avoid changing the structure in the middle of a financial year unless there is a clear reason.
            </p>
            <p>
              For tax invoice number format, many Indian businesses prefer to include either INV or GST as a prefix. The prefix helps separate tax invoices from quotations, receipts or internal documents. If your accountant already follows a preferred numbering system, keep that structure and use this invoice serial number generator to produce the next clean number.
            </p>
          </div>
        </article>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Invoice Numbering Scenarios</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ["Freelancer", "A freelancer can use INV-0001 or FY26-001. This is simple for project invoices, retainers and repeat client billing."],
              ["Agency", "An agency may use INV-FY26-001 or CLIENT-001 when handling many clients and recurring monthly invoices."],
              ["Contractor", "A contractor can use SITE-001 or CONTRACT-0001 for project billing, labor milestones and material invoices."],
              ["GST business", "A GST registered business may use GST-2026-0001 or FY26-0001 to keep tax invoice records clean."],
              ["Retail shop", "A shop can use BILL-0001 or INV-0001 for customer invoices, especially when PDF invoices are issued."],
              ["Consultant", "A consultant can use CONSULT-001 or INV-2026-001 for advisory invoices and monthly retainers."],
            ].map(([title, body]) => <InfoCard body={body} title={title} key={title} />)}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Invoice Number Examples</h2>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {realExamples.map((example) => (
              <code className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-cyan-100" key={example}>{example}</code>
            ))}
          </div>
        </section>

        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">How to Choose the Right Invoice Number Format</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Choose your invoice number format based on how you search records. If you usually search by customer name, a simple sequential number is enough. If your accountant reviews invoices by financial year, use a financial year prefix. If your business has many branches, teams or project sites, add a short location or client code only when it genuinely helps.
            </p>
            <p>
              For most freelancers and small businesses, the safest format is INV-0001 or FY26-0001. These formats are short, easy to read and easy to continue. Avoid formats that depend on too many details, such as customer initials, month, service type and project code all in one number. Long invoice IDs look organized at first but become hard to maintain when work gets busy.
            </p>
            <p>
              Resetting invoice numbers should also be handled carefully. Some businesses reset numbering every financial year, such as FY26-0001 and FY27-0001. Others keep one lifetime sequence, such as INV-0001 to INV-9999. Both can work if the system is consistent. If you are GST registered, discuss your preferred numbering method with your accountant and keep a clear record. The right system is the one your business can follow without confusion.
            </p>
          </div>
        </article>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Common Invoice Number Mistakes</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ["Duplicate numbers", "Using the same invoice number twice creates confusion for customers and accountants."],
              ["Random numbering", "Random invoice IDs are harder to search and explain."],
              ["Missing sequence", "A broken sequence without notes can make records look messy."],
              ["Reusing deleted invoices", "Do not reuse a deleted or cancelled invoice number for a different customer."],
            ].map(([title, body]) => <InfoCard body={body} title={title} key={title} />)}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Invoice Number Generator vs Excel</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-3">Area</th><th className="p-3">Invoice Number Generator</th><th className="p-3">Excel</th></tr>
              </thead>
              <tbody>
                {[
                  ["Speed", "Generates the next number quickly", "Requires manual edits"],
                  ["Consistency", "Keeps prefix and digit format clean", "Easy to type inconsistent values"],
                  ["Duplicate risk", "Lower when connected to invoice workflow", "Higher if files are copied"],
                  ["Record management", "Works better with saved invoices", "Depends on manual file tracking"],
                ].map((row) => (
                  <tr className="border-t border-white/10" key={row[0]}>
                    {row.map((cell, index) => <td className={`p-3 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">How to Generate Invoice Numbers Automatically</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Automatic invoice numbering removes the need to remember the last invoice manually. In a manual system, you may copy an old invoice and forget to update the number. In an online workflow, the next invoice number can be generated before the invoice is created. This keeps business invoicing cleaner and reduces duplicate invoice mistakes.
          </p>
          <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
            <li>Choose a prefix such as INV, GST or FY26.</li>
            <li>Choose the starting number, such as 1 or 1001.</li>
            <li>Use enough digits, such as 0001 or 00001.</li>
            <li>Generate the invoice number before creating the bill.</li>
            <li>Use the number in your invoice and do not reuse it.</li>
            <li>
              Create the invoice using the{" "}
              <Link className="font-semibold text-cyan-300 underline-offset-2 hover:underline" href="/free-invoice-generator">
                Invoice Generator
              </Link>
              .
            </li>
          </ol>
        </article>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Best Practices for Invoice Numbering</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            A good invoice numbering system should be boring in the best way: predictable, easy to read and hard to duplicate. The goal is not to create a fancy code. The goal is to make every invoice easy to identify when a customer, accountant or team member asks about it later.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Use one clear prefix.",
              "Keep every invoice number unique.",
              "Use leading zeros for clean sorting.",
              "Avoid changing formats too often.",
              "Use financial year logic if it helps reporting.",
              "Do not reuse cancelled invoice numbers.",
              "Keep quotation numbers separate from invoice numbers.",
              "Use client codes only when needed.",
              "Document any skipped or voided invoice.",
              "Use software when invoices become frequent.",
            ].map((tip) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300" key={tip}>{tip}</div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Related Tools</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Invoice numbering is only one part of billing. After generating the invoice number, you can create the invoice, calculate GST, prepare a quotation or use an invoice template that fits your business.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <ToolLink href="/tools/gst-calculator" title="GST Calculator" />
            <ToolLink href="/free-invoice-generator" title="Invoice Generator" />
            <ToolLink href="/gst-invoice-generator" title="GST Invoice Maker" />
            <ToolLink href="/quotation-maker" title="Quotation Maker" />
            <ToolLink href="/invoice-template-india" title="Invoice Template India" />
            <ToolLink href="/tools/tax-calculator" title="Tax Calculator" />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {invoiceNumberFaqs.map(([question, answer]) => (
              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={question}>
                <h3 className="font-semibold text-white">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6 text-center">
          <h2 className="text-2xl font-semibold text-white">Generate your next invoice number</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Generate a clean invoice number instantly and use it in your next invoice with InvoiceWala.
          </p>
          <Link className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950" href="/free-invoice">
            Create invoice
          </Link>
        </section>
      </div>
    </section>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
    </article>
  );
}

function ToolLink({ href, title }: { href: string; title: string }) {
  return (
    <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100" href={href}>
      {title}
    </Link>
  );
}
