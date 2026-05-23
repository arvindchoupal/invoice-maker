import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import TaxCalculatorClient from "./TaxCalculatorClient";

const tool = toolByHref("/tools/tax-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function TaxCalculatorPage() {
  return <TaxCalculatorClient />;
}
