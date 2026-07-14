import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import GstBillFormatGeneratorClient from "./GstBillFormatGeneratorClient";

const tool = toolByHref("/tools/gst-bill-format-generator")!;

const faqs: Array<[string, string]> = [
  ["What is a GST bill format?", "A GST bill format is the layout used to show seller details, buyer details, invoice number, taxable value, GST rate, tax amount and final total."],
  ["Can I create a GST bill online?", "Yes. You can use this generator to preview the GST bill structure and then create a PDF invoice in InvoiceWala."],
  ["Does this support CGST, SGST and IGST?", "Yes. Use intra-state mode for CGST and SGST, or inter-state mode for IGST."],
  ["Is this GST bill format free?", "Yes. The preview generator is free to use online."],
  ["Can I download the GST bill as PDF?", "Create the real invoice in InvoiceWala after previewing the format, then save or download the PDF from your account."],
];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function GstBillFormatGeneratorPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema(tool),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://invoicewala.shop" },
            { name: "Tools", url: "https://invoicewala.shop/tools" },
            { name: "GST Bill Format Generator", url: `https://invoicewala.shop${tool.href}` },
          ]),
          howToSchema("How to create a GST bill format online", [
            "Enter seller, buyer and invoice details.",
            "Add taxable value and GST rate.",
            "Choose CGST plus SGST or IGST based on supply type.",
            "Review the GST bill format preview.",
            "Create the final PDF invoice in InvoiceWala.",
          ]),
        ]}
      />
      <GstBillFormatGeneratorClient faqs={faqs} />
    </>
  );
}
