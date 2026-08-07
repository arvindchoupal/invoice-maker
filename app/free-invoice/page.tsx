import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { FreeInvoiceClient } from "./FreeInvoiceClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["Is this a free invoice generator?", "Yes. This free invoice generator lets you create and preview a professional invoice online before signup. Sign up only when you want to save it and download the PDF."],
  ["Can I create an invoice without signup?", "Yes. You can create and preview an invoice first. Signup or login is needed when you want to save it and download the PDF."],
  ["Can I download the invoice PDF?", "Yes. After signup or login, the invoice can be attached to your workspace and downloaded as a PDF."],
  ["Who is this free invoice page for?", "It is built for freelancers, contractors, consultants, local shops, service businesses and anyone who needs a simple customer invoice."],
  ["Does it support GST or tax?", "Yes. You can add tax percentage on invoice item rows and use GST-ready invoice workflows when needed."],
];

export const metadata: Metadata = {
  title: "Free Invoice Generator Tool | Create Invoice Before Signup",
  description:
    "Use our free invoice generator to create a professional invoice online. Add business details, customer details, items and tax, then preview before saving a PDF.",
  alternates: { canonical: `${siteUrl}/free-invoice` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Invoice Generator | InvoiceWala",
    description: "Create a professional invoice online, then sign up only when you want to save and download the PDF.",
    url: `${siteUrl}/free-invoice`,
    siteName: "InvoiceWala",
  },
};

type FreeInvoicePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FreeInvoicePage({ searchParams }: FreeInvoicePageProps) {
  const params = await searchParams;
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            title: "InvoiceWala Free Invoice Generator",
            metaDescription: metadata.description as string,
            href: "/free-invoice",
          }),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Free Invoice Generator", url: `${siteUrl}/free-invoice` },
          ]),
          faqSchema(faqs),
        ]}
      />
      <FreeInvoiceClient
        initialItem={{
          name: firstParam(params.item),
          taxRate: firstParam(params.gstRate),
          unitPrice: firstParam(params.amount),
        }}
      />
    </>
  );
}
