import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import ProfitCalculatorClient from "./ProfitCalculatorClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["What is profit?", "Profit is the money left after subtracting business expenses from revenue. Profit = Revenue - Expenses."],
  ["How do I calculate profit margin?", "Profit margin is calculated as Net Profit divided by Revenue multiplied by 100. For example, ₹400 profit on ₹1,000 revenue gives a 40% margin."],
  ["What is markup?", "Markup compares profit to cost or expenses. Markup % = Net Profit divided by Expenses multiplied by 100."],
  ["Can I create an invoice from the result?", "Yes. After calculating profit, you can use InvoiceWala's invoice generator to create a professional invoice with the same pricing."],
  ["Is this calculator free?", "Yes. InvoiceWala's profit calculator is free to use and does not require signup for calculation."],
  ["How do freelancers use a profit calculator?", "Freelancers use a profit calculator to compare project revenue with expenses such as software, outsourcing, ads, travel or time cost before sending invoices."],
];

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
      <ProfitCalculatorClient />
    </>
  );
}
