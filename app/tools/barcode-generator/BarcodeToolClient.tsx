"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Field, inputClass } from "@/components/ui";

type BarcodeFormat = "code39" | "ean13";
type BarRect = { x: number; width: number };
type BarcodeArt = { width: number; height: number; barHeight: number; rects: BarRect[]; label: string };
type DetectedBarcode = { rawValue: string; format: string };
type Detector = { detect: (source: ImageBitmap | HTMLVideoElement) => Promise<DetectedBarcode[]> };
type DetectorConstructor = {
  new (options?: { formats?: string[] }): Detector;
  getSupportedFormats?: () => Promise<string[]>;
};

const code39Patterns: Record<string, string> = {
  "0": "NNNWWNWNN", "1": "WNNWNNNNW", "2": "NNWWNNNNW", "3": "WNWWNNNNN", "4": "NNNWWNNNW",
  "5": "WNNWWNNNN", "6": "NNWWWNNNN", "7": "NNNWNNWNW", "8": "WNNWNNWNN", "9": "NNWWNNWNN",
  A: "WNNNNWNNW", B: "NNWNNWNNW", C: "WNWNNWNNN", D: "NNNNWWNNW", E: "WNNNWWNNN",
  F: "NNWNWWNNN", G: "NNNNNWWNW", H: "WNNNNWWNN", I: "NNWNNWWNN", J: "NNNNWWWNN",
  K: "WNNNNNNWW", L: "NNWNNNNWW", M: "WNWNNNNWN", N: "NNNNWNNWW", O: "WNNNWNNWN",
  P: "NNWNWNNWN", Q: "NNNNNNWWW", R: "WNNNNNWWN", S: "NNWNNNWWN", T: "NNNNWNWWN",
  U: "WWNNNNNNW", V: "NWWNNNNNW", W: "WWWNNNNNN", X: "NWNNWNNNW", Y: "WWNNWNNNN",
  Z: "NWWNWNNNN", "-": "NWNNNNWNW", ".": "WWNNNNWNN", " ": "NWWNNNWNN", "$": "NWNWNWNNN",
  "/": "NW NWNNNWN".replaceAll(" ", ""), "+": "NWNNNWNWN", "%": "NNNWNWNWN", "*": "NWNNWNWNN",
};

const eanLeft = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const eanCenter = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const eanParity = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
const code39Alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%";

function getDetectorConstructor() {
  return (window as Window & { BarcodeDetector?: DetectorConstructor }).BarcodeDetector;
}

async function createDetector() {
  const BarcodeDetector = getDetectorConstructor();
  if (!BarcodeDetector) return null;
  const requested = ["code_39", "code_128", "ean_13", "ean_8", "upc_a", "upc_e", "itf", "codabar"];
  const supported = BarcodeDetector.getSupportedFormats ? await BarcodeDetector.getSupportedFormats() : requested;
  const formats = requested.filter((format) => supported.includes(format));
  return formats.length ? new BarcodeDetector({ formats }) : null;
}

function getEanCheckDigit(firstTwelve: string) {
  const sum = [...firstTwelve].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
  return String((10 - (sum % 10)) % 10);
}

function createCode39Art(value: string, height: number, includeCheck: boolean, showText: boolean): BarcodeArt {
  const data = value.toUpperCase();
  const check = includeCheck
    ? code39Alphabet[([...data].reduce((sum, character) => sum + code39Alphabet.indexOf(character), 0)) % code39Alphabet.length]
    : "";
  const encoded = `*${data}${check}*`;
  const narrow = 2;
  const wide = 5;
  const quiet = 12;
  let x = quiet;
  const rects: BarRect[] = [];
  [...encoded].forEach((character, characterIndex) => {
    const pattern = code39Patterns[character];
    [...pattern].forEach((element, index) => {
      const elementWidth = element === "W" ? wide : narrow;
      if (index % 2 === 0) rects.push({ x, width: elementWidth });
      x += elementWidth;
    });
    if (characterIndex < encoded.length - 1) x += narrow;
  });
  const label = `${data}${check}`;
  return { width: x + quiet, height: height + (showText ? 30 : 8), barHeight: height, rects, label };
}

