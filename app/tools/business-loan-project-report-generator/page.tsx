import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { LoanProjectSeoContent } from "@/components/tools/LoanProjectSeoContent";
import { LOAN_REPORT_FAQS } from "@/lib/loan-project-content";
import { toolByHref } from "@/lib/tools-catalog";
import LoanProjectClient from "./LoanProjectClient";

const tool = toolByHref("/tools/business-loan-project-report-generator")!;
export const metadata: Metadata = {
  title: tool.metaTitle, description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
  openGraph: { title: tool.metaTitle, description: tool.metaDescription, url: `https://invoicewala.shop${tool.href}`, type: "website", siteName: "InvoiceWala" },
  twitter: { card: "summary", title: tool.metaTitle, description: tool.metaDescription },
};
export default function LoanProjectPage() {
  return <><JsonLd data={[webApplicationSchema(tool), faqSchema(LOAN_REPORT_FAQS), breadcrumbSchema([
    { name: "Home", url: "https://invoicewala.shop" }, { name: "Tools", url: "https://invoicewala.shop/tools" },
    { name: tool.title, url: `https://invoicewala.shop${tool.href}` },
  ])]} /><LoanProjectClient seoContent={<LoanProjectSeoContent />} /></>;
}
