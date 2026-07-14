import type { InvoiceTemplatePage } from "@/lib/invoice-template-pages";

const updatedAt = "2026-07-14";

type TemplateSeed = {
  slug: string;
  profession: string;
  category: string;
  primaryKeyword: string;
  title: string;
  h1: string;
  billingModel: string;
  sampleBusiness: string;
  sampleCustomer: string;
  sampleItems: Array<{ name: string; detail: string; amount: number }>;
  required: [string, string, string];
  tips: string[];
  relatedSlugs: string[];
  searchIntents: string[];
};

function makeTemplate(seed: TemplateSeed): InvoiceTemplatePage {
  const professionLower = seed.profession.toLowerCase();

  return {
    slug: seed.slug,
    profession: seed.profession,
    category: seed.category,
    primaryKeyword: seed.primaryKeyword,
    title: seed.title,
    description: `Create a ${professionLower} invoice with itemised fees, GST-ready fields, payment terms and a professional PDF-ready bill format.`,
    h1: seed.h1,
    intro: `Use this ${professionLower} invoice format to create a clear bill for real work, service fees, retainers, visits, materials or packages. The sample structure helps customers understand what was charged and gives your business a professional invoice layout.`,
    billingModel: seed.billingModel,
    sampleBusiness: seed.sampleBusiness,
    sampleCustomer: seed.sampleCustomer,
    sampleItems: seed.sampleItems,
    requiredFields: [
      { title: "Service details", body: seed.required[0] },
      { title: "Fee or quantity basis", body: seed.required[1] },
      { title: "Tax and payment details", body: seed.required[2] },
    ],
    tips: seed.tips,
    mistakes: [
      { title: "Using a vague service description", body: `Avoid writing only ${professionLower} services. Mention the actual service, period, case, visit, trip, package or milestone being billed.` },
      { title: "Missing approval or period details", body: "Add the dates, reference number, package period or approved scope when it affects payment approval." },
    ],
    faqs: [
      [`What should a ${professionLower} invoice include?`, "Include business and customer details, invoice number, date, service description, quantity or period, rate, tax, total and payment instructions."],
      [`Can I use this as a ${professionLower} bill format?`, "Yes. Use the sample line items as a bill format reference and replace all values with your actual work details."],
      ["Can GST be added?", "Yes, when applicable. Add GSTIN, HSN/SAC, tax rate, CGST/SGST or IGST and total tax details for the transaction."],
      ["Can I download this invoice as PDF?", "You can recreate the sample in InvoiceWala, preview the invoice and download or save the PDF after signing in."],
      ["Should I customise the sample?", "Yes. Replace sample business names, customer names, service lines, dates and amounts before sending the invoice."],
    ],
    relatedSlugs: seed.relatedSlugs,
    searchIntents: seed.searchIntents,
    updatedAt,
  };
}

