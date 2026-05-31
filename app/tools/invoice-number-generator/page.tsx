import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { invoiceNumberFaqs } from "@/lib/invoice-number-content";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import InvoiceNumberGeneratorClient from "./InvoiceNumberGeneratorClient";

const tool = toolByHref("/tools/invoice-number-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function InvoiceNumberGeneratorPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(tool),
          faqSchema(invoiceNumberFaqs),
          breadcrumbSchema([
            { name: "Home", url: "https://invoicewala.shop" },
            { name: "Tools", url: "https://invoicewala.shop/tools" },
            { name: "Invoice Number Generator", url: "https://invoicewala.shop/tools/invoice-number-generator" },
          ]),
          howToSchema("How to generate an invoice number", [
            "Choose a short invoice prefix.",
            "Enter the next invoice serial number.",
            "Review the generated invoice number.",
            "Use the invoice number in your next invoice.",
          ]),
        ]}
      />
      <InvoiceNumberGeneratorClient />
    </>
  );
}
