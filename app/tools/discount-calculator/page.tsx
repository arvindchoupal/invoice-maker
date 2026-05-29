import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { discountFaqs } from "@/lib/discount-calculator-content";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import DiscountCalculatorClient from "./DiscountCalculatorClient";

const tool = toolByHref("/tools/discount-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `https://invoicewala.shop${tool.href}`,
    siteName: "InvoiceWala",
  },
};

export default function DiscountCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(tool),
          faqSchema(discountFaqs),
          breadcrumbSchema([
            { name: "Home", url: "https://invoicewala.shop" },
            { name: "Tools", url: "https://invoicewala.shop/tools" },
            { name: "Discount Calculator", url: "https://invoicewala.shop/tools/discount-calculator" },
          ]),
          howToSchema("How to calculate discount online", [
            "Enter the original price before discount.",
            "Enter the discount percentage offered.",
            "Review the discount amount, final price and savings.",
            "Use the final price in a quotation, invoice or retail offer.",
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Discount Calculator",
            url: "https://invoicewala.shop/tools/discount-calculator",
            description: tool.metaDescription,
            inLanguage: "en-IN",
            isPartOf: {
              "@type": "WebSite",
              name: "InvoiceWala",
              url: "https://invoicewala.shop",
            },
          },
        ]}
      />
      <DiscountCalculatorClient />
    </>
  );
}
