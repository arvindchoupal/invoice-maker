import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import PdfToInvoiceExtractorClient from "./PdfToInvoiceExtractorClient";

const tool = toolByHref("/tools/pdf-to-invoice-extractor")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function PdfToInvoiceExtractorPage() {
  return <PdfToInvoiceExtractorClient />;
}
