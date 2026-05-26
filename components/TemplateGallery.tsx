"use client";

import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { previewStructure, type PdfStyleMeta } from "@/lib/pdf-styles";

const colorFilters = [
  { label: "All", value: "all", color: "linear-gradient(135deg,#2563eb,#22c55e,#f97316)" },
  { label: "Black", value: "black", color: "#111827" },
  { label: "Red", value: "red", color: "#dc2626" },
  { label: "Yellow", value: "yellow", color: "#eab308" },
  { label: "Orange", value: "orange", color: "#f97316" },
  { label: "Blue", value: "blue", color: "#2563eb" },
  { label: "Teal", value: "teal", color: "#14b8a6" },
  { label: "Green", value: "green", color: "#16a34a" },
  { label: "Purple", value: "purple", color: "#7c3aed" },
];

const categoryFilters = [
  { label: "All templates", value: "all" },
  { label: "Classic", value: "classic" },
  { label: "Modern", value: "modern" },
  { label: "GST", value: "gst" },
  { label: "Minimal", value: "minimal" },
  { label: "Agency", value: "agency" },
  { label: "Construction", value: "construction" },
  { label: "Retail", value: "retail" },
  { label: "Documents", value: "document" },
];

function colorBucket(style: PdfStyleMeta) {
  const haystack = `${style.id} ${style.label} ${style.accent} ${style.accentDark ?? ""}`.toLowerCase();
  if (haystack.includes("black") || haystack.includes("slate") || haystack.includes("#111") || haystack.includes("#030")) return "black";
  if (haystack.includes("red") || haystack.includes("#dc") || haystack.includes("#ef")) return "red";
  if (haystack.includes("yellow") || haystack.includes("#ea")) return "yellow";
  if (haystack.includes("orange") || haystack.includes("sunrise") || haystack.includes("#f973") || haystack.includes("#d977")) return "orange";
  if (haystack.includes("teal") || haystack.includes("#14b") || haystack.includes("#0f766e")) return "teal";
  if (haystack.includes("green") || haystack.includes("emerald") || haystack.includes("#059") || haystack.includes("#16a") || haystack.includes("#22c")) return "green";
  if (haystack.includes("purple") || haystack.includes("violet") || haystack.includes("#7c")) return "purple";
  return "blue";
}

function categoryFor(style: PdfStyleMeta) {
  if (style.category) return style.category;
  if (["gst", "gstIndia", "ledger", "emerald"].includes(style.id)) return "gst";
  if (["agency", "studio"].includes(style.id)) return "agency";
  if (["construction", "purchaseOrder", "sunrise"].includes(style.id)) return "construction";
  if (["retail", "receipt"].includes(style.id)) return "retail";
  if (["minimal", "mono", "monoBlack", "pureWhite", "slim", "sharp", "noLogoSlate"].includes(style.id)) return "minimal";
  return style.header === "solid" || style.header === "split" ? "classic" : "modern";
}

