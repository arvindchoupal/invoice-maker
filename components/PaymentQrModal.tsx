"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ImagePlus, QrCode, X } from "lucide-react";
import QRCode from "qrcode";
import type { Invoice } from "@/types";

export type QrPaymentSettings = {
  enabled: boolean;
  method: "upi" | "link" | "paypal" | "wise" | "stripe" | "bank" | "custom";
  value: string;
  description: string;
  imageData?: string;
};

const emptySettings: QrPaymentSettings = { enabled: true, method: "upi", value: "", description: "Scan the QR code to make payment" };

export function buildPaymentQrPayload(settings: QrPaymentSettings, invoice: Invoice) {
  if (["link", "paypal", "wise", "stripe"].includes(settings.method)) {
    const value = settings.value.trim();
    return /^https:\/\//i.test(value) ? value : "";
  }
  if (settings.method === "custom") return settings.value.trim();
  if (settings.method === "bank") return settings.value.trim();
  const upiId = settings.value.trim();
  if (!upiId || !upiId.includes("@")) return "";
  const query = new URLSearchParams({ pa: upiId });
  if (invoice.businessName.trim()) query.set("pn", invoice.businessName.trim());
  if (settings.description.trim()) query.set("tn", settings.description.trim());
  const due = Math.max(0, Number(invoice.total || 0) - Number(invoice.amountPaid || 0));
  if (due > 0 && (invoice.currency || "INR").toUpperCase() === "INR") query.set("am", due.toFixed(2));
  query.set("cu", "INR");
  return `upi://pay?${query.toString()}`;
}

