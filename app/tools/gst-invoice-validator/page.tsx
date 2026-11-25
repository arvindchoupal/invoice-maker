import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkflowToolPage } from "@/components/tools/WorkflowToolPage";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import GstInvoiceValidatorClient from "./GstInvoiceValidatorClient";

const tool = toolByHref("/tools/gst-invoice-validator")!;
const faqs: Array<[string, string]> = [
  ["What does the GST invoice validator check?", "It reviews common entered fields, GSTIN structure, invoice number and date, HSN/SAC and place-of-supply presence, tax arithmetic and total calculation."],
  ["Does it verify a GSTIN with the government portal?", "No. It checks the expected 15-character format only. Verify registration status and taxpayer details using the official GST portal."],
  ["Can it decide whether CGST/SGST or IGST applies?", "No. That depends on supplier location, place-of-supply rules and the transaction. The tool checks the treatment you entered but does not make the legal determination."],
  ["Why is there a one-rupee calculation tolerance?", "Invoice calculations can contain small rounding differences. The checker allows a limited tolerance while still showing larger mismatches."],
  ["Is the check a compliance certificate?", "No. It is a practical pre-send checklist, not tax, legal or professional certification."],
];

export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://invoicewala.shop${tool.href}` } };

export default function GstInvoiceValidatorPage() {
  return <><JsonLd data={[webApplicationSchema(tool), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://invoicewala.shop" }, { name: "Free tools", url: "https://invoicewala.shop/tools" }, { name: "GST Invoice Validator", url: `https://invoicewala.shop${tool.href}` }]), howToSchema("How to check a GST invoice", ["Enter the seller, buyer and invoice details.", "Choose the tax treatment shown on the invoice.", "Enter taxable value, rate, tax and total.", "Review every error and warning before issuing the invoice."])]} /><WorkflowToolPage eyebrow="Free GST invoice validator" title={tool.headline} intro="Run a practical pre-send check for common GST invoice fields and calculation errors. The tool stays in your browser and explains what passed, what needs attention and what still requires professional verification." highlights={tool.highlights} explanationTitle="Catch arithmetic and missing-field errors before sharing" explanation={["Invoice mistakes create avoidable customer questions and extra work for accountants. A structured review can catch missing identifiers, inconsistent tax splits and total mismatches while the document is still editable.", "A format check cannot decide the law. Confirm the actual GST rate, HSN/SAC, registration status, time of supply, place of supply and CGST/SGST/IGST treatment for the real transaction using current official guidance or a qualified professional."]} useCases={[["Small businesses", "Review a manually prepared GST bill before sending it to a customer."], ["Freelancers", "Check fields and calculations when GST applies to a service invoice."], ["Accountants", "Use a consistent first-pass checklist across client invoices."], ["Agencies and contractors", "Catch tax and total mismatches before milestone billing."]]} steps={["Enter the invoice identities and classification details.", "Select the tax split already used on the invoice.", "Add taxable value, rate, tax components and total.", "Resolve errors, review warnings and verify legal treatment."]} faqs={faqs} related={[["/tools/gst-calculator", "GST calculator", "Recalculate inclusive or exclusive GST amounts."], ["/tools/hsn-code-finder", "HSN and SAC finder", "Research common classification codes before verification."], ["/gst-invoice-generator", "GST invoice generator", "Create a structured GST invoice after checking the details."]]}><GstInvoiceValidatorClient /></WorkflowToolPage></>;
}
