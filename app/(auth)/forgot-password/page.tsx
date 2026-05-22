"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button, Field, inputClass } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    await api("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email: form.get("email") }) });
    setMessage("Check your inbox for a reset link.");
    setLoading(false);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">We will send a reset link if the email exists.</p>
        <div className="mt-6 grid gap-4">
          <Field label="Email"><input className={inputClass} name="email" type="email" required /></Field>
          {message ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">{message}</p> : null}
          <Button disabled={loading}>{loading ? "Sending..." : "Send reset link"}</Button>
        </div>
        <Link className="mt-5 block text-sm text-blue-600" href="/login">Back to login</Link>
      </form>
    </main>
  );
}
