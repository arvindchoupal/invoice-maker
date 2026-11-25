import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkflowToolPage } from "@/components/tools/WorkflowToolPage";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import DeliveryChallanGeneratorClient from "./DeliveryChallanGeneratorClient";

const tool = toolByHref("/delivery-challan-generator")!;
const faqs: Array<[string, string]> = [
  ["What is a delivery challan?", "A delivery challan records the movement of goods when a regular tax invoice is not being issued at that moment, such as job work, returnable material or supply on approval."],
  ["Does a delivery challan replace an invoice?", "No. A challan records movement or delivery. The transaction may still require an invoice, e-way bill or other document depending on the facts and applicable rules."],
  ["Can I create a delivery challan without GSTIN?", "The tool allows optional GSTIN fields, but the information required for your real movement depends on registration status and the reason for movement."],
  ["Can I use it for job work?", "Yes. Choose Job work as the reason and describe the goods, quantities, sender, receiver and transport details accurately."],
  ["Is the generated PDF stored by InvoiceWala?", "No. This public tool prepares the PDF in your browser. Download and retain your own copy."],
];

export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://invoicewala.shop${tool.href}` } };

export default function DeliveryChallanGeneratorPage() {
  return <><JsonLd data={[webApplicationSchema(tool), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://invoicewala.shop" }, { name: "Free tools", url: "https://invoicewala.shop/tools" }, { name: "Delivery Challan Generator", url: `https://invoicewala.shop${tool.href}` }]), howToSchema("How to create a delivery challan", ["Choose the reason for goods movement.", "Add sender, receiver and transport details.", "List the goods and quantities.", "Review and download the delivery challan PDF."])]} /><WorkflowToolPage eyebrow="Free delivery challan generator" title={tool.headline} intro="Record goods movement for delivery, job work, returnable material or approval. Add the real parties and goods, review the preview and download the PDF without creating an account." highlights={tool.highlights} explanationTitle="When a delivery challan belongs in the workflow" explanation={["A delivery challan helps identify what moved, between whom, on what date and for what reason. It is different from a payment request: the challan supports movement and receipt, while an invoice records the taxable sale or service billing.", "Use accurate quantities, addresses, GSTINs and transport references. GST and e-way-bill requirements depend on the transaction, value, distance, registration status and current rules, so treat the generated document as a working format rather than legal advice."]} useCases={[["Goods delivery", "Record items sent before or alongside the final billing workflow."], ["Job work", "Document materials sent to or returned from a job worker."], ["Returnable material", "Track tools, samples, equipment or other material expected back."], ["Supply on approval", "Record goods sent for customer review before final acceptance."]]} steps={["Choose the movement reason and challan date.", "Enter consignor, consignee and transport details.", "Add each item, quantity, unit and optional value.", "Review the preview, download PDF and obtain receipt/signature."]} faqs={faqs} related={[["/quotation-maker", "Quotation maker", "Agree pricing and terms before fulfilment."], ["/free-invoice", "Create invoice", "Turn the approved delivery into a customer invoice."], ["/receipt-generator", "Receipt generator", "Issue payment proof after collection."]]}><DeliveryChallanGeneratorClient /></WorkflowToolPage></>;
}
