import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import TaxCalculatorClient from "./TaxCalculatorClient";

const tool = toolByHref("/tools/tax-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

const faqs: Array<[string, string]> = [
  ["What is a tax calculator?", "A tax calculator helps calculate tax amount and final total from an amount and tax rate."],
  ["Can I calculate inclusive tax?", "Yes. This calculator supports tax-inclusive and tax-exclusive calculations."],
  ["When should I use the GST calculator instead?", "Use the GST calculator when you need CGST, SGST or IGST split for Indian GST invoices."],
];

export default function TaxCalculatorPage() {
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
      <TaxCalculatorClient />
    </>
  );
}
