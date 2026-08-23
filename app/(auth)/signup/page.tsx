"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { api, setSession } from "@/lib/api";
import { attachPublicInvoiceDraft } from "@/lib/public-invoice-draft";
import { Button, Field, inputClass } from "@/components/ui";

const onboardingBenefits = [
  ["Create", "Invoice, receipt, quotation or estimate"],
  ["Send", "PDF, WhatsApp message or direct payment details"],
  ["Track", "Paid, pending and overdue invoices"],
];

const roleOptions = ["Freelancer", "Agency", "Shop", "Consultant"];

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await api<{ token: string; user: unknown }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password: form.get("password") }),
      });
      setSession(data.token, data.user);
      const savedDraft = await attachPublicInvoiceDraft().catch(() => null);
      router.push(savedDraft?.id ? `/invoices/${savedDraft.id}/edit` : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="grid min-h-screen lg:grid-cols-[1.04fr_0.96fr]">
        <div className="relative hidden overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_32%)] p-10 lg:flex lg:flex-col">
          <BrandLogo href="/" imageClassName="h-10 w-10" tagline="" />
          <div className="flex flex-1 items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Founding customer offer</p>
              <h2 className="mt-4 text-5xl font-semibold tracking-tight">The first 1,000 customers get InvoiceWala Pro free.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Claim a founding account with invoices, AI import, GST summaries, payment reminders, PDF themes and reports. No card or subscription fee.
              </p>
              <div className="mt-8 grid gap-3">
                {onboardingBenefits.map(([title, body]) => (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4" key={title}>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-400">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <BrandLogo href="/" className="lg:hidden" imageClassName="h-9 w-9" tagline="" />
              <Link className="ml-auto rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10" href="/login">
                Log in
              </Link>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8" onSubmit={submit}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Free for the first 1,000 customers</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">Create your InvoiceWala workspace</h1>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Get all current Pro account features with no card, subscription fee or automatic charge.
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                <Field label="Your name">
                  <input autoComplete="name" className={inputClass} name="name" required />
                </Field>
                <Field label="Work email">
                  <input autoComplete="email" className={inputClass} name="email" required type="email" />
                </Field>
                <Field label="Password" hint="Use at least 8 characters.">
                  <input autoComplete="new-password" className={inputClass} minLength={8} name="password" required type="password" />
                </Field>

                <div>
                  <p className="text-sm font-medium text-slate-200">What best describes you?</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {roleOptions.map((role) => (
                      <button
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                          selectedRole === role ? "border-cyan-300/70 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                        }`}
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        type="button"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {error ? <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
                <Button className="min-h-12 w-full !bg-cyan-300 !text-slate-950 shadow-lg shadow-cyan-950/30 hover:!bg-cyan-200" disabled={loading}>
                  {loading ? "Creating workspace..." : "Claim free founding account"}
                </Button>
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                One founding spot per genuine user. Future optional add-ons may have separate terms; this account will never be charged automatically.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
