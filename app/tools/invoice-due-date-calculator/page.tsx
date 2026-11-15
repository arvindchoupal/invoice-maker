import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, howToSchema, webApplicationSchema } from "@/lib/seo-schemas";
import { toolByHref } from "@/lib/tools-catalog";
import InvoiceDueDateCalculatorClient from "./InvoiceDueDateCalculatorClient";

const tool = toolByHref("/tools/invoice-due-date-calculator")!;
const faqs: Array<[string, string]> = [
  ["What is the difference between invoice date and due date?", "The invoice date records when the invoice was issued. The due date is the later date by which the customer is expected to pay under the agreed payment term."],
  ["What does Net 30 mean on an invoice?", "Net 30 normally means payment is due 30 calendar days after the invoice date, unless the agreement defines a different starting point or business-day rule."],
  ["Is Net 30 the same as one month?", "Not always. Adding 30 calendar days can produce a different date from using the same numbered day next month or the last day of the month."],
  ["Are weekends included in invoice payment terms?", "Calendar-day terms normally include weekends. Some contracts move a due date that falls on a weekend. Use the weekend option only when it matches the agreement."],
  ["What does end of month mean?", "In this calculator, end of month means the last calendar day of the invoice month. Review the result against the exact wording in your customer agreement."],
  ["Can I use a custom number of days?", "Yes. Choose Custom days and enter the number agreed with the customer."],
  ["Does the calculator count business days?", "No. It adds calendar days. The weekend option can move the final date, but the calculator does not remove weekends or public holidays from the full counting period."],
  ["What should I do when an invoice becomes overdue?", "Check that the payment has not already arrived, confirm the amount still outstanding and send a polite reminder containing the invoice number, original due date and a clear request for the expected payment date."],
  ["Does a partial payment change the due date?", "A partial payment normally changes the remaining balance, not the original due date, unless both sides agree to a revised schedule. Record the payment and show the unpaid balance clearly."],
  ["Does this calculator create an invoice?", "It calculates the date only. Use the free invoice maker to add that due date to a real invoice."],
];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://invoicewala.shop${tool.href}` },
};

export default function InvoiceDueDateCalculatorPage() {
  return <><JsonLd data={[webApplicationSchema(tool), faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "https://invoicewala.shop" }, { name: "Free tools", url: "https://invoicewala.shop/tools" }, { name: "Invoice Due Date Calculator", url: `https://invoicewala.shop${tool.href}` }]), howToSchema("How to calculate an invoice due date", ["Choose the invoice date.", "Select Net terms, end of month or custom days.", "Choose whether a weekend due date should move.", "Copy the calculated date into the invoice."])]} /><InvoiceDueDateCalculatorClient faqs={faqs} /></>;
}