function createEan13Art(digits: string, height: number, showText: boolean): BarcodeArt {
  const normalized = digits.length === 12 ? `${digits}${getEanCheckDigit(digits)}` : digits;
  const first = Number(normalized[0]);
  const leftBits = [...normalized.slice(1, 7)].map((digit, index) => {
    const pattern = Number(digit);
    return eanParity[first][index] === "G" ? eanCenter[pattern] : eanLeft[pattern];
  }).join("");
  const rightBits = [...normalized.slice(7)].map((digit) => [...eanLeft[Number(digit)]].map((bit) => bit === "1" ? "0" : "1").join("")).join("");
  const bits = `101${leftBits}01010${rightBits}101`;
  const quiet = 11;
  const rects: BarRect[] = [];
  let index = 0;
  while (index < bits.length) {
    if (bits[index] !== "1") { index += 1; continue; }
    const start = index;
    while (bits[index] === "1") index += 1;
    rects.push({ x: quiet + start, width: index - start });
  }
  return { width: quiet * 2 + bits.length, height: height + (showText ? 28 : 8), barHeight: height, rects, label: normalized };
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" })[character] || character);
}

function barcodeSvg(art: BarcodeArt, showText: boolean) {
  const bars = art.rects.map((rect) => `<rect x="${rect.x}" y="0" width="${rect.width}" height="${art.barHeight}"/>`).join("");
  const text = showText ? `<text x="${art.width / 2}" y="${art.barHeight + 22}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="1">${escapeXml(art.label)}</text>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${art.width * 3}" height="${art.height * 3}" viewBox="0 0 ${art.width} ${art.height}" role="img" aria-label="Barcode ${escapeXml(art.label)}"><rect width="100%" height="100%" fill="#fff"/><g fill="#000" shape-rendering="crispEdges">${bars}</g><g fill="#000">${text}</g></svg>`;
}

