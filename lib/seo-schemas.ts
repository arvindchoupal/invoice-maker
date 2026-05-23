import { TOOLS_CATALOG } from "@/lib/tools-catalog";

const SITE = "https://invoicewala.shop";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InvoiceWala",
    url: SITE,
    logo: `${SITE}/favicon.ico`,
    description: "GST invoice maker and free business calculators for Indian freelancers and small businesses.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InvoiceWala",
    url: SITE,
    description: "Create GST invoices, track payments and use free GST, profit and margin calculators.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqSchema(faqs: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function toolsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "InvoiceWala free business tools",
    itemListElement: TOOLS_CATALOG.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE}${tool.href}`,
      description: tool.body,
    })),
  };
}

export function webApplicationSchema(tool: {
  title: string;
  metaDescription: string;
  href: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: `${SITE}${tool.href}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description: tool.metaDescription,
    provider: {
      "@type": "Organization",
      name: "InvoiceWala",
      url: SITE,
    },
  };
}
