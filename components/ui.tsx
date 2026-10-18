import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-10 flex-wrap items-start justify-between gap-4" aria-label={`${title} page introduction`}>
      <div className="min-w-0">
        <p className="max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {action ? <div className="flex flex-wrap items-center gap-2">{action}</div> : null}
    </div>
  );
}

const variants = {
  primary: "border border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-500 hover:bg-blue-500",
  secondary: "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-[#2b3138] dark:bg-[#171b20] dark:text-slate-100 dark:hover:bg-[#1c2229]",
  ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1c2229]",
  danger: "border border-red-600 bg-red-600 text-white shadow-sm hover:border-red-500 hover:bg-red-500",
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
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
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
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${variants[variant]} ${className}`}
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
    <section className={`rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.025] transition-colors duration-150 dark:border-[#2b3138] dark:bg-[#171b20] dark:shadow-none ${className}`}>
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
        {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">{eyebrow}</p> : null}
        <h2 className="mt-1 text-base font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
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
  "min-h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm transition-colors duration-150 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-[#2b3138] dark:bg-[#11151a] dark:text-white dark:placeholder:text-slate-500";

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
    blue: "border-t-blue-500 text-blue-600 dark:text-blue-300",
    green: "border-t-emerald-500 text-emerald-600 dark:text-emerald-300",
    amber: "border-t-amber-500 text-amber-700 dark:text-amber-300",
    rose: "border-t-rose-500 text-rose-700 dark:text-rose-300",
    slate: "border-t-slate-400 text-slate-700 dark:text-slate-200",
  };
  return (
    <Card className={`group overflow-hidden border-t-2 p-5 ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-current/10"><span className="h-2 w-2 rounded-full bg-current" /></div>
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
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${tones[tone]}`}>{children}</span>;
}

export function EmptyState({ title, body, action, contained = false }: { title: string; body: string; action?: ReactNode; contained?: boolean }) {
  const content = (
    <>
      <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/15">
        <div className="h-5 w-5 rounded-full bg-blue-500/70" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </>
  );
  if (contained) return <div className="p-8 text-center">{content}</div>;
  return <Card className="overflow-hidden p-8 text-center">{content}</Card>;
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-200/70 dark:bg-white/[0.06] ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" style={{ animation: "shimmer 1.6s infinite" }} />
    </div>
  );
}
