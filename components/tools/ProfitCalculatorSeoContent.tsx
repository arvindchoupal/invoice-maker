import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { profitCalculatorFaqs } from "@/lib/profit-calculator-content";
import styles from "./ProfitCalculator.module.css";

const useCases = [
  ["Freelancers", "Check project profit after software, outsourcing, platform fees, ads or time cost before sending the final invoice."],
  ["Agencies", "Compare campaign revenue with designer, developer, ad spend and vendor costs to protect service margins."],
  ["Contractors", "Estimate profit after labor, material, travel, equipment and subcontractor costs before billing a milestone."],
  ["Consultants", "Understand net profit on retainers, workshops and advisory projects after travel, research and tool costs."],
  ["Ecommerce Sellers", "Calculate profit after product cost, packaging, delivery, returns, ads and marketplace fees."],
  ["Small Businesses", "Use a business profit calculator to understand whether sales revenue actually covers operating expenses."],
];

const relatedCalculators = [
  ["/free-invoice-generator", "Invoice Generator", "Turn profitable pricing into a professional invoice PDF."],
  ["/tools/gst-calculator", "GST Calculator", "Calculate GST before creating tax invoices or quotes."],
  ["/tools/tax-calculator", "Tax Calculator", "Check custom tax rates on service bills and estimates."],
  ["/tools/discount-calculator", "Discount Calculator", "See how discounts affect sale price and profit."],
  ["/quotation-maker", "Quotation Generator", "Quote profitable prices before work starts."],
  ["/quotation-maker", "Estimate Generator", "Prepare estimate-style pricing for projects and repairs."],
  ["/tools/tax-calculator", "VAT Calculator", "Use custom tax mode for VAT-style calculations."],
  ["/freelancer-invoice-generator", "Freelance Invoice Generator", "Create invoices for freelance projects and retainers."],
  ["/purchase-order-generator", "Purchase Order Generator", "Create supplier purchase orders before vendor invoices."],
];

const linkHub = [
  ["/free-invoice-generator", "Invoice Generator"],
  ["/gst-invoice-generator", "GST Invoice Generator"],
  ["/quotation-maker", "Quote Generator"],
  ["/quotation-maker", "Estimate Generator"],
  ["/receipt-generator", "Receipt Generator"],
  ["/tools/tax-calculator", "Tax Calculator"],
  ["/tools/discount-calculator", "Discount Calculator"],
  ["/tools/margin-calculator", "Margin Calculator"],
];


