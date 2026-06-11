import type { MetadataRoute } from "next";
import { getIndexablePosts } from "@/lib/blog/posts";
import { seoPages } from "@/lib/seo-pages";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";

const siteUrl = "https://invoicewala.shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/free-invoice",
    "/tools",
    "/blog",
    "/pricing",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
    "/tax-invoice-format",
    "/blog/gst-bill-format",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const toolRoutes = TOOLS_CATALOG.map((tool) => ({
    url: `${siteUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolHrefs = new Set(TOOLS_CATALOG.map((tool) => tool.href));
  const staticHrefs = new Set(staticRoutes.map((route) => route.url.replace(siteUrl, "")));

  const seoRoutes = seoPages
    .filter((page) => !toolHrefs.has(`/${page.slug}`) && !staticHrefs.has(`/${page.slug}`))
    .map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = getIndexablePosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return Array.from(
    new Map([...staticRoutes, ...seoRoutes, ...toolRoutes, ...blogRoutes].map((route) => [route.url, route])).values()
  );
}
