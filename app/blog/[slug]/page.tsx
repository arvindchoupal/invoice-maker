import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";
import { PublicNavActions } from "@/components/PublicNavActions";
import { PublicPrimaryCta } from "@/components/PublicPrimaryCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getPostBySlug, isNoindexBlogSlug, type BlogPost } from "@/lib/blog/posts";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";

type Props = { params: Promise<{ slug: string }> };

type RelatedLink = { href: string; label: string; body: string };

const defaultRelatedLinks: RelatedLink[] = [
  { href: "/free-invoice-generator", label: "Free invoice generator", body: "Create a professional invoice online and download a PDF." },
  { href: "/gst-invoice-generator", label: "GST invoice generator", body: "Create GST-ready invoices with tax fields and PDF format." },
  { href: "/invoice-template-india", label: "Invoice template India", body: "See invoice format fields and examples for Indian businesses." },
  { href: "/tools/invoice-number-generator", label: "Invoice number generator", body: "Generate clean invoice numbers for billing records." },
];

const topicRelatedLinks: Array<{ test: (post: BlogPost) => boolean; links: RelatedLink[] }> = [
  {
    test: (post) => /gst|tax invoice|cgst|sgst|igst|bill format/i.test(`${post.title} ${post.slug} ${post.tags.join(" ")}`),
    links: [
      { href: "/gst-invoice-generator", label: "GST invoice generator", body: "Create GST invoices with GSTIN, tax rows and PDF output." },
      { href: "/tools/gst-calculator", label: "GST calculator", body: "Calculate CGST, SGST or IGST before creating invoices." },
      { href: "/blog/gst-bill-format", label: "GST bill format", body: "Learn mandatory GST bill fields and sample layouts." },
      { href: "/tax-invoice-format", label: "Tax invoice format", body: "Understand tax invoice rules, samples and examples." },
    ],
  },
  {
    test: (post) => /freelance|freelancer|writer|developer|designer/i.test(`${post.title} ${post.slug} ${post.tags.join(" ")}`),
    links: [
      { href: "/freelancer-invoice-generator", label: "Freelancer invoice generator", body: "Create invoices for freelance projects, retainers and clients." },
      { href: "/blog/freelancer-invoice-template", label: "Freelancer invoice template", body: "See freelance invoice examples and PDF template guidance." },
      { href: "/invoice-template-india", label: "Invoice template India", body: "Use a clean invoice format for Indian freelancers." },
      { href: "/quotation-maker", label: "Quotation maker", body: "Send quotes before starting freelance work." },
    ],
  },
  {
    test: (post) => /contractor|electrician|plumber|construction/i.test(`${post.title} ${post.slug} ${post.tags.join(" ")}`),
    links: [
      { href: "/contractor-invoice-generator", label: "Contractor invoice generator", body: "Bill labor, materials and milestones with a clean invoice." },
      { href: "/blog/contractor-invoice-format-guide", label: "Contractor invoice format", body: "Learn contractor billing fields and examples." },
      { href: "/quotation-maker", label: "Quotation maker", body: "Prepare a quote before starting contractor work." },
      { href: "/receipt-generator", label: "Receipt generator", body: "Give customers payment proof after receiving money." },
    ],
  },
  {
    test: (post) => /quotation|estimate/i.test(`${post.title} ${post.slug} ${post.tags.join(" ")}`),
    links: [
      { href: "/quotation-maker", label: "Quotation maker", body: "Create professional quotations online." },
      { href: "/blog/estimate-vs-invoice", label: "Estimate vs invoice", body: "Understand when to send estimates, quotes and invoices." },
      { href: "/free-invoice-generator", label: "Free invoice generator", body: "Convert approved work into a payable invoice." },
      { href: "/purchase-order-generator", label: "Purchase order generator", body: "Create purchase orders after supplier quotations." },
    ],
  },
  {
    test: (post) => /pdf|template|format/i.test(`${post.title} ${post.slug} ${post.tags.join(" ")}`),
    links: [
      { href: "/invoice-template-india", label: "Invoice template India", body: "Compare invoice templates and formats for India." },
      { href: "/free-invoice-generator", label: "Free invoice generator", body: "Create a PDF invoice from a ready online format." },
      { href: "/gst-invoice-generator", label: "GST invoice generator", body: "Use GST-ready templates for tax billing." },
      { href: "/receipt-generator", label: "Receipt generator", body: "Create PDF receipts after payment." },
    ],
  },
];

function relatedLinksForPost(post: BlogPost) {
  const matched = topicRelatedLinks.find((group) => group.test(post))?.links ?? defaultRelatedLinks;
  const links = post.relatedToolHref
    ? [{ href: post.relatedToolHref, label: post.relatedToolLabel ?? "Open related tool", body: "Use this related InvoiceWala tool for the next step." }, ...matched]
    : matched;
  return Array.from(new Map(links.map((link) => [link.href, link])).values()).slice(0, 6);
}

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
    robots: isNoindexBlogSlug(post.slug) ? { index: false, follow: true } : undefined,
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

  const relatedLinks = relatedLinksForPost(post);

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
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link className="transition hover:text-cyan-200" href="/">Home</Link>
          <span>/</span>
          <Link className="transition hover:text-cyan-200" href="/blog">Blog</Link>
          <span>/</span>
          <span className="text-slate-300">{post.title}</span>
        </div>
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

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Related pages</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Continue this workflow in InvoiceWala</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
                href={link.href}
                key={link.href}
              >
                <span className="text-sm font-semibold text-white">{link.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-400">{link.body}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-400">
          <p>InvoiceWala · invoicewala.shop</p>
          <PublicFooterLinks />
        </div>
      </footer>
    </main>
  );
}
