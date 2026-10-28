import Link from "next/link";
import styles from "./GstCalculator.module.css";
import type { ToolSeoContent as ToolSeoContentType } from "@/lib/tool-seo-content";

export function GstCalculatorSeoContent({ content }: { content: ToolSeoContentType }) {
  return (
    <section className={`${styles.guide} border-t border-[var(--guide-border)] px-4 py-16 sm:px-6 lg:px-8`} data-gst-guide>
      <div className="mx-auto grid max-w-6xl gap-12 sm:gap-16">
        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Guide</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--guide-heading)]">{content.intro.title}</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 text-sm leading-7 text-[var(--guide-text)]">
              {content.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-3">
              {content.intro.bullets.map((bullet) => (
                <div className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-soft)] p-4 text-sm font-semibold text-[var(--guide-text)]" key={bullet}>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Formula</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">{content.formula.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--guide-text)]">{content.formula.explanation}</p>
            <div className="mt-5 grid gap-3">
              {content.formula.formulas.map((formula) => (
                <code className="block rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-soft)] p-4 text-sm text-[var(--guide-accent)]" key={formula}>
                  {formula}
                </code>
              ))}
            </div>
            <p className="mt-5 rounded-2xl bg-[var(--guide-soft)] p-4 text-sm leading-7 text-[var(--guide-text)]">{content.formula.example}</p>
          </article>

          <div className="grid gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Examples</p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">Real-world calculations</h2>
            </div>
            {content.examples.map((example) => (
              <article className="rounded-3xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-5" key={example.title}>
                <h3 className="text-lg font-semibold text-[var(--guide-heading)]">{example.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--guide-muted)]">{example.body}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {example.rows.map(([label, value]) => (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--guide-soft)] px-4 py-3 text-sm" key={label}>
                      <span className="text-[var(--guide-muted)]">{label}</span>
                      <strong className="text-[var(--guide-heading)]">{value}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Learn</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--guide-heading)]">{content.education.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.education.sections.map((section) => (
              <article className="rounded-2xl bg-[var(--guide-soft)] p-5" key={section.title}>
                <h3 className="font-semibold text-[var(--guide-heading)]">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--guide-muted)]">{section.body}</p>
              </article>
            ))}
          </div>
        </div>


        <section id="gst-how-to" className="scroll-mt-28"><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">How to use the GST calculator</h2><ol className="mt-7 grid gap-5 md:grid-cols-3">{[["Enter the amount and rate", "Type the amount in rupees and choose a preset or enter a custom percentage. Use the GST rate applicable to your transaction. A preset is a shortcut for arithmetic, not a product classification."], ["Add or remove the tax", "Choose Add GST if the amount is the price before tax. Choose Remove GST if the amount already includes GST. Select the applicable CGST + SGST or IGST breakup."], ["Review and use the result", "Check the taxable value, total GST and grand total. Copy the result, download a CSV or carry the taxable amount and selected tax split into the invoice maker."]].map(([title,body],i)=><li className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6" key={title}><span className="text-sm font-semibold text-[var(--guide-accent)]">0{i+1}</span><h3 className="mt-3 font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--guide-text)]">{body}</p></li>)}</ol></section>

        <section id="gst-worked-examples" className="scroll-mt-28"><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">Worked GST examples: add tax and work backwards from a total</h2><p className="mt-4 max-w-4xl leading-8 text-[var(--guide-text)]">The examples below use an illustrative combined rate of 18%. They show the difference between adding GST and separating GST from an inclusive price. Confirm the applicable rate for the actual goods or services and transaction date before billing.</p><div className="mt-7 grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h3 className="text-lg font-semibold text-[var(--guide-heading)]">₹10,000 before GST</h3><p className="mt-3 leading-7 text-[var(--guide-text)]">The quoted base price is ₹10,000. At 18%, GST is ₹10,000 × 18 ÷ 100 = ₹1,800. Adding the tax gives a grand total of ₹11,800.</p><dl className="mt-5 space-y-3 text-sm">{[["Taxable value","₹10,000.00"],["GST at 18%","₹1,800.00"],["Grand total","₹11,800.00"]].map(([label,value])=><div className="flex justify-between gap-3 rounded-xl bg-[var(--guide-soft)] p-3" key={label}><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl></article><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h3 className="text-lg font-semibold text-[var(--guide-heading)]">₹11,800 including GST</h3><p className="mt-3 leading-7 text-[var(--guide-text)]">The final price is already ₹11,800. Divide by 1.18 to recover the ₹10,000 taxable value. The difference, ₹1,800, is the included GST. Subtracting 18% of ₹11,800 would give the wrong base.</p><dl className="mt-5 space-y-3 text-sm">{[["GST-inclusive amount","₹11,800.00"],["Taxable value","₹10,000.00"],["Included GST","₹1,800.00"]].map(([label,value])=><div className="flex justify-between gap-3 rounded-xl bg-[var(--guide-soft)] p-3" key={label}><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl></article></div></section>

        <section className="grid gap-6 lg:grid-cols-2"><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h2 className="text-2xl font-semibold text-[var(--guide-heading)]">How the calculator splits CGST, SGST and IGST</h2><p className="mt-4 leading-8 text-[var(--guide-text)]">For the same taxable value and combined rate, changing the split does not change the grand total. In the ₹10,000 example at 18%, the CGST + SGST view shows ₹900 CGST and ₹900 SGST. The IGST view shows ₹1,800 IGST instead.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">The tool applies the split you select. It does not determine the place of supply or inspect the supplier and customer locations. Check the applicable treatment for the transaction, including any special rules, before choosing the split.</p><a href="https://taxinformation.cbic.gov.in/content-page/explore-act/1000616/1000001" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-[var(--guide-accent)] underline">Reference: CBIC — IGST Act</a></article><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6"><h2 className="text-2xl font-semibold text-[var(--guide-heading)]">Why removing GST uses a different formula</h2><p className="mt-4 leading-8 text-[var(--guide-text)]">When a price includes GST, that total represents both the original base and its tax. At an illustrative rate of 18%, the final price is 118% of the base. That is why the base is the inclusive price multiplied by 100 and divided by 118.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">The included tax can also be found as inclusive amount × rate ÷ (100 + rate). With ₹1,180 including 18% GST, that gives ₹180 tax and a ₹1,000 base. The exclusive calculation then adds ₹180 back to the base to recover ₹1,180.</p><a href="https://cbic-gst.gov.in/pdf/01012022-CGST-Rules-2017-amended_Part-A.pdf" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-[var(--guide-accent)] underline">Reference: CBIC — CGST Rules, Rule 35</a></article></section>

        <section><h2 className="text-3xl font-semibold text-[var(--guide-heading)]">Check these details before using the result in an invoice</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{[["Price basis", "Confirm whether the figure you received is before tax or already includes tax. Adding GST to a tax-inclusive total counts the tax again."], ["Applicable rate", "Use the rate for the goods or services and the transaction date. Existing examples with 12% or 28% illustrate the arithmetic; they do not establish a current rate for a product."], ["Taxable amount", "This tool applies one rate to one amount. Establish the correct taxable value first, including the treatment of discounts, delivery or other charges for your transaction."], ["Multiple tax rates", "Calculate lines with different rates separately. Do not apply a simple average percentage to a mixed-rate invoice and assume the tax will match."], ["Rounding", "The result is shown to two decimal places. The split allocates any residual paisa so CGST and SGST add up to total GST. Line-level invoice rounding can differ from a calculation on the combined amount."], ["Invoice details", "Review the business and customer details, dates, item description and tax treatment after opening the invoice maker. The calculator result does not fill every detail needed for a complete invoice."]].map(([title,body])=><article className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6" key={title}><h3 className="font-semibold text-[var(--guide-heading)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--guide-text)]">{body}</p></article>)}</div></section>

        <section className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8"><h2 className="text-2xl font-semibold text-[var(--guide-heading)]">Copy, download or carry the calculation into your next bill</h2><p className="mt-4 leading-8 text-[var(--guide-text)]">Copy result puts a short calculation summary on your clipboard. Share opens the available device sharing option, or copies the summary when native sharing is unavailable. Download CSV creates a table with the input amount, mode, selected rate, taxable value, tax split and grand total.</p><p className="mt-4 leading-8 text-[var(--guide-text)]">Use this in invoice passes the taxable value, GST rate and selected split to the invoice form. Add the actual product or service description and review the remaining billing details. For more than one line item, check the tax on each row rather than reusing a combined result as the rate for every item.</p><p className="mt-4 text-sm leading-7 text-[var(--guide-muted)]">The calculator performs arithmetic using your selected rate. It does not file a GST return, validate registration details, determine input tax credit or calculate compensation cess.</p></section>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Use cases</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">Who uses this tool?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.useCases.map((item) => (
                <article className="rounded-2xl bg-[var(--guide-soft)] p-4" key={item.title}>
                  <h3 className="font-semibold text-[var(--guide-heading)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--guide-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Related tools</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">Tools to use next</h2>
            <div className="mt-5 grid gap-3">
              {content.relatedTools.map((tool) => (
                <Link className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-soft)] p-4 text-sm font-semibold text-[var(--guide-text)] transition hover:border-cyan-300/40 hover:text-[var(--guide-accent)]" href={tool.href} key={tool.href}>
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">Next steps</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--guide-heading)]">Use the result in your billing workflow</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.internalLinks.map((link) => (
              <Link className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-soft)] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-[var(--guide-soft)]" href={link.href} key={link.href}>
                <h3 className="font-semibold text-[var(--guide-heading)]">{link.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--guide-muted)]">{link.body}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">FAQs</p>
          <h2 id="gst-faqs" className="mt-3 scroll-mt-28 text-3xl font-semibold tracking-tight text-[var(--guide-heading)]">Common questions</h2>
          <div className="mt-6 divide-y divide-[var(--guide-border)] border-y border-[var(--guide-border)]">{content.faqs.map(([question,answer])=><details key={question} className="py-5"><summary className="cursor-pointer font-semibold text-[var(--guide-heading)]">{question}</summary><p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--guide-muted)]">{answer}</p></details>)}</div>
        </div>

        <div className="rounded-[2rem] border border-[var(--guide-border)] bg-[var(--guide-panel)] p-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--guide-accent)]">GST calculation topics</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--guide-heading)]">More ways to use this GST calculation guide</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--guide-muted)]">
              These are common ways business owners search when they need to calculate tax before creating an invoice or quotation.
            </p>
          </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.keywords.map((keyword) => (
                <span className="rounded-full border border-[var(--guide-border)] bg-[var(--guide-soft)] px-3 py-1 text-xs font-semibold text-[var(--guide-text)]" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
        </div>
        <section className="rounded-2xl border border-[var(--guide-border)] bg-[var(--guide-panel)] p-8 text-center"><h2 className="text-2xl font-semibold text-[var(--guide-heading)]">Check your GST amount before you bill</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--guide-text)]">Start with the base price or an inclusive total, review the breakup and use the result in your next invoice.</p><a href="#gst-calculator" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-[#ffffff] hover:bg-blue-800">Calculate GST ↑</a></section>
      </div>
    </section>
  );
}
