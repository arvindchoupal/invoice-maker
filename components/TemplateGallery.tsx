"use client";

import type { PdfStyleMeta } from "@/lib/pdf-styles";

export function TemplateGallery({
  styles,
  selectedId,
  onSelect,
}: {
  styles: PdfStyleMeta[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  if (!styles.length) return null;

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {styles.map((style) => {
        const active = style.id === selectedId;
        return (
          <button
            key={style.id}
            type="button"
            onClick={() => onSelect(style.id)}
            className={`rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${
              active
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/30 dark:bg-blue-500/10"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04]"
            }`}
          >
            <div className="mb-2 h-2 rounded-full" style={{ backgroundColor: style.accent }} />
            <div className="rounded-xl p-2" style={{ backgroundColor: style.soft }}>
              <div className="h-2 w-12 rounded" style={{ backgroundColor: style.accent }} />
              <div className="mt-2 h-1.5 w-full rounded bg-white/80" />
              <div className="mt-1 h-1.5 w-4/5 rounded bg-white/60" />
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{style.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{style.id}</p>
          </button>
        );
      })}
    </div>
  );
}
