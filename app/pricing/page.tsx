import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";
import { PricingClient } from "./PricingClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["How much does InvoiceWala Pro cost?", "InvoiceWala Pro is currently priced at ₹199/month during the early growth phase."],
  ["Is there a free plan?", "Yes. InvoiceWala has a free plan for trying invoices and free tools before upgrading."],
  ["Who should use the Pro plan?", "Freelancers, shops, contractors, agencies and small businesses that need unlimited invoices, branding removal and stronger workflows should use Pro."],
  ["Can I use InvoiceWala before paying?", "Yes. You can start free, create invoices and use public tools before upgrading."],
];

export const metadata: Metadata = {
  title: "InvoiceWala Pricing | ₹199 Pro Invoice Plan",
  description:
    "Simple InvoiceWala pricing for freelancers, GST businesses and small teams. Start free and upgrade to Pro at ₹199/month during early access.",
  alternates: { canonical: `${siteUrl}/pricing` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "InvoiceWala Pricing | ₹199 Pro Plan",
    description: "Start free, then upgrade to Pro for invoices, GST workflows, reminders and reports.",
    url: `${siteUrl}/pricing`,
    siteName: "InvoiceWala",
  },
};

function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "InvoiceWala Pro",
    description: metadata.description,
    brand: { "@type": "Brand", name: "InvoiceWala" },
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/pricing`,
    },
  };
}

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema(),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Pricing", url: `${siteUrl}/pricing` },
          ]),
          faqSchema(faqs),
        ]}
      />
      <PricingClient />
    </>
  );
}
