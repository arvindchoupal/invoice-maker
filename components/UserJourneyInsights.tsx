"use client";

type Row = Record<string, string | number | null>;
const date = (value: unknown) => new Date(String(value)).toLocaleString();
const steps: Record<string, string> = { document: "Document details", business: "Business details", customer: "Customer details", items: "Line items", notes: "Notes & terms", template: "Template", preview: "PDF preview", save: "Save invoice", download: "PDF download", signup: "Signup", login: "Login" };
const actions: Record<string, string> = {
  page_opened: "Opened page", invoice_opened: "Opened invoice editor", invoice_started: "Started making an invoice", invoice_step: "Moved to section", invoice_changed: "Edited section", save_attempted: "Tried to save", validation_failed: "Required details missing or invalid", save_failed: "Invoice save failed", invoice_saved: "Invoice saved", pdf_previewed: "Viewed PDF preview", pdf_downloaded: "Downloaded PDF", pdf_failed: "PDF download failed", auth_requested: "Continued to account", journey_paused: "Tab hidden / paused", journey_resumed: "Returned to editor", journey_left: "Left invoice editor",
};
export function journeyStatus(j: Row) {
  const changed = Number(j.changed_sequence || 0);
  const saved = Number(j.saved_sequence || 0);
  const downloaded = Number(j.download_sequence || 0);
  if (saved > 0 && saved >= changed) return "Saved";
  if (downloaded > 0 && downloaded >= changed) return "PDF downloaded";
  if (!Number(j.started)) return "Opened only";
  if (j.last_event === "journey_left") return "Left with unsaved work";
  if (Date.now() - new Date(String(j.last_at)).getTime() > 30 * 60000) return "Inactive · unsaved work";
  if (j.last_event === "journey_paused") return "Paused · unsaved work";
  return "In progress · unsaved work";
}
export function UserJourneyInsights({ events, journeys }: { events: Row[]; journeys: Row[] }) {
  return <div className="grid gap-6">
    <section><h3 className="mb-2 font-semibold">Invoice journeys</h3><p className="mb-4 text-xs text-slate-500">Latest 30 editor visits. Last step is the last recorded section/action, not proof of why the user stopped. “Inactive” means no journey event for 30 minutes. Exit delivery depends on the browser.</p>
      <div className="grid gap-3 md:grid-cols-2">{journeys.map(j => <div key={j.journey_id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"><div className="flex flex-wrap justify-between gap-2"><span className="text-sm font-semibold">{journeyStatus(j)}</span><span className="text-xs text-slate-500">{date(j.started_at)}</span></div><p className="mt-2 text-sm">Last step: <strong>{steps[String(j.last_step)] || "Editor opened"}</strong></p><p className="mt-1 break-all text-xs text-slate-500">{j.page} · Last activity {date(j.last_at)}</p><p className="mt-2 text-xs text-slate-500">Journey {String(j.journey_id).slice(0, 8)}</p></div>)}</div>
      {!journeys.length && <p className="text-sm text-slate-500">No invoice journeys recorded yet.</p>}
    </section>
    <section><h3 className="mb-2 font-semibold">Pages & frontend activity</h3><p className="mb-4 text-xs text-slate-500">Latest 300 events. Pre-signup activity from this tab can appear after login; anonymous visitors who never log in cannot be linked to a user. No field contents or URL query parameters are recorded.</p><ol className="max-h-[32rem] space-y-3 overflow-y-auto">{events.map(e => <li key={e.id} className="border-l-2 border-blue-300 pl-3 text-sm"><p className="font-medium">{actions[String(e.kind)] || e.kind}{e.step ? ` · ${steps[String(e.step)] || e.step}` : ""}</p><p className="break-all text-xs text-slate-500">{e.page}{e.journey_id ? ` · Journey ${String(e.journey_id).slice(0, 8)}` : ""}</p><time className="text-xs text-slate-500">{date(e.occurred_at)}</time></li>)}</ol>{!events.length && <p className="text-sm text-slate-500">No frontend events recorded yet.</p>}</section>
  </div>;
}
