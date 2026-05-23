import type { Metadata } from "next";
import { toolByHref } from "@/lib/tools-catalog";
import MarginCalculatorClient from "./MarginCalculatorClient";

const tool = toolByHref("/tools/margin-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function MarginCalculatorPage() {
  return <MarginCalculatorClient />;
}
