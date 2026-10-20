export interface PdfStyleMeta {
  id: string;
  label: string;
  accent: string;
  accentDark?: string;
  text?: string;
  muted?: string;
  soft: string;
  header?: string;
  table?: string;
  category?: string;
  noLogo?: boolean;
}

export type PreviewFamily = "corporate" | "minimal" | "gst" | "agency" | "construction" | "retail" | "startup";

const FAMILY_LABELS: Record<PreviewFamily, string> = {
  corporate: "Logo, due badge, payment terms",
  minimal: "Clean single-column billing",
  gst: "Selected GST components and tax IDs",
  agency: "Service invoice layout",
  construction: "Project invoice layout",
  retail: "Item codes, quantities and totals",
  startup: "Modern memo and payment link",
};

export function previewFamily(styleId: string): PreviewFamily {
  if (["gst", "gstIndia", "emerald", "ledger"].includes(styleId)) return "gst";
  if (["retail", "receipt"].includes(styleId)) return "retail";
  if (["agency", "studio"].includes(styleId)) return "agency";
  if (["construction", "sunrise", "purchaseOrder"].includes(styleId)) return "construction";
  if (["startup", "stripe", "quotation", "modernBlue", "pureBlue", "transparentBlue", "transparentLeaf", "transparentRose"].includes(styleId)) return "startup";
  if (["minimal", "mono", "monoBlack", "pureWhite", "slim", "sharp", "noLogoSlate"].includes(styleId)) return "minimal";
  return "corporate";
}

export function previewStructure(styleId: string): string {
  return FAMILY_LABELS[previewFamily(styleId)];
}
