"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SearchResult = { title: string; href: string; description: string; type: "Tool" | "Template" | "Guide" | "Page" };

export function PublicSiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "/" && !open && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/site-search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal });
        const data = await response.json() as { results?: SearchResult[] };
        setResults(data.results ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setResults([]);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <button aria-label="Search InvoiceWala" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10" onClick={() => setOpen(true)} type="button">
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Search</span>
        <span className="hidden rounded border border-white/10 px-1 py-0.5 text-[10px] text-slate-400 xl:inline">⌘K</span>
      </button>

      {open ? (
        <div aria-modal="true" className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-4 pt-20 backdrop-blur-sm sm:pt-28" onMouseDown={close} role="dialog">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/50" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <Search className="h-5 w-5 shrink-0 text-cyan-300" />
              <input aria-label="Search the site" className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-slate-500" onChange={(event) => setQuery(event.target.value)} placeholder="Search tools, templates, guides…" ref={inputRef} value={query} />
              <button aria-label="Close search" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" onClick={close} type="button"><X className="h-5 w-5" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
              {query.trim().length < 2 ? <p className="p-4 text-sm text-slate-400">Search invoices, GST tools, bill formats, templates or guides.</p> : null}
              {loading ? <p className="p-4 text-sm text-slate-400">Searching…</p> : null}
              {!loading && query.trim().length >= 2 && results.length === 0 ? <p className="p-4 text-sm text-slate-400">No matching pages found. Try a simpler search such as “GST”, “bill format” or “invoice”.</p> : null}
              {!loading && query.trim().length >= 2 && results.map((result) => (
                <Link className="block rounded-2xl px-4 py-3 transition hover:bg-white/10" href={result.href} key={result.href} onClick={close}>
                  <div className="flex items-center justify-between gap-3"><p className="font-semibold text-white">{result.title}</p><span className="shrink-0 rounded-full bg-cyan-300/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-200">{result.type}</span></div>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-400">{result.description}</p>
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 px-5 py-3 text-xs text-slate-500">Press <kbd className="rounded border border-white/10 px-1 py-0.5">Esc</kbd> to close · <kbd className="rounded border border-white/10 px-1 py-0.5">⌘K</kbd> to search</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
