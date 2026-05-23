import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import EmiCalculatorClient from "./EmiCalculatorClient";

const tool = toolByHref("/tools/emi-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function EmiCalculatorPage() {
  return <EmiCalculatorClient />;
}
