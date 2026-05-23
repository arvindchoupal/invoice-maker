import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolByHref } from "@/lib/tools-catalog";
import { webApplicationSchema } from "@/lib/seo-schemas";
import GstCalculatorClient from "./GstCalculatorClient";

const tool = toolByHref("/tools/gst-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function GstCalculatorPage() {
  return (
    <>
      <JsonLd data={webApplicationSchema(tool)} />
      <GstCalculatorClient />
    </>
  );
}
