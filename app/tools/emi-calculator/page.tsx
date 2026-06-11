import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import EmiCalculatorClient from "./EmiCalculatorClient";

const tool = toolByHref("/tools/emi-calculator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

const faqs: Array<[string, string]> = [
  ["What is an EMI calculator?", "An EMI calculator estimates monthly loan payments based on loan amount, interest rate and tenure."],
  ["Can small businesses use this EMI calculator?", "Yes. Small businesses can use it to estimate equipment loan, vehicle loan or working capital repayment before planning expenses."],
  ["Is this EMI calculator free?", "Yes. This public calculator is free to use in the browser."],
];

export default function EmiCalculatorPage() {
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
      <EmiCalculatorClient />
    </>
  );
}
