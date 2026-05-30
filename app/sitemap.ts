import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { seoPages } from "@/lib/seo-pages";
import { TOOLS_CATALOG } from "@/lib/tools-catalog";

const siteUrl = "https://invoicewala.shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/free-invoice",
    "/tools",
    "/blog",
    "/login",
    "/signup",
    "/pricing",
    "/gst-bill-format",
    "/tax-invoice-format",
    "/blog/gst-bill-format",
    "/blog/tax-invoice-format",
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

  const seoRoutes = seoPages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...seoRoutes, ...toolRoutes, ...blogRoutes];
}