function TemplateThumbnail({ style, active }: { style: PdfStyleMeta; active: boolean }) {
  const dark = style.accentDark ?? style.accent;
  const header = style.header ?? "bar";
  return (
    <div className={`relative mx-auto aspect-[0.72] w-full max-w-[198px] overflow-hidden border bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition ${active ? "border-blue-500 shadow-blue-500/20" : "border-slate-200"}`}>
      {style.id.includes("transparent") ? (
        <div className="pointer-events-none absolute inset-x-2 bottom-12 h-24 rounded-full opacity-20 blur-sm" style={{ backgroundColor: style.accent }} />
      ) : null}
      {style.id.toLowerCase().includes("watercolor") || style.id.includes("transparent") ? (
        <div className="absolute inset-x-0 bottom-0 h-20 opacity-25" style={{ background: `linear-gradient(135deg, transparent 5%, ${style.soft} 45%, ${style.accent} 100%)` }} />
      ) : null}
      {header === "side" ? <div className="absolute left-0 top-0 h-full w-2.5" style={{ backgroundColor: style.accent }} /> : null}
      {header === "solid" ? <div className="absolute left-0 top-0 h-14 w-full" style={{ backgroundColor: dark }} /> : null}
      {header === "bar" ? <div className="absolute left-3 right-3 top-3 h-2" style={{ backgroundColor: style.accent }} /> : null}
      {header === "split" ? (
        <>
          <div className="absolute left-0 top-0 h-14 w-[45%]" style={{ backgroundColor: dark }} />
          <div className="absolute right-0 top-0 h-14 w-[55%]" style={{ backgroundColor: style.soft }} />
        </>
      ) : null}
      {style.label.toLowerCase().includes("plaid") ? (
        <div className="absolute inset-x-0 top-0 grid h-8 grid-cols-6 opacity-90">
          {Array.from({ length: 12 }).map((_, index) => (
            <span className={index % 2 ? "bg-black" : "bg-red-600"} key={index} />
          ))}
        </div>
      ) : null}
      <div className="relative pt-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            {style.noLogo ? (
              <div className="h-2 w-12" style={{ backgroundColor: style.accent }} />
            ) : (
              <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-[6px] font-bold text-slate-500">LOGO</div>
            )}
            <div className="mt-3 h-3 w-16 rounded-sm" style={{ backgroundColor: dark }} />
            <div className="mt-1.5 h-1 w-12 rounded-sm bg-slate-400" />
            <div className="mt-1 h-1 w-10 rounded-sm bg-slate-300" />
          </div>
          <div className="text-right">
            <div className="ml-auto h-3.5 w-16 rounded-sm" style={{ backgroundColor: dark }} />
            <div className="ml-auto mt-1.5 h-1 w-10 rounded-sm bg-slate-400" />
            <div className="ml-auto mt-2 h-1 w-12 rounded-sm bg-slate-300" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-[6px]">
          <div>
            <div className="h-1 w-8 rounded-sm bg-slate-300" />
            <div className="mt-1 h-1.5 w-11 rounded-sm bg-slate-700" />
          </div>
          <div>
            <div className="h-1 w-8 rounded-sm bg-slate-300" />
            <div className="mt-1 h-1.5 w-11 rounded-sm bg-slate-700" />
          </div>
          <div>
            <div className="h-1 w-8 rounded-sm bg-slate-300" />
            <div className="mt-1 h-1.5 w-11 rounded-sm bg-slate-700" />
          </div>
        </div>
        {style.id === "modernRed" ? (
          <div className="mt-3 flex items-center gap-2">
            <span className="h-4 w-10 border-y-2" style={{ borderColor: style.accent }} />
            <span className="h-5 flex-1 rounded-full opacity-20" style={{ backgroundColor: style.accent }} />
          </div>
        ) : null}
        <div className="mt-3 overflow-hidden border border-slate-200">
          <div className="grid grid-cols-[1fr_22px_30px_34px] gap-1 px-2 py-1" style={{ backgroundColor: dark }}>
            <span className="h-1.5 rounded bg-white/80" />
            <span className="h-1.5 rounded bg-white/80" />
            <span className="h-1.5 rounded bg-white/80" />
            <span className="h-1.5 rounded bg-white/80" />
          </div>
          {[0, 1, 2].map((row) => (
            <div className="grid grid-cols-[1fr_22px_30px_34px] gap-1 border-t border-slate-100 px-2 py-1.5" key={row}>
              <span className="h-1.5 rounded bg-slate-200" />
              <span className="h-1.5 rounded bg-slate-200" />
              <span className="h-1.5 rounded bg-slate-200" />
              <span className="h-1.5 rounded bg-slate-200" />
            </div>
          ))}
        </div>
        <div className="ml-auto mt-3 grid w-24 gap-1 p-2" style={{ backgroundColor: style.soft }}>
          <div className="flex justify-between gap-2"><span className="h-1.5 w-9 rounded bg-slate-300" /><span className="h-1.5 w-8 rounded bg-slate-300" /></div>
          <div className="flex justify-between gap-2"><span className="h-1.5 w-8 rounded bg-slate-300" /><span className="h-1.5 w-8 rounded bg-slate-300" /></div>
          <div className="mt-1 h-2 rounded" style={{ backgroundColor: dark }} />
        </div>
        <div className="absolute bottom-4 left-3">
          <div className="h-1.5 w-16 rounded-sm bg-slate-300" />
          <div className="mt-1 h-1 w-12 rounded-sm bg-slate-200" />
        </div>
        <div className="absolute bottom-4 right-3 h-7 w-12 opacity-70">
          <div className="h-1 w-full rotate-[-8deg]" style={{ backgroundColor: style.accent }} />
          <div className="mt-1 h-1 w-10 rotate-[-10deg]" style={{ backgroundColor: dark }} />
          <div className="mt-1 h-1 w-8 rotate-[-12deg]" style={{ backgroundColor: style.accent }} />
        </div>
      </div>
      {active ? (
        <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow">
          <Check className="h-3.5 w-3.5" />
        </div>
      ) : null}
    </div>
  );
}

