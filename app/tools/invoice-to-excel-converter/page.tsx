import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import InvoiceToExcelConverterClient from "./InvoiceToExcelConverterClient";

const tool = toolByHref("/tools/invoice-to-excel-converter")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

const faqs: Array<[string, string]> = [
  ["What is an invoice to Excel converter?", "It converts invoice line items into spreadsheet-ready CSV format for Excel or accounting review."],
  ["Can I download CSV?", "Yes. Paste invoice rows and download a CSV file that can open in Excel."],
  ["Is this useful for GST reports?", "It can help structure line item data for review, but final GST reporting should be verified with your accountant."],
];

export default function InvoiceToExcelConverterPage() {
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
      <InvoiceToExcelConverterClient />
    </>
  );
}
