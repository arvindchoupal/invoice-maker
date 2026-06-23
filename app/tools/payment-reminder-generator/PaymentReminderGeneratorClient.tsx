"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Copy, Download, Mail, MessageCircle, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Field, inputClass } from "@/components/ui";
import { paymentReminderFaqs, paymentReminderKeywords } from "@/lib/payment-reminder-content";
import { toolByHref } from "@/lib/tools-catalog";

const tool = toolByHref("/tools/payment-reminder-generator")!;

type Stage = "before" | "due" | "overdue7" | "overdue15" | "final";
type Tone = "friendly" | "professional" | "firm";
type Language = "english" | "hinglish";
type Channel = "whatsapp" | "email" | "sms";

const stageLabels: Record<Stage, string> = {
  before: "Due soon",
  due: "Due today",
  overdue7: "1–7 days overdue",
  overdue15: "8–15 days overdue",
  final: "Final reminder",
};

function formatDate(value: string) {
  if (!value) return "the agreed due date";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function formatAmount(value: string) {
  const amount = Number(value || 0);
  return amount ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount) : "the outstanding amount";
}

export default function PaymentReminderGeneratorClient() {
  const [client, setClient] = useState("Rahul");
  const [business, setBusiness] = useState("Sharma Design Studio");
  const [invoice, setInvoice] = useState("INV-2026-104");
  const [amount, setAmount] = useState("25000");
  const [dueDate, setDueDate] = useState("2026-06-20");
  const [stage, setStage] = useState<Stage>("overdue7");
  const [tone, setTone] = useState<Tone>("friendly");
  const [language, setLanguage] = useState<Language>("english");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [paymentDetails, setPaymentDetails] = useState("UPI: sharmadesign@upi");
  const [copied, setCopied] = useState(false);

  const reminder = useMemo(() => {
    const name = client.trim() || "there";
    const sender = business.trim() || "our team";
    const invoiceRef = invoice.trim() || "your invoice";
    const money = formatAmount(amount);
    const due = formatDate(dueDate);

    const englishOpenings: Record<Stage, string> = {
      before: `Just a friendly reminder that invoice ${invoiceRef} for ${money} is due on ${due}.`,
      due: `This is a friendly reminder that invoice ${invoiceRef} for ${money} is due today, ${due}.`,
      overdue7: `I wanted to follow up on invoice ${invoiceRef} for ${money}, which was due on ${due}.`,
      overdue15: `Our records show that invoice ${invoiceRef} for ${money}, due on ${due}, is still outstanding.`,
      final: `This is a final payment reminder for invoice ${invoiceRef} for ${money}, originally due on ${due}.`,
    };
    const hinglishOpenings: Record<Stage, string> = {
      before: `Ek friendly reminder: invoice ${invoiceRef} ka ${money} payment ${due} ko due hai.`,
      due: `Friendly reminder: invoice ${invoiceRef} ka ${money} payment aaj, ${due}, due hai.`,
      overdue7: `Invoice ${invoiceRef} ke ${money} payment ke regarding follow up kar raha/rahi hoon. Due date ${due} thi.`,
      overdue15: `Hamare records ke according invoice ${invoiceRef} ka ${money} payment abhi pending hai. Due date ${due} thi.`,
      final: `Yeh invoice ${invoiceRef}, amount ${money}, ke liye final payment reminder hai. Original due date ${due} thi.`,
    };
    const englishRequests: Record<Tone, string> = {
      friendly: "Could you please check and let me know when the payment is likely to be processed? If it has already been paid, kindly ignore this message.",
      professional: "Please arrange the payment at the earliest and share the expected payment date. If payment has already been processed, please send the transaction reference.",
      firm: "Please process the outstanding payment immediately or confirm a specific payment date. Continued delay may require us to pause further work or apply the agreed late-payment terms.",
    };
    const hinglishRequests: Record<Tone, string> = {
      friendly: "Please ek baar check karke expected payment date bata dijiye. Agar payment already ho gaya hai toh is message ko ignore kar sakte hain.",
      professional: "Kindly payment earliest possible date par process karke expected date confirm kar dijiye. Payment ho chuka ho toh transaction reference share kar dein.",
      firm: "Please outstanding payment immediately process karein ya ek confirmed payment date share karein. Further delay par ongoing work hold ya agreed late-payment terms apply ho sakte hain.",
    };
    const opening = language === "hinglish" ? hinglishOpenings[stage] : englishOpenings[stage];
    const request = language === "hinglish" ? hinglishRequests[tone] : englishRequests[tone];
    const payment = paymentDetails.trim() ? `${language === "hinglish" ? "Payment details" : "Payment details"}: ${paymentDetails.trim()}` : "";

    if (channel === "email") {
      const subject = stage === "final" ? `Final payment reminder: ${invoiceRef}` : `Payment reminder: ${invoiceRef}`;
      return `Subject: ${subject}\n\nHi ${name},\n\n${opening}\n\n${request}${payment ? `\n\n${payment}` : ""}\n\nThank you,\n${sender}`;
    }
    if (channel === "sms") {
      return `Hi ${name}, ${opening} ${request}${payment ? ` ${payment}` : ""} - ${sender}`;
    }
    return `Hi ${name} 👋\n\n${opening}\n\n${request}${payment ? `\n\n${payment}` : ""}\n\nThank you,\n${sender}`;
  }, [amount, business, channel, client, dueDate, invoice, language, paymentDetails, stage, tone]);

  async function copyReminder() {
    await navigator.clipboard.writeText(reminder);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadReminder() {
    const blob = new Blob([reminder], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payment-reminder-${invoice || "invoice"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetForm() {
    setClient("");
    setInvoice("");
    setAmount("");
    setDueDate("");
    setPaymentDetails("");
    setStage("due");
    setTone("friendly");
  }

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(reminder)}`;
  const emailParts = reminder.match(/^Subject: (.*)\n\n([\s\S]*)$/);
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailParts?.[1] ?? "Invoice payment reminder")}&body=${encodeURIComponent(emailParts?.[2] ?? reminder)}`;

  return (
    <ToolPageLayout after={<PaymentReminderSeoContent />} tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Generate your reminder</h2>
            <p className="mt-1 text-sm text-slate-400">Nothing is sent automatically. Review before sharing.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5" onClick={resetForm} type="button">
            <RefreshCw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Client name"><input className={inputClass} value={client} onChange={(e) => setClient(e.target.value)} placeholder="e.g. Rahul" /></Field>
          <Field label="Your business name"><input className={inputClass} value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="e.g. Sharma Design Studio" /></Field>
          <Field label="Invoice number"><input className={inputClass} value={invoice} onChange={(e) => setInvoice(e.target.value)} placeholder="INV-2026-104" /></Field>
          <Field label="Outstanding amount (₹)"><input className={inputClass} min="0" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="25000" /></Field>
          <Field label="Payment due date"><input className={inputClass} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></Field>
          <Field label="Reminder stage"><select className={inputClass} value={stage} onChange={(e) => setStage(e.target.value as Stage)}>{Object.entries(stageLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field>
        </div>

        <div className="mt-5 grid gap-5 border-t border-white/10 pt-5">
          <ChoiceGroup label="Tone" value={tone} onChange={(value) => setTone(value as Tone)} options={[["friendly", "Friendly"], ["professional", "Professional"], ["firm", "Firm"]]} />
          <ChoiceGroup label="Language" value={language} onChange={(value) => setLanguage(value as Language)} options={[["english", "English"], ["hinglish", "Hinglish"]]} />
          <ChoiceGroup label="Message format" value={channel} onChange={(value) => setChannel(value as Channel)} options={[["whatsapp", "WhatsApp"], ["email", "Email"], ["sms", "SMS"]]} />
          <Field label="Payment link, UPI or bank note (optional)"><input className={inputClass} value={paymentDetails} onChange={(e) => setPaymentDetails(e.target.value)} placeholder="UPI: yourname@upi or payment link" /></Field>
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{channel} reminder preview</p>
            <span className="text-xs text-slate-500">{reminder.length} characters</span>
          </div>
          <pre className="mt-4 max-h-[360px] overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-slate-100">{reminder}</pre>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-200" onClick={copyReminder} type="button">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy reminder"}
          </button>
          {channel === "whatsapp" ? (
            <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white hover:bg-emerald-400" href={whatsAppUrl} rel="noreferrer" target="_blank"><MessageCircle className="h-4 w-4" /> Open WhatsApp</a>
          ) : channel === "email" ? (
            <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-500" href={emailUrl}><Mail className="h-4 w-4" /> Open email app</a>
          ) : (
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/5" onClick={downloadReminder} type="button"><Download className="h-4 w-4" /> Download message</button>
          )}
        </div>
        {channel !== "sms" && <button className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5" onClick={downloadReminder} type="button"><Download className="h-3.5 w-3.5" /> Download as text file</button>}
      </div>
    </ToolPageLayout>
  );
}

function ChoiceGroup({ label, value, options, onChange }: { label: string; value: string; options: Array<[string, string]>; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map(([optionValue, optionLabel]) => (
          <button className={`min-h-10 rounded-xl border px-3 text-xs font-semibold transition ${value === optionValue ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-white/10 text-slate-400 hover:bg-white/5"}`} key={optionValue} onClick={() => onChange(optionValue)} type="button">
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

function PaymentReminderSeoContent() {
  const examples = [
    ["Friendly WhatsApp payment reminder", "Hi Rahul 👋 Just following up on invoice INV-2026-104 for ₹25,000, which was due on 20 Jun 2026. Could you please share the expected payment date? Thank you!"],
    ["Professional overdue invoice email", "Subject: Payment reminder for INV-2026-104. This is a reminder that the invoice remains outstanding. Please arrange payment or confirm the processing date."],
    ["Firm final payment reminder", "This is a final reminder for the outstanding invoice. Please process payment immediately or confirm a specific date to avoid further action under the agreed terms."],
    ["Hinglish payment follow-up", "Hi Rahul, invoice INV-2026-104 ka payment abhi pending hai. Please expected payment date confirm kar dijiye. Agar payment ho gaya hai toh reference share kar dein."],
  ];

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-7">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free payment follow-up tool</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Payment Reminder Message Generator for WhatsApp, Email and SMS</h2>
          <div className="mt-5 grid gap-6 text-sm leading-7 text-slate-300 lg:grid-cols-2">
            <div className="space-y-4">
              <p>A payment reminder message helps a freelancer, agency, contractor or small business follow up on an unpaid invoice without sounding rude. Add the invoice number, outstanding amount and due date, then choose a friendly, professional or firm tone.</p>
              <p>This free overdue payment reminder generator creates copy-paste messages for WhatsApp, email and SMS. It also supports Hinglish for Indian client conversations where fully formal English may feel unnatural.</p>
            </div>
            <div className="grid gap-3">
              {["Generate a polite payment reminder in seconds", "Include invoice amount, number and due date", "Switch from friendly follow-up to final reminder", "Add UPI ID, bank note or payment link"].map((item) => <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 font-semibold text-slate-200" key={item}>{item}</div>)}
            </div>
          </div>
        </article>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Copy-paste examples</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Payment reminder message templates</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {examples.map(([title, body]) => <article className="rounded-2xl bg-slate-950/70 p-5" key={title}><h3 className="font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Follow-up sequence</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">When to send payment reminders</h2>
            <div className="mt-5 grid gap-3">
              {[["Before due date", "Send a brief courtesy reminder with the invoice and payment details."], ["On the due date", "Confirm that payment is due and ask whether any document is missing."], ["7 days overdue", "Request an expected processing date and transaction reference."], ["15+ days overdue", "Use a firmer message and refer to agreed payment terms."], ["Final reminder", "State the required action and any contractual next step without threats or abusive language."]].map(([title, body], index) => <div className="grid grid-cols-[32px_1fr] gap-3 rounded-2xl bg-slate-950/70 p-4" key={title}><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300/10 text-xs font-bold text-cyan-200">{index + 1}</span><div><h3 className="font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{body}</p></div></div>)}
            </div>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Better replies</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">How to ask for payment politely</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
              {["Use a clear invoice reference instead of saying only “payment pending”.", "Assume the delay may be accidental in the first reminder.", "Ask for a specific expected payment date.", "Make payment easy by adding UPI, bank or payment-link details.", "Keep WhatsApp reminders shorter than email follow-ups.", "Do not add penalties that were not part of the agreed terms.", "Save follow-up history when an invoice remains unpaid."].map((item) => <li className="rounded-2xl bg-slate-950/70 p-4" key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Use the right channel</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">WhatsApp vs email payment reminders</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400"><tr><th className="p-4">Channel</th><th className="p-4">Best use</th><th className="p-4">Recommended style</th></tr></thead>
              <tbody>
                {[["WhatsApp", "Regular clients and quick follow-up", "Short, conversational and specific"], ["Email", "Formal records and detailed overdue notices", "Clear subject, invoice details and action"], ["SMS", "Brief due-date reminder", "One short message with amount and reference"]].map((row) => <tr className="border-t border-white/10" key={row[0]}>{row.map((cell, index) => <td className={`p-4 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={cell}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Related InvoiceWala tools</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Create, calculate and follow up</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[["/free-invoice-generator", "Free invoice generator"], ["/tools/invoice-number-generator", "Invoice number generator"], ["/tools/gst-calculator", "GST calculator India"], ["/receipt-generator", "Payment receipt generator"]].map(([href, label]) => <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100" href={href} key={href}>{label}</Link>)}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">FAQs</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Payment reminder questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{paymentReminderFaqs.map(([question, answer]) => <article className="rounded-2xl bg-slate-950/70 p-5" key={question}><h3 className="font-semibold text-white">{question}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p></article>)}</div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Related searches</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Payment reminder keywords this tool answers</h2>
          <div className="mt-5 flex flex-wrap gap-2">{paymentReminderKeywords.map((keyword) => <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-slate-300" key={keyword}>{keyword}</span>)}</div>
        </section>

        <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7 text-center">
          <h2 className="text-3xl font-semibold text-white">Create the invoice before you chase the payment</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">Send a professional invoice with a clear number, due date and amount—then track payment status inside InvoiceWala.</p>
          <Link className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950" href="/free-invoice">Create free invoice</Link>
        </section>
      </div>
    </section>
  );
}