export default function BarcodeToolClient() {
  const [activeTab, setActiveTab] = useState<"generate" | "scan">("generate");
  const [format, setFormat] = useState<BarcodeFormat>("ean13");
  const [value, setValue] = useState("5901234123457");
  const [barHeight, setBarHeight] = useState(100);
  const [showText, setShowText] = useState(true);
  const [includeCheck, setIncludeCheck] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scanError, setScanError] = useState("");
  const [scanResult, setScanResult] = useState<DetectedBarcode[]>([]);
  const [scanFileName, setScanFileName] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const normalized = value.trim().toUpperCase();
  const eanHasChecksum = format === "ean13" && normalized.length === 13;
  const eanDigits = format === "ean13" && /^\d{12,13}$/.test(normalized);
  const eanValid = Boolean(eanDigits && (!eanHasChecksum || normalized[12] === getEanCheckDigit(normalized.slice(0, 12))));
  const code39Valid = format === "code39" && normalized.length > 0 && normalized.length <= 40 && [...normalized].every((character) => character in code39Patterns && character !== "*");
  const error = format === "ean13"
    ? !eanDigits ? "Enter 12 digits, or 13 digits with a valid EAN-13 check digit." : !eanValid ? `Check digit should be ${getEanCheckDigit(normalized.slice(0, 12))}.` : ""
    : !normalized ? "Enter a value to make a barcode."
      : normalized.length > 40 ? "Code 39 supports up to 40 data characters here."
        : !code39Valid ? "Code 39 uses A–Z, 0–9, space and - . $ / + %." : "";
  const valid = format === "ean13" ? eanValid : Boolean(code39Valid);
  const art = valid ? format === "ean13"
    ? createEan13Art(normalized, barHeight, showText)
    : createCode39Art(normalized, barHeight, includeCheck, showText)
    : null;
  const svg = art ? barcodeSvg(art, showText) : "";

  useEffect(() => () => cameraStream?.getTracks().forEach((track) => track.stop()), [cameraStream]);

  useEffect(() => {
    if (!cameraStream || !videoRef.current) return;
    let active = true;
    let timer = 0;
    const video = videoRef.current;
    video.srcObject = cameraStream;
    void video.play();
    const startScanning = async () => {
      const detector = await createDetector();
      if (!active) return;
      if (!detector) {
        setCameraError("Barcode scanning is not supported in this browser. Try a recent version of Chrome or Edge.");
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
        return;
      }
      const scan = async () => {
        if (!active) return;
        if (video.readyState >= 2) {
          try {
            const results = await detector.detect(video);
            if (results.length) {
              setScanResult(results);
              setScanError("");
              cameraStream.getTracks().forEach((track) => track.stop());
              setCameraStream(null);
              return;
            }
          } catch {
            setCameraError("Could not read a barcode from the camera. Move closer and keep the label in focus.");
          }
        }
        timer = window.setTimeout(scan, 650);
      };
      timer = window.setTimeout(scan, 500);
    };
    void startScanning();
    return () => { active = false; window.clearTimeout(timer); };
  }, [cameraStream]);

  async function downloadSvg() {
    if (!svg) return;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `barcode-${art?.label.replace(/[^a-z0-9-]/gi, "-") || "label"}.svg`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadPng() {
    if (!svg || !art) return;
    const image = new window.Image();
    const source = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = art.width * 6;
      canvas.height = art.height * 6;
      const context = canvas.getContext("2d");
      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = pngUrl;
        anchor.download = `barcode-${art.label.replace(/[^a-z0-9-]/gi, "-") || "label"}.png`;
        anchor.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
      URL.revokeObjectURL(source);
    };
    image.onerror = () => URL.revokeObjectURL(source);
    image.src = source;
  }

  async function copyResult(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setScanError("Clipboard access is unavailable. Select and copy the result instead.");
    }
  }

  async function scanImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setScanFileName(file.name);
    setScanResult([]);
    setScanError("");
    setCameraError("");
    try {
      const detector = await createDetector();
      if (!detector) {
        setScanError("Barcode scanning is not available in this browser. Try a recent version of Chrome or Edge.");
        return;
      }
      const bitmap = await createImageBitmap(file);
      const results = await detector.detect(bitmap);
      bitmap.close();
      if (!results.length) setScanError("No supported barcode was found. Try a clear, well-lit image that shows the complete barcode.");
      else setScanResult(results);
    } catch {
      setScanError("The image could not be scanned. Try another JPG, PNG or WebP image.");
    }
  }

  async function toggleCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      return;
    }
    setCameraError("");
    setScanError("");
    setScanResult([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      setCameraStream(stream);
    } catch {
      setCameraError("Camera access was not available. Allow camera permission or upload a barcode image instead.");
    }
  }

  const secondaryButton = "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40";
  const primaryButton = "inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="barcode-generator-panel rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:p-6">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4" role="tablist" aria-label="Barcode tools">
        {([["generate", "Generate barcode"], ["scan", "Scan barcode"]] as const).map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`min-h-10 rounded-xl px-4 text-sm font-semibold transition ${activeTab === id ? "bg-cyan-300 text-slate-950" : "border border-white/10 text-slate-300 hover:bg-white/[0.06]"}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "generate" ? (
        <div className="pt-5" role="tabpanel">
          <div>
            <h2 className="text-xl font-semibold text-white">Free online barcode generator</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Make a Code 39 label or an EAN-13 barcode from a number you already have.</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Barcode type">
              <select className={inputClass} value={format} onChange={(event) => { setFormat(event.target.value as BarcodeFormat); setCopied(false); }}>
                <option value="ean13" className="bg-slate-950">EAN-13 product number</option>
                <option value="code39" className="bg-slate-950">Code 39 text or asset ID</option>
              </select>
            </Field>
            <Field label={format === "ean13" ? "EAN-13 number" : "Code 39 value"}>
              <input className={inputClass} maxLength={format === "ean13" ? 13 : 40} value={value} onChange={(event) => setValue(event.target.value)} placeholder={format === "ean13" ? "12 or 13 digits" : "For example: ITEM-001"} autoComplete="off" />
            </Field>
          </div>
          {error ? <p className="mt-3 text-sm text-rose-300" role="status">{error}</p> : format === "ean13" && normalized.length === 12 ? <p className="mt-3 text-sm text-emerald-300" role="status">Check digit {getEanCheckDigit(normalized)} will be added to the barcode.</p> : null}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={`Bar height · ${barHeight}px`}>
              <input className="w-full accent-cyan-300" min={55} max={180} step={5} type="range" value={barHeight} onChange={(event) => setBarHeight(Number(event.target.value))} />
            </Field>
            <label className="flex min-h-11 items-center gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={showText} onChange={(event) => setShowText(event.target.checked)} className="h-4 w-4 accent-cyan-300" />
              Print the value below the bars
            </label>
          </div>
          {format === "code39" ? <label className="mt-3 flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={includeCheck} onChange={(event) => setIncludeCheck(event.target.checked)} className="h-4 w-4 accent-cyan-300" />Add optional Mod 43 check character</label> : null}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white p-5">
            {art ? (
              <svg className="mx-auto h-auto max-h-64 w-full" viewBox={`0 0 ${art.width} ${art.height}`} role="img" aria-label={`${format === "ean13" ? "EAN-13" : "Code 39"} barcode ${art.label}`}>
                <rect width={art.width} height={art.height} fill="#fff" />
                {art.rects.map((rect, index) => <rect key={`${rect.x}-${index}`} x={rect.x} y="0" width={rect.width} height={art.barHeight} fill="#000" shapeRendering="crispEdges" />)}
                {showText ? <text x={art.width / 2} y={art.barHeight + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" letterSpacing="1" fill="#000">{art.label}</text> : null}
              </svg>
            ) : (
              <div className="grid min-h-36 place-items-center text-center text-sm text-slate-500"><Image src="/images/barcode-generator/scan-label.svg" alt="Sample barcode on a product label" width={440} height={180} className="h-36 w-auto" /></div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className={primaryButton} onClick={downloadPng} disabled={!art}>Download PNG</button>
            <button type="button" className={secondaryButton} onClick={downloadSvg} disabled={!art}>Download SVG</button>
            <button type="button" className={secondaryButton} onClick={() => art && copyResult(art.label)} disabled={!art}>{copied ? "Copied" : "Copy barcode value"}</button>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">The generator draws the barcode in this browser. It does not issue a GS1 company prefix or assign a product number.</p>
        </div>
      ) : (
        <div className="pt-5" role="tabpanel">
          <h2 className="text-xl font-semibold text-white">Scan a barcode image or camera</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Select a clear photo, or use your device camera if this browser supports barcode detection.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-white/15 dark:text-white dark:hover:border-cyan-300/40 dark:hover:bg-white/[0.06]">
              Choose barcode image
              <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={scanImage} />
            </label>
            <button type="button" className={cameraStream ? secondaryButton : primaryButton} onClick={toggleCamera}>{cameraStream ? "Stop camera" : "Use camera"}</button>
          </div>
          {scanFileName ? <p className="mt-3 text-xs text-slate-500">Selected file: {scanFileName}</p> : null}
          {cameraError || scanError ? <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100" role="status">{cameraError || scanError}</p> : null}
          {cameraStream ? <video ref={videoRef} muted playsInline className="mt-5 max-h-72 w-full rounded-2xl bg-black object-contain" aria-label="Barcode scanner camera preview" /> : null}
          {scanResult.length ? (
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] p-4" aria-live="polite">
              <h3 className="font-semibold text-emerald-100">{scanResult.length === 1 ? "Barcode result" : `${scanResult.length} barcodes found`}</h3>
              <div className="mt-3 grid gap-3">
                {scanResult.map((result, index) => <div key={`${result.rawValue}-${index}`} className="rounded-xl bg-slate-950/70 p-3"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{result.format.replaceAll("_", " ")}</p><p className="mt-2 break-all font-mono text-sm text-white">{result.rawValue}</p><button className="mt-3 text-xs font-semibold text-cyan-300 underline underline-offset-4" type="button" onClick={() => copyResult(result.rawValue)}>{copied ? "Copied" : "Copy result"}</button></div>)}
              </div>
            </div>
          ) : null}
          <p className="mt-4 text-xs leading-5 text-slate-500">Image scanning runs locally when supported. Camera access is requested only after you press Use camera. No image is uploaded to InvoiceWala.</p>
        </div>
      )}
    </div>
  );
}
