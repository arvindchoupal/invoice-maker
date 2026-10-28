"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Check, Copy, Download, Mail, MessageCircle, RefreshCw } from "lucide-react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import styles from "@/components/tools/PaymentReminder.module.css";

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

export default function PaymentReminderGeneratorClient({seoContent}: {seoContent: ReactNode}) {
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
  const [copyError, setCopyError] = useState("");
  const [edited, setEdited] = useState<{source: string; value: string} | null>(null);

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

  const message = edited?.source === reminder ? edited.value : reminder;
  const amountError = amount !== "" && (!Number.isFinite(Number(amount)) || Number(amount) < 0);
  const canUseMessage = !!message.trim() && !amountError;

  async function copyReminder() {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopyError("Copy is unavailable. Select the message text and copy it manually."); }
  }

  function downloadReminder() {
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payment-reminder-${invoice || "invoice"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetForm() {
    setClient("");
    setBusiness("");
    setLanguage("english");
    setChannel("whatsapp");
    setEdited(null);
    setCopyError("");
    setCopied(false);
    setInvoice("");
    setAmount("");
    setDueDate("");
    setPaymentDetails("");
    setStage("due");
    setTone("friendly");
  }

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const emailParts = message.match(/^Subject: (.*)\n\n([\s\S]*)$/);
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailParts?.[1] ?? "Invoice payment reminder")}&body=${encodeURIComponent(emailParts?.[2] ?? message)}`;

  return (
    <main className={`${styles.page} min-h-screen`}>
      <section id="payment-reminder-tool" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-7"><p className="text-xs font-semibold uppercase tracking-widest text-[var(--guide-accent)]">Free payment reminder generator</p><h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-[var(--guide-heading)] sm:text-4xl">{tool.headline}</h1><p className="mt-3 max-w-3xl text-sm leading-7">{tool.metaDescription}</p></header>
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className={styles.panel}>
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-semibold text-[var(--guide-heading)]">Generate your reminder</h2><p className="mt-2 text-sm text-[var(--guide-muted)]">Enter your invoice details and choose a style.</p></div><button className="inline-flex items-center gap-2 rounded-lg border border-[var(--guide-border)] px-3 py-2 text-xs font-semibold hover:bg-[var(--guide-soft)]" onClick={resetForm} type="button"><RefreshCw className="h-3.5 w-3.5" />Reset</button></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Client name"><input value={client} onChange={e=>setClient(e.target.value)} placeholder="e.g. Rahul" /></Field>
              <Field label="Your business name"><input value={business} onChange={e=>setBusiness(e.target.value)} placeholder="e.g. Sharma Design Studio" /></Field>
              <Field label="Invoice number"><input value={invoice} onChange={e=>setInvoice(e.target.value)} placeholder="INV-2026-104" /></Field>
              <Field label="Outstanding amount (₹)"><input aria-invalid={amountError} min="0" step="0.01" type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="25000" /></Field>
              <Field label="Payment due date"><input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} /></Field>
              <Field label="Reminder stage"><select value={stage} onChange={e=>setStage(e.target.value as Stage)}>{Object.entries(stageLabels).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></Field>
            </div>
            {amountError && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-300">Enter a valid outstanding amount of zero or more.</p>}
            <div className="mt-6 grid gap-5 border-t border-[var(--guide-border)] pt-6">
              <ChoiceGroup label="Tone" value={tone} onChange={value=>setTone(value as Tone)} options={[["friendly","Friendly"],["professional","Professional"],["firm","Firm"]]} />
              <ChoiceGroup label="Language" value={language} onChange={value=>setLanguage(value as Language)} options={[["english","English"],["hinglish","Hinglish"]]} />
              <ChoiceGroup label="Message format" value={channel} onChange={value=>setChannel(value as Channel)} options={[["whatsapp","WhatsApp"],["email","Email"],["sms","SMS"]]} />
              <Field label="Payment link, UPI or bank note (optional)"><input value={paymentDetails} onChange={e=>setPaymentDetails(e.target.value)} placeholder="UPI: yourname@upi or payment link" /></Field>
            </div>
          </div>
          <aside className={`${styles.panel} lg:sticky lg:top-24`} aria-label="Payment reminder preview">
            <div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-widest text-[var(--guide-accent)]">{channel} reminder preview</p><h2 className="mt-2 text-xl font-semibold text-[var(--guide-heading)]">Your message, ready to review</h2></div><span className="text-xs text-[var(--guide-muted)]">{message.length} characters</span></div>
            <label className="mt-5 block"><span className="sr-only">Edit reminder message</span><textarea className={styles.message} value={message} onChange={e=>setEdited({source:reminder,value:e.target.value})} spellCheck /></label>
            <p className="mt-3 text-xs leading-6 text-[var(--guide-muted)]">Edit the wording here before sharing. Changing invoice details refreshes this draft. Nothing is sent automatically.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><button disabled={!canUseMessage} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-40" onClick={copyReminder} type="button">{copied?<Check className="h-4 w-4" />:<Copy className="h-4 w-4" />}{copied?"Copied":"Copy reminder"}</button>
              {channel === "whatsapp" ? <a aria-disabled={!canUseMessage} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 aria-disabled:pointer-events-none aria-disabled:opacity-40" href={canUseMessage?whatsAppUrl:undefined} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />Open WhatsApp</a> : channel === "email" ? <a aria-disabled={!canUseMessage} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--guide-border)] px-4 text-sm font-semibold text-[var(--guide-accent)] aria-disabled:pointer-events-none aria-disabled:opacity-40" href={canUseMessage?emailUrl:undefined}><Mail className="h-4 w-4" />Open email app</a> : <button disabled={!canUseMessage} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--guide-border)] px-4 text-sm font-semibold disabled:opacity-40" onClick={downloadReminder} type="button"><Download className="h-4 w-4" />Download message</button>}
            </div>
            {channel!=="sms" && <button disabled={!canUseMessage} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--guide-border)] text-xs font-semibold text-[var(--guide-accent)] disabled:opacity-40" onClick={downloadReminder} type="button"><Download className="h-3.5 w-3.5" />Download as text file</button>}
            {copyError && <p role="alert" className="mt-3 text-sm">{copyError}</p>}
            <p role="status" aria-live="polite" className="mt-2 text-xs text-[var(--guide-accent)]">{copied?"Reminder copied to clipboard.":""}</p>
            {channel==="sms" && <p className="mt-3 text-xs leading-6 text-[var(--guide-muted)]">SMS apps may split a long reminder into multiple messages. Shorten the draft to fit your needs.</p>}
          </aside>
        </div>
      </section>
      {seoContent}
      <PublicSiteFooter />
    </main>
  );
}

function Field({label,children}: {label:string;children:ReactNode}) {
  return <label className={styles.formField}><span>{label}</span>{children}</label>;
}

function ChoiceGroup({label,value,options,onChange}: {label:string;value:string;options:Array<[string,string]>;onChange:(value:string)=>void}) {
  return <fieldset><legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--guide-muted)]">{label}</legend><div className="flex flex-wrap gap-2">{options.map(([optionValue,optionLabel])=><button key={optionValue} type="button" aria-pressed={value===optionValue} onClick={()=>onChange(optionValue)} className={`min-h-11 flex-1 rounded-xl border px-4 py-2 text-xs font-semibold ${value===optionValue?"border-[var(--guide-accent)] bg-[var(--guide-soft)] text-[var(--guide-accent)]":"border-[var(--guide-border)] text-[var(--guide-text)] hover:bg-[var(--guide-soft)]"}`}>{optionLabel}</button>)}</div></fieldset>;
}
