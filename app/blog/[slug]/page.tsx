import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { PublicNavActions } from "@/components/PublicNavActions";
import { PublicPrimaryCta } from "@/components/PublicPrimaryCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | InvoiceWala Blog`,
    description: post.description,
    alternates: { canonical: `https://invoicewala.shop/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://invoicewala.shop/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "InvoiceWala",
      url: "https://invoicewala.shop",
    },
    mainEntityOfPage: `https://invoicewala.shop/blog/${post.slug}`,
  };

  const schemas: Record<string, unknown>[] = [
    articleSchema,
    breadcrumbSchema([
      { name: "Home", url: "https://invoicewala.shop" },
      { name: "Blog", url: "https://invoicewala.shop/blog" },
      { name: post.title, url: `https://invoicewala.shop/blog/${post.slug}` },
    ]),
  ];

  if (post.faqs?.length) {
    schemas.push(faqSchema(post.faqs));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={schemas} />
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link className="text-sm font-semibold text-cyan-300" href="/blog">
            ← All articles
          </Link>
          <PublicNavActions showBlog={false} />
        </nav>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-semibold text-cyan-200" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{post.description}</p>
        <p className="mt-4 text-sm text-slate-500">
          {new Date(post.publishedAt).toLocaleDateString("en-IN", { dateStyle: "long" })} · {post.readingMinutes} min read · {post.author}
        </p>

        <div className="mt-10">
          <MarkdownContent content={post.content} />
        </div>

        {post.relatedToolHref ? (
          <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Next step</p>
            <p className="mt-2 text-lg font-semibold text-white">Put this guide into practice</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {post.relatedToolHref ? (
                <Link className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950" href={post.relatedToolHref}>
                  {post.relatedToolLabel ?? "Open tool"}
                </Link>
              ) : null}
              <PublicPrimaryCta
                guestHref="/signup"
                guestLabel="Create free account"
                authedHref="/invoices/new"
                authedLabel="Create invoice"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white"
              />
            </div>
          </div>
        ) : null}
      </article>
    </main>
  );
}
