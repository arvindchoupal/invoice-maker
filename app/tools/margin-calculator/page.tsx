import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import MarginCalculatorClient from "./MarginCalculatorClient";

const tool = toolByHref("/tools/margin-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

const faqs: Array<[string, string]> = [
  ["What is a margin calculator?", "A margin calculator shows profit margin, markup and profit from cost and selling price."],
  ["Who should use a margin calculator?", "Freelancers, shops, agencies, contractors and small businesses can use it before quoting or invoicing."],
  ["What is the difference between margin and markup?", "Margin compares profit to selling price, while markup compares profit to cost."],
];

export default function MarginCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        webApplicationSchema(tool),
        breadcrumbSchema([
          { name: "Home", url: "https://invoicewala.shop" },
          { name: "Tools", url: "https://invoicewala.shop/tools" },
          { name: tool.title, url: `https://invoicewala.shop${tool.href}` },
        ]),
        faqSchema(faqs),
      ]} />
      <MarginCalculatorClient />
    </>
  );
}
