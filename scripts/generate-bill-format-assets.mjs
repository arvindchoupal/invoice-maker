import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.join(process.cwd(), "public", "bill-formats");

const templates = [
  { slug: "simple-bill-format", accent: "#2563eb", soft: "#eff6ff", title: "BILL", business: "Sharma General Store", number: "BILL-2026-0142", customer: "Rohit Verma", items: [["Office notebooks", "4", "₹180", "₹720"], ["Blue ball pens", "10", "₹20", "₹200"], ["Packing tape", "2", "₹90", "₹180"]], subtotal: "₹1,100", tax: "No tax applied", total: "₹1,100" },
  { slug: "gst-bill-format", accent: "#059669", soft: "#ecfdf5", title: "TAX INVOICE", business: "Patel Mobile Shop", number: "PMS/2026/0307", customer: "Priya Mehta", items: [["Smartphone 128 GB", "1", "₹75,000", "₹75,000"], ["Tempered glass", "1", "₹850", "₹850"], ["20W charger", "1", "₹2,130", "₹2,130"]], subtotal: "₹77,980", tax: "GST 18% · ₹14,036", total: "₹92,016" },
  { slug: "service-bill-format", accent: "#7c3aed", soft: "#f5f3ff", title: "SERVICE INVOICE", business: "Anjali Design Studio", number: "ADS/2026/0042", customer: "Bright Bites Café", items: [["Logo design — 3 concepts", "1", "₹32,000", "₹32,000"], ["Brand identity guide", "1", "₹24,000", "₹24,000"], ["Design consulting", "6 hrs", "₹1,500", "₹9,000"]], subtotal: "₹65,000", tax: "GST 18% · ₹11,700", total: "₹76,700" },
  { slug: "retail-shop-bill-format", accent: "#dc2626", soft: "#fef2f2", title: "RETAIL BILL", business: "Kumar Fashion House", number: "KFH-1048", customer: "Neha Singh", items: [["Cotton shirt", "2", "₹1,250", "₹2,500"], ["Denim jeans", "1", "₹2,400", "₹2,400"], ["Leather belt", "1", "₹950", "₹950"]], subtotal: "₹5,850", tax: "GST 5% · ₹292.50", total: "₹6,142.50" },
  { slug: "bill-book-format", accent: "#111827", soft: "#f3f4f6", title: "CASH MEMO", business: "Mahadev Hardware", number: "MH/26/0087", customer: "Amit Construction", items: [["Wall paint 20 L", "2", "₹4,800", "₹9,600"], ["Paint roller set", "3", "₹460", "₹1,380"], ["Primer 10 L", "1", "₹2,650", "₹2,650"]], subtotal: "₹13,630", tax: "Paid by UPI", total: "₹13,630" },
  { slug: "freelancer-bill-format", accent: "#0891b2", soft: "#ecfeff", title: "INVOICE", business: "Arjun Web Studio", number: "AWS/FY26/0019", customer: "Northstar Labs", items: [["Website development", "1", "₹45,000", "₹45,000"], ["Performance optimisation", "1", "₹12,000", "₹12,000"], ["Maintenance support", "1 mo", "₹8,000", "₹8,000"]], subtotal: "₹65,000", tax: "GST 18% · ₹11,700", total: "₹76,700" },
];

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function templateSvg(template) {
  const rows = template.items.map((item, index) => {
    const y = 760 + index * 105;
    return `<g font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#334155">
      <text x="105" y="${y}">${escapeXml(item[0])}</text>
      <text x="700" y="${y}" text-anchor="middle">${escapeXml(item[1])}</text>
      <text x="865" y="${y}" text-anchor="end">${escapeXml(item[2])}</text>
      <text x="1090" y="${y}" text-anchor="end" font-weight="700">${escapeXml(item[3])}</text>
      <line x1="90" y1="${y + 38}" x2="1110" y2="${y + 38}" stroke="#e2e8f0"/>
    </g>`;
  }).join("");

  return `<svg width="1200" height="1698" viewBox="0 0 1200 1698" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="1698" fill="#ffffff"/>
    <rect width="1200" height="26" fill="${template.accent}"/>
    <rect x="68" y="76" width="1064" height="1546" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
    <rect x="92" y="100" width="1016" height="282" rx="18" fill="${template.soft}"/>
    <rect x="108" y="119" width="74" height="74" rx="18" fill="${template.accent}"/>
    <text x="145" y="168" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800" fill="#ffffff">IW</text>
    <text x="108" y="244" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800" fill="#0f172a">${escapeXml(template.business)}</text>
    <text x="108" y="282" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#64748b">GSTIN: 27ABCDE1234F1Z5 · Mumbai, Maharashtra</text>
    <text x="108" y="318" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#64748b">hello@business.example · +91 98765 43210</text>
    <text x="1080" y="172" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="49" font-weight="900" fill="${template.accent}">${escapeXml(template.title)}</text>
    <text x="1080" y="224" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#0f172a">${escapeXml(template.number)}</text>
    <text x="1080" y="264" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#64748b">Issue date · 10 Oct 2026</text>
    <text x="1080" y="300" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#64748b">Due date · 17 Oct 2026</text>

    <text x="96" y="462" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="800" letter-spacing="2" fill="${template.accent}">BILL TO</text>
    <text x="96" y="510" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="800" fill="#0f172a">${escapeXml(template.customer)}</text>
    <text x="96" y="550" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#64748b">Customer address · India</text>
    <text x="1100" y="462" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="800" letter-spacing="2" fill="${template.accent}">PAYMENT</text>
    <text x="1100" y="510" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#0f172a">UPI / Bank transfer</text>
    <text x="1100" y="550" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#64748b">Terms · Due within 7 days</text>

    <rect x="90" y="642" width="1020" height="72" rx="10" fill="${template.accent}"/>
    <g font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="#ffffff">
      <text x="108" y="687">DESCRIPTION</text>
      <text x="700" y="687" text-anchor="middle">QTY</text>
      <text x="865" y="687" text-anchor="end">RATE</text>
      <text x="1090" y="687" text-anchor="end">AMOUNT</text>
    </g>
    ${rows}

    <rect x="674" y="1120" width="436" height="254" rx="18" fill="${template.soft}"/>
    <g font-family="Arial, Helvetica, sans-serif" fill="#334155">
      <text x="710" y="1176" font-size="22">Subtotal</text><text x="1075" y="1176" text-anchor="end" font-size="23" font-weight="700">${escapeXml(template.subtotal)}</text>
      <text x="710" y="1230" font-size="22">${escapeXml(template.tax)}</text>
      <line x1="710" y1="1262" x2="1075" y2="1262" stroke="${template.accent}" stroke-width="2"/>
      <text x="710" y="1324" font-size="25" font-weight="800">TOTAL</text><text x="1075" y="1324" text-anchor="end" font-size="34" font-weight="900" fill="${template.accent}">${escapeXml(template.total)}</text>
    </g>

    <text x="96" y="1180" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="800" letter-spacing="2" fill="${template.accent}">NOTES</text>
    <text x="96" y="1230" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#475569">Thank you for your business.</text>
    <text x="96" y="1270" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#475569">Please mention the bill number while paying.</text>

    <rect x="92" y="1458" width="1016" height="120" rx="18" fill="#f8fafc"/>
    <text x="120" y="1510" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="800" fill="#0f172a">PAYMENT DETAILS</text>
    <text x="120" y="1548" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#64748b">UPI: business@upi · Bank: XXXX 4821 · IFSC: INVB0000123</text>
    <text x="1080" y="1530" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${template.accent}">InvoiceWala sample</text>
  </svg>`;
}

await fs.mkdir(outputDir, { recursive: true });

for (const template of templates) {
  const outputPath = path.join(outputDir, `${template.slug}.webp`);
  await sharp(Buffer.from(templateSvg(template)))
    .resize(1200, 1698, { fit: "fill" })
    .webp({ quality: 92, smartSubsample: true })
    .toFile(outputPath);
  console.log(outputPath);
}
