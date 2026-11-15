"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Copy } from "lucide-react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import { toolByHref } from "@/lib/tools-catalog";

const tool = toolByHref("/tools/invoice-due-date-calculator")!;
type Term = "7" | "15" | "30" | "45" | "60" | "90" | "eom" | "custom";
type WeekendRule = "none" | "next" | "previous";

function isoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date);
}

export default function InvoiceDueDateCalculatorClient({ faqs }: { faqs: Array<[string, string]> }) {
  const [invoiceDate, setInvoiceDate] = useState(isoDate(new Date()));
  const [term, setTerm] = useState<Term>("30");
  const [customDays, setCustomDays] = useState("20");
  const [weekendRule, setWeekendRule] = useState<WeekendRule>("none");
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => {
    if (!invoiceDate) return null;
    const start = new Date(`${invoiceDate}T12:00:00`);
    if (Number.isNaN(start.getTime())) return null;
    const due = new Date(start);
    const days = term === "custom" ? Number(customDays) : Number(term);
    if (term === "eom") due.setMonth(due.getMonth() + 1, 0);
    else if (Number.isFinite(days) && days >= 0 && days <= 3650) due.setDate(due.getDate() + days);
    else return null;
    const original = new Date(due);
    if (weekendRule === "next") {
      if (due.getDay() === 6) due.setDate(due.getDate() + 2);
      if (due.getDay() === 0) due.setDate(due.getDate() + 1);
    }
    if (weekendRule === "previous") {
      if (due.getDay() === 6) due.setDate(due.getDate() - 1);
      if (due.getDay() === 0) due.setDate(due.getDate() - 2);
    }
    return { start, due, original, adjusted: due.getTime() !== original.getTime() };
  }, [customDays, invoiceDate, term, weekendRule]);

  async function copyDate() {
    if (!calculation) return;
    await navigator.clipboard.writeText(isoDate(calculation.due));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return <main className="min-h-screen bg-slate-950 text-white">
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Free invoice due date calculator</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{tool.headline}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Start with the invoice date, select the payment term and choose how a Saturday or Sunday should be handled. The result stays in your browser.</p>
      <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">Invoice date<input className="min-h-12 rounded-xl border border-white/15 bg-slate-900 px-4" type="date" value={invoiceDate} onChange={(event) => setInvoiceDate(event.target.value)} /></label>
            <label className="grid gap-2 text-sm font-semibold">Payment term<select className="min-h-12 rounded-xl border border-white/15 bg-slate-900 px-4" value={term} onChange={(event) => setTerm(event.target.value as Term)}>{[["7","Net 7"],["15","Net 15"],["30","Net 30"],["45","Net 45"],["60","Net 60"],["90","Net 90"],["eom","End of invoice month"],["custom","Custom days"]].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            {term === "custom" ? <label className="grid gap-2 text-sm font-semibold">Custom calendar days<input className="min-h-12 rounded-xl border border-white/15 bg-slate-900 px-4" min="0" max="3650" type="number" value={customDays} onChange={(event) => setCustomDays(event.target.value)} /></label> : null}
            <label className="grid gap-2 text-sm font-semibold">If due date falls on a weekend<select className="min-h-12 rounded-xl border border-white/15 bg-slate-900 px-4" value={weekendRule} onChange={(event) => setWeekendRule(event.target.value as WeekendRule)}><option value="none">Keep the calendar date</option><option value="next">Move to next Monday</option><option value="previous">Move to previous Friday</option></select></label>
          </div>
          <p className="mt-5 text-xs leading-6 text-slate-400">This calculator counts calendar days. It does not exclude public holidays. Use a weekend adjustment only when your contract or customer policy requires it.</p>
        </div>
        <aside className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.08] p-6">
          <CalendarDays className="h-7 w-7 text-cyan-300" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Calculated due date</p>
          {calculation ? <><p className="mt-3 text-3xl font-semibold">{formatDate(calculation.due)}</p><p className="mt-3 text-sm leading-6 text-slate-300">Invoice date: {formatDate(calculation.start)}{calculation.adjusted ? ` · Weekend date ${formatDate(calculation.original)} was adjusted.` : " · No weekend adjustment applied."}</p><button className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-bold text-slate-950" onClick={copyDate} type="button"><Copy className="h-4 w-4" />{copied ? "Date copied" : "Copy YYYY-MM-DD"}</button></> : <p className="mt-3 text-sm text-rose-200">Enter a valid date and custom day count.</p>}
        </aside>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
      <h2 className="text-3xl font-semibold">How invoice payment terms change the due date</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-3">{[["Net terms", "Net 7 or Net 30 usually adds that many calendar days to the invoice date. Confirm whether your agreement starts from invoice issue, delivery or acceptance."],["End of month", "This option uses the last calendar day of the invoice month. It is not the same as 30 days after the invoice date."],["Weekend handling", "The unadjusted calendar date is the default. Move it only when the contract or customer policy says weekend dates should shift."]].map(([title,body]) => <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}><CheckCircle2 className="h-5 w-5 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}</div>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Payment terms explained</p>
          <h2 className="mt-3 text-3xl font-semibold">What is an invoice due date?</h2>
          <p className="mt-5 leading-8 text-slate-300">An invoice due date is the calendar date by which the customer is expected to pay the amount shown on an invoice. It is different from the invoice date. The invoice date records when the bill was issued, while the due date tells the customer when payment should reach you.</p>
          <p className="mt-4 leading-8 text-slate-300">For example, if an invoice is issued on 1 November with Net 30 terms, its calculated due date is 1 December when the agreement counts 30 calendar days from the invoice date. If the agreement says payment is due 30 days after delivery or approval, the correct starting date may be different. The written agreement should decide the rule.</p>
          <p className="mt-4 leading-8 text-slate-300">A clear date is easier to understand than a vague note such as “pay soon”. It helps the customer schedule payment, gives an accounts team a specific deadline and makes later payment reminders easier to support with the original invoice.</p>
        </article>
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold">Details to show with the due date</h3>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            {["Invoice number and invoice date", "The exact payment due date", "The agreed term, such as Net 15 or Net 30", "The amount payable and any advance already received", "Accepted payment method and payment reference", "Any genuine milestone, approval or purchase-order reference"].map((item) => <li className="flex gap-3" key={item}><CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-cyan-300" /><span>{item}</span></li>)}
          </ul>
          <p className="mt-5 rounded-xl bg-slate-950/70 p-4 text-sm leading-7 text-slate-400">Example invoice note: “Payment is due by 15 November 2026 under the agreed Net 15 term. Please use INV-2026-104 as the payment reference.”</p>
        </aside>
      </div>
    </section>

    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Worked examples</p>
        <h2 className="mt-3 text-3xl font-semibold">Invoice due date calculation examples</h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">These examples use calendar days and do not remove public holidays. They are illustrations only; use the dates and terms from your actual agreement.</p>
        <div className="mt-7 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-300"><tr><th className="p-4">Invoice date</th><th className="p-4">Payment term</th><th className="p-4">Calculation</th><th className="p-4">Due date</th><th className="p-4">Practical note</th></tr></thead>
            <tbody className="text-slate-300">
              {[
                ["1 November 2026", "Net 7", "1 Nov + 7 days", "8 November 2026", "Keep this date unless the agreement moves Sunday deadlines."],
                ["1 November 2026", "Net 15", "1 Nov + 15 days", "16 November 2026", "Useful for short freelance or service payment cycles."],
                ["1 November 2026", "Net 30", "1 Nov + 30 days", "1 December 2026", "Net 30 does not always mean the last day of the month."],
                ["18 November 2026", "End of month", "Last day of invoice month", "30 November 2026", "This differs from 30 calendar days after 18 November."],
                ["15 November 2026", "Custom 20 days", "15 Nov + 20 days", "5 December 2026", "Use only when 20 days is the agreed term."],
              ].map((row) => <tr className="border-t border-white/10" key={row.join("-")}>{row.map((cell,index) => <td className={`p-4 leading-6 ${index === 3 ? "font-semibold text-white" : ""}`} key={cell}>{cell}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Choose the right term</p><h2 className="mt-3 text-3xl font-semibold">Net 7, Net 15, Net 30 and other common invoice terms</h2><p className="mt-4 leading-8 text-slate-300">The best term is the one both sides agreed before the invoice was issued. A shorter term can help cash flow, but it should still give the customer enough time to review and process the bill. Larger companies may need longer approval cycles than an individual customer.</p></div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[
          ["Due on receipt", "Payment is requested when the customer receives the invoice. Write the actual due date too, because the delivery time may otherwise be unclear."],
          ["Net 7", "Payment is normally due seven calendar days after the chosen starting date. It can suit small jobs and fast-moving service work."],
          ["Net 15", "A fifteen-day window gives the customer more processing time while keeping the collection cycle relatively short."],
          ["Net 30", "A common business term that normally means 30 calendar days after the invoice date. It is not automatically the same date in the next month."],
          ["Net 45, 60 or 90", "Longer terms are common in some corporate arrangements. Confirm that the price and cash-flow plan account for the longer wait."],
          ["End of month", "Payment is due on the final calendar day of the invoice month in this calculator. Some agreements use different EOM wording, so read the contract carefully."],
        ].map(([title,body]) => <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-2">
      <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
        <h2 className="text-2xl font-semibold">Weekend and public-holiday handling</h2>
        <p className="mt-4 leading-8 text-slate-300">Net terms usually count calendar days, so Saturdays and Sundays remain part of the count. The question is what to do when the final due date itself lands on a weekend. Some agreements keep the date, while others move it to the next working day or the previous working day.</p>
        <p className="mt-4 leading-8 text-slate-300">The calculator makes that decision visible instead of assuming a rule. It does not maintain a public-holiday calendar. If a bank holiday, regional holiday or company closure affects payment processing, check the agreement and confirm the practical date with the customer.</p>
      </article>
      <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
        <h2 className="text-2xl font-semibold">Calendar days versus business days</h2>
        <p className="mt-4 leading-8 text-slate-300">This tool calculates calendar days. If your agreement says “10 business days”, do not enter 10 as a custom calendar-day term and assume the result is correct. Business-day calculations can depend on weekends, public holidays and the locations named in the agreement.</p>
        <p className="mt-4 leading-8 text-slate-300">When the wording is unclear, ask the customer or the person who approved the work to confirm the intended date. Then show that exact date on the invoice so neither side has to calculate it again.</p>
      </article>
    </section>

    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <h2 className="text-3xl font-semibold">How different businesses can use the calculator</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Freelancers", "Calculate the deadline for project, hourly or retainer invoices and include the date in the client message."],
            ["Agencies and consultants", "Match the due date to the signed proposal, purchase order, milestone approval or monthly service agreement."],
            ["Shops and service businesses", "Use the agreed credit period for customer bills instead of leaving the payment date open-ended."],
            ["Small finance teams", "Check the date before recording a receivable or scheduling a polite reminder for an unpaid invoice."],
          ].map(([title,body]) => <article className="rounded-2xl border border-white/10 bg-slate-950 p-5" key={title}><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
      <h2 className="text-3xl font-semibold">Common due-date mistakes to avoid</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {[
          ["Confusing Net 30 with the next month-end", "Thirty calendar days after an invoice date can be different from the last day of that month or the same numbered date next month."],
          ["Starting from the wrong event", "Some terms start from invoice issue; others start from delivery, acceptance or receipt. Use the event named in the agreement."],
          ["Changing the agreed term on the invoice", "Do not shorten or extend a payment period without agreement. The invoice should reflect the commercial terms already accepted."],
          ["Silently removing weekends or holidays", "If the agreement does not specify an adjustment, show the calendar result and discuss any practical change with the customer."],
          ["Leaving only vague wording", "Write the exact date as well as the term. “Net 30 — due 1 December 2026” is clearer than “payment due soon”."],
          ["Sending a reminder for the original total", "If the customer made a partial payment, follow up for the remaining balance and refer to the correct due date and invoice number."],
        ].map(([title,body]) => <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={title}><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><h2 className="text-2xl font-semibold">Use the date in your billing workflow</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Add the calculated date to the invoice, keep the agreed term in the notes and send a reminder only when it matches the real payment status. Keep the invoice number in every follow-up so the customer can identify the bill quickly.</p><div className="mt-5 flex flex-wrap gap-3"><Link className="rounded-xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950" href="/free-invoice">Create an invoice</Link><Link className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold" href="/tools/payment-reminder-generator">Create a payment reminder</Link></div></div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6"><h2 className="text-3xl font-semibold">Invoice due date FAQs</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(([question,answer]) => <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}><h3 className="font-semibold">{question}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{answer}</p></article>)}</div></section>
    <PublicSiteFooter />
  </main>;
}
