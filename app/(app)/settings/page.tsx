"use client";

import { useEffect, useState } from "react";
import { API_URL, api } from "@/lib/api";
import { Button, Field, inputClass } from "@/components/ui";

function assetUrl(path: string | number | undefined) {
  const value = String(path ?? "");
  if (!value) return "";
  if (/^https?:\/\//.test(value)) return value;
  const base = API_URL.replace(/\/api$/, "");
  if (value.startsWith("/uploads/")) return `${base}${value}`;
  if (value.includes("/uploads/")) return `${base}/uploads/${value.split("/uploads/").pop()}`;
  return "";
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string | number>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<Record<string, string | number>>("/settings").then(setSettings).catch(() => undefined);
  }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await api("/settings", {
      method: "PUT",
      body: JSON.stringify({
        companyName: form.get("companyName"),
        companyEmail: form.get("companyEmail"),
        companyAddress: form.get("companyAddress"),
        companyTaxId: form.get("companyTaxId"),
        currency: form.get("currency"),
        taxName: form.get("taxName"),
        taxRate: Number(form.get("taxRate")),
        theme: form.get("theme"),
        invoicePrefix: form.get("invoicePrefix"),
      }),
    });
    setMessage("Settings saved.");
  }

  async function uploadLogo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = await api<{ logoUrl: string }>("/settings/logo", { method: "POST", body: form });
    setSettings((current) => ({ ...current, logo_url: data.logoUrl }));
    setMessage(`Logo uploaded: ${data.logoUrl}`);
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure company profile, logo, currency, tax, and theme preferences.</p>
      </div>
      <form onSubmit={save} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        <Field label="Company name"><input className={inputClass} name="companyName" defaultValue={String(settings.company_name ?? "")} /></Field>
        <Field label="Company email"><input className={inputClass} name="companyEmail" defaultValue={String(settings.company_email ?? "")} /></Field>
        <Field label="Company GST/VAT ID"><input className={inputClass} name="companyTaxId" defaultValue={String(settings.company_tax_id ?? "")} /></Field>
        <Field label="Currency"><input className={inputClass} name="currency" maxLength={3} defaultValue={String(settings.currency ?? "USD")} /></Field>
        <Field label="Tax name"><input className={inputClass} name="taxName" defaultValue={String(settings.tax_name ?? "VAT")} /></Field>
        <Field label="Tax rate"><input className={inputClass} name="taxRate" type="number" step="0.01" defaultValue={String(settings.tax_rate ?? 0)} /></Field>
        <Field label="Invoice prefix"><input className={inputClass} name="invoicePrefix" defaultValue={String(settings.invoice_prefix ?? "INV")} /></Field>
        <Field label="Theme">
          <select className={inputClass} name="theme" defaultValue={String(settings.theme ?? "system")}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </Field>
        <Field label="Company address"><textarea className={inputClass} name="companyAddress" defaultValue={String(settings.company_address ?? "")} /></Field>
        <Button className="md:col-span-2">Save settings</Button>
      </form>
      <form onSubmit={uploadLogo} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-4">
          {assetUrl(settings.logo_url) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="Company logo" className="h-16 w-16 rounded-2xl object-contain ring-1 ring-slate-200 dark:ring-white/10" src={assetUrl(settings.logo_url)} />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-white/[0.06]">Logo</div>
          )}
          <div>
            <h2 className="font-semibold">Invoice PDF logo</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Uploaded logo appears in invoice previews and downloaded PDF templates.</p>
          </div>
        </div>
        <Field label="Company logo"><input className={inputClass} name="logo" type="file" accept="image/png,image/jpeg" required /></Field>
        <Button className="mt-4">Upload logo</Button>
      </form>
      {message ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">{message}</p> : null}
    </div>
  );
}
