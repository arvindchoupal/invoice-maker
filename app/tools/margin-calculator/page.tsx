import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import { marginCalculatorFaqs as faqs } from "@/lib/margin-calculator-content";
import { MarginCalculatorSeoContent } from "@/components/tools/MarginCalculatorSeoContent";
import MarginCalculatorClient from "./MarginCalculatorClient";

const tool = toolByHref("/tools/margin-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

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
      <MarginCalculatorClient seoContent={<MarginCalculatorSeoContent />} />
    </>
  );
}
