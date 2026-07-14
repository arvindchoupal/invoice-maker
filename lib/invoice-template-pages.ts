import { INVOICE_TEMPLATE_BATCH_THREE } from "@/lib/invoice-template-batch-three";
import { INVOICE_TEMPLATE_BATCH_TWO } from "@/lib/invoice-template-batch-two";

export type InvoiceTemplatePage = {
  slug: string;
  profession: string;
  category: string;
  primaryKeyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  billingModel: string;
  sampleBusiness: string;
  sampleCustomer: string;
  sampleItems: Array<{ name: string; detail: string; amount: number }>;
  requiredFields: Array<{ title: string; body: string }>;
  tips: string[];
  mistakes: Array<{ title: string; body: string }>;
  faqs: Array<[string, string]>;
  relatedSlugs: string[];
  searchIntents?: string[];
  updatedAt: string;
};

const sharedDate = "2026-07-05";

export const INVOICE_TEMPLATE_PAGES: InvoiceTemplatePage[] = [
  {
    slug: "plumber-invoice-template",
    profession: "Plumber",
    category: "Home services",
    primaryKeyword: "plumber invoice template",
    title: "Free Plumber Invoice Template | GST Bill Format",
    description: "Create a plumber invoice with labour, materials, visit charges and GST. Use realistic line items, preview the bill and make a professional PDF online.",
    h1: "Plumber Invoice Template for Labour and Materials",
    intro: "Build a clear plumbing bill that separates the service visit, labour, replacement parts and taxes. The sample format works for repairs, installations and maintenance jobs, and can be recreated in InvoiceWala when you are ready to bill a customer.",
    billingModel: "Visit charge + labour + materials",
    sampleBusiness: "FlowFix Plumbing Services",
    sampleCustomer: "Green Park Residency",
    sampleItems: [
      { name: "Service visit", detail: "Inspection and diagnosis", amount: 500 },
      { name: "Tap replacement labour", detail: "Removal and fitting", amount: 900 },
      { name: "Brass kitchen tap", detail: "1 unit", amount: 1600 },
    ],
    requiredFields: [
      { title: "Job address", body: "Record where the plumbing work was completed, especially when it differs from the customer's billing address." },
      { title: "Labour and materials", body: "Show service time and supplied parts separately so customers can understand the total." },
      { title: "Work description", body: "Mention the fixture, problem and completed repair instead of using a vague line such as plumbing work." },
    ],
    tips: ["Add an emergency or after-hours visit charge as a separate line item.", "Record model or part details for installed fixtures.", "State whether a workmanship or replacement-part warranty applies."],
    mistakes: [
      { title: "Combining every charge", body: "A single lump-sum line makes disputes more likely. Separate the visit, labour and material cost." },
      { title: "Missing service location", body: "A billing address alone may not identify the property where the repair happened." },
    ],
    faqs: [
      ["What should a plumber invoice include?", "Include your business and customer details, invoice number, service address, job description, labour, materials, tax, total and payment terms."],
      ["Should labour and plumbing materials be separate?", "Yes. Separate line items make the bill easier to verify and help the customer understand what was supplied."],
      ["Can I add a plumber visit charge?", "Yes. Add inspection, emergency or call-out charges as their own line items."],
      ["Can this format include GST?", "Yes. Add the applicable tax details and rate for your transaction, and confirm the treatment with your accountant when unsure."],
      ["Can I download the plumber bill as PDF?", "You can recreate the sample in InvoiceWala, preview it and save or download the invoice after signing in."],
    ],
    relatedSlugs: ["electrician-invoice-template", "carpenter-invoice-template", "contractor-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "electrician-invoice-template",
    profession: "Electrician",
    category: "Home services",
    primaryKeyword: "electrician invoice template",
    title: "Free Electrician Invoice Template | GST Bill Format",
    description: "Create an electrician invoice for labour, wiring, fixtures, testing and GST. See realistic electrical line items and make a professional PDF bill online.",
    h1: "Electrician Invoice Template for Electrical Jobs",
    intro: "Create an electrical service invoice that shows inspection time, labour, wiring and installed components separately. It suits household repairs, commercial maintenance, rewiring and new fixture installation.",
    billingModel: "Call-out + labour + electrical parts",
    sampleBusiness: "SparkSafe Electricals",
    sampleCustomer: "Aarav Retail Private Limited",
    sampleItems: [
      { name: "Electrical inspection", detail: "Circuit and load check", amount: 800 },
      { name: "Installation labour", detail: "4 switch points", amount: 1600 },
      { name: "Modular switches", detail: "4 units", amount: 1200 },
    ],
    requiredFields: [
      { title: "Service location", body: "Identify the home, office or site where electrical work was performed." },
      { title: "Points and quantities", body: "List switch points, fixtures, cable length or components with measurable quantities." },
      { title: "Testing details", body: "Briefly note inspection, fault diagnosis or safety testing completed as part of the job." },
    ],
    tips: ["Separate inspection and installation labour.", "Include brand, rating or quantity for supplied electrical components.", "Mention any agreed warranty for installed parts or workmanship."],
    mistakes: [
      { title: "Writing only electrical work", body: "Describe the actual circuit, fixture, fault or installation so the invoice matches the job." },
      { title: "Omitting quantities", body: "Point counts and cable or component quantities make material charges easier to verify." },
    ],
    faqs: [
      ["What belongs on an electrician invoice?", "Add seller and customer details, job address, invoice number and date, detailed labour and parts, tax, total and payment terms."],
      ["Can I bill by electrical point?", "Yes. Use each point or fixture as the quantity and show the agreed unit rate."],
      ["Should inspection be a separate line item?", "It is useful when diagnosis or a site visit has its own charge."],
      ["Can an electrician invoice include GST?", "Yes, when applicable. Enter the appropriate tax details and confirm your compliance requirements with a qualified advisor."],
      ["Can I use this for commercial electrical work?", "Yes. Add the site, work order reference, quantities and business tax details required by the customer."],
    ],
    relatedSlugs: ["plumber-invoice-template", "contractor-invoice-template", "carpenter-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "contractor-invoice-template",
    profession: "Contractor",
    category: "Construction",
    primaryKeyword: "contractor invoice template",
    title: "Free Contractor Invoice Template | GST PDF Bill",
    description: "Create a contractor invoice for milestones, labour, materials, retention and GST. Use a practical construction billing format and make a PDF online.",
    h1: "Contractor Invoice Template for Projects and Milestones",
    intro: "Bill project work against an agreed scope, milestone or measurement instead of sending an unclear total. This contractor format supports labour, supplied materials, progress billing, deductions and payment due dates.",
    billingModel: "Milestone or progress billing",
    sampleBusiness: "BuildRight Contracting Co.",
    sampleCustomer: "North Avenue Developers",
    sampleItems: [
      { name: "Foundation milestone", detail: "As per approved scope", amount: 45000 },
      { name: "Skilled labour", detail: "12 worker-days", amount: 18000 },
      { name: "Site materials", detail: "Approved material statement", amount: 22000 },
    ],
    requiredFields: [
      { title: "Contract or work-order reference", body: "Connect the invoice to the approved scope, purchase order or agreement." },
      { title: "Billing period and milestone", body: "State the dates covered and the stage or measured work being billed." },
      { title: "Deductions", body: "Show retention, advances recovered or other agreed deductions transparently." },
    ],
    tips: ["Attach or reference the approved measurement sheet.", "Show previous billing and the current milestone when progress is cumulative.", "Match payment terms to the signed contract or work order."],
    mistakes: [
      { title: "No scope reference", body: "Without a work-order or milestone reference, the client may not know which approval the bill belongs to." },
      { title: "Hidden retention", body: "Show retention or advance recovery separately instead of silently reducing the payable amount." },
    ],
    faqs: [
      ["How do contractors structure an invoice?", "Reference the contract, project, billing period and milestone, then list labour, materials, tax, deductions, amount due and payment terms."],
      ["What is a progress invoice?", "A progress invoice bills part of a project based on completed work, a milestone or an approved measurement."],
      ["How should retention appear?", "Show retention as a clearly labelled deduction and keep the original gross work value visible."],
      ["Can I add a purchase-order number?", "Yes. Add the client's PO or work-order number so their finance team can match and approve the invoice."],
      ["Can this invoice contain GST?", "Yes. Use the tax treatment that applies to the contract and confirm any construction-specific requirements with your tax professional."],
    ],
    relatedSlugs: ["carpenter-invoice-template", "electrician-invoice-template", "plumber-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "freelancer-invoice-template",
    profession: "Freelancer",
    category: "Professional services",
    primaryKeyword: "freelancer invoice template",
    title: "Free Freelancer Invoice Template | Client PDF Bill",
    description: "Create a freelancer invoice for projects, retainers or hourly work. Add clear deliverables, tax, payment details and make a professional client PDF online.",
    h1: "Freelancer Invoice Template for Client Work",
    intro: "Turn completed freelance work into a professional invoice with a clear project reference, deliverables and payment deadline. Use the sample for fixed-price projects, retainers or hourly assignments.",
    billingModel: "Project, retainer or hourly billing",
    sampleBusiness: "Neha Creative Studio",
    sampleCustomer: "Orbit Labs India",
    sampleItems: [
      { name: "Website copywriting", detail: "Five product pages", amount: 15000 },
      { name: "Content revisions", detail: "Two revision rounds", amount: 3000 },
      { name: "Rush delivery", detail: "48-hour delivery", amount: 2500 },
    ],
    requiredFields: [
      { title: "Project or contract reference", body: "Name the assignment or include the client's project reference so the invoice is easy to approve." },
      { title: "Deliverables", body: "List completed outputs, billing hours or the retainer period rather than a generic freelance services line." },
      { title: "Payment instructions", body: "Include due date and the bank, UPI or international payment details the client should use." },
    ],
    tips: ["Invoice immediately after an agreed milestone is accepted.", "Mention the month on recurring retainer invoices.", "State late-fee terms only when they were agreed in advance."],
    mistakes: [
      { title: "Unclear deliverables", body: "Specific outputs help the client connect the invoice to approved work." },
      { title: "No payment deadline", body: "A vague 'pay soon' note is weaker than an exact due date and agreed payment term." },
    ],
    faqs: [
      ["What should a freelancer invoice include?", "Include your details, client details, invoice number, dates, project or deliverables, fees, applicable tax, total and payment instructions."],
      ["Can freelancers invoice by the hour?", "Yes. Show hours as the quantity, your hourly rate and a short description of the work."],
      ["How do I invoice a monthly retainer?", "State the retainer month or service period and list any work outside the retainer separately."],
      ["Do freelancers need GST on invoices?", "It depends on registration and the transaction. Confirm your specific obligations with a chartered accountant or tax advisor."],
      ["Can I send a freelancer invoice as PDF?", "Yes. A PDF preserves the layout across email, WhatsApp and client accounting systems."],
    ],
    relatedSlugs: ["consultant-invoice-template", "photographer-invoice-template", "contractor-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "photographer-invoice-template",
    profession: "Photographer",
    category: "Creative services",
    primaryKeyword: "photographer invoice template",
    title: "Free Photographer Invoice Template | Shoot PDF",
    description: "Create a photographer invoice for shoot time, editing, travel, albums and licensing. Add deposits and payment terms, then make a professional PDF online.",
    h1: "Photographer Invoice Template for Shoots and Editing",
    intro: "Create a photography invoice that separates shoot coverage, editing, travel and physical products. It works for weddings, events, portraits, products and commercial licensing.",
    billingModel: "Session + editing + deliverables",
    sampleBusiness: "FrameStory Photography",
    sampleCustomer: "Meera & Rohan",
    sampleItems: [
      { name: "Event photography", detail: "Six-hour coverage", amount: 24000 },
      { name: "Photo editing", detail: "120 final images", amount: 8000 },
      { name: "Premium album", detail: "30-page album", amount: 6000 },
    ],
    requiredFields: [
      { title: "Event and shoot date", body: "Identify the session and distinguish it from the invoice issue date." },
      { title: "Coverage and deliverables", body: "State hours, edited image count, albums or other promised outputs." },
      { title: "Deposit balance", body: "Show the agreed package price, deposit already paid and remaining balance." },
    ],
    tips: ["Separate travel or venue fees from shoot coverage.", "Describe commercial usage or licensing when it affects pricing.", "Match the balance due date to the delivery or event agreement."],
    mistakes: [
      { title: "Ignoring the deposit", body: "Show deposits as payments received so the remaining amount is unambiguous." },
      { title: "Missing usage terms", body: "Commercial photography invoices should reference the agreed licence or campaign usage when relevant." },
    ],
    faqs: [
      ["What goes on a photography invoice?", "Include client and photographer details, shoot date, coverage, editing, deliverables, travel, deposit paid, tax, balance and due date."],
      ["How do I show a photography deposit?", "Show the full package value and record the deposit as an amount already paid, leaving a clear balance."],
      ["Can editing be billed separately?", "Yes. Separate editing, retouching or extra-image charges when they are outside the base package."],
      ["Should licensing appear on the invoice?", "For commercial work, reference the agreed usage or licensing fee so the charge is documented."],
      ["Can I use this for wedding photography?", "Yes. Include event dates, coverage hours, albums, additional shooters, travel and payment milestones."],
    ],
    relatedSlugs: ["freelancer-invoice-template", "consultant-invoice-template", "salon-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "consultant-invoice-template",
    profession: "Consultant",
    category: "Professional services",
    primaryKeyword: "consultant invoice template",
    title: "Free Consultant Invoice Template | GST PDF",
    description: "Create a consultant invoice for hourly advice, projects, retainers and expenses. Add engagement details, tax and payment terms, then make a PDF online.",
    h1: "Consultant Invoice Template for Advisory Work",
    intro: "Bill consulting engagements with a format that connects each fee to a project, period or deliverable. Use it for hourly advisory work, fixed projects, workshops and monthly retainers.",
    billingModel: "Hourly, project or retainer",
    sampleBusiness: "NorthStar Business Advisory",
    sampleCustomer: "Kiteworks Technologies",
    sampleItems: [
      { name: "Strategy workshop", detail: "One full-day session", amount: 30000 },
      { name: "Advisory hours", detail: "8 hours × ₹3,000", amount: 24000 },
      { name: "Research report", detail: "Market-entry recommendations", amount: 18000 },
    ],
    requiredFields: [
      { title: "Engagement reference", body: "Add the proposal, statement of work or purchase-order reference used by the client." },
      { title: "Service period", body: "State when advisory services were delivered, especially for retainers." },
      { title: "Hours or deliverables", body: "Support each fee with hours, workshops, reports or agreed milestones." },
    ],
    tips: ["Attach a time summary when billing hourly.", "Separate approved travel or reimbursable costs from professional fees.", "Use the client's PO number and billing entity exactly as provided."],
    mistakes: [
      { title: "No engagement reference", body: "Procurement teams may delay invoices that cannot be matched to a PO or statement of work." },
      { title: "Mixing fees and expenses", body: "Separate professional fees and reimbursements for clearer review and accounting." },
    ],
    faqs: [
      ["What should a consulting invoice contain?", "Include the engagement reference, service dates, hours or deliverables, fees, approved expenses, tax, payment terms and remittance details."],
      ["How do consultants bill hourly work?", "List the activity, number of hours and hourly rate. Attach a detailed time report if the client requires one."],
      ["How do I invoice a consulting retainer?", "Name the retainer period and agreed scope, then show out-of-scope work separately."],
      ["Can expenses be added to a consultant invoice?", "Yes. Add approved travel or other reimbursements as separate documented lines."],
      ["Can this be used for GST invoices?", "Yes, with the appropriate supplier, customer and tax details for your transaction."],
    ],
    relatedSlugs: ["freelancer-invoice-template", "photographer-invoice-template", "contractor-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "salon-invoice-template",
    profession: "Salon",
    category: "Health and beauty",
    primaryKeyword: "salon invoice template",
    title: "Free Salon Invoice Template | Service Bill",
    description: "Create a salon invoice for treatments, stylist services, product sales, discounts and GST. Use a clean customer bill format and make a PDF online.",
    h1: "Salon Invoice Template for Services and Products",
    intro: "Give clients an itemised salon bill that distinguishes treatments, stylist services, retail products and package discounts. The format suits individual appointments, bridal services and prepaid packages.",
    billingModel: "Appointment services + retail products",
    sampleBusiness: "Aura Salon & Beauty Studio",
    sampleCustomer: "Priya Sharma",
    sampleItems: [
      { name: "Hair cut and styling", detail: "Senior stylist", amount: 1200 },
      { name: "Hair spa treatment", detail: "Repair treatment", amount: 1800 },
      { name: "Hair serum", detail: "100 ml retail product", amount: 750 },
    ],
    requiredFields: [
      { title: "Service breakdown", body: "List each treatment rather than showing only a combined appointment total." },
      { title: "Products and quantities", body: "Keep retail product sales distinct from salon services." },
      { title: "Discount or package", body: "Show membership, package or promotional discounts clearly before the final amount." },
    ],
    tips: ["Name the stylist only when useful for internal or customer records.", "Separate prepaid package usage from new payments.", "Show tips separately from the taxable service amount where your process requires it."],
    mistakes: [
      { title: "Mixing products and services", body: "Separate lines make stock, pricing and tax treatment easier to review." },
      { title: "Unexplained package adjustment", body: "Label package credit or membership discounts so the customer understands the saving." },
    ],
    faqs: [
      ["What should a salon invoice include?", "Include salon and customer details, appointment date, each service and product, discount, applicable tax, total and payment method."],
      ["Can products and salon services share one bill?", "Yes. List them as separate line items with the correct quantities and rates."],
      ["How should a package discount appear?", "Show the original service amount and a clearly labelled package or membership discount."],
      ["Can I add GST to a salon invoice?", "Yes, when applicable. Use the correct treatment for your services and products and verify it with your advisor."],
      ["Can the invoice record UPI payment?", "Yes. Add the payment mode or reference in the notes or payment details."],
    ],
    relatedSlugs: ["gym-invoice-template", "photographer-invoice-template", "freelancer-invoice-template"],
    updatedAt: sharedDate,
  },
  {
    slug: "gym-invoice-template",
    profession: "Gym",
    category: "Health and fitness",
    primaryKeyword: "gym invoice template",
    title: "Free Gym Invoice Template | Membership Bill Format",
    description: "Create a gym invoice, gym bill format or membership invoice for plans, personal training, joining fees and GST. Make a professional PDF bill online.",
    h1: "Gym Invoice Template for Membership Bills",
    intro: "Create a clear gym bill format for monthly membership, annual plans, joining fees, personal training and fitness merchandise. Recording the exact membership period helps both the gym and member avoid renewal confusion.",
    billingModel: "Membership period + add-on services",
    sampleBusiness: "CoreFit Strength Club",
    sampleCustomer: "Arjun Mehta",
    sampleItems: [
      { name: "Quarterly membership", detail: "July–September 2026", amount: 7500 },
      { name: "Personal training", detail: "Four sessions", amount: 4000 },
      { name: "Joining assessment", detail: "Fitness evaluation", amount: 750 },
    ],
    requiredFields: [
      { title: "Membership period", body: "State the start and end dates instead of writing only monthly or quarterly plan." },
      { title: "Member identification", body: "Add the member name and optional membership number for record matching." },
      { title: "Add-on sessions", body: "List personal training, classes or assessments separately from membership fees." },
    ],
    tips: ["Show the plan duration and renewal date clearly.", "Track prepaid personal-training sessions as a separate package.", "Record the payment mode or transaction reference for reconciliation.", "Use a clear gym membership invoice line when the bill covers a fixed plan period."],
    mistakes: [
      { title: "No membership dates", body: "A payment amount without its coverage period creates renewal disputes." },
      { title: "Bundling add-ons", body: "Separate training sessions and merchandise from the base plan for cleaner records." },
    ],
    faqs: [
      ["What belongs on a gym membership invoice?", "Include gym and member details, plan name, membership dates, add-ons, tax, discount, total and payment method."],
      ["Is a gym invoice the same as a receipt?", "An invoice requests or records charges; a receipt confirms payment. A paid invoice can show the payment status and reference."],
      ["How do I bill personal training?", "List the number of sessions, package period and rate separately from the gym membership."],
      ["Can annual membership be invoiced?", "Yes. State the full start and end date and any renewal conditions."],
      ["Can I add a joining fee?", "Yes. Add it as a one-time line item so it is not confused with recurring membership fees."],
      ["Can this work as a gym bill format?", "Yes. Use the sample structure for gym membership bills, fitness invoices, joining fees and add-on training sessions."],
    ],
    relatedSlugs: ["salon-invoice-template", "consultant-invoice-template", "freelancer-invoice-template"],
    searchIntents: ["gym bill format", "gym membership invoice", "gym membership bill", "gym invoice generator", "gym and fitness invoice template"],
    updatedAt: sharedDate,
  },
  {
    slug: "transport-invoice-template",
    profession: "Transport Company",
    category: "Transport and logistics",
    primaryKeyword: "transport invoice template",
    title: "Free Transport Invoice Template | Freight GST Bill",
    description: "Create a transport invoice for freight, distance, vehicle, loading, waiting and GST. Use trip and consignment details, then make a professional PDF bill online.",
    h1: "Transport Invoice Template for Trips and Freight",
    intro: "Prepare a transport bill that connects charges to a vehicle, trip and consignment. The sample supports freight, loading, unloading, tolls, waiting time and other agreed logistics charges.",
    billingModel: "Trip, distance, weight or consignment",
    sampleBusiness: "SwiftRoute Transport Co.",
    sampleCustomer: "Metro Wholesale Traders",
    sampleItems: [
      { name: "Freight charge", detail: "Delhi to Jaipur · 280 km", amount: 18000 },
      { name: "Loading service", detail: "Warehouse loading", amount: 2500 },
      { name: "Toll reimbursement", detail: "As per trip slips", amount: 1350 },
    ],
    requiredFields: [
      { title: "Origin and destination", body: "Record the actual route used for the shipment or passenger service." },
      { title: "Vehicle and consignment", body: "Add vehicle number, LR/GR or consignment reference where relevant." },
      { title: "Charge basis", body: "State whether freight is calculated per trip, kilometre, tonne, package or fixed contract." },
    ],
    tips: ["Keep toll reimbursements separate and retain supporting slips.", "Mention waiting or detention time with dates and agreed rates.", "Use the customer's PO and consignment reference for faster approval."],
    mistakes: [
      { title: "Missing trip reference", body: "Without a route, date or consignment reference, the customer may not match the bill to delivery records." },
      { title: "Unclear freight basis", body: "Show kilometres, weight, packages or the agreed fixed-trip rate." },
    ],
    faqs: [
      ["What should a transport invoice include?", "Include transporter and customer details, trip date, origin, destination, vehicle, consignment reference, freight basis, extra charges, tax and total."],
      ["Can toll charges be added?", "Yes. Add tolls as a separate reimbursement or charge and keep supporting records."],
      ["What is an LR or GR number?", "It is a goods transport or consignment reference used to connect the invoice with the shipment documentation."],
      ["Can freight be billed per kilometre?", "Yes. Enter kilometres as the quantity and the agreed per-kilometre rate."],
      ["How should GST be handled?", "Transport tax treatment can depend on the service and parties. Use the appropriate invoice details and confirm the exact treatment with a tax professional."],
    ],
    relatedSlugs: ["logistics-invoice-template", "courier-invoice-template", "travel-agency-invoice-template"],
    searchIntents: ["transport invoice format", "transport bill format", "freight bill format", "how to make transport bill", "goods transport invoice"],
    updatedAt: sharedDate,
  },
  {
    slug: "carpenter-invoice-template",
    profession: "Carpenter",
    category: "Home services",
    primaryKeyword: "carpenter invoice template",
    title: "Free Carpenter Invoice Template | Woodwork Bill",
    description: "Create a carpenter invoice for labour, wood, hardware, polishing and installation. Use measurable line items, add GST and make a professional PDF online.",
    h1: "Carpenter Invoice Template for Custom Woodwork",
    intro: "Create an itemised carpentry bill for custom furniture, repairs, fittings or installation. Separating wood, hardware, finishing and labour helps customers understand a made-to-measure job.",
    billingModel: "Measured work + materials + labour",
    sampleBusiness: "CraftLine Woodworks",
    sampleCustomer: "Lake View Apartments",
    sampleItems: [
      { name: "Wardrobe fabrication", detail: "18 sq ft plywood work", amount: 27000 },
      { name: "Hardware set", detail: "Hinges, channels and handles", amount: 6500 },
      { name: "Installation labour", detail: "On-site fitting", amount: 4500 },
    ],
    requiredFields: [
      { title: "Measurements and quantity", body: "Use square feet, running feet, units or another agreed measurement basis." },
      { title: "Material specification", body: "Name wood, plywood, laminate, hardware or finish instead of writing materials only." },
      { title: "Fabrication and installation", body: "Separate workshop fabrication from on-site fitting when they are priced independently." },
    ],
    tips: ["Reference the approved drawing or estimate for custom work.", "Record brand or grade for plywood and hardware.", "Show polishing, laminate or other finishing as a distinct line."],
    mistakes: [
      { title: "No measurement basis", body: "Custom work is easier to verify when the bill shows square feet, running feet or units." },
      { title: "Generic material charge", body: "Describe the major wood, board, finish and hardware included in the price." },
    ],
    faqs: [
      ["What should a carpenter invoice include?", "Include business and customer details, job location, measurements, materials, fabrication, installation, finishing, tax, total and payment terms."],
      ["Can carpentry be billed per square foot?", "Yes. Show the measured quantity and agreed square-foot rate, plus separately priced hardware or finishing."],
      ["Should hardware be a separate item?", "Separate hardware when it has a meaningful cost or the customer selected specific brands or models."],
      ["How do I show an advance payment?", "Show the full job value and deduct the advance already received to calculate the balance due."],
      ["Can I add GST?", "Yes, when applicable. Use the correct invoice and tax details for the supplied goods and services."],
    ],
    relatedSlugs: ["contractor-invoice-template", "plumber-invoice-template", "electrician-invoice-template"],
    updatedAt: sharedDate,
  },
  ...INVOICE_TEMPLATE_BATCH_TWO,
  ...INVOICE_TEMPLATE_BATCH_THREE,
];

const templateBySlug = new Map(INVOICE_TEMPLATE_PAGES.map((page) => [page.slug, page]));

export function getInvoiceTemplatePage(slug: string) {
  return templateBySlug.get(slug);
}

export function getRelatedInvoiceTemplates(page: InvoiceTemplatePage) {
  return page.relatedSlugs.flatMap((slug) => {
    const related = templateBySlug.get(slug);
    return related ? [related] : [];
  });
}

export function invoiceTemplateUrl(slug: string) {
  return `/invoice-templates/${slug}`;
}

export function invoiceTemplateImageUrl(page: InvoiceTemplatePage) {
  return `${invoiceTemplateUrl(page.slug)}/${page.slug}.png`;
}

export function invoiceTemplateImageAlt(page: InvoiceTemplatePage) {
  return `Sample GST ${page.profession.toLowerCase()} invoice template showing ${page.billingModel.toLowerCase()}`;
}
