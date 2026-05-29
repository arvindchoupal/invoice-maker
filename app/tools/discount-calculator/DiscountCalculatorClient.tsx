"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Field, inputClass } from "@/components/ui";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { discountFaqs } from "@/lib/discount-calculator-content";
import { toolByHref } from "@/lib/tools-catalog";

const tool = toolByHref("/tools/discount-calculator")!;

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function money(value: number) {
  return currency.format(Number.isFinite(value) ? value : 0);
}

const examples = [
  {
    title: "Shopping discount",
    body: "A product costs Rs. 2,000 and the store offers 15% off.",
    rows: [["Original price", "Rs. 2,000"], ["Discount", "15%"], ["Discount amount", "Rs. 300"], ["Final price", "Rs. 1,700"]],
  },
  {
    title: "Ecommerce sale",
    body: "An online seller lists headphones at Rs. 3,499 and runs a 20% sale.",
    rows: [["Original price", "Rs. 3,499"], ["Discount", "20%"], ["Savings", "Rs. 699.80"], ["Sale price", "Rs. 2,799.20"]],
  },
  {
    title: "Retail store offer",
    body: "A clothing store discounts a Rs. 1,250 shirt by 10%.",
    rows: [["Original price", "Rs. 1,250"], ["Discount", "10%"], ["Savings", "Rs. 125"], ["Customer pays", "Rs. 1,125"]],
  },
  {
    title: "Wholesale pricing",
    body: "A wholesaler offers 12% off on a Rs. 50,000 bulk order.",
    rows: [["Original price", "Rs. 50,000"], ["Discount", "12%"], ["Discount amount", "Rs. 6,000"], ["Final price", "Rs. 44,000"]],
  },
  {
    title: "Service quotation",
    body: "A consultant quotes Rs. 30,000 and gives a 5% early-payment discount.",
    rows: [["Original quote", "Rs. 30,000"], ["Discount", "5%"], ["Savings", "Rs. 1,500"], ["Final quote", "Rs. 28,500"]],
  },
];

const useCases = [
  ["Shopping", "Check the actual sale price before buying during festive offers, clearance sales or percentage-off promotions."],
  ["Ecommerce", "Calculate product discounts for marketplace listings, coupons, cart offers and promotional pricing."],
  ["Retail stores", "Quickly calculate discount amount at billing counters, sales desks and customer negotiation points."],
  ["Wholesale", "Work out bulk-order discounts, distributor pricing and dealer-level savings before preparing a quotation."],
  ["GST calculations", "Calculate the discounted price first, then use that value while preparing GST invoices or tax quotations."],
];

export default function DiscountCalculatorClient() {
  const [originalPrice, setOriginalPrice] = useState(1000);
  const [discountRate, setDiscountRate] = useState(10);

  const result = useMemo(() => {
    const price = Math.max(0, Number(originalPrice) || 0);
    const rate = Math.min(100, Math.max(0, Number(discountRate) || 0));
    const discountAmount = (price * rate) / 100;
    const finalPrice = price - discountAmount;

    return {
      price,
      rate,
      discountAmount,
      finalPrice,
      savings: discountAmount,
    };
  }, [discountRate, originalPrice]);

  return (
    <ToolPageLayout after={<DiscountSeoSections />} tool={tool}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h2 className="text-xl font-semibold text-white">Discount calculator</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Enter original price and discount percentage to calculate final sale price instantly.</p>
          </div>
          <span className="w-fit rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-300/20">Live</span>
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Original Price">
            <input className={`${inputClass} w-full min-w-0`} min="0" type="number" value={originalPrice} onChange={(event) => setOriginalPrice(Number(event.target.value))} />
          </Field>

          <Field label="Discount Percentage">
            <input className={`${inputClass} w-full min-w-0`} max="100" min="0" type="number" value={discountRate} onChange={(event) => setDiscountRate(Number(event.target.value))} />
          </Field>

          <div className="grid gap-3 sm:grid-cols-3">
            <ResultCard label="Discount Amount" value={money(result.discountAmount)} />
            <ResultCard label="Final Price" value={money(result.finalPrice)} highlight />
            <ResultCard label="Savings" value={money(result.savings)} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white">Quick summary</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              A {result.rate.toFixed(2)}% discount on {money(result.price)} saves {money(result.savings)}. The final sale price is {money(result.finalPrice)}.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-center text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200" href="/free-invoice">
              Create invoice with final price
            </Link>
            <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-center text-sm font-semibold text-white transition hover:bg-white/10" href="/quotation-maker">
              Prepare quotation
            </Link>
          </div>
        </div>
      </div>

    </ToolPageLayout>
  );
}

function ResultCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`min-w-0 rounded-2xl border p-4 ${highlight ? "border-cyan-300/40 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.04] text-white"}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${highlight ? "text-slate-700" : "text-slate-500"}`}>{label}</p>
      <p className="mt-2 break-words text-2xl font-semibold">{value}</p>
    </div>
  );
}

