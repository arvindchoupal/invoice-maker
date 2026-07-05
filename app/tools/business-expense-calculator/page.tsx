import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BUSINESS_EXPENSE_FAQS } from "@/lib/business-expense-content";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import BusinessExpenseCalculatorClient from "./BusinessExpenseCalculatorClient";

const tool = toolByHref("/tools/business-expense-calculator")!;
const siteUrl = "https://invoicewala.shop";
export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `${siteUrl}${tool.href}` },
  openGraph: { title: tool.metaTitle, description: tool.metaDescription, url: `${siteUrl}${tool.href}`, siteName: "InvoiceWala" },
};

export default function BusinessExpenseCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        webApplicationSchema(tool),
        faqSchema(BUSINESS_EXPENSE_FAQS),
        breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: "Tools", url: `${siteUrl}/tools` },
          { name: "Business expense calculator", url: `${siteUrl}${tool.href}` },
        ]),
      ]} />
      <BusinessExpenseCalculatorClient />
    </>
  );
}
