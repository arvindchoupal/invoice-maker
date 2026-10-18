"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const storageKey = "invoicewala-theme";
type ThemePreference = "system" | "light" | "dark";

function currentPreference(): ThemePreference {
  const saved = window.localStorage.getItem(storageKey);
  return saved === "light" || saved === "dark" ? saved : "system";
}

function applyTheme(theme: ThemePreference) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolvedDark = theme === "dark" || (theme === "system" && systemDark);
  const root = document.documentElement;
  root.classList.toggle("dark", resolvedDark);
  root.dataset.theme = theme;
  root.style.colorScheme = resolvedDark ? "dark" : "light";
  window.dispatchEvent(new Event("invoicewala-theme-change"));
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    applyTheme(event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system");
  };
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (currentPreference() === "system") applyTheme("system");
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("invoicewala-theme-change", onChange);
  media.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("invoicewala-theme-change", onChange);
    media.removeEventListener("change", onSystemChange);
  };
}

function getSnapshot() {
  return `${currentPreference()}|${document.documentElement.classList.contains("dark") ? "dark" : "light"}`;
}

export function ThemeToggle({ inline = false, showLabel = true }: { inline?: boolean; showLabel?: boolean } = {}) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "system|light");
  const [preference, resolved] = snapshot.split("|") as [ThemePreference, "light" | "dark"];
  const dark = resolved === "dark";

  function toggleTheme() {
    const order: ThemePreference[] = ["system", "light", "dark"];
    const theme = order[(order.indexOf(preference) + 1) % order.length];
    window.localStorage.setItem(storageKey, theme);
    applyTheme(theme);
  }

  return (
    <button
      aria-label={`Theme: ${preference}. Switch theme mode`}
      className={inline
        ? "inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-[#2b3138] dark:bg-[#171b20] dark:text-slate-300 dark:hover:bg-[#1c2229]"
        : "theme-toggle-global fixed bottom-20 right-4 z-[70] inline-flex h-11 items-center gap-2 rounded-xl border border-blue-200 bg-white/92 px-3 text-blue-700 shadow-xl shadow-blue-950/15 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-blue-50 dark:border-[#2b3138] dark:bg-[#171b20] dark:text-blue-300 dark:shadow-black/35 dark:hover:bg-[#1c2229] lg:bottom-5 lg:right-5"}
      onClick={toggleTheme}
      title={`Theme mode: ${preference}`}
      type="button"
    >
      {preference === "system" ? <Monitor className="h-5 w-5" /> : dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      {showLabel ? <span className="text-xs font-semibold capitalize">{preference === "system" ? "Auto" : preference}</span> : null}
    </button>
  );
}
