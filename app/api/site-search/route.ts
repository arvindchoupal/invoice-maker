import { NextResponse } from "next/server";
import { getIndexablePosts } from "@/lib/blog/posts";
import { INVOICE_TEMPLATE_PAGES, invoiceTemplateUrl } from "@/lib/invoice-template-pages";
import { seoPages } from "@/lib/seo-pages";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";

type SearchItem = {
  title: string;
  href: string;
  description: string;
  type: "Tool" | "Template" | "Guide" | "Page";
  keywords?: string[];
};

const staticPages: SearchItem[] = [
  { title: "Create free invoice", href: "/free-invoice", description: "Create and preview a professional invoice before signup.", type: "Page", keywords: ["invoice maker", "create invoice", "free invoice"] },
  { title: "Invoice templates", href: "/invoice-templates", description: "Browse invoice formats for businesses and professions.", type: "Template", keywords: ["bill format", "invoice format", "template"] },
  { title: "GST invoice format", href: "/gst-invoice-format", description: "GST invoice format, template and sample guidance for India.", type: "Guide", keywords: ["gst bill format", "gst template"] },
  { title: "Tax invoice format", href: "/tax-invoice-format", description: "Tax invoice format, sample and GST field guide.", type: "Guide", keywords: ["tax bill", "gst invoice"] },
  { title: "Founding offer", href: "/pricing", description: "First 1,000 InvoiceWala customer accounts free.", type: "Page" },
  { title: "Contact InvoiceWala", href: "/contact", description: "Get in touch with the InvoiceWala team.", type: "Page" },
];

function catalogue(): SearchItem[] {
  return [
    ...staticPages,
    ...TOOLS_CATALOG.map((tool) => ({ title: tool.title, href: tool.href, description: tool.body, type: "Tool" as const, keywords: [tool.headline, tool.intent, ...tool.highlights] })),
    ...seoPages.map((page) => ({ title: page.h1, href: `/${page.slug}`, description: page.description, type: "Page" as const, keywords: [page.primaryKeyword, ...page.secondaryKeywords, ...(page.longTailKeywords ?? [])] })),
    ...INVOICE_TEMPLATE_PAGES.map((page) => ({ title: page.h1, href: invoiceTemplateUrl(page.slug), description: page.description, type: "Template" as const, keywords: [page.primaryKeyword, ...(page.searchIntents ?? []), page.profession] })),
    ...getIndexablePosts().map((post) => ({ title: post.title, href: `/blog/${post.slug}`, description: post.description, type: "Guide" as const, keywords: post.tags })),
  ];
}

const searchItems = catalogue();

function score(item: SearchItem, terms: string[]) {
  const title = item.title.toLowerCase();
  const searchable = `${item.title} ${item.description} ${(item.keywords ?? []).join(" ")}`.toLowerCase();
  return terms.reduce((total, term) => {
    if (title === term) return total + 12;
    if (title.startsWith(term)) return total + 8;
    if (title.includes(term)) return total + 5;
    if (searchable.includes(term)) return total + 2;
    return total;
  }, 0);
}

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6);

  if (terms.length === 0) return NextResponse.json({ results: [] });

  const results = searchItems
    .map((item) => ({ item, score: score(item, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 8)
    .map(({ item }) => item);

  return NextResponse.json({ results }, { headers: { "Cache-Control": "public, max-age=300" } });
}
