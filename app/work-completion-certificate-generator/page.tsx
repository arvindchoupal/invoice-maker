import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkflowToolPage } from "@/components/tools/WorkflowToolPage";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import WorkCompletionCertificateClient from "./WorkCompletionCertificateClient";

const tool = toolByHref("/work-completion-certificate-generator")!;
const faqs: Array<[string, string]> = [
  ["What is a work completion certificate?", "It is a written record confirming that identified work or deliverables were completed for a client on a stated date, usually against a quotation, contract or work order."],
  ["Who should sign the certificate?", "The contractor or service provider can prepare it, but a client representative with appropriate authority should review and sign the acceptance section."],
  ["Is it the same as an invoice?", "No. The certificate records completion or acceptance. An invoice requests payment and contains billing and tax information."],
  ["Can freelancers use this format?", "Yes. Freelancers, agencies, consultants, contractors and service businesses can describe the real deliverables and obtain client confirmation."],
  ["Does InvoiceWala verify that the work was completed?", "No. The tool only prepares the document from information entered by the user. Both parties must verify the facts before signing."],
];

export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://invoicewala.shop${tool.href}` } };

export default function WorkCompletionCertificatePage() {
  return <><JsonLd data={[webApplicationSchema(tool), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://invoicewala.shop" }, { name: "Free tools", url: "https://invoicewala.shop/tools" }, { name: "Work Completion Certificate Generator", url: `https://invoicewala.shop${tool.href}` }]), howToSchema("How to create a work completion certificate", ["Enter the client and contractor details.", "Identify the project and reference document.", "Describe the completed scope and completion date.", "Download, review and obtain signatures."])]} /><WorkflowToolPage eyebrow="Free work completion certificate generator" title={tool.headline} intro="Turn a completed project, contract or service engagement into a clear certificate with the real client, scope, dates and acceptance wording. Download a print-ready PDF in the browser." highlights={tool.highlights} explanationTitle="Connect delivery proof to billing and collection" explanation={["A completion certificate creates a shared record of what was delivered and when. Referencing the quotation, contract or work order makes it easier to connect the accepted scope with the final invoice and payment follow-up.", "Do not use a generic statement when there are pending items. Record exclusions, observations or incomplete milestones honestly, and have the appropriate client representative confirm the actual position before signing."]} useCases={[["Contractors", "Record completion of site, repair, installation or maintenance work."], ["Freelancers", "Confirm delivery of a defined project or milestone before final billing."], ["Agencies", "Document campaign, design, development or implementation completion."], ["Consultants", "Confirm reports, workshops or agreed advisory deliverables."]]} steps={["Add the client, contractor and project reference.", "Enter start, completion and issue dates.", "Describe the completed scope and any observations.", "Download the PDF and obtain authorized signatures."]} faqs={faqs} related={[["/quotation-maker", "Quotation maker", "Keep the approved scope and price connected."], ["/free-invoice", "Create final invoice", "Bill the completed and accepted work."], ["/tools/payment-reminder-generator", "Payment reminder", "Follow up politely if the final invoice becomes due."]]}><WorkCompletionCertificateClient /></WorkflowToolPage></>;
}
