import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import InvoiceNumberGeneratorClient from "./InvoiceNumberGeneratorClient";

const tool = toolByHref("/tools/invoice-number-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function InvoiceNumberGeneratorPage() {
  return <InvoiceNumberGeneratorClient />;
}