export function ProfitCalculatorSeoContent() {
 return <div className={styles.guide} data-profit-guide>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Profit guide</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">How To Calculate Profit</h2>
          <div className="mt-6 grid gap-6 text-base leading-8 text-[var(--guide-text)] lg:grid-cols-2">
            <div className="space-y-4">
              <p>
                Profit calculation starts with revenue. Revenue means the total amount your business earns from a sale, project, invoice, order or service before costs are removed. For a freelancer, revenue may be a client project fee. For a shop, it may be product sales. For a contractor, it may be the amount billed for labor and materials. A profit calculator helps you see whether that revenue is actually enough after expenses.
              </p>
              <p>
                Expenses are the costs required to deliver the work or product. These can include product cost, contractor labor, packaging, delivery, ads, software, rent, payment gateway fees, subcontractors, travel or any direct business cost. If revenue is ₹10,000 and expenses are ₹6,500, the net profit formula is simple: Net Profit = Revenue - Expenses. In this example, profit is ₹3,500.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Profit margin shows how much of your revenue remains as profit. The profit margin formula is Profit Margin = Net Profit / Revenue × 100. If net profit is ₹3,500 on ₹10,000 revenue, the profit margin is 35%. A profit margin calculator is useful before you send a quote or invoice because it tells you whether your price is healthy enough.
              </p>
              <p>
                Markup is different from margin. Markup compares profit to expenses or cost. The markup formula is Markup = Net Profit / Expenses × 100. If expenses are ₹6,500 and profit is ₹3,500, markup is 53.85%. Use markup when setting prices from cost. Use margin when checking how profitable the final revenue is. InvoiceWala helps you calculate the number first, then create a professional invoice with the same pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Business use cases</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Who uses a business profit calculator?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, body]) => (
            <article className="rounded-3xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6" key={title}>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--guide-muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>


      <section id="profit-worked-examples" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14 sm:px-6"><h2 className="text-3xl font-semibold tracking-tight">Profit calculation examples for projects and sales</h2><p className="mt-4 max-w-4xl leading-8">These examples use the same revenue-minus-expenses calculation as the tool above. The amounts are illustrative. Replace them with the income and costs for your own project or reporting period.</p><div className="mt-7 grid gap-5 md:grid-cols-3">{[["Freelance project", "A designer invoices ₹25,000 and spends ₹10,000 on the project. The ₹15,000 profit represents 60% of revenue, while markup is 150% of the project expenses.", "₹25,000", "₹10,000", "₹15,000", "60%"], ["Product sale", "A seller receives ₹5,000 for an order and records ₹3,000 of costs. The remaining ₹2,000 is a 40% margin and a 66.67% markup on the entered costs.", "₹5,000", "₹3,000", "₹2,000", "40%"], ["A loss-making job", "A job brings in ₹8,000 but costs ₹10,000 to complete. The result is a ₹2,000 loss, a negative 25% margin and a negative 20% markup.", "₹8,000", "₹10,000", "−₹2,000", "−25%"]].map(([title,body,revenue,expenses,profit,margin])=><article key={title} className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p><dl className="mt-5 space-y-3 text-sm">{[["Revenue",revenue],["Expenses",expenses],["Profit / loss",profit],["Margin",margin]].map(([label,value])=><div key={label} className="flex justify-between gap-3 rounded-xl bg-[var(--guide-soft)] p-3"><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl></article>)}</div></section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-2 sm:px-6"><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h2 className="text-2xl font-semibold">Margin and markup use different denominators</h2><p className="mt-4 leading-8">The profit amount is the same in both percentages. What changes is the comparison. Margin asks how much of your selling revenue remains after the entered expenses. Markup asks how much profit you have added relative to those expenses.</p><p className="mt-4 leading-8">With ₹10,000 revenue and ₹6,500 expenses, the profit is ₹3,500. Dividing by revenue gives 35%. Dividing by expenses gives 53.85%. A 35% markup would not produce a 35% margin, because the two percentages start from different amounts.</p><p className="mt-4 leading-8">Use the result that answers your question and label it clearly when discussing a quote with your team. The calculator displays both percentages so you can compare them without switching tools.</p></article><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h2 className="text-2xl font-semibold">Match the revenue and expenses you enter</h2><p className="mt-4 leading-8">Choose the scope before entering figures. You might calculate one product order, one client project or one month of business activity. Revenue and expenses should refer to that same scope. Mixing a single project fee with the costs of your entire business will produce a number that is difficult to interpret.</p><p className="mt-4 leading-8">For a project estimate, list the costs you expect to incur. For a completed job, use the costs recorded for that work. If a cost is shared across several jobs, use a consistent internal approach to decide what belongs in this calculation.</p><p className="mt-4 leading-8">The output reflects only the expenses you include. It is a simple calculation, not a full set of accounts or an automatic assessment of which costs belong in your profit figure.</p></article></section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6"><h2 className="text-3xl font-semibold">Check profit before and after a price change</h2><p className="mt-4 max-w-4xl leading-8">Keep expenses at ₹6,500 and compare two possible project prices. At ₹10,000 revenue, profit is ₹3,500 and margin is 35%. At ₹9,000 revenue, profit falls to ₹2,500 and margin becomes 27.78%. A ₹1,000 reduction in price removes ₹1,000 from the calculated profit when costs stay unchanged.</p><p className="mt-4 max-w-4xl leading-8">You can use the same approach to explore an expense change. Keep revenue fixed and update the cost estimate, then compare the new result. This helps make the effect visible without assuming that sales volume, delivery scope or other business conditions will remain unchanged in practice.</p></section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6"><h2 className="text-3xl font-semibold">A quick checklist before using the result</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{[["Use a consistent period", "Compare income and costs for the same sale, project or time period. Keep your estimate separate from the actual figures when reviewing a completed project."], ["Check missing costs", "Review the relevant materials, labour, delivery, software, platform fees and other costs. The tool cannot identify an expense you have left out."], ["Read negative and undefined results", "A negative amount is a loss. A zero denominator makes the corresponding percentage undefined. Neither situation should be replaced with a positive-looking percentage."], ["Review the invoice separately", "The invoice link carries revenue as an item price. Add the correct customer, description, dates and any applicable tax in the invoice maker before sharing it."]].map(([title,body])=><article key={title} className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p></article>)}</div></section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Related calculators</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Use the next InvoiceWala tool</h2>
          </div>
          <Link className="rounded-xl bg-[var(--guide-panel)] px-4 py-2 text-sm font-semibold text-[var(--guide-heading)]" href="/tools">View all tools</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedCalculators.map(([href, title, body]) => (
            <Link className="group rounded-3xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.075]" href={href} key={`${href}-${title}`}>
              <h3 className="text-xl font-semibold text-[var(--guide-heading)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--guide-muted)]">{body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--guide-accent)]">
                Open tool
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
          <h2 className="text-3xl font-semibold tracking-tight">Profit Margin Examples</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--guide-border)]">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-[var(--guide-panel)] text-xs uppercase tracking-wide text-[var(--guide-muted)]">
                <tr><th className="p-4">Revenue</th><th className="p-4">Expenses</th><th className="p-4">Profit</th><th className="p-4">Margin</th></tr>
              </thead>
              <tbody>
                {[
                  ["1000", "600", "400", "40%"],
                  ["5000", "3000", "2000", "40%"],
                  ["10000", "6500", "3500", "35%"],
                ].map((row) => (
                  <tr className="border-t border-[var(--guide-border)]" key={row.join("-")}>
                    {row.map((cell) => <td className="p-4 text-[var(--guide-text)]" key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-soft)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Why InvoiceWala</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">From profit calculation to invoice in one workflow</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Free profit calculation", "No signup required", "Mobile friendly", "Download calculations", "Convert to invoice instantly", "Export PDF invoices"].map((item) => (
              <div className="flex gap-3 rounded-2xl bg-[var(--guide-soft)] p-4 text-sm font-semibold text-[var(--guide-text)]" key={item}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--guide-accent)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <h2 id="profit-faqs" className="scroll-mt-28 text-3xl font-semibold tracking-tight">Profit Calculator FAQs</h2>
        <div className="mt-6 divide-y divide-[var(--guide-border)] border-y border-[var(--guide-border)]">{profitCalculatorFaqs.map(([question,answer])=><details key={question} className="py-5"><summary className="cursor-pointer font-semibold text-[var(--guide-heading)]">{question}</summary><p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--guide-muted)]">{answer}</p></details>)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Pricing and billing resources</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">More InvoiceWala tools for pricing and billing</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {linkHub.map(([href, label]) => (
              <Link className="rounded-full border border-[var(--guide-border)] bg-[var(--guide-soft)] px-4 py-2 text-sm font-semibold text-[var(--guide-text)] transition hover:border-cyan-300/30 hover:text-[var(--guide-accent)]" href={href} key={`${href}-${label}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>


 <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-6"><h2 className="text-2xl font-semibold">Check the numbers before your next quote</h2><p className="mx-auto mt-4 max-w-2xl leading-7">Enter your revenue and expenses, review profit, margin and markup, then download the result or use the revenue in your invoice.</p><a href="#profit-calculator" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">Calculate profit ↑</a></section>
 </div>;
}
