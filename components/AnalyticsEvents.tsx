"use client";

import { useEffect } from "react";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
  }
}

function sendEvent(eventName: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    ...params,
  });
}

function textLabel(element: HTMLElement) {
  return element.getAttribute("aria-label") || element.getAttribute("title") || element.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) || "";
}

export function AnalyticsEvents() {
  useEffect(() => {
    const trackedScrollDepths = new Set<number>();
    let engaged30Sent = false;
    let engaged60Sent = false;

    const engagementTimer30 = window.setTimeout(() => {
      engaged30Sent = true;
      sendEvent("engaged_30_seconds");
    }, 30000);

    const engagementTimer60 = window.setTimeout(() => {
      engaged60Sent = true;
      sendEvent("engaged_60_seconds");
    }, 60000);

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const trackedElement = target.closest<HTMLElement>("[data-event]");
      if (trackedElement) {
        sendEvent(trackedElement.dataset.event || "cta_click", {
          event_category: trackedElement.dataset.eventCategory || "engagement",
          event_label: trackedElement.dataset.eventLabel || textLabel(trackedElement),
          link_url: trackedElement instanceof HTMLAnchorElement ? trackedElement.href : trackedElement.dataset.eventHref,
        });
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.origin);
      const isInternal = url.origin === window.location.origin;
      const isPrimaryPath = ["/free-invoice", "/signup", "/login", "/pricing", "/invoice-templates", "/tools"].some((path) => url.pathname === path || url.pathname.startsWith(`${path}/`));

      if (isInternal && isPrimaryPath) {
        sendEvent("important_link_click", {
          event_category: "navigation",
          event_label: textLabel(link),
          link_url: `${url.pathname}${url.search}`,
        });
      }
    };

    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;
      const depth = Math.round((window.scrollY / documentHeight) * 100);

      for (const mark of [50, 90]) {
        if (depth >= mark && !trackedScrollDepths.has(mark)) {
          trackedScrollDepths.add(mark);
          sendEvent(`scroll_${mark}_percent`);
        }
      }
    };

    window.addEventListener("click", onClick, { capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(engagementTimer30);
      window.clearTimeout(engagementTimer60);
      if (!engaged30Sent) {
        // no-op; keeps cleanup explicit for future extension
      }
      if (!engaged60Sent) {
        // no-op; keeps cleanup explicit for future extension
      }
      window.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
