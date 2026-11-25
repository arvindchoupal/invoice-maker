import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkflowToolPage } from "@/components/tools/WorkflowToolPage";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import OutstandingAgeingCalculatorClient from "./OutstandingAgeingCalculatorClient";

const tool = toolByHref("/tools/outstanding-ageing-calculator")!;
const faqs: Array<[string, string]> = [
  ["What is an invoice ageing report?", "It groups unpaid invoice balances by how long they have been outstanding, helping a business prioritize collection follow-up."],
  ["Which ageing buckets does this calculator use?", "It uses Current, 1–30, 31–60, 61–90 and more than 90 days based on the entered due date and as-of date."],
  ["How are partial payments handled?", "The paid amount is subtracted from the invoice amount, and only the remaining balance is placed in the ageing bucket."],
  ["Does the tool send payment reminders?", "No. Export the working or open InvoiceWala's payment-reminder generator to prepare a message after verifying the balance."],
  ["Is my customer data uploaded?", "No. This public calculation runs in the browser. The exported CSV is downloaded to your device."],
];

export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://invoicewala.shop${tool.href}` } };

export default function OutstandingAgeingCalculatorPage() {
  return <><JsonLd data={[webApplicationSchema(tool), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://invoicewala.shop" }, { name: "Free tools", url: "https://invoicewala.shop/tools" }, { name: "Outstanding Ageing Calculator", url: `https://invoicewala.shop${tool.href}` }]), howToSchema("How to create an invoice ageing report", ["Choose the ageing report date.", "Add each customer invoice and its due date.", "Record any partial payment received.", "Review buckets and export the CSV."])]} /><WorkflowToolPage eyebrow="Free outstanding ageing calculator" title={tool.headline} intro="Add customer invoices, due dates and partial payments to see what is current and what is 30, 60, 90 or more days overdue. Export the verified working for your accountant or collection follow-up." highlights={tool.highlights} explanationTitle="Use ageing to decide who needs attention first" explanation={["A total outstanding figure does not show urgency. Ageing separates invoices that are not yet due from balances that have remained unpaid for longer periods, helping an owner or accountant plan polite and proportionate follow-up.", "The result is only as reliable as the entered invoice, due-date and payment data. Reconcile bank receipts, credit notes and disputed amounts before treating the report as a customer statement or accounting record."]} useCases={[["Business owners", "See which customer balances need attention without maintaining a complex spreadsheet."], ["Accountants", "Prepare a compact receivables working for client review."], ["Agencies", "Track milestone and retainer invoices across clients."], ["Contractors", "Separate recent bills from older certified-but-unpaid work."]]} steps={["Set the as-of date for the report.", "Add invoice amount, due date and payment received.", "Review current and overdue ageing buckets.", "Export CSV, verify balances and start follow-up."]} faqs={faqs} related={[["/tools/invoice-due-date-calculator", "Due date calculator", "Calculate the agreed invoice payment date first."], ["/tools/payment-reminder-generator", "Payment reminder generator", "Turn a verified overdue balance into a polite message."], ["/receipt-generator", "Receipt generator", "Record payment proof when the balance is collected."]]}><OutstandingAgeingCalculatorClient /></WorkflowToolPage></>;
}
