import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { profitCalculatorFaqs as faqs } from "@/lib/profit-calculator-content";
import { ProfitCalculatorSeoContent } from "@/components/tools/ProfitCalculatorSeoContent";
import ProfitCalculatorClient from "./ProfitCalculatorClient";

const siteUrl = "https://invoicewala.shop";

export const metadata: Metadata = {
  title: "Profit Calculator | Profit Margin & Markup Calculator",
  description:
    "Free profit calculator for small businesses and freelancers. Calculate net profit, profit margin, markup, revenue, expenses and invoice pricing instantly.",
  alternates: { canonical: `${siteUrl}/tools/profit-calculator` },
  openGraph: {
    title: "Free Profit Calculator for Small Businesses & Freelancers",
    description:
      "Calculate profit, profit margin, markup and pricing instantly. Turn calculations into professional invoices with InvoiceWala.",
    url: `${siteUrl}/tools/profit-calculator`,
    siteName: "InvoiceWala",
  },
};

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function softwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "InvoiceWala Profit Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/tools/profit-calculator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "Profit Calculator", item: `${siteUrl}/tools/profit-calculator` },
    ],
  };
}

export default function ProfitCalculatorPage() {
  return (
    <>
      <JsonLd data={[faqSchema(), softwareSchema(), breadcrumbSchema()]} />
      <ProfitCalculatorClient seoContent={<ProfitCalculatorSeoContent />} />
    </>
  );
}