export function TemplateGallery({
  styles,
  selectedId,
  onSelect,
  onDownload,
  onClose,
}: {
  styles: PdfStyleMeta[];
  selectedId: string;
  onSelect: (id: string) => void;
  onDownload?: (id: string) => void;
  onClose?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("all");
  const [category, setCategory] = useState("all");
  const handleTemplateClick = (id: string) => {
    onSelect(id);
    if (onDownload) onDownload(id);
  };

  const filteredStyles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return styles.filter((style) => {
      const matchesSearch = !search || `${style.label} ${style.id} ${previewStructure(style.id)}`.toLowerCase().includes(search);
      const matchesColor = color === "all" || colorBucket(style) === color;
      const matchesCategory = category === "all" || categoryFor(style) === category;
      return matchesSearch && matchesColor && matchesCategory;
    });
  }, [category, color, query, styles]);

  if (!styles.length) return null;

  const galleryContent = (
    <div className="bg-slate-950 text-white">
      <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Choose PDF template</h2>
              <p className="mt-1 text-sm text-slate-400">Click any design to {onDownload ? "download" : "select"} that invoice template.</p>
            </div>
          {onClose ? (
            <button className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.08]" onClick={onClose} type="button">
              Close
            </button>
          ) : null}
          </div>
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Search templates"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <p className="text-sm text-slate-400">{filteredStyles.length} templates</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-slate-300">Filter by color</span>
            {colorFilters.map((item) => (
              <button
                aria-label={item.label}
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition hover:-translate-y-0.5 ${color === item.value ? "ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-950" : ""}`}
                key={item.value}
                onClick={() => setColor(item.value)}
                type="button"
              >
                {color === item.value ? <Check className="absolute h-3.5 w-3.5 text-white drop-shadow" /> : null}
                <span className="h-4 w-4 rounded-full border border-slate-200" style={{ background: item.color }} />
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryFilters.map((item) => (
              <button
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${category === item.value ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"}`}
                key={item.value}
                onClick={() => setCategory(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-24 gap-y-10 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStyles.map((style) => {
          const active = style.id === selectedId;
          return (
            <article
              key={style.id}
              className="text-center"
            >
              <button className="block w-full" type="button" onClick={() => handleTemplateClick(style.id)} title={onDownload ? `Download ${style.label}` : `Select ${style.label}`}>
                <TemplateThumbnail active={active} style={style} />
              </button>
              <button className="mt-3 text-sm text-slate-950 underline underline-offset-2 hover:text-blue-700" onClick={() => handleTemplateClick(style.id)} type="button">
                {style.label}
                {active ? " (Current)" : ""}
              </button>
            </article>
          );
        })}
      </div>

      {!filteredStyles.length ? (
        <div className="mx-auto mb-8 max-w-5xl rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
          No templates match this filter. Try another color or search term.
        </div>
      ) : null}
    </div>
  );

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 p-0 backdrop-blur-sm sm:p-4" role="dialog" aria-modal="true">
        <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden bg-slate-950 shadow-2xl shadow-black/40 sm:rounded-3xl sm:border sm:border-white/10">
          <div className="premium-scrollbar flex-1 overflow-y-auto">{galleryContent}</div>
        </div>
      </div>
    );
  }

  return galleryContent;
}
