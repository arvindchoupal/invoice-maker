"use client";

import { useEffect, useState } from "react";
import { API_URL, api } from "@/lib/api";
import type { PdfStyleMeta } from "@/lib/pdf-styles";
import { TemplateGallery } from "@/components/TemplateGallery";
import { Button, Field, PageHeader, inputClass } from "@/components/ui";

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
  const [pdfStyles, setPdfStyles] = useState<PdfStyleMeta[]>([]);
  const [defaultPdfStyle, setDefaultPdfStyle] = useState("classic");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([api<Record<string, string | number>>("/settings"), api<PdfStyleMeta[]>("/invoices/pdf/styles/list")])
      .then(([data, styles]) => {
        setSettings(data);
        setDefaultPdfStyle(String(data.default_pdf_style ?? "classic"));
        setPdfStyles(styles);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load settings."))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setSaving(true);
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const requestedTheme = form.get("theme");
    const theme = requestedTheme === "dark" || requestedTheme === "light" ? requestedTheme : "system";
    try {
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
        theme,
        invoicePrefix: form.get("invoicePrefix"),
        defaultPdfStyle,
        }),
      });
      window.localStorage.setItem("invoicewala-theme", theme);
      const resolvedDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", resolvedDark);
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = resolvedDark ? "dark" : "light";
      window.dispatchEvent(new Event("invoicewala-theme-change"));
      setMessage("Settings saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadLogo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const form = new FormData(event.currentTarget);
      const data = await api<{ logoUrl: string }>("/settings/logo", { method: "POST", body: form });
      setSettings((current) => ({ ...current, logo_url: data.logoUrl }));
      event.currentTarget.reset();
      setMessage("Logo uploaded successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload logo.");
    } finally {
      setSaving(false);
    }
  }

  async function removeLogo() {
    setSaving(true);
    setError("");
    try {
      const data = await api<{ logoUrl: string }>("/settings/logo", { method: "DELETE" });
      setSettings((current) => ({ ...current, logo_url: data.logoUrl }));
      setMessage("Logo removed. New PDFs will use the clean template mark.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove logo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5">
      <PageHeader title="Settings" description="Configure company profile, logo, currency, tax, and theme preferences." />
      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/30 dark:text-red-200" role="alert">{error}</p> : null}
      {loading ? <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">Loading saved settings…</p> : <form key="loaded-settings" onSubmit={save} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        <Field label="Company name"><input className={inputClass} name="companyName" defaultValue={String(settings.company_name ?? "")} /></Field>
        <Field label="Company email"><input className={inputClass} name="companyEmail" type="email" defaultValue={String(settings.company_email ?? "")} /></Field>
        <Field label="Company GST/VAT ID"><input className={inputClass} name="companyTaxId" defaultValue={String(settings.company_tax_id ?? "")} /></Field>
        <Field label="Currency"><select className={inputClass} name="currency" defaultValue={String(settings.currency ?? "INR")}><option value="INR">INR — Indian Rupee</option><option value="USD">USD — US Dollar</option><option value="EUR">EUR — Euro</option><option value="GBP">GBP — British Pound</option><option value="AED">AED — UAE Dirham</option></select></Field>
        <Field label="Tax name"><input className={inputClass} name="taxName" defaultValue={String(settings.tax_name ?? "GST")} /></Field>
        <Field label="Tax rate"><input className={inputClass} name="taxRate" type="number" step="0.01" defaultValue={String(settings.tax_rate ?? 0)} /></Field>
        <Field label="Invoice prefix"><input className={inputClass} name="invoicePrefix" defaultValue={String(settings.invoice_prefix ?? "INV")} /></Field>
        <Field label="Theme">
          <select className={inputClass} name="theme" defaultValue={settings.theme === "dark" || settings.theme === "light" ? settings.theme : "system"}>
            <option value="system">System default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </Field>
        <Field label="Company address"><textarea className={inputClass} name="companyAddress" defaultValue={String(settings.company_address ?? "")} /></Field>
        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Default invoice PDF template</p>
          <p className="mb-3 text-xs text-slate-500">Used for new invoices when no template is chosen yet.</p>
          {pdfStyles.length ? <TemplateGallery styles={pdfStyles} selectedId={defaultPdfStyle} onSelect={setDefaultPdfStyle} /> : <p className="text-sm text-slate-500">Invoice templates are unavailable right now.</p>}
        </div>
        <Button className="md:col-span-2" disabled={saving}>{saving ? "Saving…" : "Save company settings"}</Button>
      </form>}
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
        <div className="mt-4 flex flex-wrap gap-2">
          <Button disabled={saving}>{saving ? "Uploading…" : "Upload logo"}</Button>
          {assetUrl(settings.logo_url) ? <Button type="button" variant="secondary" disabled={saving} onClick={removeLogo}>Remove logo</Button> : null}
        </div>
      </form>
      {message ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200" role="status">{message}</p> : null}
    </div>
  );
}