export function PaymentQrImage({ settings, invoice, size = 180 }: { settings: QrPaymentSettings; invoice: Invoice; size?: number }) {
  const payload = settings.enabled ? buildPaymentQrPayload(settings, invoice) : "";
  const [result, setResult] = useState<{ payload: string; image: string } | null>(null);
  useEffect(() => {
    if (!payload) return;
    let cancelled = false;
    QRCode.toDataURL(payload, { width: size, margin: 1, errorCorrectionLevel: "M" })
      .then((image) => { if (!cancelled) setResult({ payload, image }); })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [payload, size]);
  if (!settings.enabled) return null;
  const image = settings.imageData || (payload && result?.payload === payload ? result.image : "");
  if (!image) return null;
  return <Image src={image} alt={`${settings.method.toUpperCase()} payment QR code`} width={size} height={size} unoptimized className="h-auto w-full max-w-[180px]" />;
}

export function PaymentQrModal({
  initial,
  invoice,
  onCancel,
  onSave,
}: {
  initial?: Partial<QrPaymentSettings>;
  invoice: Invoice;
  onCancel: () => void;
  onSave: (settings: QrPaymentSettings) => void;
}) {
  const [settings, setSettings] = useState<QrPaymentSettings>({ ...emptySettings, ...initial });
  const [qrResult, setQrResult] = useState<{ payload: string; image?: string; error?: string } | null>(null);
  const [uploadError, setUploadError] = useState("");
  const payload = settings.enabled ? buildPaymentQrPayload(settings, invoice) : "";

  useEffect(() => {
    let cancelled = false;
    if (!payload) return;
    QRCode.toDataURL(payload, { width: 280, margin: 1, errorCorrectionLevel: "M" })
      .then((image) => { if (!cancelled) setQrResult({ payload, image }); })
      .catch(() => { if (!cancelled) setQrResult({ payload, error: "This payment detail is too long to encode as a QR code." }); });
    return () => { cancelled = true; };
  }, [payload]);

  const qrImage = settings.imageData || (qrResult?.payload === payload ? qrResult.image : "");
  const qrError = uploadError || (qrResult?.payload === payload ? qrResult.error : "");
  const setField = <K extends keyof QrPaymentSettings>(key: K, value: QrPaymentSettings[K]) => setSettings((current) => ({ ...current, [key]: value }));

  const uploadQrImage = (file?: File) => {
    setUploadError("");
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setUploadError("Choose a PNG or JPG QR image.");
      return;
    }
    if (file.size > 290_000) {
      setUploadError("QR image must be 290 KB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setField("imageData", reader.result);
      else setUploadError("Could not read this QR image.");
    };
    reader.onerror = () => setUploadError("Could not read this QR image.");
    reader.readAsDataURL(file);
  };

  const labels: Record<QrPaymentSettings["method"], string> = { upi: "UPI ID", link: "Payment Link", paypal: "PayPal Link", wise: "Wise Payment Link", stripe: "Card / Stripe Link", bank: "Bank Details", custom: "Custom Text" };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-3 sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="payment-qr-title" className="max-h-[94vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white p-5 text-slate-900 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><h2 id="payment-qr-title" className="text-xl font-bold">Generate QR Payment</h2><p className="mt-1 text-sm text-slate-500">Add a scannable payment option to this invoice.</p></div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{settings.enabled ? "Enabled" : "Disabled"}</span>
            <button type="button" role="switch" aria-checked={settings.enabled} aria-label="Enable QR payment" onClick={() => setField("enabled", !settings.enabled)} className={`relative h-7 w-12 rounded-full transition ${settings.enabled ? "bg-blue-600" : "bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${settings.enabled ? "left-6" : "left-1"}`} /></button>
            <button type="button" onClick={onCancel} aria-label="Close" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div className="grid content-start gap-5">
            <label className="grid gap-2 text-sm font-medium"><span>Payment Method</span><select className="min-h-11 rounded-lg border border-slate-300 bg-white px-3" value={settings.method} onChange={(event) => { const method = event.target.value as QrPaymentSettings["method"]; setSettings((current) => ({ ...current, method, enabled: method === "upi" ? true : current.enabled })); }}><option value="link">Payment Link</option><option value="upi">UPI</option><option value="paypal">PayPal</option><option value="wise">Wise</option><option value="stripe">Card / Stripe</option><option value="bank">Bank Transfer</option><option value="custom">Custom Text</option></select></label>
            <label className="grid gap-2 text-sm font-medium"><span>{labels[settings.method]} :</span><input className="min-h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" value={settings.value} onChange={(event) => setField("value", event.target.value)} placeholder={settings.method === "upi" ? "e.g. name@bank" : ["link", "paypal", "wise", "stripe"].includes(settings.method) ? "https://..." : settings.method === "bank" ? "Enter account and transfer details" : "Enter text to encode"} /></label>
            <div className="grid gap-2 text-sm font-medium">
              <span>Or upload a QR image</span>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 font-semibold hover:bg-slate-50"><ImagePlus className="h-4 w-4" />Upload QR image<input type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(event) => uploadQrImage(event.target.files?.[0])} /></label>
                {settings.imageData ? <button type="button" className="text-sm font-semibold text-red-600 hover:underline" onClick={() => { setField("imageData", undefined); setUploadError(""); }}>Remove uploaded image</button> : null}
                <span className="text-xs font-normal text-slate-500">PNG/JPG · max 290 KB</span>
              </div>
            </div>
            <label className="grid gap-2 text-sm font-medium"><span>Description (Optional) :</span><textarea className="min-h-24 rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" value={settings.description} onChange={(event) => setField("description", event.target.value)} placeholder="Scan the QR code to make payment" /></label>
            <p className="text-xs leading-5 text-slate-500">UPI is for INR payments. For international customers, use PayPal, Wise, Card / Stripe or a payment link. QR codes are generated locally in your browser.</p>
          </div>
          <div className="grid content-center justify-items-center border-t border-slate-200 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <h3 className="text-2xl font-semibold">Preview</h3>
            <div className="mt-4 grid min-h-[280px] w-full max-w-[300px] place-items-center rounded-2xl border border-slate-200 bg-white p-4">
              {qrImage ? <Image src={qrImage} alt="Payment QR code preview" width={280} height={280} unoptimized className="h-auto w-full" /> : <div className="grid justify-items-center gap-3 text-center text-sm text-slate-500"><QrCode className="h-16 w-16 text-slate-300" /><span>{settings.enabled ? "Enter payment details or upload a QR image to preview it." : "Enable QR payment to preview the code."}</span></div>}
            </div>
            {qrError ? <p role="alert" className="mt-3 text-sm text-red-600">{qrError}</p> : null}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
          <button type="button" onClick={onCancel} className="min-h-11 rounded-lg bg-slate-600 px-6 font-semibold text-white hover:bg-slate-700">Cancel</button>
          <button type="button" onClick={() => onSave(settings)} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-600 px-6 font-semibold text-white hover:bg-emerald-700"><Check className="h-4 w-4" />Save Changes</button>
        </div>
      </section>
    </div>
  );
}
