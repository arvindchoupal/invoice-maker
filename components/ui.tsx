import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-blue-600 text-white shadow-lg shadow-blue-950/20 hover:bg-blue-500",
  secondary: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]",
  ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.06]",
  danger: "bg-red-600 text-white shadow-lg shadow-red-950/20 hover:bg-red-500",
};

type ButtonVariant = keyof typeof variants;

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  className = "",
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <Link
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-slate-200/80 bg-white/85 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500 dark:text-blue-300">{eyebrow}</p> : null}
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500";

export function StatCard({
  label,
  value,
  caption,
  tone = "blue",
}: {
  label: string;
  value: string;
  caption?: string;
  tone?: "blue" | "green" | "amber" | "rose" | "slate";
}) {
  const tones = {
    blue: "from-blue-500/16 to-cyan-400/8 text-blue-600 dark:text-blue-200",
    green: "from-emerald-500/16 to-teal-400/8 text-emerald-600 dark:text-emerald-200",
    amber: "from-amber-500/18 to-orange-400/8 text-amber-700 dark:text-amber-200",
    rose: "from-rose-500/16 to-red-400/8 text-rose-700 dark:text-rose-200",
    slate: "from-slate-500/12 to-slate-400/5 text-slate-700 dark:text-slate-200",
  };
  return (
    <Card className={`group overflow-hidden bg-gradient-to-br p-5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/[0.06] ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-2xl bg-white/70 shadow-inner shadow-white/20 dark:bg-white/10" />
      </div>
      {caption ? <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{caption}</p> : null}
    </Card>
  );
}

export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "rose" | "slate";
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-200",
    green: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-200",
    amber: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-200",
    rose: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-200",
    slate: "bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-200",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>{children}</span>;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <Card className="overflow-hidden p-8 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-400/10 ring-1 ring-blue-500/15">
        <div className="h-5 w-5 rounded-full bg-blue-500/70" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-200/70 dark:bg-white/[0.06] ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" style={{ animation: "shimmer 1.6s infinite" }} />
    </div>
  );
}
