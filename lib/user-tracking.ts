import { API_URL, getToken } from "@/lib/api";

export type InvoiceStep = "document" | "business" | "customer" | "items" | "notes" | "template" | "preview" | "save" | "download" | "signup" | "login";
export type EventKind = "page_opened" | "invoice_opened" | "invoice_started" | "invoice_step" | "invoice_changed" | "save_attempted" | "validation_failed" | "save_failed" | "invoice_saved" | "pdf_previewed" | "pdf_downloaded" | "pdf_failed" | "auth_requested" | "journey_paused" | "journey_resumed" | "journey_left";
type TrackedEvent = { id: string; journey: string | null; sequence: number; kind: EventKind; step: InvoiceStep | null; page: string; at: string };
type Queue = { owner: string | null; events: TrackedEvent[] };
const key = "invoicewala-events-v1";
let queue: Queue | undefined;
let sending = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let lastPage = "";
let lastPageTime = 0;

function identity() {
  try { return getToken() ? String(JSON.parse(localStorage.getItem("invoice_user") || "null")?.id || "") || null : null; } catch { return null; }
}
function persist() {
  try { sessionStorage.setItem(key, JSON.stringify(queue)); } catch { /* Tracking must never block billing. */ }
}
function currentQueue() {
  if (!queue) {
    try { queue = JSON.parse(sessionStorage.getItem(key) || "null") as Queue | null || undefined; } catch { /* Use a new queue. */ }
    if (!queue || !Array.isArray(queue.events)) queue = { owner: identity(), events: [] };
  }
  const owner = identity();
  if (queue.owner && queue.owner !== owner) queue = { owner, events: [] };
  if (!queue.owner && owner) queue.owner = owner; // Attach this tab's pre-signup journey only.
  queue.events = queue.events.filter(e => Date.now() - Date.parse(e.at) < 86400000).slice(-150);
  return queue;
}
export function resetTracking() {
  queue = { owner: null, events: [] };
  persist();
  lastPage = "";
  try { sessionStorage.removeItem("invoicewala-journey-handoff"); } catch { /* Optional storage. */ }
}
export function trackUserEvent(kind: EventKind, journey: string | null = null, sequence = 0, step: InvoiceStep | null = null, pageOverride?: string) {
  try {
    const page = pageOverride || location.pathname;
    if (page.startsWith("/admin") || !/^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(page) || page.length > 200) return;
    if (kind === "page_opened") {
      const pageKey = `${identity()}:${page}`;
      if (lastPage === pageKey && Date.now() - lastPageTime < 1000) return;
      lastPage = pageKey; lastPageTime = Date.now();
    }
    const state = currentQueue();
    state.events.push({ id: crypto.randomUUID(), journey, sequence, kind, step, page, at: new Date().toISOString() });
    state.events = state.events.slice(-150);
    persist();
    if (!timer) timer = setTimeout(() => { timer = undefined; void flushUserEvents(); }, 750);
  } catch { /* Storage/analytics failures cannot interrupt the app. */ }
}
export async function flushUserEvents() {
  if (sending) return;
  const state = currentQueue();
  const token = getToken();
  if (!token || !state.owner || !state.events.length) return;
  const batch = state.events.slice(0, 30);
  sending = true;
  try {
    const response = await fetch(`${API_URL}/activity/events`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ events: batch }), keepalive: true });
    if (response.ok || response.status === 422) {
      const ids = new Set(batch.map(e => e.id));
      // Do not overwrite another account's queue if auth changed during the request.
      if (queue === state) { state.events = state.events.filter(e => !ids.has(e.id)); persist(); }
    }
    if (response.ok && state.events.length && queue === state) {
      timer = setTimeout(() => { timer = undefined; void flushUserEvents(); }, 800);
    }
  } catch { /* Retain a bounded queue for the next navigation/online retry. */ }
  finally { sending = false; }
}

export function stepForField(field: string): InvoiceStep {
  if (field.startsWith("business") || field === "logo") return "business";
  if (field.startsWith("customer") || field === "clientId") return "customer";
  if (["notes", "terms"].includes(field)) return "notes";
  if (["line_item", "add_item", "discount", "items"].includes(field)) return "items";
  if (field === "pdfStyle") return "template";
  return "document";
}

export function trackAttachedPublicInvoice(kind: "invoice_saved" | "save_failed") {
  try {
    const raw = sessionStorage.getItem("invoicewala-journey-handoff");
    if (!raw) return;
    const handoff = JSON.parse(raw);
    if (Date.now() - handoff.at < 86400000) trackUserEvent(kind, handoff.id, handoff.sequence + 1, "save", handoff.page);
    sessionStorage.removeItem("invoicewala-journey-handoff");
  } catch { /* Optional attribution must not prevent saving. */ }
}
