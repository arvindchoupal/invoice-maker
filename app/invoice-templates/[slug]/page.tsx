import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceTemplatePage } from "@/components/seo/InvoiceTemplatePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { INVOICE_TEMPLATE_PAGES, getInvoiceTemplatePage, invoiceTemplateImageAlt, invoiceTemplateImageUrl, invoiceTemplateUrl } from "@/lib/invoice-template-pages";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/seo-schemas";

const siteUrl = "https://invoicewala.shop";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INVOICE_TEMPLATE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getInvoiceTemplatePage((await params).slug);
  if (!page) return {};
  const path = invoiceTemplateUrl(page.slug);
  const canonical = `${siteUrl}${path}`;
  const image = `${canonical}/opengraph-image`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: "InvoiceWala",
      images: [{ url: image, width: 1200, height: 630, alt: `Sample ${page.profession.toLowerCase()} invoice template` }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const page = getInvoiceTemplatePage((await params).slug);
  if (!page) notFound();
  const canonical = `${siteUrl}${invoiceTemplateUrl(page.slug)}`;
  const imageUrl = `${siteUrl}${invoiceTemplateImageUrl(page)}`;

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: "Invoice templates", url: `${siteUrl}/invoice-templates` },
          { name: `${page.profession} invoice template`, url: canonical },
        ]),
        faqSchema(page.faqs),
        howToSchema(`How to create a ${page.profession.toLowerCase()} invoice`, [
          "Add your business and customer details.",
          `Add the ${page.profession.toLowerCase()} services, materials or billing period.`,
          "Review tax, discounts, payment terms and the final total.",
          "Preview the invoice, then sign in to save and download the PDF.",
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: imageUrl,
          url: imageUrl,
          caption: invoiceTemplateImageAlt(page),
          width: 1200,
          height: 1500,
          representativeOfPage: true,
          creator: { "@type": "Organization", name: "InvoiceWala", url: siteUrl },
        },
      ]} />
      <InvoiceTemplatePage page={page} />
    </>
  );
}
