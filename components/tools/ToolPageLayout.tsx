import { BrandLogo } from "@/components/BrandLogo";
import { PublicToolNavActions } from "@/components/PublicToolNavActions";
import type { ToolCatalogEntry } from "@/lib/tools-catalog";

export function ToolPageLayout({
  tool,
  children,
}: {
  tool: ToolCatalogEntry;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_30%)] px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicToolNavActions signupSource={tool.signupSource} />
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.8fr)] lg:items-start xl:grid-cols-[minmax(0,0.95fr)_minmax(460px,0.78fr)]">
          <div className="lg:sticky lg:top-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{tool.title}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{tool.headline}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{tool.metaDescription}</p>
            <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
              {tool.highlights.map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{tool.intent}</p>
          </div>
          <div className="w-full min-w-0 rounded-3xl border border-white/10 bg-white/[0.05] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:p-4">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
