import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import HsnCodeFinderClient from "./HsnCodeFinderClient";

const tool = toolByHref("/tools/hsn-code-finder")!;

const faqs: Array<[string, string]> = [
  ["What is an HSN code?", "HSN is a classification system used for goods. Indian GST invoices commonly use HSN codes to identify the goods being supplied."],
  ["What is a SAC code?", "SAC means Services Accounting Code and is used to classify services such as consulting, software development, repair and advertising."],
  ["Can I search by product or service name?", "Yes. Search by code, common product name, service name, profession or keyword."],
  ["Are GST rates in this tool final?", "No. Rates are indicative because classification, notifications, packaging, value and transaction details can change the applicable rate. Verify on the official GST or CBIC portal or with a tax professional."],
  ["Can I use the result on an invoice?", "You can copy the code and use it while preparing an invoice, but confirm that the classification fits the exact product or service."],
];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function HsnCodeFinderPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(tool),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://invoicewala.shop" },
            { name: "Tools", url: "https://invoicewala.shop/tools" },
            { name: "HSN Code Finder", url: "https://invoicewala.shop/tools/hsn-code-finder" },
          ]),
          howToSchema("How to find an HSN or SAC code", [
            "Enter a product, service, profession or code.",
            "Choose HSN for goods or SAC for services if needed.",
            "Review matching descriptions and indicative GST rates.",
            "Copy the closest code.",
            "Verify the classification on the official GST or CBIC portal before filing.",
          ]),
        ]}
      />
      <HsnCodeFinderClient faqs={faqs} />
    </>
  );
}

