import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { FreeInvoiceClient } from "./FreeInvoiceClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["Can I create an invoice without signup?", "Yes. You can create and preview an invoice first. Signup or login is needed when you want to save it and download the PDF."],
  ["Can I download the invoice PDF?", "Yes. After signup or login, the invoice can be attached to your workspace and downloaded as a PDF."],
  ["Who is this free invoice page for?", "It is built for freelancers, contractors, consultants, local shops, service businesses and anyone who needs a simple customer invoice."],
  ["Does it support GST or tax?", "Yes. You can add tax percentage on invoice item rows and use GST-ready invoice workflows when needed."],
];

export const metadata: Metadata = {
  title: "Free Invoice Maker | Create Invoice Before Signup",
  description:
    "Create a free invoice online before signup. Add business details, customer details, items, tax and preview the invoice before saving PDF.",
  alternates: { canonical: `${siteUrl}/free-invoice` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Invoice Maker | InvoiceWala",
    description: "Create an invoice first, then sign up only when you want to save and download the PDF.",
    url: `${siteUrl}/free-invoice`,
    siteName: "InvoiceWala",
  },
};

export default function FreeInvoicePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            title: "InvoiceWala Free Invoice Maker",
            metaDescription: metadata.description as string,
            href: "/free-invoice",
          }),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Free Invoice Maker", url: `${siteUrl}/free-invoice` },
          ]),
          faqSchema(faqs),
        ]}
      />
      <FreeInvoiceClient />
    </>
  );
}