export const INVOICE_TEMPLATE_BATCH_FOUR: InvoiceTemplatePage[] = [
  makeTemplate({
    slug: "lawyer-invoice-template",
    profession: "Lawyer",
    category: "Legal services",
    primaryKeyword: "lawyer invoice template",
    title: "Free Lawyer Invoice Template | Legal Fee Bill",
    h1: "Lawyer Invoice Template for Legal Fees",
    billingModel: "Consultation + drafting + retainer",
    sampleBusiness: "Verma Legal Chambers",
    sampleCustomer: "Aster Foods Private Limited",
    sampleItems: [
      { name: "Legal consultation", detail: "Contract review call", amount: 5000 },
      { name: "Agreement drafting", detail: "Vendor service agreement", amount: 18000 },
      { name: "Filing support", detail: "Documentation and review", amount: 7000 },
    ],
    required: ["Mention matter name, consultation date, document, hearing, filing or advisory work completed.", "Show hourly fees, fixed fees, retainers, filing charges and reimbursements separately.", "Add payment due date, tax details and professional fee notes without exposing confidential case information."],
    tips: ["Use a matter or client reference.", "Separate professional fees from court or filing expenses.", "Avoid sensitive case details in the invoice line."],
    relatedSlugs: ["advocate-invoice-template", "consultant-invoice-template", "chartered-accountant-invoice-template"],
    searchIntents: ["lawyer invoice template", "legal fee bill format", "law firm invoice format", "legal services invoice", "lawyer bill format"],
  }),
  makeTemplate({
    slug: "advocate-invoice-template",
    profession: "Advocate",
    category: "Legal services",
    primaryKeyword: "advocate invoice template",
    title: "Free Advocate Invoice Template | Legal Bill Format",
    h1: "Advocate Invoice Template for Legal Services",
    billingModel: "Appearance + drafting + legal consultation",
    sampleBusiness: "Rao & Rao Advocates",
    sampleCustomer: "Nikhil Jain",
    sampleItems: [
      { name: "Case consultation", detail: "Initial legal advice", amount: 3500 },
      { name: "Drafting fee", detail: "Notice and supporting documents", amount: 9000 },
      { name: "Appearance fee", detail: "District court hearing", amount: 12000 },
    ],
    required: ["Add matter reference, hearing date, notice, drafting work or consultation details.", "Separate appearance fee, drafting fee, consultation, clerkage, filing and travel reimbursements.", "Mention payment terms, tax treatment and professional fee notes clearly."],
    tips: ["Keep client confidentiality in mind.", "Use a clear matter reference.", "Show reimbursements separately from professional fees."],
    relatedSlugs: ["lawyer-invoice-template", "consultant-invoice-template", "real-estate-agent-invoice-template"],
    searchIntents: ["advocate invoice template", "advocate bill format", "legal bill format", "court fee invoice", "advocate professional fee bill"],
  }),
  makeTemplate({
    slug: "doctor-invoice-template",
    profession: "Doctor",
    category: "Healthcare services",
    primaryKeyword: "doctor invoice template",
    title: "Free Doctor Invoice Template | Patient Bill Format",
    h1: "Doctor Invoice Template for Patient Billing",
    billingModel: "Consultation + procedure + follow-up",
    sampleBusiness: "CarePoint Clinic",
    sampleCustomer: "Patient: Riya Malhotra",
    sampleItems: [
      { name: "Doctor consultation", detail: "General consultation", amount: 900 },
      { name: "Minor procedure", detail: "Dressing and consumables", amount: 700 },
      { name: "Follow-up visit", detail: "Review appointment", amount: 500 },
    ],
    required: ["Add patient name, visit date, doctor name, consultation or procedure details.", "Show consultation, procedure, consumables, tests and follow-up charges separately.", "Mention paid amount, balance, payment mode and tax treatment where applicable."],
    tips: ["Avoid unnecessary medical details.", "Use visit or receipt number for records.", "Separate consultation from consumables or diagnostics."],
    relatedSlugs: ["medical-clinic-invoice-template", "dental-clinic-invoice-template", "physiotherapist-invoice-template"],
    searchIntents: ["doctor invoice template", "doctor bill format", "patient bill format", "clinic invoice format", "medical consultation bill"],
  }),
  makeTemplate({
    slug: "physiotherapist-invoice-template",
    profession: "Physiotherapist",
    category: "Healthcare services",
    primaryKeyword: "physiotherapist invoice template",
    title: "Free Physiotherapist Invoice Template | Therapy Bill",
    h1: "Physiotherapist Invoice Template for Therapy Sessions",
    billingModel: "Session package + assessment + home visit",
    sampleBusiness: "MoveWell Physiotherapy",
    sampleCustomer: "Amit Kapoor",
    sampleItems: [
      { name: "Physio assessment", detail: "Initial mobility evaluation", amount: 1200 },
      { name: "Therapy sessions", detail: "6 sessions package", amount: 7200 },
      { name: "Home visit charge", detail: "One assisted visit", amount: 800 },
    ],
    required: ["Add patient name, therapy date range, session count and treatment package reference.", "Show assessment, sessions, home visit, equipment or exercise-plan charges separately.", "Mention payment status, package balance and tax details where applicable."],
    tips: ["Track remaining prepaid sessions.", "Separate home visit charges.", "Keep clinical details brief and private."],
    relatedSlugs: ["doctor-invoice-template", "medical-clinic-invoice-template", "gym-invoice-template"],
    searchIntents: ["physiotherapist invoice template", "physiotherapy bill format", "therapy session invoice", "physio bill format", "home physiotherapy invoice"],
  }),
  makeTemplate({
    slug: "construction-invoice-template",
    profession: "Construction",
    category: "Construction",
    primaryKeyword: "construction invoice template",
    title: "Free Construction Invoice Template | Work Bill Format",
    h1: "Construction Invoice Template for Site Work",
    billingModel: "Milestone + labour + materials",
    sampleBusiness: "BuildStone Construction",
    sampleCustomer: "GreenVista Developers",
    sampleItems: [
      { name: "Masonry work", detail: "Ground floor block work", amount: 48000 },
      { name: "Site labour", detail: "18 worker-days", amount: 27000 },
      { name: "Material supply", detail: "Cement, sand and aggregates", amount: 36000 },
    ],
    required: ["Mention project name, site address, work order, measurement sheet or milestone.", "Separate labour, material, equipment, subcontractor, retention and advance recovery lines.", "Add GST, payment terms, deductions and approval reference from the project contract."],
    tips: ["Reference measurement sheets.", "Show retention separately.", "Separate labour and material for easier approval."],
    relatedSlugs: ["contractor-invoice-template", "architect-invoice-template", "interior-designer-invoice-template"],
    searchIntents: ["construction invoice template", "construction bill format", "civil work invoice format", "construction work bill", "site work invoice"],
  }),
  makeTemplate({
    slug: "packers-movers-invoice-template",
    profession: "Packers and Movers",
    category: "Transport and logistics",
    primaryKeyword: "packers movers invoice template",
    title: "Free Packers Movers Invoice Template | Moving Bill",
    h1: "Packers and Movers Invoice Template for Relocation",
    billingModel: "Packing + transport + loading",
    sampleBusiness: "SafeShift Packers & Movers",
    sampleCustomer: "Neha Sharma",
    sampleItems: [
      { name: "Packing service", detail: "2BHK household items", amount: 8500 },
      { name: "Transportation", detail: "Mumbai to Pune", amount: 14500 },
      { name: "Loading and unloading", detail: "Labour and handling", amount: 4200 },
    ],
    required: ["Add pickup address, delivery address, move date, vehicle or consignment reference.", "Show packing, loading, unloading, transport, insurance, storage and extra handling separately.", "Mention GST, advance received, balance due, damage policy and payment terms."],
    tips: ["Mention pickup and delivery cities.", "Separate insurance and storage.", "Show advance and final balance clearly."],
    relatedSlugs: ["transport-invoice-template", "logistics-invoice-template", "courier-invoice-template"],
    searchIntents: ["packers movers invoice template", "packers movers bill format", "moving bill format", "relocation invoice", "shifting bill format"],
  }),
  makeTemplate({
    slug: "trucking-invoice-template",
    profession: "Trucking",
    category: "Transport and logistics",
    primaryKeyword: "trucking invoice template",
    title: "Free Trucking Invoice Template | Freight Bill Format",
    h1: "Trucking Invoice Template for Freight Trips",
    billingModel: "Trip + freight + detention",
    sampleBusiness: "HighwayHaul Trucking",
    sampleCustomer: "NorthBridge Traders",
    sampleItems: [
      { name: "Freight trip", detail: "Ahmedabad to Surat · 12 tonnes", amount: 26000 },
      { name: "Detention charge", detail: "Approved waiting time", amount: 2200 },
      { name: "Toll reimbursement", detail: "As per receipts", amount: 1800 },
    ],
    required: ["Add truck number, route, trip date, LR/GR number, weight and delivery reference.", "Show freight, tolls, detention, loading, unloading, fuel surcharge and insurance separately.", "Mention GST treatment, e-way bill reference where needed and payment due date."],
    tips: ["Use truck and consignment numbers.", "Separate detention from freight.", "Keep toll receipts linked to the invoice."],
    relatedSlugs: ["transport-invoice-template", "logistics-invoice-template", "packers-movers-invoice-template"],
    searchIntents: ["trucking invoice template", "truck bill format", "freight bill format", "lorry bill format", "truck transport invoice"],
  }),
  makeTemplate({
    slug: "tuition-invoice-template",
    profession: "Tuition Teacher",
    category: "Education services",
    primaryKeyword: "tuition invoice template",
    title: "Free Tuition Invoice Template | Fee Bill Format",
    h1: "Tuition Invoice Template for Monthly Fees",
    billingModel: "Monthly fee + sessions + study material",
    sampleBusiness: "Excel Home Tuition",
    sampleCustomer: "Parent of Aarav Mehta",
    sampleItems: [
      { name: "Math tuition", detail: "July 2026 monthly fee", amount: 6000 },
      { name: "Extra doubt class", detail: "2 sessions", amount: 1200 },
      { name: "Worksheet material", detail: "Printed practice sheets", amount: 400 },
    ],
    required: ["Add student name, parent/customer name, subject, class level and billing month.", "Show monthly fee, session count, extra classes, materials and discounts separately.", "Mention payment mode, paid amount, balance and due date."],
    tips: ["State the month clearly.", "Separate extra sessions from regular tuition.", "Mention subject and class level."],
    relatedSlugs: ["tutor-invoice-template", "coaching-invoice-template", "consultant-invoice-template"],
    searchIntents: ["tuition invoice template", "tuition fee bill format", "tuition receipt format", "home tuition invoice", "teacher fee invoice"],
  }),
  makeTemplate({
    slug: "event-management-invoice-template",
    profession: "Event Management",
    category: "Events and hospitality",
    primaryKeyword: "event management invoice template",
    title: "Free Event Management Invoice Template | Event Bill",
    h1: "Event Management Invoice Template for Event Billing",
    billingModel: "Planning + production + vendor coordination",
    sampleBusiness: "GrandStage Event Management",
    sampleCustomer: "BrightWave Technologies",
    sampleItems: [
      { name: "Event management fee", detail: "Annual day event", amount: 45000 },
      { name: "Stage and production", detail: "Lights, sound and backdrop", amount: 85000 },
      { name: "Vendor coordination", detail: "Venue and logistics support", amount: 18000 },
    ],
    required: ["Add event name, venue, event date, package, work order or approved scope.", "Separate management fee, production, rentals, vendor reimbursements, travel and staffing.", "Mention advance received, balance due, GST, cancellation terms and payment schedule."],
    tips: ["Mention event date and venue.", "Show deposits separately.", "Keep vendor reimbursements separate from management fees."],
    relatedSlugs: ["event-planner-invoice-template", "catering-invoice-template", "wedding-photographer-invoice-template"],
    searchIntents: ["event management invoice template", "event management bill format", "event bill format", "event planner invoice", "event service invoice"],
  }),
];
