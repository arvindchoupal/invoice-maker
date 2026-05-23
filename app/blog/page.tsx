import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PublicNavActions } from "@/components/PublicNavActions";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog/posts";
import { websiteSchema } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Invoice & GST Guides for Indian Businesses | InvoiceWala Blog",
  description:
    "Practical guides on GST invoices, CGST SGST IGST, WhatsApp billing, invoice formats and small-business finance workflows in India.",
  alternates: { canonical: "https://invoicewala.shop/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "InvoiceWala Blog",
    url: "https://invoicewala.shop/blog",
    description:
      "Practical guides on GST invoices, CGST SGST IGST, WhatsApp billing, invoice formats and small-business finance workflows in India.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      url: `https://invoicewala.shop/blog/${post.slug}`,
      author: { "@type": "Organization", name: post.author },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={[websiteSchema(), blogListSchema]} />
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%)] px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
          <PublicNavActions showBlog={false} />
        </nav>
        <div className="mx-auto max-w-7xl py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Blog</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            GST, invoicing and payment guides for Indian businesses
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            SEO-friendly articles that answer real search queries — then connect readers to free calculators and InvoiceWala workflows.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.06]" key={post.slug}>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold text-cyan-200" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                <Link className="hover:text-cyan-200" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{post.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {post.readingMinutes} min read</span>
                <Link className="font-semibold text-cyan-300" href={`/blog/${post.slug}`}>
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
