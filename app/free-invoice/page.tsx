import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { getInvoiceTemplatePage } from "@/lib/invoice-template-pages";
import { FreeInvoiceContent } from "./FreeInvoiceContent";
import { freeInvoiceFaqs } from "@/lib/free-invoice-content";
import { FreeInvoiceClient } from "./FreeInvoiceClient";

const siteUrl = "https://invoicewala.shop";

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
  const template = getInvoiceTemplatePage(firstParam(params.template) || "");
  const category = template?.category.toLowerCase() || "";
  const style = category.includes("construction") ? "construction" : category.includes("creative") ? "studio" : category.includes("retail") ? "retail" : "classic";
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
          faqSchema(freeInvoiceFaqs),
        ]}
      />
      <FreeInvoiceClient
        initialTaxMode={firstParam(params.taxMode) === "intra" ? "intra" : firstParam(params.taxMode) === "inter" ? "inter" : undefined}
        initialSaveError={firstParam(params.saveError) === "1"}
        initialTemplate={template ? { slug: template.slug, label: template.profession, style } : undefined}
        initialItem={{
          name: firstParam(params.item),
          taxRate: firstParam(params.gstRate),
          unitPrice: firstParam(params.amount),
        }}
      >
        <FreeInvoiceContent />
      </FreeInvoiceClient>
    </>
  );
}
