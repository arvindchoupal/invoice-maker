import type { MetadataRoute } from "next";
import { getIndexablePosts } from "@/lib/blog/posts";
import { seoPages } from "@/lib/seo-pages";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";

const siteUrl = "https://invoicewala.shop";

const excludedSitemapHrefs = new Set([
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/blog/freelancer-invoice-guide",
  "/blog/gst-bill-format-sample-invoice",
  "/blog/how-to-create-invoice-numbers",
  "/blog/professional-quotation-format-india",
  "/blog/tax-invoice-format",
  "/blog/tax-invoice-format-rules-examples",
  "/gst-bill-format",
  "/online-invoice-maker",
  "/free-online-invoice-maker",
  "/gst-invoice-maker",
  "/gst-calculator",
  "/profit-margin-calculator",
  "/invoice-number-generator",
  "/pdf-to-invoice-ai",
  "/payment-reminder",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/free-invoice",
    "/tools",
    "/blog",
    "/pricing",
    "/about",
    "/contact",
    "/press-kit",
    "/tax-invoice-format",
    "/blog/gst-bill-format",
    "/tools/hsn-code-finder/methodology",
  ]
    .filter((path) => !excludedSitemapHrefs.has(path))
    .map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }));

  const toolRoutes = TOOLS_CATALOG
    .filter((tool) => !excludedSitemapHrefs.has(tool.href))
    .map((tool) => ({
      url: `${siteUrl}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const toolHrefs = new Set(TOOLS_CATALOG.map((tool) => tool.href));
  const staticHrefs = new Set(staticRoutes.map((route) => route.url.replace(siteUrl, "")));

  const seoRoutes = seoPages
    .filter((page) => {
      const href = `/${page.slug}`;
      return !excludedSitemapHrefs.has(href) && !toolHrefs.has(href) && !staticHrefs.has(href);
    })
    .map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  const blogRoutes = getIndexablePosts()
    .filter((post) => !excludedSitemapHrefs.has(`/blog/${post.slug}`))
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return Array.from(
    new Map([...staticRoutes, ...seoRoutes, ...toolRoutes, ...blogRoutes].map((route) => [route.url, route])).values()
  );
}
