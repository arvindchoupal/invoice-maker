export type ToolCatalogEntry = {
  href: string;
  title: string;
  body: string;
  tag: string;
  intent: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  highlights: string[];
  signupSource: string;
};

export const TOOLS_CATALOG: ToolCatalogEntry[] = [
  {
    href: "/tools/business-expense-calculator",
    title: "Business expense calculator",
    body: "Add business costs by category, estimate expense ratio and GST included, then export a clean CSV summary.",
    tag: "Finance",
    intent: "Best for monthly expense reviews",
    metaTitle: "Business Expense Calculator | Free Expense Tracker",
    metaDescription:
      "Free business expense calculator for Indian freelancers and small businesses. Total costs by category, check expense ratio, estimate included GST and export CSV.",
    headline: "Understand where your business money goes each month.",
    highlights: ["Category-wise expense totals", "Expense-to-revenue ratio", "GST estimate and CSV export"],
    signupSource: "business-expense-calculator",
  },
  {
    href: "/tools/hsn-code-finder",
    title: "HSN and SAC code finder",
    body: "Search common HSN codes for goods and SAC codes for services by name, category, code and indicative GST rate.",
    tag: "GST",
    intent: "Best for GST classification",
    metaTitle: "HSN Code Finder | Search HSN & SAC Codes with GST Rate",
    metaDescription:
      "Free HSN code finder and SAC code search for India. Find common goods and service classification codes by product, profession, category and indicative GST rate.",
    headline: "Find an HSN or SAC code before creating your GST invoice.",
    highlights: ["Search products and services", "HSN and SAC filters", "Official GST verification links"],
    signupSource: "hsn-code-finder",
  },
  {
    href: "/quotation-maker",
    title: "Quotation generator",
    body: "Create GST quotations with customer details, item rows, discount, validity, terms and PDF download.",
    tag: "Documents",
    intent: "Best before customer approval",
    metaTitle: "Free Quotation Generator Online | Quote Maker India",
    metaDescription:
      "Create professional GST quotations with our free quotation generator. Add items, tax and terms, then download a clean quote PDF online.",
    headline: "Create a professional quotation and download the PDF.",
    highlights: ["GST and discount calculation", "Live quotation preview", "Instant PDF download"],
    signupSource: "quotation-generator",
  },
  {
    href: "/tools/payment-reminder-generator",
    title: "Payment reminder generator",
    body: "Create polite overdue invoice reminder messages for WhatsApp, email and SMS in English or Hinglish.",
    tag: "Payments",
    intent: "Best for overdue invoices",
    metaTitle: "Payment Reminder Message Generator | Free Templates",
    metaDescription:
      "Free payment reminder message generator and templates for overdue invoices. Create polite WhatsApp reminders, payment follow-up emails and SMS in English or Hinglish.",
    headline: "Write a polite payment reminder without the awkwardness.",
    highlights: ["WhatsApp, email and SMS templates", "Friendly, firm and final reminder tones", "English and Hinglish payment messages"],
    signupSource: "payment-reminder-generator",
  },
  {
    href: "/tools/gst-calculator",
    title: "GST calculator India",
    body: "Calculate exclusive or inclusive GST with CGST, SGST and IGST split.",
    tag: "GST",
    intent: "Best for tax invoices",
    metaTitle: "GST Calculator India | Inclusive, Exclusive, CGST, SGST, IGST",
    metaDescription:
      "Free GST calculator for India. Calculate inclusive or exclusive GST, split CGST/SGST or IGST, share results, download a breakdown and create GST invoices on InvoiceWala.",
    headline: "Calculate GST, split tax and create invoices faster.",
    highlights: ["Live CGST, SGST and IGST split", "Inclusive or exclusive GST modes", "Share, export CSV and create invoices"],
    signupSource: "gst-calculator",
  },
  {
    href: "/tools/profit-calculator",
    title: "Profit calculator",
    body: "See profit, profit margin and markup before sending a quote or invoice.",
    tag: "Finance",
    intent: "Best for pricing work",
    metaTitle: "Profit Calculator | Margin, Markup and Net Profit",
    metaDescription:
      "Free profit calculator for freelancers and small businesses. Calculate net profit, profit margin and markup from revenue and expenses, then turn results into invoices.",
    headline: "Know your profit and margin before you send the invoice.",
    highlights: ["Revenue vs expense profit view", "Margin percentage in one step", "Move from quote to invoice quickly"],
    signupSource: "profit-calculator",
  },
  {
    href: "/tools/margin-calculator",
    title: "Margin calculator",
    body: "Convert cost and selling price into clean margin and markup numbers.",
    tag: "Finance",
    intent: "Best for agencies and shops",
    metaTitle: "Margin Calculator | Cost, Selling Price and Markup",
    metaDescription:
      "Free margin calculator for agencies, retailers and service businesses. Find margin percentage and profit from cost and selling price.",
    headline: "Price with confidence using real margin and markup numbers.",
    highlights: ["Cost vs selling price margin", "Instant profit amount", "Useful for quotes and invoices"],
    signupSource: "margin-calculator",
  },
  {
    href: "/tools/discount-calculator",
    title: "Discount calculator",
    body: "Calculate discount amount, final sale price and total savings from original price and discount percentage.",
    tag: "Sales",
    intent: "Best for retail pricing",
    metaTitle: "Discount Calculator | Calculate Sale Price Online",
    metaDescription:
      "Use InvoiceWala's free discount calculator to calculate discount amount, final price and savings for shopping, ecommerce, retail and GST billing.",
    headline: "Discount Calculator",
    highlights: ["Discount percentage calculator", "Final sale price in one step", "Useful for quotes, retail and GST invoices"],
    signupSource: "discount-calculator",
  },
  {
    href: "/tools/invoice-number-generator",
    title: "Invoice number generator",
    body: "Generate professional invoice numbering formats for FY, monthly and GST workflows.",
    tag: "Invoice",
    intent: "Best for new businesses",
    metaTitle: "Invoice Number Generator | GST and Business Invoice IDs",
    metaDescription:
      "Generate invoice numbers with custom prefixes and sequential formats for GST invoices, quotations and billing workflows in India.",
    headline: "Create clean invoice numbers before your first bill goes out.",
    highlights: ["Custom prefix support", "Sequential invoice IDs", "Ready for GST invoice formats"],
    signupSource: "invoice-number-generator",
  },
  {
    href: "/tools/pdf-to-invoice-extractor",
    title: "PDF to invoice extractor",
    body: "Paste invoice text or upload supported files to structure bill data faster.",
    tag: "AI",
    intent: "Best for bookkeeping",
    metaTitle: "PDF to Invoice Extractor | Paste Text and Structure Bills",
    metaDescription:
      "Extract invoice email, totals and bill text from pasted PDF or OCR content. Structure vendor invoice data faster before saving in InvoiceWala.",
    headline: "Turn pasted invoice text into structured bill data in seconds.",
    highlights: ["Paste OCR or PDF text", "Detect totals and email", "Upgrade to AI import for files"],
    signupSource: "pdf-to-invoice-extractor",
  },
  {
    href: "/tools/invoice-to-excel-converter",
    title: "Invoice to Excel converter",
    body: "Turn invoice line items into spreadsheet-ready CSV for accounting reviews.",
    tag: "Export",
    intent: "Best for reports",
    metaTitle: "Invoice to Excel Converter | CSV Export for Line Items",
    metaDescription:
      "Convert invoice line items into CSV for Excel, accounting reviews and GST reporting. Free invoice to spreadsheet converter for small businesses.",
    headline: "Export invoice line items to CSV without manual retyping.",
    highlights: ["CSV-ready output", "Item, quantity and amount rows", "Download and share with your CA"],
    signupSource: "invoice-to-excel-converter",
  },
  {
    href: "/purchase-order-generator",
    title: "Purchase order generator",
    body: "Create supplier purchase orders with PO number, item rows, GST fields and PDF download.",
    tag: "Documents",
    intent: "Best for procurement",
    metaTitle: "Purchase Order Generator | Create PO Documents Online",
    metaDescription:
      "Create professional purchase orders online with supplier details, item rows, GST fields, purchase order templates and PDF-ready formatting.",
    headline: "Create purchase orders online and download PDF-ready PO documents.",
    highlights: ["Buyer and supplier details", "GST and item row totals", "Download purchase order PDF"],
    signupSource: "purchase-order-generator",
  },
  {
    href: "/receipt-generator",
    title: "Receipt generator",
    body: "Create payment receipts with receipt number, customer details, payment mode and PDF download.",
    tag: "Documents",
    intent: "Best after payment",
    metaTitle: "Receipt Generator | Create Payment Receipts Online",
    metaDescription:
      "Create payment receipts online with receipt number, customer details, payment mode, GST fields and PDF download. Free receipt maker for Indian businesses.",
    headline: "Create receipts online after payment and download clean PDF proof.",
    highlights: ["UPI, cash and bank modes", "Customer payment proof", "Download receipt PDF"],
    signupSource: "receipt-generator",
  },
  {
    href: "/tools/emi-calculator",
    title: "EMI calculator",
    body: "Calculate loan EMI, interest and repayment totals for business purchases.",
    tag: "Finance",
    intent: "Best for cash flow",
    metaTitle: "EMI Calculator India | Loan EMI and Interest Breakdown",
    metaDescription:
      "Free EMI calculator for business loans and equipment purchases. Calculate monthly EMI, total interest and repayment amount before you buy.",
    headline: "Plan business purchases with a clear EMI breakdown.",
    highlights: ["Monthly EMI estimate", "Total payable amount", "Useful for asset and loan planning"],
    signupSource: "emi-calculator",
  },
  {
    href: "/tools/tax-calculator",
    title: "Tax calculator",
    body: "Calculate custom tax amounts for service bills, purchase orders and estimates.",
    tag: "Tax",
    intent: "Best for quick checks",
    metaTitle: "Tax Calculator | Inclusive and Exclusive Tax Amounts",
    metaDescription:
      "Calculate tax on any amount with inclusive or exclusive modes. Quick tax calculator for service bills, estimates and purchase orders.",
    headline: "Check tax amounts before you finalize a bill or quote.",
    highlights: ["Inclusive or exclusive tax", "Custom tax rate support", "Fast total calculation"],
    signupSource: "tax-calculator",
  },
];

export function toolByHref(href: string) {
  return TOOLS_CATALOG.find((tool) => tool.href === href);
}
