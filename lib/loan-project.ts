export type LoanProjectInput = {
  business: string; owner: string; address: string; activity: string; purpose: string;
  startYear: number; years: number;
  equipment: number; fitout: number; deposit: number; stock: number; startup: number;
  contribution: number; loan: number; rate: number; tenure: number;
  monthlySales: number; grossMargin: number; monthlyExpenses: number; growth: number;
  expenseGrowth: number; depreciationRate: number; debtorDays: number; creditorDays: number;
  stockDays: number; drawings: number; taxRate: number;
};

export const defaultLoanProject: LoanProjectInput = {
  business: "", owner: "", address: "", activity: "Retail / trading", purpose: "",
  startYear: 2026, years: 3, equipment: 200000, fitout: 100000, deposit: 50000,
  stock: 250000, startup: 25000, contribution: 250000, loan: 500000, rate: 11,
  tenure: 60, monthlySales: 300000, grossMargin: 25, monthlyExpenses: 35000,
  growth: 10, expenseGrowth: 5, depreciationRate: 15, debtorDays: 15,
  creditorDays: 15, stockDays: 30, drawings: 120000, taxRate: 0,
};

export const money = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);
export const fy = (year: number) => `FY ${year}-${String(year + 1).slice(-2)}`;
export type Projection = {
  year: number; sales: number; cogs: number; grossProfit: number; expenses: number;
  depreciation: number; interest: number; pbt: number; tax: number; profit: number;
  principal: number; debt: number; currentDebt: number; fixedAssets: number;
  inventory: number; debtors: number; creditors: number; cash: number; capital: number;
  assets: number; liabilities: number; cashFlow: number;
};

export function validateLoanProject(p: LoanProjectInput): string[] {
  const errors: string[] = [];
  for (const [key, value] of Object.entries(p)) {
    if (typeof value === "number" && (!Number.isFinite(value) || value < 0 || value > 1e12)) errors.push(`Invalid value for ${key}. Use a finite, non-negative number.`);
  }
  for (const key of ["grossMargin", "rate", "depreciationRate", "taxRate"] as const) {
    if (p[key] > 100) errors.push(`${key} must be between 0 and 100%.`);
  }
  if (p.growth > 100 || p.expenseGrowth > 100) errors.push("Annual growth must be between 0 and 100%.");
  if (![3, 4, 5].includes(p.years)) errors.push("Select 3, 4 or 5 projection years.");
  if (!Number.isInteger(p.startYear) || p.startYear < 2000 || p.startYear > 2100) errors.push("Enter a financial year between 2000 and 2100.");
  if (!Number.isInteger(p.tenure) || p.tenure < 1 || p.tenure > 360) errors.push("Loan tenure must be 1–360 whole months.");
  if ([p.debtorDays, p.creditorDays, p.stockDays].some(v => v > 365)) errors.push("Working capital days must be between 0 and 365.");
  return errors;
}

export function calculateLoanProject(p: LoanProjectInput) {
  const errors = validateLoanProject(p);
  if (errors.length) throw new Error(errors.join(" "));
  const fixedCost = p.equipment + p.fitout;
  const projectCost = fixedCost + p.deposit + p.stock + p.startup;
  const openingCash = p.contribution + p.loan - projectCost;
  const r = p.rate / 1200;
  const emi = p.loan === 0 ? 0 : r === 0 ? p.loan / p.tenure : p.loan * r / (1 - Math.pow(1 + r, -p.tenure));
  let debt = p.loan, fixedAssets = fixedCost, cash = openingCash;
  // Start-up costs are expensed against opening capital; deposits remain assets.
  let capital = p.contribution - p.startup, oldStock = p.stock, oldDebtors = 0, oldCreditors = 0;
  let month = 0;
  const repay = (balance: number, startMonth: number, months: number) => {
    let interest = 0, principal = 0;
    for (let m = 0; m < months && startMonth + m < p.tenure && balance > 0; m++) {
      const charge = balance * r;
      const payment = Math.min(balance, Math.max(0, emi - charge));
      interest += charge; principal += payment; balance = Math.max(0, balance - payment);
    }
    return { balance, interest, principal };
  };
  const projections: Projection[] = [];
  for (let i = 0; i < p.years; i++) {
    const sales = p.monthlySales * 12 * Math.pow(1 + p.growth / 100, i);
    const cogs = sales * (1 - p.grossMargin / 100);
    const expenses = p.monthlyExpenses * 12 * Math.pow(1 + p.expenseGrowth / 100, i);
    const depreciation = fixedAssets * p.depreciationRate / 100;
    fixedAssets -= depreciation;
    const repayment = repay(debt, month, 12);
    debt = repayment.balance; month += 12;
    const pbt = sales - cogs - expenses - depreciation - repayment.interest;
    const tax = Math.max(0, pbt) * p.taxRate / 100;
    const profit = pbt - tax;
    const inventory = cogs * p.stockDays / 365;
    const debtors = sales * p.debtorDays / 365;
    const purchases = cogs + inventory - oldStock;
    const creditors = Math.max(0, purchases) * p.creditorDays / 365;
    const cashFlow = profit + depreciation - (inventory - oldStock) - (debtors - oldDebtors) + (creditors - oldCreditors) - repayment.principal - p.drawings;
    cash += cashFlow; capital += profit - p.drawings;
    const assets = fixedAssets + p.deposit + inventory + debtors + cash;
    const liabilities = capital + debt + creditors;
    projections.push({ year: p.startYear + i, sales, cogs, grossProfit: sales - cogs,
      expenses, depreciation, interest: repayment.interest, pbt, tax, profit,
      principal: repayment.principal, debt, currentDebt: repay(debt, month, 12).principal,
      fixedAssets, inventory, debtors, creditors, cash, capital, assets, liabilities, cashFlow });
    oldStock = inventory; oldDebtors = debtors; oldCreditors = creditors;
  }
  const warnings: string[] = [];
  if (openingCash < 0) warnings.push(`Opening funding shortfall: Rs. ${money(-openingCash)}. Increase funding or reduce project costs.`);
  for (const y of projections) {
    if (y.cash < -0.01) warnings.push(`${fy(y.year)} has a cash shortfall of Rs. ${money(-y.cash)}. Additional funding is not assumed.`);
    if (y.capital < 0) warnings.push(`${fy(y.year)} has negative owner capital.`);
    if (y.cogs + y.inventory - (projections.indexOf(y) === 0 ? p.stock : projections[projections.indexOf(y) - 1].inventory) < 0) warnings.push(`${fy(y.year)} implies negative purchases. Review opening stock and stock days.`);
  }
  return { projectCost, openingCash, emi, projections, warnings };
}

