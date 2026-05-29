import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolByHref } from "@/lib/tools-catalog";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { gstCalculatorSeoContent } from "@/lib/tool-seo-content";
import GstCalculatorClient from "./GstCalculatorClient";

const tool = toolByHref("/tools/gst-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function GstCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(tool),
          faqSchema(gstCalculatorSeoContent.faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://invoicewala.shop" },
            { name: "Tools", url: "https://invoicewala.shop/tools" },
            { name: "GST Calculator", url: "https://invoicewala.shop/tools/gst-calculator" },
          ]),
          howToSchema("How to calculate GST online", [
            "Enter the amount you want to calculate GST on.",
            "Choose the GST rate and inclusive or exclusive mode.",
            "Select CGST plus SGST or IGST based on supply type.",
            "Review taxable value, GST amount and final total.",
            "Use the result to create a GST-ready invoice.",
          ]),
        ]}
      />
      <GstCalculatorClient />
    </>
  );
}
