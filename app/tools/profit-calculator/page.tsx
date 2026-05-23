import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import ProfitCalculatorClient from "./ProfitCalculatorClient";

const tool = toolByHref("/tools/profit-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function ProfitCalculatorPage() {
  return <ProfitCalculatorClient />;
}
