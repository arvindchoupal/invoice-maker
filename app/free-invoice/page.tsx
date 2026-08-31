import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { FreeInvoiceClient } from "./FreeInvoiceClient";

const siteUrl = "https://invoicewala.shop";

const faqs: Array<[string, string]> = [
  ["Is this a free invoice generator?", "Yes. You can create an invoice and download your first PDF free without signup. A free account is only needed to save invoice history, reuse customers and track payments."],
  ["Can I create an invoice without signup?", "Yes. Add your invoice details and download your first PDF without creating an account."],
  ["Can I download the invoice PDF?", "Yes. Your first invoice PDF downloads free without signup. Create a free account when you want to save invoices and make repeat billing faster."],
  ["Who is this free invoice page for?", "It is built for freelancers, contractors, consultants, local shops, service businesses and anyone who needs a simple customer invoice."],
  ["Does it support GST or tax?", "Yes. You can add tax percentage on invoice item rows and use GST-ready invoice workflows when needed."],
];

export const metadata: Metadata = {
  title: "Free Invoice Generator | Download PDF Without Signup",
  description:
    "Create a professional invoice online and download your first PDF free without signup. Add business details, customer details, items, discounts and tax.",
  alternates: { canonical: `${siteUrl}/free-invoice` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Invoice Generator | InvoiceWala",
    description: "Create a professional invoice and download your first PDF free without signup. Create an account only to save history and track payments.",
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
