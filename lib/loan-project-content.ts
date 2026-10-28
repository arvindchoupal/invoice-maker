export const LOAN_TOOL_HREF = "/tools/business-loan-project-report-generator";
export const LOAN_GUIDE_HREF = "/blog/project-report-for-bank-loan-format";
export const LOAN_REPORT_FAQS: Array<[string, string]> = [
  ["Is the bank loan project report PDF and Excel download free?", "Yes. You can enter your business details, create 3–5 years of projections and download the PDF and Excel workbook without signing up."],
  ["How do I create a project report for a bank loan online?", "Enter your business profile, project costs, owner contribution, term loan and sales/expense assumptions. Review the projected P&L, balance sheet, cash flow and funding warnings, then download your report."],
  ["How do I download a bank loan project report sample in PDF or Excel?", "Choose “Load example” to fill the fictional retail shop sample, review its inputs and use the download buttons. PDF contains six report sections. The .xlsx workbook contains those sections plus a Read me sheet. Excel is a calculated snapshot; update inputs in the generator and export again to recalculate."],
  ["Does it generate a projected balance sheet and profit and loss account?", "Yes. It links sales, costs, depreciation, interest, working capital, drawings and loan repayments to create projected P&L, balance sheet and cash flow for 3, 4 or 5 years."],
  ["Can I use this for a new retail shop or service business?", "Yes, for planning a new proprietorship financed by a term loan. Trading businesses can enter stock and supplier credit days. Service businesses without inventory can set opening stock and stock days to zero and choose a gross margin reflecting their direct costs."],
  ["Is this a CMA data generator or a CC loan report?", "No. This version models a new business with a term loan. It does not calculate a cash-credit limit, drawing power or a complete bank-specific CMA statement."],
  ["Is the report accepted by every bank or guaranteed to get a loan?", "No. The report is a planning draft based on your inputs, not audited or certified accounts. Ask your lender for its required format and projection period, and have your accountant review it before submission."],
  ["Can I use this as a Mudra or PMEGP project report?", "It can help draft financial projections, but it does not calculate scheme-specific eligibility, subsidy, margin money or prescribed application forms. Check the current scheme and lender requirements separately."],
  ["What does a negative opening cash figure mean?", "Owner contribution plus the term loan is below the total project cost entered in the form. The difference is shown as a funding gap. The generator does not assume another loan to fill it."],
  ["Can I edit the financial projections in the Excel workbook?", "The workbook contains the calculated report values, not live formulas. Update the assumptions in the online generator and download a new workbook when you want the linked statements to recalculate."],
  ["Are sales and expenses entered monthly or annually?", "Enter first-year sales and operating expenses as monthly amounts. The model multiplies them by 12 for the first full financial year. Owner drawings are entered annually, and the loan tenure is entered in months."],
  ["Does the report include a loan moratorium?", "No. This model assumes the term loan is fully drawn at the start and repayments begin through monthly EMI without a moratorium. It does not model staged disbursements or repayment holidays."],
  ["Will my project details be saved after refreshing?", "Inputs are held in the current browser session and clear when the page is refreshed. Download your report before leaving and keep a record of your assumptions if you need to enter them again."],
  ["Can I enter Hindi business details?", "Use English or Roman Hindi for the PDF business details. The Excel workbook supports Hindi text. Check the downloaded file to confirm that the business information displays as intended."],

];

export const LOAN_REPORT_STEPS = [
  "Enter your business name, proprietor, address, business activity and loan purpose.",
  "Add equipment, fit-out, refundable deposits, opening stock and start-up expenses in rupees.",
  "Enter owner contribution, term loan amount, annual interest rate and repayment tenure.",
  "Estimate monthly sales, gross margin, operating costs, growth and working capital days.",
  "Review the projected statements and funding gaps, then download PDF and Excel.",
];
