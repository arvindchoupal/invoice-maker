import { ImageResponse } from "next/og";
import { seoPageBySlug } from "@/lib/seo-pages";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const imageSlug = slug.endsWith(".png") ? slug.slice(0, -4) : slug;
  const page = seoPageBySlug(imageSlug);

  if (!page) {
    return new Response("Image not found", { status: 404 });
  }

  const rows = [
    [page.primaryKeyword, "₹12,000"],
    [page.secondaryKeywords[0] ?? "GST-ready invoice", "₹8,500"],
    [page.secondaryKeywords[1] ?? "PDF invoice format", "₹4,000"],
  ];
  const subtotal = 24500;
  const gst = 4410;
  const total = subtotal + gst;
  const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        color: "#0f172a",
        padding: "74px 82px 62px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 42, borderBottom: "3px solid #e2e8f0" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 82, height: 82, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 22, background: "#2563eb", color: "white", fontSize: 30, fontWeight: 900 }}>IW</div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 24 }}>
              <div style={{ display: "flex", fontSize: 34, fontWeight: 900 }}>InvoiceWala</div>
              <div style={{ display: "flex", marginTop: 8, fontSize: 20, color: "#64748b" }}>GST-ready invoice sample</div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 20, lineHeight: 1.5, color: "#64748b" }}>
            GSTIN: 00AAAAA0000A0Z0 · India-focused invoice format
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 52, lineHeight: 1, fontWeight: 900, color: "#2563eb", letterSpacing: 1 }}>INVOICE</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 22, fontWeight: 800 }}>IW-{imageSlug.slice(0, 16).toUpperCase()}</div>
          <div style={{ display: "flex", marginTop: 9, fontSize: 19, color: "#64748b" }}>PDF preview</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "44px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "52%" }}>
          <div style={{ display: "flex", fontSize: 16, fontWeight: 800, letterSpacing: 3, color: "#94a3b8" }}>PAGE TOPIC</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 34, lineHeight: 1.18, fontWeight: 900 }}>{page.h1}</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 19, lineHeight: 1.45, color: "#64748b" }}>{page.primaryKeyword}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "42%" }}>
          <div style={{ display: "flex", fontSize: 16, fontWeight: 800, letterSpacing: 3, color: "#94a3b8" }}>BILL TO</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 26, fontWeight: 800, textAlign: "right" }}>Sample Customer</div>
          <div style={{ display: "flex", marginTop: 10, fontSize: 18, color: "#64748b" }}>GST-ready business billing</div>
        </div>
      </div>

      <div style={{ display: "flex", background: "#0f172a", color: "white", padding: "18px 22px", fontSize: 17, fontWeight: 800, letterSpacing: 1 }}>
        <div style={{ display: "flex", width: "70%" }}>DESCRIPTION</div>
        <div style={{ display: "flex", width: "30%", justifyContent: "flex-end" }}>AMOUNT</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map(([label, amount]) => (
          <div key={label} style={{ display: "flex", minHeight: 112, alignItems: "center", borderBottom: "2px solid #e2e8f0", padding: "20px 22px" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 800 }}>{label}</div>
              <div style={{ display: "flex", marginTop: 8, fontSize: 18, color: "#64748b" }}>Sample line item for this invoice guide</div>
            </div>
            <div style={{ display: "flex", width: "30%", justifyContent: "flex-end", fontSize: 24, fontWeight: 800 }}>{amount}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 38 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 430 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "#64748b" }}><div style={{ display: "flex" }}>Subtotal</div><div style={{ display: "flex" }}>{money(subtotal)}</div></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontSize: 21, color: "#64748b" }}><div style={{ display: "flex" }}>GST 18%</div><div style={{ display: "flex" }}>{money(gst)}</div></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 24, borderTop: "3px solid #0f172a", fontSize: 34, fontWeight: 900 }}><div style={{ display: "flex" }}>Total</div><div style={{ display: "flex" }}>{money(total)}</div></div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", paddingTop: 38, borderTop: "2px solid #e2e8f0" }}>
        <div style={{ display: "flex", fontSize: 19, fontWeight: 800 }}>InvoiceWala sample image</div>
        <div style={{ display: "flex", marginTop: 10, fontSize: 18, lineHeight: 1.5, color: "#64748b" }}>Illustrative invoice preview for {page.primaryKeyword}. Replace all sample values before sending a real invoice.</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, fontSize: 16, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>{imageSlug}.png</div>
          <div style={{ display: "flex", fontWeight: 900, color: "#2563eb" }}>invoicewala.shop</div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 1500,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
        "Content-Disposition": `inline; filename="${imageSlug}.png"`,
      },
    },
  );
}
