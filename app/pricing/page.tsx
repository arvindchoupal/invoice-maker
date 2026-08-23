import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-schemas";
import { PricingClient } from "./PricingClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["Who gets a free InvoiceWala account?", "The first 1,000 genuine customers who register during the founding offer receive free access to all current Pro account features."],
  ["Do I need a card or UPI?", "No. InvoiceWala is not collecting subscription payments during the founding offer."],
  ["Will InvoiceWala charge me automatically later?", "No. The founding offer does not collect a payment method and will not turn into an automatic paid subscription."],
  ["What happens after 1,000 accounts?", "Terms for new accounts may change after the founding spots are claimed. Any future paid offer will be announced separately."],
];

export const metadata: Metadata = {
  title: "InvoiceWala Free Founding Account | First 1,000 Customers",
  description:
    "The first 1,000 InvoiceWala customers get a free founding account with all current Pro features. No card, subscription fee or automatic charge.",
  alternates: { canonical: `${siteUrl}/pricing` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "InvoiceWala Free Founding Account | First 1,000",
    description: "Claim a free InvoiceWala founding account with current Pro features. Limited to the first 1,000 customers.",
    url: `${siteUrl}/pricing`,
    siteName: "InvoiceWala",
  },
};

function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "InvoiceWala Founding Pro Account",
    description: metadata.description,
    brand: { "@type": "Brand", name: "InvoiceWala" },
    offers: {
      "@type": "Offer",
      price: "0",
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
            { name: "Founding offer", url: `${siteUrl}/pricing` },
          ]),
          faqSchema(faqs),
        ]}
      />
      <PricingClient />
    </>
  );
}
