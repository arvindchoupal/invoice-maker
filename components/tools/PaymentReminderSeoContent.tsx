import Link from "next/link";
import styles from "./PaymentReminder.module.css";
import { paymentReminderFaqs, paymentReminderKeywords } from "@/lib/payment-reminder-content";

export function PaymentReminderSeoContent() {
  const examples = [
    ["Friendly WhatsApp payment reminder", "Hi Rahul 👋 Just following up on invoice INV-2026-104 for ₹25,000, which was due on 20 Jun 2026. Could you please share the expected payment date? Thank you!"],
    ["Professional overdue invoice email", "Subject: Payment reminder for INV-2026-104. This is a reminder that the invoice remains outstanding. Please arrange payment or confirm the processing date."],
    ["Firm final payment reminder", "This is a final reminder for the outstanding invoice. Please process payment immediately or confirm a specific date to avoid further action under the agreed terms."],
    ["Hinglish payment follow-up", "Hi Rahul, invoice INV-2026-104 ka payment abhi pending hai. Please expected payment date confirm kar dijiye. Agar payment ho gaya hai toh reference share kar dein."],
  ];

  return (
    <section className={`${styles.guide} border-t border-[var(--guide-border)] px-4 py-16 sm:px-6 lg:px-8`} data-reminder-guide>
      <div className="mx-auto grid max-w-6xl gap-12 sm:gap-16">
        <article className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Free payment follow-up tool</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--guide-heading)]">Payment Reminder Message Generator for WhatsApp, Email and SMS</h2>
          <div className="mt-5 grid gap-6 text-sm leading-7 text-[var(--guide-text)] lg:grid-cols-2">
            <div className="space-y-4">
              <p>A payment reminder message helps a freelancer, agency, contractor or small business follow up on an unpaid invoice without sounding rude. Add the invoice number, outstanding amount and due date, then choose a friendly, professional or firm tone.</p>
              <p>This free overdue payment reminder generator creates copy-paste messages for WhatsApp, email and SMS. It also supports Hinglish for Indian client conversations where fully formal English may feel unnatural.</p>
            </div>
            <div className="grid gap-3">
              {["Generate a polite payment reminder in seconds", "Include invoice amount, number and due date", "Switch from friendly follow-up to final reminder", "Add UPI ID, bank note or payment link"].map((item) => <div className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-soft)] p-4 font-semibold text-[var(--guide-text)]" key={item}>{item}</div>)}
            </div>
          </div>
        </article>

        <section className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Copy-paste examples</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--guide-heading)]">Payment reminder message templates</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {examples.map(([title, body]) => <article className="rounded-2xl bg-[var(--guide-soft)] p-5" key={title}><h3 className="font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--guide-muted)]">{body}</p></article>)}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Follow-up sequence</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">When to send payment reminders</h2>
            <div className="mt-5 grid gap-3">
              {[["Before due date", "Send a brief courtesy reminder with the invoice and payment details."], ["On the due date", "Confirm that payment is due and ask whether any document is missing."], ["7 days overdue", "Request an expected processing date and transaction reference."], ["15+ days overdue", "Use a firmer message and refer to agreed payment terms."], ["Final reminder", "State the required action and any contractual next step without threats or abusive language."]].map(([title, body], index) => <div className="grid grid-cols-[32px_1fr] gap-3 rounded-2xl bg-[var(--guide-soft)] p-4" key={title}><span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--guide-soft)] text-xs font-bold text-[var(--guide-accent)]">{index + 1}</span><div><h3 className="font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-1 text-sm leading-6 text-[var(--guide-muted)]">{body}</p></div></div>)}
            </div>
          </article>
          <article className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Better replies</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">How to ask for payment politely</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--guide-text)]">
              {["Use a clear invoice reference instead of saying only “payment pending”.", "Assume the delay may be accidental in the first reminder.", "Ask for a specific expected payment date.", "Make payment easy by adding UPI, bank or payment-link details.", "Keep WhatsApp reminders shorter than email follow-ups.", "Do not add penalties that were not part of the agreed terms.", "Save follow-up history when an invoice remains unpaid."].map((item) => <li className="rounded-2xl bg-[var(--guide-soft)] p-4" key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Use the right channel</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--guide-heading)]">WhatsApp vs email payment reminders</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--guide-border)]">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[var(--guide-soft)] text-xs uppercase tracking-wide text-[var(--guide-muted)]"><tr><th className="p-4">Channel</th><th className="p-4">Best use</th><th className="p-4">Recommended style</th></tr></thead>
              <tbody>
                {[["WhatsApp", "Regular clients and quick follow-up", "Short, conversational and specific"], ["Email", "Formal records and detailed overdue notices", "Clear subject, invoice details and action"], ["SMS", "Brief due-date reminder", "One short message with amount and reference"]].map((row) => <tr className="border-t border-[var(--guide-border)]" key={row[0]}>{row.map((cell, index) => <td className={`p-4 ${index === 0 ? "font-semibold text-[var(--guide-heading)]" : "text-[var(--guide-text)]"}`} key={cell}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </section>


        <section id="reminder-how-to" className="scroll-mt-28"><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">How to create a payment reminder message online</h2><ol className="mt-7 grid gap-5 md:grid-cols-3">{[["Add the invoice details", "Enter the client and business names, invoice number, outstanding balance and agreed due date. Use the remaining balance after any payments already received, rather than automatically repeating the original invoice total."], ["Choose the message style", "Select the reminder stage, tone, language and channel. Choose a stage that matches the invoice status. Friendly, professional and firm change the request; the stage describes when the payment was due."], ["Review, edit and share", "Read the live preview and adjust the wording directly if needed. Copy the message, download it as text or open the selected communication app. You choose the recipient and decide when to send."]].map(([title,body],i)=><li key={title} className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><span className="text-sm font-semibold text-[var(--guide-accent)]">0{i+1}</span><h3 className="mt-3 font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--guide-text)]">{body}</p></li>)}</ol></section>

        <section id="reminder-more-examples" className="scroll-mt-28"><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">More payment follow-up examples for everyday situations</h2><p className="mt-4 max-w-3xl leading-8 text-[var(--guide-text)]">These sample messages show how the same invoice details can support different conversations. Replace the example names, references, dates and amounts before using them. Match the wording to what you have already agreed with the customer.</p><div className="mt-7 grid gap-5 md:grid-cols-2">{[["Gentle reminder before the due date", "Hi Rahul, a quick reminder that invoice INV-2026-104 for ₹25,000 is due on 20 June. Please let me know if you need the invoice or payment details again. Thank you, Sharma Design Studio.", "A courtesy reminder can help surface a missing invoice or approval before the payment date."], ["Payment due today", "Hi Rahul, invoice INV-2026-104 for ₹25,000 is due today, 20 June. Could you please confirm whether payment is scheduled? If anything is needed from our side, please let us know.", "Use the due-today stage only when the selected due date is today."], ["Reminder after a partial payment", "Hi Rahul, thank you for the ₹10,000 payment against invoice INV-2026-104. The remaining balance is ₹15,000. Could you please confirm when that balance will be processed?", "Enter only the unpaid balance in the generator and add the payment acknowledgement in the editable preview."], ["Request after a missed payment promise", "Hi Rahul, following up on invoice INV-2026-104. You mentioned that payment would be processed on Friday, but it is not showing in our records yet. Could you please check and share an updated date or transaction reference?", "Refer to the actual conversation rather than adding a promised date that the client has not confirmed."]].map(([title,message,note])=><article key={title} className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h3 className="font-semibold text-[var(--guide-heading)]">{title}</h3><blockquote className="mt-4 rounded-xl bg-[var(--guide-soft)] p-4 text-sm leading-7 text-[var(--guide-text)]">{message}</blockquote><p className="mt-4 text-xs leading-6 text-[var(--guide-muted)]">{note}</p></article>)}</div></section>

        <section className="grid gap-6 lg:grid-cols-2"><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h2 className="text-2xl font-semibold text-[var(--guide-heading)]">What to include in a clear payment follow-up</h2><p className="mt-4 leading-8 text-[var(--guide-text)]">A useful payment reminder gives the customer enough context to identify the bill without searching through a long chat. Start with the invoice reference and the amount still owed. Add the original due date and a specific request, such as confirming the processing date or sharing a transaction reference.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">Include payment instructions only when they help the recipient take the next step. A familiar UPI ID, payment link or agreed bank note can make the message practical. Check those details carefully before sharing, especially when you are reusing a template from an older invoice.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">For an email, use the invoice number in the subject and keep the invoice details together in the body. For WhatsApp, make the first paragraph clear enough to understand at a glance. In either format, the client should know what payment you mean and what reply you need.</p></article><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h2 className="text-2xl font-semibold text-[var(--guide-heading)]">Choose the tone that fits the conversation</h2><p className="mt-4 leading-8 text-[var(--guide-text)]">A friendly reminder works well for an initial check-in or an established customer relationship. A professional reminder makes the request more direct while keeping the message neutral. A firm reminder is useful when you need a clear response after earlier follow-ups.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">Tone and stage are separate choices. A final reminder can still be calm and factual. Before using the firm wording, review references to work being paused or agreed late-payment terms and keep only what applies to your actual arrangement.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">English and Hinglish use the same invoice information. Choose the language you normally use with that customer. You can edit the generated draft to match your own voice without changing the invoice facts.</p></article></section>

        <section className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8"><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">What to do when the client replies</h2><div className="mt-7 grid gap-6 md:grid-cols-3">{[["“Payment has been made”", "Thank the client and ask for the transaction reference if you need it to match the payment. Check your records before sending another overdue reminder. Once the balance is cleared, update the invoice status."], ["“We need the invoice again”", "Resend the correct invoice through your normal channel and confirm the billing contact. Check whether the client also needs a purchase order, project reference or a revised billing name."], ["“We will pay on a specific date”", "Acknowledge the date and keep a note of the commitment alongside the invoice. If that date passes without payment, refer to it in the next follow-up and ask for an updated status."]].map(([title,body])=><article key={title}><h3 className="font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--guide-text)]">{body}</p></article>)}</div></section>

        <section><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">Check these details before sending the reminder</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{[["Invoice and outstanding balance", "Confirm that the invoice reference belongs to this client and subtract payments already received. An old reminder can contain an amount that is no longer outstanding."], ["Due date and reminder stage", "The generator uses the stage you select. Check that “Due today”, “Due soon” or an overdue stage matches the date and the current payment status."], ["Recipient and communication channel", "Choose the correct customer or accounts contact in WhatsApp or your email app. Opening a draft does not select a recipient or send the message automatically."], ["Final wording and payment details", "Read the preview after each change. Check payment instructions, remove any statement that does not apply and keep the request specific enough for the client to answer."]].map(([title,body])=><article key={title} className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h3 className="font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--guide-text)]">{body}</p></article>)}</div></section>

        <section className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Related InvoiceWala tools</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">Create, calculate and follow up</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[["/free-invoice-generator", "Free invoice generator"], ["/tools/invoice-number-generator", "Invoice number generator"], ["/tools/gst-calculator", "GST calculator India"], ["/receipt-generator", "Payment receipt generator"]].map(([href, label]) => <Link className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-soft)] p-4 font-semibold text-[var(--guide-text)] transition hover:border-cyan-300/40 hover:text-[var(--guide-accent)]" href={href} key={href}>{label}</Link>)}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">FAQs</p>
          <h2 id="reminder-faqs" className="mt-3 scroll-mt-28 text-3xl font-semibold text-[var(--guide-heading)]">Payment reminder questions</h2>
          <div className="mt-6 divide-y divide-[var(--guide-border)] border-y border-[var(--guide-border)]">{paymentReminderFaqs.map(([question, answer]) => <details className="py-5" key={question}><summary className="cursor-pointer font-semibold text-[var(--guide-heading)]">{question}</summary><p className="mt-4 max-w-4xl text-sm leading-7">{answer}</p></details>)}</div>
        </section>

        <section className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Reminder situations</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">Find the payment reminder wording you need</h2>
          <div className="mt-5 flex flex-wrap gap-2">{paymentReminderKeywords.map((keyword) => <span className="rounded-full border border-[var(--guide-border)] bg-[var(--guide-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--guide-text)]" key={keyword}>{keyword}</span>)}</div>
        </section>

        <div className="text-center"><a href="#payment-reminder-tool" className="inline-flex rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-[#ffffff] hover:bg-blue-800">Generate your payment reminder ↑</a></div>
        <section className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-soft)] p-7 text-center">
          <h2 className="text-3xl font-semibold text-[var(--guide-heading)]">Create the invoice before you chase the payment</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--guide-text)]">Send a professional invoice with a clear number, due date and amount—then track payment status inside InvoiceWala.</p>
          <Link className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-semibold text-[#ffffff]" href="/free-invoice">Create free invoice</Link>
        </section>
      </div>
    </section>
  );
}
