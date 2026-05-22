import Link from "next/link";

const metrics = [
  ["GST-ready", "invoice and tax document flows"],
  ["AI", "extracts bills, receipts and PDFs"],
  ["Payment", "tracking, reminders and overdue visibility"],
  ["8 free", "public calculators and converters"],
];

const features = [
  ["Get paid faster", "Send polished invoices, payment links and WhatsApp-ready reminders without chasing clients manually."],
  ["Turn bills into books", "Upload receipts, GST bills and vendor PDFs; Ledgerly extracts vendors, taxes, items and totals."],
  ["Know profit monthly", "Track revenue, expenses, GST, client balances and profit trends from one finance workspace."],
  ["Work like a real business", "Invoices, receipts, quotations, estimates, purchase orders and reports live together."],
];

const simpleUseCases = [
  ["Finished freelance work?", "Create a clean invoice, add taxes, download PDF and send it to your client."],
  ["Sold products to a customer?", "Make a proper sales invoice with item rows, GST/VAT and payment status."],
  ["Completed a service job?", "Send an invoice or receipt for repair, consulting, design, construction or local work."],
  ["Need a quote before billing?", "Prepare a quotation or estimate first, then convert it into an invoice later."],
];

const tools = [
  ["GST calculator", "/tools/gst-calculator"],
  ["Profit calculator", "/tools/profit-calculator"],
  ["Margin calculator", "/tools/margin-calculator"],
  ["PDF invoice extractor", "/tools/pdf-to-invoice-extractor"],
  ["Invoice to Excel", "/tools/invoice-to-excel-converter"],
  ["EMI calculator", "/tools/emi-calculator"],
];

const faqs = [
  ["Is Ledgerly only an invoice maker?", "No. Ledgerly is being built as an AI-powered finance OS for invoices, bills, expenses, payments, GST reports and bookkeeping."],
  ["Does Ledgerly support GST businesses in India?", "Yes. Ledgerly supports GST/VAT fields, GST-ready invoice data, tax summaries and GST-focused public tools."],
  ["Can I use the free tools without signup?", "Yes. The public calculators work without login. Signup is needed when you want to save results, create invoices or build reports."],
  ["Can I send invoices on WhatsApp?", "Yes. Ledgerly supports direct WhatsApp sharing links for invoices without needing a WhatsApp API provider."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link className="text-xl font-semibold tracking-tight" href="/">Ledgerly</Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/10" href="/tools">Free tools</Link>
            <Link className="hidden rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/10 sm:inline-flex" href="/login">Log in</Link>
            <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200" href="/signup">Start free</Link>
          </div>
        </nav>

        <div className="grid min-h-[720px] items-center gap-10 py-16 lg:grid-cols-[1fr_560px]">
          <div>
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
              AI Finance OS for freelancers, agencies, contractors and small businesses
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Get paid faster. Automate invoices, bills, GST and bookkeeping with AI.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Ledgerly helps you send invoices, import vendor bills, track payments, create finance documents and turn messy business paperwork into clean reports.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200" href="/signup">Start free</Link>
              <Link className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" href="/tools">Try free tools</Link>
              <Link className="rounded-xl border border-cyan-300/30 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10" href="/dashboard">View product demo</Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">No credit card required. Save your first invoice in minutes.</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="grid gap-3">
                <div className="rounded-2xl bg-slate-950 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Example workspace</p>
                      <p className="mt-1 text-3xl font-semibold">₹4,82,400</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">Receivables</span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-xl bg-white/[0.06] p-3"><strong>42</strong><br /><span className="text-slate-400">Invoices</span></div>
                    <div className="rounded-xl bg-white/[0.06] p-3"><strong>11</strong><br /><span className="text-slate-400">Pending</span></div>
                    <div className="rounded-xl bg-white/[0.06] p-3"><strong>3</strong><br /><span className="text-slate-400">Overdue</span></div>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 text-slate-950">
                    <p className="text-xs font-semibold uppercase text-slate-400">AI Import</p>
                    <p className="mt-2 font-semibold">GST bill detected</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="flex justify-between"><span>Vendor</span><strong>Metro Supplies</strong></p>
                      <p className="flex justify-between"><span>GST</span><strong>18%</strong></p>
                      <p className="flex justify-between"><span>Total</span><strong>₹28,320</strong></p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-slate-950">
                    <p className="text-xs font-semibold uppercase text-slate-400">Template</p>
                    <p className="mt-2 font-semibold">GST Tax Invoice</p>
                    <div className="mt-4 h-28 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="h-2 w-20 rounded bg-blue-600" />
                      <div className="mt-4 h-2 rounded bg-slate-300" />
                      <div className="mt-2 h-2 w-2/3 rounded bg-slate-300" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-cyan-100">AI insight</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Three invoices are due this week. Send WhatsApp reminders today to improve collection speed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label]) => (
            <div className="rounded-2xl bg-white/[0.04] p-4" key={label}>
              <p className="text-3xl font-semibold">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Need an invoice right now?</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Sold something or completed work? Give your customer a proper invoice in minutes.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Ledgerly is simple enough for one invoice today and powerful enough to manage payments, GST, clients and reports as your business grows.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100" href="/signup?intent=create-invoice">
                Create invoice
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" href="/tools/gst-calculator">
                Calculate GST first
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {simpleUseCases.map(([title, body]) => (
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5" key={title}>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-20 lg:grid-cols-4">
        {features.map(([title, body]) => (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={title}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">AI import</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Upload bills and receipts. Ledgerly turns them into structured finance records.</h2>
          <p className="mt-4 text-slate-300">Extract vendor, GSTIN, dates, line items, subtotal, tax and total. Save as invoice, purchase or expense after review.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {["Receipt", "GST Bill", "Vendor PDF"].map((item, index) => (
            <div className="rounded-3xl bg-white p-5 text-slate-950" key={item}>
              <p className="text-sm font-semibold">{item}</p>
              <div className="mt-4 h-32 rounded-2xl bg-slate-100 p-3">
                <div className="h-2 rounded bg-slate-300" />
                <div className="mt-3 h-2 w-2/3 rounded bg-slate-300" />
                <div className="mt-8 h-8 rounded bg-cyan-300/40" />
              </div>
              <p className="mt-4 text-sm text-slate-500">{[96, 91, 88][index]}% extraction confidence</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free tools</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Win on Google. Convert useful calculations into Ledgerly accounts.</h2>
          </div>
          <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950" href="/tools">View all tools</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {tools.map(([title, href]) => (
            <Link className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.08]" href={href} key={href}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">Calculate, share, export, then save into Ledgerly.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Pricing teaser</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Start free. Upgrade when automation saves real time.</h2>
              <p className="mt-4 text-slate-300">Free includes limited invoices and AI imports. Pro unlocks unlimited invoices, AI automation, branding removal and reminders. Business adds teams, workspaces and client portals.</p>
            </div>
            <div className="grid gap-3">
              {["Free", "Pro", "Business"].map((plan, index) => (
                <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-4" key={plan}>
                  <div>
                    <p className="font-semibold">{plan}</p>
                    <p className="text-sm text-slate-400">{["Limited invoices", "Unlimited automation", "Teams + portals"][index]}</p>
                  </div>
                  <Link className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-950" href="/pricing">View</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-semibold tracking-tight">Questions before you switch?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6" key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <p>Ledgerly · AI Finance OS</p>
          <div className="flex gap-4">
            <Link href="/tools">Tools</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/signup">Start free</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
