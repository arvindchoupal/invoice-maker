import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import PdfToInvoiceExtractorClient from "./PdfToInvoiceExtractorClient";

const tool = toolByHref("/tools/pdf-to-invoice-extractor")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

const faqs: Array<[string, string]> = [
  ["What is a PDF to invoice extractor?", "It helps structure invoice text by detecting fields such as email and total from pasted OCR or PDF text."],
  ["Does this upload PDF files?", "This public page is a lightweight text extractor. Full file upload and AI import belong inside the signed-in AI import workflow."],
  ["Can extracted invoice data become records?", "Yes. InvoiceWala's AI import workflow is designed to review extracted fields before creating invoice, purchase or expense records."],
];

export default function PdfToInvoiceExtractorPage() {
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
      <PdfToInvoiceExtractorClient />
    </>
  );
}
