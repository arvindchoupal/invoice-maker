import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/dashboard",
          "/invoices",
          "/clients",
          "/bookkeeping",
          "/recurring",
          "/payments",
          "/reports",
          "/settings",
          "/documents",
          "/ai-import",
        ],
      },
    ],
    host: "https://invoicewala.shop",
    sitemap: "https://invoicewala.shop/sitemap.xml",
  };
}
