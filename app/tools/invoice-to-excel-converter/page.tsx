import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import InvoiceToExcelConverterClient from "./InvoiceToExcelConverterClient";

const tool = toolByHref("/tools/invoice-to-excel-converter")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function InvoiceToExcelConverterPage() {
  return <InvoiceToExcelConverterClient />;
}