export type ReportSection = { title: string; headers: string[]; rows: (string | number)[][] };
export function loanReportSections(p: LoanProjectInput): ReportSection[] {
  const report = calculateLoanProject(p);
  const headers = ["Particulars (INR)", ...report.projections.map(y => fy(y.year))];
  const line = (label: string, key: keyof Projection) => [label, ...report.projections.map(y => y[key])];
  return [
    { title: "Business profile", headers: ["Field", "Details"], rows: [["Business", p.business], ["Owner / proprietor", p.owner], ["Address", p.address], ["Activity", p.activity], ["Project / loan purpose", p.purpose], ["Constitution / scope", "New proprietorship; full financial years"]] },
    { title: "Project cost & funding", headers: ["Particulars", "INR"], rows: [["Equipment", p.equipment], ["Fit-out / furniture", p.fitout], ["Refundable deposit", p.deposit], ["Opening inventory", p.stock], ["Start-up expenses", p.startup], ["Total project cost", report.projectCost], ["Owner contribution", p.contribution], ["Term loan", p.loan], ["Opening cash / (funding gap)", report.openingCash], ["Monthly EMI", report.emi]] },
    { title: "Projected Profit & Loss", headers, rows: [line("Sales", "sales"), line("Cost of goods sold", "cogs"), line("Gross profit", "grossProfit"), line("Operating expenses", "expenses"), line("Depreciation", "depreciation"), line("Loan interest", "interest"), line("Profit before tax", "pbt"), line("Planning tax provision", "tax"), line("Profit after provision", "profit")] },
    { title: "Projected Balance Sheet", headers, rows: [line("Fixed assets (net)", "fixedAssets"), ["Refundable deposit", ...report.projections.map(() => p.deposit)], line("Closing inventory", "inventory"), line("Trade debtors", "debtors"), line("Cash / (unfunded shortfall)", "cash"), line("Total assets", "assets"), line("Owner capital", "capital"), line("Term loan: due within 12 months", "currentDebt"), ["Term loan: non-current", ...report.projections.map(y => y.debt - y.currentDebt)], line("Trade creditors", "creditors"), line("Total capital & liabilities", "liabilities"), ["Balance check (must be zero)", ...report.projections.map(y => Math.abs(y.assets - y.liabilities) < .01 ? 0 : y.assets - y.liabilities)]] },
    { title: "Cash flow & repayment", headers, rows: [line("Profit after provision", "profit"), line("Depreciation added back", "depreciation"), ["Working capital cash movement", ...report.projections.map(y => y.cashFlow - y.profit - y.depreciation + y.principal + p.drawings)], line("Principal repaid", "principal"), ["Owner drawings", ...report.projections.map(() => p.drawings)], line("Net cash movement", "cashFlow"), line("Closing cash / (shortfall)", "cash"), line("Closing loan balance", "debt")] },
    { title: "Assumptions & methodology", headers: ["Assumption", "Value"], rows: [["First-year monthly sales (excluding GST)", p.monthlySales], ["Gross margin %", p.grossMargin], ["Monthly operating costs (excluding interest, depreciation, tax, drawings)", p.monthlyExpenses], ["Annual sales growth %", p.growth], ["Annual expense growth %", p.expenseGrowth], ["Reducing-balance interest % p.a.", p.rate], ["Loan tenure (months)", p.tenure], ["WDV depreciation % (planning assumption)", p.depreciationRate], ["Debtor days / sales basis", p.debtorDays], ["Stock days / cost-of-sales basis", p.stockDays], ["Creditor days / purchases basis", p.creditorDays], ["Annual owner drawings", p.drawings], ["Planning tax provision % of positive PBT", p.taxRate], ["Timing", "Loan fully drawn at start; monthly EMI begins immediately. Full-year operations, no moratorium or later capex."], ["Basis", "365-day working capital; start-up expenses reduce opening capital. GST excluded; planning tax provision paid in same year. No other assets or liabilities assumed."], ["Review", "User-supplied projections; not audited, certified, CMA or a loan sanction. Confirm assumptions and bank-specific requirements with your accountant."], ...report.warnings.map(w => ["Needs review", w])] },
  ];
}
