"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, setSession } from "@/lib/api";
import { Button, Field, inputClass } from "@/components/ui";

const trustPoints = [
  "Invoice, GST, payment and client data in one workspace",
  "AI import for bills, receipts and vendor PDFs",
  "PDF templates, reminders and reporting after sign in",
];

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await api<{ token: string; user: unknown }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      setSession(data.token, data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="grid min-h-screen lg:grid-cols-[1.04fr_0.96fr]">
        <div className="relative hidden overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_32%)] p-10 lg:flex lg:flex-col">
          <Link className="text-xl font-semibold tracking-tight" href="/">
            Ledgerly
          </Link>
          <div className="flex flex-1 items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Welcome back</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight">Pick up where your finance work left off.</h1>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Review invoices, import bills, follow up on payments and keep your business numbers current.
              </p>
              <div className="mt-8 grid gap-3">
                {trustPoints.map((point) => (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4" key={point}>
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span className="text-sm text-slate-200">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link className="text-xl font-semibold tracking-tight" href="/">
                Ledgerly
              </Link>
              <Link className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200" href="/signup">
                Sign up
              </Link>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8" onSubmit={submit}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Secure login</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Log in to Ledgerly</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Access your invoices, clients, reports and AI bookkeeping workspace.</p>
              </div>

              <div className="mt-7 grid gap-4">
                <Field label="Email">
                  <input autoComplete="email" className={inputClass} name="email" required type="email" />
                </Field>
                <Field label="Password">
                  <input autoComplete="current-password" className={inputClass} name="password" required type="password" />
                </Field>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input className="h-4 w-4 rounded border-white/10 bg-white/[0.04]" type="checkbox" />
                    Remember me
                  </label>
                  <Link className="font-semibold text-cyan-300 hover:text-cyan-200" href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
                {error ? <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
                <Button className="min-h-12 w-full !bg-cyan-300 !text-slate-950 shadow-lg shadow-cyan-950/30 hover:!bg-cyan-200" disabled={loading}>
                  {loading ? "Signing in..." : "Log in"}
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                New to Ledgerly?{" "}
                <Link className="font-semibold text-cyan-300 hover:text-cyan-200" href="/signup">
                  Create your workspace
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
