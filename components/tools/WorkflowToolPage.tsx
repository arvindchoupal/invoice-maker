import type { ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";

type RelatedLink = [href: string, label: string, body: string];

export function WorkflowToolPage({
  eyebrow,
  title,
  intro,
  highlights,
  children,
  explanationTitle,
  explanation,
  useCases,
  steps,
  faqs,
  related,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: string[];
  children: ReactNode;
  explanationTitle: string;
  explanation: string[];
  useCases: Array<[string, string]>;
  steps: string[];
  faqs: Array<[string, string]>;
  related: RelatedLink[];
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_32%)] px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{intro}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-slate-200" key={highlight}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Practical guidance</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{explanationTitle}</h2>
        </div>
        <div className="grid gap-4">
          {explanation.map((paragraph) => (
            <p className="text-sm leading-7 text-slate-300" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Where it helps</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Common business use cases</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map(([name, body]) => (
              <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-5" key={name}>
                <h3 className="font-semibold text-white">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Workflow</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Finish the job in a few clear steps</h2>
        <ol className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li className="rounded-3xl border border-white/10 bg-white/[0.04] p-5" key={step}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 font-bold text-slate-950">{index + 1}</span>
              <p className="mt-4 text-sm leading-6 text-slate-300">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Continue the workflow</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Related InvoiceWala tools</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {related.map(([href, label, body]) => (
            <Link className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/40" href={href} key={href}>
              <span className="font-semibold text-white">{label}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-400">{body}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions before using this tool</h2>
        <div className="mt-7 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
          {faqs.map(([question, answer]) => (
            <details className="group p-5" key={question}>
              <summary className="cursor-pointer list-none font-semibold text-white">{question}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <PublicSiteFooter />
    </main>
  );
}
