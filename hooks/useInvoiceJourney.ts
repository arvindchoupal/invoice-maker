"use client";

import { useEffect, useRef } from "react";
import { flushUserEvents, trackUserEvent, type EventKind, type InvoiceStep } from "@/lib/user-tracking";

function owner() {
  try { return String(JSON.parse(localStorage.getItem("invoice_user") || "null")?.id || ""); } catch { return ""; }
}

type Journey = { owner: string; id: string; sequence: number; step: InvoiceStep; started: boolean; left: boolean; changedSteps: Set<InvoiceStep> };
export function useInvoiceJourney() {
  const ref = useRef<Journey | null>(null);
  const page = useRef<string | null>(null);
  function ensure() {
    if (!page.current) page.current = location.pathname;
    const account = owner();
    if (ref.current?.owner && ref.current.owner !== account) ref.current = null;
    if (!ref.current) ref.current = { owner: account, id: crypto.randomUUID(), sequence: 0, step: "document", started: false, left: false, changedSteps: new Set() };
    if (!ref.current.owner) ref.current.owner = account;
    return ref.current;
  }
  function emit(kind: EventKind, step?: InvoiceStep) {
    const journey = ensure();
    if (step) journey.step = step;
    trackUserEvent(kind, journey.id, ++journey.sequence, journey.step, page.current || undefined);
    try {
      const raw = sessionStorage.getItem("invoicewala-journey-handoff");
      if (raw) {
        const handoff = JSON.parse(raw);
        if (handoff.id === journey.id) sessionStorage.setItem("invoicewala-journey-handoff", JSON.stringify({ ...handoff, sequence: journey.sequence }));
      }
    } catch { /* Optional handoff. */ }
  }
  function change(step: InvoiceStep) {
    const j = ensure();
    if (!j.started) { j.started = true; emit("invoice_started", step); }
    // Once per section between saves; no per-keystroke events or field values.
    if (!j.changedSteps.has(step)) { j.changedSteps.add(step); emit("invoice_changed", step); }
    if (j.step !== step) emit("invoice_step", step);
    j.step = step;
  }
  function event(kind: EventKind, step?: InvoiceStep) {
    const j = ensure();
    if (kind === "save_attempted" && !j.started) { j.started = true; emit("invoice_started", step); }
    if (kind === "invoice_saved") { j.changedSteps.clear(); }
    emit(kind, step);
    if (kind === "pdf_downloaded") j.changedSteps.clear();
    if (kind === "auth_requested") {
      try { sessionStorage.setItem("invoicewala-journey-handoff", JSON.stringify({ id: j.id, sequence: j.sequence, page: page.current, at: Date.now() })); } catch { /* Optional attribution. */ }
    }
  }
  useEffect(() => {
    // Defer open so React's development effect replay doesn't create fake exits.
    const opened = window.setTimeout(() => emit("invoice_opened"), 0);
    const leave = () => {
      const j = ref.current;
      if (!j || j.left) return;
      j.left = true; emit("journey_left"); void flushUserEvents();
    };
    const visibility = () => {
      if (!ref.current) return;
      emit(document.hidden ? "journey_paused" : "journey_resumed");
      if (document.hidden) void flushUserEvents();
    };
    const resume = () => { if (ref.current?.left) { ref.current.left = false; emit("journey_resumed"); } };
    const auth = (e: Event) => { if ((e as CustomEvent).detail === "logout") ref.current = null; };
    window.addEventListener("pagehide", leave);
    window.addEventListener("pageshow", resume);
    window.addEventListener("invoicewala-session", auth);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearTimeout(opened);
      leave();
      window.removeEventListener("pagehide", leave);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("invoicewala-session", auth);
      document.removeEventListener("visibilitychange", visibility);
    };
    // One journey per mounted editor. All mutable state lives in refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function visit(step: InvoiceStep) {
    if (ensure().step !== step) emit("invoice_step", step);
  }
  return { change, event, visit };
}