function DiscountSeoSections() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
      <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Guide</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Discount calculator for sale price, savings and invoice pricing</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
          <p>
            InvoiceWala&apos;s discount calculator helps India users calculate discount amount, final sale price and total savings in seconds. If you know the original price and discount percentage, the tool shows exactly how much money is reduced from the price and what the customer finally pays. It works as a discount percentage calculator, sale price calculator, percentage off calculator and price discount calculator for everyday business and shopping use.
          </p>
          <p>
            This page is useful for shoppers checking festive offers, ecommerce sellers planning coupons, retail stores preparing sale labels, wholesalers giving bulk discounts and small businesses creating quotations or invoices. Instead of calculating discount manually or checking numbers in a spreadsheet, you can enter the original price and discount percentage once and use the final amount in a quotation, GST invoice or customer bill.
          </p>
          <p>
            For Indian businesses, discount calculation is especially important because pricing often connects with GST, invoice totals and customer negotiations. A wrong discount can reduce your margin, confuse customers or create mismatched invoice values. Using a calculator keeps the math simple and helps you show a clear offer before billing. After calculating the final price, you can use InvoiceWala to create a professional invoice, prepare a quotation, calculate GST or check profit margin.
          </p>
          <p>
            The calculator is designed for simple English and quick decisions. It does not replace tax advice, but it gives a clean starting point for sale pricing. If GST applies, calculate the discount first, then use the discounted taxable value while preparing your GST invoice according to your accountant&apos;s guidance.
          </p>
        </div>
      </article>

      <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Formula</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Discount formula</h2>
        <div className="mt-5 grid gap-3">
          <code className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-cyan-100">Discount Amount = Original Price x Discount Percentage / 100</code>
          <code className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-cyan-100">Final Price = Original Price - Discount Amount</code>
          <code className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-cyan-100">Savings = Discount Amount</code>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Example: if the original price is Rs. 1,000 and discount is 10%, discount amount is Rs. 100. Final price is Rs. 900. The customer saves Rs. 100.
        </p>
      </article>

      <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Examples</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Worked discount examples</h2>
        <div className="mt-5 grid gap-4">
          {examples.map((example) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={example.title}>
              <h3 className="font-semibold text-white">{example.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{example.body}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {example.rows.map(([label, value]) => (
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-950/70 px-3 py-2 text-sm" key={label}>
                    <span className="text-slate-400">{label}</span>
                    <strong className="text-right text-white">{value}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Use cases</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Common discount calculator use cases</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {useCases.map(([title, body]) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={title}>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <article className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Learn</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">How discounts affect pricing, invoices and GST</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
          <p>
            A discount reduces the price a customer pays. The most common format is percentage discount, such as 10% off or 25% off. In business documents, discount can be shown as a line-level discount, a total invoice discount or a special offer applied before billing. The important part is that both seller and customer understand the original price, discount amount and final payable amount.
          </p>
          <p>
            In retail and ecommerce, discounts are used to increase sales, clear inventory, reward loyal customers and compete during seasonal shopping periods. In service businesses, discounts may be used for early payment, long-term contracts, bulk work or first-time customers. For freelancers and consultants, discount should be used carefully because it directly affects profit margin.
          </p>
          <p>
            For GST calculations, the discounted price often becomes the value used for tax calculation when the discount is shown clearly on the invoice. However, tax treatment can depend on timing, documentation and business rules. If you are unsure whether GST should be calculated before or after discount in a specific situation, confirm with your accountant. InvoiceWala helps you calculate discount, GST and invoice totals, but final compliance should follow current GST rules.
          </p>
          <p>
            A good workflow is simple: calculate discount, check final price, verify margin, calculate GST if applicable, then create a quotation or invoice. This keeps your offer transparent and reduces mistakes when the customer is ready to pay.
          </p>
          <p>
            If you are selling in India, also think about how the discount is presented to the customer. A clear invoice or quotation should show the original price, the discount applied, the taxable amount where relevant and the final amount payable. This is useful during festive sales, B2B negotiations, bulk orders and service packages because the buyer can see the exact savings instead of guessing from a percentage alone.
          </p>
          <p>
            Discounts should also be checked against profit. A 20% discount may look attractive, but if your product margin is only 15%, the sale can become unprofitable. Before giving a large offer, calculate the final price here, then use the margin calculator to confirm whether the deal still makes business sense.
          </p>
        </div>
      </article>

      <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">InvoiceWala links</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Use your discount result in business tools</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <InternalLink href="/tools/margin-calculator" title="Profit Margin Calculator" body="Check whether the discounted price still gives enough profit." />
          <InternalLink href="/tools/gst-calculator" title="GST Calculator" body="Calculate GST after discount or use inclusive GST mode as a reverse GST calculator." />
          <InternalLink href="/tools/gst-calculator" title="Reverse GST Calculator" body="Use inclusive GST mode to extract taxable value and GST from a final price." />
          <InternalLink href="/free-invoice-generator" title="Invoice Generator" body="Create an invoice using the final sale price." />
          <InternalLink href="/quotation-maker" title="Quotation Maker" body="Prepare a quote before sending the final invoice." />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">FAQs</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Discount calculator FAQs</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {discountFaqs.map(([question, answer]) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={question}>
              <h3 className="font-semibold text-white">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Related searches</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {["discount calculator", "discount percentage calculator", "sale price calculator", "discount calculator online", "calculate discount percentage", "price discount calculator", "percentage off calculator"].map((keyword) => (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300" key={keyword}>{keyword}</span>
          ))}
        </div>
      </section>
      </div>
    </section>
  );
}

function InternalLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/40 hover:bg-white/[0.07]" href={href}>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
    </Link>
  );
}
