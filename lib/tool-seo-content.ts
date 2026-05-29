export type ToolSeoContent = {
  intro: {
    title: string;
    body: string[];
    bullets: string[];
  };
  formula: {
    title: string;
    explanation: string;
    formulas: string[];
    example: string;
  };
  examples: Array<{
    title: string;
    body: string;
    rows: Array<[string, string]>;
  }>;
  education: {
    title: string;
    sections: Array<{ title: string; body: string }>;
  };
  useCases: Array<{ title: string; body: string }>;
  faqs: Array<[string, string]>;
  internalLinks: Array<{ href: string; label: string; body: string }>;
  relatedTools: Array<{ href: string; label: string }>;
  keywords: string[];
  imageAltIdeas: string[];
};

export const gstCalculatorSeoContent: ToolSeoContent = {
  intro: {
    title: "Calculate GST before you create an invoice",
    body: [
      "InvoiceWala's GST Calculator helps you quickly calculate GST on products, services, invoices, quotations and business bills. You can use it to find the GST amount, taxable value and final invoice total before sending a bill to your customer.",
      "The calculator is useful for freelancers, consultants, agencies, contractors, local shops, GST-registered businesses and service providers who need simple tax calculations without opening a spreadsheet.",
    ],
    bullets: [
      "Calculate GST on product or service pricing",
      "Check whether a quoted amount includes GST",
      "Estimate invoice totals before billing",
      "Compare GST-inclusive and GST-exclusive amounts",
      "Reduce manual tax calculation mistakes",
    ],
  },
  formula: {
    title: "GST calculation formula",
    explanation: "Use the exclusive formula when GST is added on top of the base amount. Use the inclusive formula when the final price already includes GST.",
    formulas: [
      "GST Amount = Base Amount x GST Rate / 100",
      "Final Amount = Base Amount + GST Amount",
      "Base Amount = Final Amount x 100 / (100 + GST Rate)",
      "GST Amount = Final Amount - Base Amount",
    ],
    example: "If the base amount is Rs. 10,000 and GST is 18%, GST amount is Rs. 1,800 and the final invoice value is Rs. 11,800.",
  },
  examples: [
    {
      title: "Freelancer service invoice",
      body: "A freelance designer charges Rs. 25,000 for a branding project with 18% GST.",
      rows: [
        ["Base amount", "Rs. 25,000"],
        ["GST rate", "18%"],
        ["GST amount", "Rs. 4,500"],
        ["Total invoice value", "Rs. 29,500"],
      ],
    },
    {
      title: "Agency monthly retainer",
      body: "A marketing agency bills a client Rs. 60,000 per month plus 18% GST.",
      rows: [
        ["Base amount", "Rs. 60,000"],
        ["GST rate", "18%"],
        ["GST amount", "Rs. 10,800"],
        ["Final invoice amount", "Rs. 70,800"],
      ],
    },
    {
      title: "Small business product sale",
      body: "A shop sells products worth Rs. 8,500 inclusive of 12% GST.",
      rows: [
        ["GST-inclusive amount", "Rs. 8,500"],
        ["GST rate", "12%"],
        ["Taxable value", "Rs. 7,589.29"],
        ["GST amount", "Rs. 910.71"],
      ],
    },
  ],
  education: {
    title: "What GST means for invoices and pricing",
    sections: [
      {
        title: "What is GST?",
        body: "GST stands for Goods and Services Tax. It is an indirect tax applied to the sale of goods and services in India. Businesses use GST invoices to show taxable value, GST amount and total amount charged to the customer.",
      },
      {
        title: "GST inclusive vs GST exclusive",
        body: "GST exclusive means tax is added on top of the base price. GST inclusive means the final price already includes tax, so the taxable value must be worked backwards from the total.",
      },
      {
        title: "Why accurate GST calculation matters",
        body: "Correct GST calculation helps you quote prices confidently, prepare accurate invoices, show tax breakup clearly and reduce manual billing mistakes.",
      },
    ],
  },
  useCases: [
    { title: "Freelancers", body: "Calculate GST before sending design, development, writing, consulting or retainer invoices." },
    { title: "Agencies", body: "Check tax on monthly retainers, campaign work, project fees and quotation totals." },
    { title: "Contractors", body: "Calculate GST on labor, materials, site visits and milestone billing." },
    { title: "Small businesses", body: "Separate taxable value and GST from product sales, service bills and customer invoices." },
  ],
  faqs: [
    ["What is a GST calculator?", "A GST calculator is an online tool that calculates GST amount, taxable value and final price based on an amount and GST rate."],
    ["How do I calculate GST online?", "Enter the amount, choose the GST rate and select whether the amount is GST-inclusive or GST-exclusive. The calculator shows taxable value, GST and total."],
    ["What is GST-inclusive pricing?", "GST-inclusive pricing means the final price already includes GST. The calculator separates the taxable value and GST amount from that total."],
    ["What is GST-exclusive pricing?", "GST-exclusive pricing means GST is added on top of the base amount. For example, Rs. 10,000 plus 18% GST becomes Rs. 11,800."],
    ["Can I use this GST calculator for invoices?", "Yes. You can use the GST amount while creating invoices, GST bills, quotations or PDF invoices."],
    ["What GST rates are commonly used in India?", "Common GST rates include 0%, 3%, 5%, 12%, 18% and 28%. The correct rate depends on the product or service category."],
    ["Does this calculator support CGST, SGST and IGST?", "Yes. InvoiceWala's GST calculator can show CGST and SGST split for intra-state supply or IGST for inter-state supply."],
    ["Is this GST calculator free?", "Yes. InvoiceWala's GST calculator is free to use online."],
    ["Who should use a GST calculator?", "Freelancers, consultants, agencies, contractors, shops, manufacturers and GST-registered small businesses can use it for quick tax checks."],
    ["Can I create a GST invoice after calculating GST?", "Yes. After calculating GST, you can use InvoiceWala's invoice generator or GST invoice maker to create a professional PDF invoice."],
  ],
  internalLinks: [
    { href: "/gst-invoice-generator", label: "GST invoice generator", body: "Create a GST-ready invoice after calculating tax." },
    { href: "/online-invoice-maker", label: "online invoice maker", body: "Make a professional invoice and download a PDF." },
    { href: "/free-invoice-generator", label: "free invoice generator", body: "Preview an invoice before signup." },
    { href: "/invoice-template-india", label: "invoice template India", body: "Use a practical Indian invoice format." },
    { href: "/quotation-maker", label: "quotation maker", body: "Prepare a quote before billing." },
    { href: "/blog/how-to-create-gst-invoice-india", label: "GST invoice guide", body: "Learn how to create a GST invoice step by step." },
  ],
  relatedTools: [
    { href: "/tools/margin-calculator", label: "Margin calculator" },
    { href: "/tools/profit-calculator", label: "Profit calculator" },
    { href: "/tools/tax-calculator", label: "Tax calculator" },
    { href: "/tools/invoice-number-generator", label: "Invoice number generator" },
  ],
  keywords: [
    "GST calculator India",
    "GST amount calculator",
    "GST inclusive calculator",
    "GST exclusive calculator",
    "calculate GST online",
    "GST invoice calculator",
    "CGST SGST IGST calculator",
    "online GST calculator for invoices",
  ],
  imageAltIdeas: [
    "GST calculator India for invoice tax calculation",
    "Online GST calculator showing inclusive and exclusive GST",
    "GST amount calculator for small business invoices",
    "InvoiceWala GST calculator for GST-ready billing",
  ],
};
