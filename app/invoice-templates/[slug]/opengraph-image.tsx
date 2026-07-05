import { ImageResponse } from "next/og";
import { getInvoiceTemplatePage } from "@/lib/invoice-template-pages";

export const alt = "Profession-specific InvoiceWala invoice template preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = getInvoiceTemplatePage((await params).slug);
  const profession = page?.profession ?? "Business";
  const billingModel = page?.billingModel ?? "Services and materials";
  const items = page?.sampleItems ?? [];
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#020617", color: "white", padding: 54, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "52%", justifyContent: "center", paddingRight: 45 }}>
        <div style={{ display: "flex", color: "#67e8f9", fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>INVOICEWALA TEMPLATE</div>
        <div style={{ display: "flex", fontSize: 58, lineHeight: 1.08, fontWeight: 800, marginTop: 22 }}>{profession} Invoice Template</div>
        <div style={{ display: "flex", color: "#94a3b8", fontSize: 25, lineHeight: 1.4, marginTop: 24 }}>{billingModel} · GST-ready format · PDF invoice</div>
        <div style={{ display: "flex", marginTop: 35, background: "#67e8f9", color: "#082f49", borderRadius: 14, padding: "14px 24px", fontSize: 22, fontWeight: 800, alignSelf: "flex-start" }}>invoicewala.shop</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "48%", background: "white", color: "#0f172a", borderRadius: 28, padding: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #e2e8f0", paddingBottom: 20 }}>
          <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontSize: 21, fontWeight: 800 }}>{page?.sampleBusiness}</div><div style={{ display: "flex", fontSize: 14, color: "#64748b", marginTop: 5 }}>Sample invoice</div></div>
          <div style={{ display: "flex", fontSize: 31, fontWeight: 900, color: "#2563eb" }}>INVOICE</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, background: "#0f172a", color: "white", padding: "11px 14px", fontSize: 14, fontWeight: 700 }}><div style={{ display: "flex" }}>DESCRIPTION</div><div style={{ display: "flex" }}>AMOUNT</div></div>
        {items.slice(0, 3).map((item) => <div key={item.name} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", padding: "16px 12px", fontSize: 16 }}><div style={{ display: "flex" }}>{item.name}</div><div style={{ display: "flex", fontWeight: 700 }}>₹{item.amount.toLocaleString("en-IN")}</div></div>)}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22, fontSize: 25, fontWeight: 900 }}>Sample total&nbsp; ₹{total.toLocaleString("en-IN")}</div>
      </div>
    </div>,
    size,
  );
}
