"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui";

type Recipient = { id: number; name: string; email: string };
type SendResult = { sent: number; failed: number; total: number };
type RecipientMode = "all" | "selected";
const panel = "rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900";
const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-900";
const button = "rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminEmailPage() {
  const [recipients, setRecipients] = useState<Recipient[] | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [recipientMode, setRecipientMode] = useState<RecipientMode>("all");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SendResult | null>(null);
  const selectedCount = selectedIds.length;
  const targetCount = recipientMode === "all" ? recipients?.length ?? 0 : selectedCount;
  const allSelected = !!recipients?.length && selectedCount === recipients.length;
  const emailPreview = useMemo(() => html.trim() ? previewHtml || "<p>Preparing safe preview…</p>" : "<p>Your email preview will appear here.</p>", [html, previewHtml]);

  useEffect(() => {
    api<Recipient[]>("/admin/email/recipients")
      .then(setRecipients)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load recipients"));
  }, []);

  useEffect(() => {
    let active = true;
    if (!html.trim()) return () => { active = false; };
    const timer = window.setTimeout(() => {
      api<{ html: string }>("/admin/email/preview", { method: "POST", body: JSON.stringify({ html }) })
        .then(({ html: sanitized }) => { if (active) setPreviewHtml(sanitized); })
        .catch((err) => { if (active) setPreviewError(err instanceof Error ? err.message : "Could not render preview"); });
    }, 300);
    return () => { active = false; window.clearTimeout(timer); };
  }, [html]);

  function updateHtml(value: string) {
    setHtml(value);
    setPreviewHtml("");
    setPreviewError("");
    setReviewing(false);
  }

  function toggleRecipient(id: number) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setReviewing(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!reviewing) {
      setReviewing(true);
      return;
    }

    setSending(true);
    setResult(null);
    try {
      const sent = await api<SendResult>("/admin/email/broadcast", {
        method: "POST",
        body: JSON.stringify({ subject, html, recipientMode, userIds: recipientMode === "selected" ? selectedIds : [] }),
      });
      setResult(sent);
      setReviewing(false);
      setSubject("");
      setHtml("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email sending failed");
    } finally {
      setSending(false);
    }
  }

  return <div className="grid max-w-5xl gap-5">
    <PageHeader title="Email users" description="Paste HTML, preview it, then send to all users or only the users you choose." />
    <section className={panel}>
      <div className="mb-5 rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-800">
        <p className="font-semibold">Recipients</p>
        <p className="mt-1 text-slate-600 dark:text-slate-300">{recipients === null ? "Loading users…" : `${recipients.length} non-admin users available.`}</p>
        <p className="mt-1 text-xs text-slate-500">Each user receives a separate email. Recipient addresses stay private.</p>
      </div>

      <form className="grid gap-5" onSubmit={submit}>
        <fieldset className="grid gap-2 text-sm">
          <legend className="mb-2 font-semibold">Send to</legend>
          <label className="flex items-center gap-2"><input type="radio" name="recipientMode" value="all" checked={recipientMode === "all"} onChange={() => { setRecipientMode("all"); setReviewing(false); }} />All users ({recipients?.length ?? "…"})</label>
          <label className="flex items-center gap-2"><input type="radio" name="recipientMode" value="selected" checked={recipientMode === "selected"} onChange={() => { setRecipientMode("selected"); setReviewing(false); }} />Selected users ({selectedCount})</label>
        </fieldset>

        {recipientMode === "selected" ? <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <label className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800">
            <input type="checkbox" checked={allSelected} disabled={!recipients?.length} onChange={() => { setSelectedIds(allSelected ? [] : (recipients ?? []).map((recipient) => recipient.id)); setReviewing(false); }} />
            Select all listed users
          </label>
          <div className="max-h-64 overflow-y-auto">
            {recipients?.map((recipient) => <label key={recipient.id} className="flex items-center gap-3 border-b border-slate-100 px-3 py-2.5 text-sm last:border-b-0 dark:border-slate-800">
              <input type="checkbox" checked={selectedIds.includes(recipient.id)} onChange={() => toggleRecipient(recipient.id)} />
              <span className="min-w-0"><span className="block truncate font-medium">{recipient.name}</span><span className="block truncate text-xs text-slate-500">{recipient.email}</span></span>
            </label>)}
            {recipients?.length === 0 ? <p className="p-4 text-sm text-slate-500">No eligible users found.</p> : null}
          </div>
        </div> : null}

        <label className="grid gap-1.5 text-sm font-medium">Subject
          <input className={field} required minLength={2} maxLength={180} value={subject} onChange={(event) => { setSubject(event.target.value); setReviewing(false); }} />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid content-start gap-1.5 text-sm font-medium">HTML email source
            <textarea className={`${field} min-h-80 resize-y font-mono text-xs`} required minLength={1} maxLength={100000} value={html} onChange={(event) => updateHtml(event.target.value)} placeholder={'Paste your HTML email here, for example:\n<table><tr><td><h1>Hello!</h1><p>Your update goes here.</p></td></tr></table>'} />
            <span className="text-xs font-normal text-slate-500">Paste the HTML source. Scripts, embedded style blocks, forms, and unsafe links are removed; safe inline styles are kept.</span>
          </label>
          <div className="grid content-start gap-1.5 text-sm font-medium">Preview
            <iframe title="Email HTML preview" sandbox="" referrerPolicy="no-referrer" srcDoc={emailPreview} className="min-h-80 w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700" />
          </div>
        </div>

        {reviewing ? <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="font-semibold">Confirm sending to {targetCount} {targetCount === 1 ? "user" : "users"}?</p>
          <p className="mt-1">Subject: {subject}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className={button} type="submit" disabled={sending || recipients === null || targetCount === 0}>{sending ? "Sending…" : "Confirm and send"}</button>
            <button className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold dark:border-slate-700" type="button" onClick={() => setReviewing(false)}>Cancel</button>
          </div>
        </div> : <button className={button} type="submit" disabled={recipients === null || targetCount === 0 || !subject.trim() || !html.trim()}>{recipients === null ? "Loading users…" : "Review email"}</button>}
      </form>

      {error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200" role="alert">{error}</p> : null}
      {previewError ? <p className="mt-4 text-sm text-amber-700 dark:text-amber-300" role="status">Preview: {previewError}</p> : null}
      {result ? <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200" role="status">Email sent to {result.sent} of {result.total} recipients{result.failed ? `; ${result.failed} failed.` : "."}</p> : null}
    </section>
  </div>;
}
