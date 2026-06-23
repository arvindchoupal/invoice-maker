import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { paymentReminderFaqs } from "@/lib/payment-reminder-content";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import PaymentReminderGeneratorClient from "./PaymentReminderGeneratorClient";

const tool = toolByHref("/tools/payment-reminder-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: [
    "payment reminder message",
    "payment reminder",
    "payment reminder template",
    "WhatsApp payment reminder",
    "overdue invoice reminder email",
    "payment follow up message",
    "gentle reminder for payment message",
    "polite payment reminder",
    "Hinglish payment reminder",
  ],
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `https://invoicewala.shop${tool.href}`,
    siteName: "InvoiceWala",
    type: "website",
  },
};

export default function PaymentReminderGeneratorPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(tool),
          faqSchema(paymentReminderFaqs),
          breadcrumbSchema([
            { name: "Home", url: "https://invoicewala.shop" },
            { name: "Free tools", url: "https://invoicewala.shop/tools" },
            { name: "Payment Reminder Generator", url: `https://invoicewala.shop${tool.href}` },
          ]),
          howToSchema("How to create a payment reminder message", [
            "Enter the client and invoice details.",
            "Choose the payment reminder stage and tone.",
            "Select English or Hinglish.",
            "Copy the reminder for WhatsApp, email or SMS.",
          ]),
        ]}
      />
      <PaymentReminderGeneratorClient />
    </>
  );
}
