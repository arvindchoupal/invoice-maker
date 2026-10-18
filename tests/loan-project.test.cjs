// Run with: node --test tests/loan-project.test.cjs
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const source = fs.readFileSync(path.join(__dirname, "../lib/loan-project.ts"), "utf8");
const sandbox = { exports: {}, Intl };
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, sandbox);
const { calculateLoanProject: calculate, defaultLoanProject: defaults, validateLoanProject: validate, loanReportSections } = sandbox.exports;
const close = (a, b) => assert.ok(Math.abs(a - b) < .001, `${a} != ${b}`);

test("balance sheet reconciles independently across funding, trading and service scenarios", () => {
  for (const change of [{}, { loan: 0 }, { rate: 0, tenure: 12, years: 5 }, { monthlySales: 0 }, { grossMargin: 100, stock: 0, stockDays: 0 }, { contribution: 0, loan: 0 }, { taxRate: 30 }]) {
    const p = { ...defaults, ...change };
    const r = calculate(p);
    let openingCash = r.openingCash;
    for (const y of r.projections) {
      close(y.assets, y.liabilities);
      close(y.fixedAssets + p.deposit + y.inventory + y.debtors + y.cash, y.capital + y.debt + y.creditors);
      close(y.cash - openingCash, y.cashFlow);
      assert.ok(y.currentDebt <= y.debt + .001);
      openingCash = y.cash;
    }
  }
});
test("zero-interest loan repays exactly and stops at maturity", () => {
  const r = calculate({ ...defaults, loan: 120000, rate: 0, tenure: 12 });
  close(r.emi, 10000); close(r.projections[0].principal, 120000);
  r.projections.forEach(y => close(y.interest, 0));
  close(r.projections[1].principal, 0); close(r.projections[0].debt, 0);
});
test("interest on a one-month loan uses opening principal and annual rate", () => {
  const r = calculate({ ...defaults, loan: 120000, rate: 12, tenure: 1 });
  close(r.emi, 121200); close(r.projections[0].interest, 1200);
  close(r.projections[0].debt, 0); close(r.projections[1].interest, 0);
});
test("startup expenses reduce capital once; depreciation does not affect deposits", () => {
  const p = { ...defaults, loan: 0, monthlySales: 0, monthlyExpenses: 0, drawings: 0, stock: 0, depreciationRate: 10 };
  const y = calculate(p).projections[0];
  close(y.fixedAssets, (p.equipment + p.fitout) * .9);
  close(y.capital, p.contribution - p.startup - y.depreciation);
});
test("reports expose funding gaps and losses instead of creating balancing loans", () => {
  const r = calculate({ ...defaults, loan: 0, contribution: 0, monthlySales: 0 });
  assert.ok(r.openingCash < 0); assert.ok(r.warnings.length > 0);
  assert.ok(r.projections[0].cash < 0); close(r.projections[0].debt, 0);
});
test("invalid, blank and out-of-range financial inputs cannot enter projections", () => {
  for (const change of [{ monthlySales: NaN }, { rate: Infinity }, { loan: -1 }, { grossMargin: 101 }, { tenure: 0 }, { tenure: 1.5 }, { debtorDays: 366 }, { years: 6 }]) {
    const p = { ...defaults, ...change };
    assert.ok(validate(p).length); assert.throws(() => calculate(p));
  }
});
test("PDF and Excel share all six report sections and projection years", () => {
  const sections = loanReportSections({ ...defaults, years: 5 });
  assert.equal(sections.length, 6);
  assert.equal(sections[2].headers.length, 6);
  assert.equal(sections[3].rows.at(-1)[0], "Balance check (must be zero)");
  sections[3].rows.at(-1).slice(1).forEach(v => close(v, 0));
});
