import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import BarcodeToolClient from "./BarcodeToolClient";
import { BarcodeSeoSections, barcodeFaqs } from "./BarcodeSeoSections";

const tool = toolByHref("/tools/barcode-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function BarcodeGeneratorPage() {
  return (
    <>
      <JsonLd data={[
        webApplicationSchema(tool),
        faqSchema(barcodeFaqs),
        breadcrumbSchema([
          { name: "Home", url: "https://invoicewala.shop" },
          { name: "Free tools", url: "https://invoicewala.shop/tools" },
          { name: "Barcode generator and scanner", url: `https://invoicewala.shop${tool.href}` },
        ]),
        howToSchema("How to generate a barcode", [
          "Choose Code 39 for uppercase letters and numbers, or EAN-13 for a 12 or 13 digit product number.",
          "Enter the value to encode and review any format or check digit messages.",
          "Choose the barcode height and whether to print its value below the bars.",
          "Download the barcode as SVG or PNG and test it with the scanner before printing labels.",
        ]),
      ]} />
      <ToolPageLayout after={<BarcodeSeoSections />} tool={tool} wideTool>
        <BarcodeToolClient />
      </ToolPageLayout>
    </>
  );
}
