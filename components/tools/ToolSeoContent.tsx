import Link from "next/link";
import type { ToolSeoContent as ToolSeoContentType } from "@/lib/tool-seo-content";

export function ToolSeoContent({ content }: { content: ToolSeoContentType }) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Guide</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{content.intro.title}</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 text-sm leading-7 text-slate-300">
              {content.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-3">
              {content.intro.bullets.map((bullet) => (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold text-slate-200" key={bullet}>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Formula</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{content.formula.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{content.formula.explanation}</p>
            <div className="mt-5 grid gap-3">
              {content.formula.formulas.map((formula) => (
                <code className="block rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm text-cyan-100" key={formula}>
                  {formula}
                </code>
              ))}
            </div>
            <p className="mt-5 rounded-2xl bg-cyan-300/10 p-4 text-sm leading-7 text-slate-200">{content.formula.example}</p>
          </article>

          <div className="grid gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Examples</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Real-world calculations</h2>
            </div>
            {content.examples.map((example) => (
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5" key={example.title}>
                <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{example.body}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {example.rows.map(([label, value]) => (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950/70 px-4 py-3 text-sm" key={label}>
                      <span className="text-slate-400">{label}</span>
                      <strong className="text-white">{value}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Learn</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{content.education.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.education.sections.map((section) => (
              <article className="rounded-2xl bg-slate-950/70 p-5" key={section.title}>
                <h3 className="font-semibold text-white">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{section.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Use cases</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Who uses this tool?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.useCases.map((item) => (
                <article className="rounded-2xl bg-slate-950/70 p-4" key={item.title}>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Related tools</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Tools to use next</h2>
            <div className="mt-5 grid gap-3">
              {content.relatedTools.map((tool) => (
                <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100" href={tool.href} key={tool.href}>
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Next steps</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Use the result in your billing workflow</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.internalLinks.map((link) => (
              <Link className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-slate-900" href={link.href} key={link.href}>
                <h3 className="font-semibold text-white">{link.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{link.body}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">FAQs</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Common questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.faqs.map(([question, answer]) => (
              <article className="rounded-2xl bg-slate-950/70 p-5" key={question}>
                <h3 className="font-semibold text-white">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Related searches</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Common GST searches this guide helps with</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              These are common ways business owners search when they need to calculate tax before creating an invoice or quotation.
            </p>
          </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.keywords.map((keyword) => (
                <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-300" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
