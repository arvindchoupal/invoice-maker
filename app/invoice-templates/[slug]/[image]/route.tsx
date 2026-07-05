import { ImageResponse } from "next/og";
import { getInvoiceTemplatePage } from "@/lib/invoice-template-pages";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; image: string }> },
) {
  const { slug, image } = await params;
  const page = getInvoiceTemplatePage(slug);

  if (!page || image !== `${slug}.png`) {
    return new Response("Image not found", { status: 404 });
  }

  const subtotal = page.sampleItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
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
        padding: "78px 82px 62px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 46, borderBottom: "3px solid #e2e8f0" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 82, height: 82, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 22, background: "#2563eb", color: "white", fontSize: 30, fontWeight: 900 }}>IW</div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 24 }}>
              <div style={{ display: "flex", fontSize: 34, fontWeight: 900 }}>{page.sampleBusiness}</div>
              <div style={{ display: "flex", marginTop: 8, fontSize: 20, color: "#64748b" }}>GST-ready sample invoice</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 30, fontSize: 20, lineHeight: 1.5, color: "#64748b" }}>
            <div style={{ display: "flex" }}>Sample business address · India</div>
            <div style={{ display: "flex", marginTop: 4 }}>GSTIN: 00AAAAA0000A0Z0</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 56, lineHeight: 1, fontWeight: 900, color: "#2563eb", letterSpacing: 1 }}>INVOICE</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 22, fontWeight: 700 }}>INV-SAMPLE-001</div>
          <div style={{ display: "flex", marginTop: 9, fontSize: 19, color: "#64748b" }}>Issue date: 05 Jul 2026</div>
          <div style={{ display: "flex", marginTop: 7, fontSize: 19, color: "#64748b" }}>Due date: 12 Jul 2026</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "48px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "48%" }}>
          <div style={{ display: "flex", fontSize: 16, fontWeight: 800, letterSpacing: 3, color: "#94a3b8" }}>BILL TO</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 29, fontWeight: 850 }}>{page.sampleCustomer}</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 10, fontSize: 19, lineHeight: 1.5, color: "#64748b" }}>
            <div style={{ display: "flex" }}>Sample customer address</div>
            <div style={{ display: "flex", marginTop: 3 }}>India</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "48%" }}>
          <div style={{ display: "flex", fontSize: 16, fontWeight: 800, letterSpacing: 3, color: "#94a3b8" }}>BILLING MODEL</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 25, fontWeight: 750, textAlign: "right" }}>{page.billingModel}</div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 18, color: "#64748b" }}>{page.profession} service</div>
        </div>
      </div>

      <div style={{ display: "flex", background: "#0f172a", color: "white", padding: "18px 22px", fontSize: 17, fontWeight: 800, letterSpacing: 1 }}>
        <div style={{ display: "flex", width: "70%" }}>DESCRIPTION</div>
        <div style={{ display: "flex", width: "30%", justifyContent: "flex-end" }}>AMOUNT</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {page.sampleItems.map((item) => (
          <div key={item.name} style={{ display: "flex", minHeight: 122, alignItems: "center", borderBottom: "2px solid #e2e8f0", padding: "22px" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
              <div style={{ display: "flex", fontSize: 25, fontWeight: 800 }}>{item.name}</div>
              <div style={{ display: "flex", marginTop: 9, fontSize: 19, color: "#64748b" }}>{item.detail}</div>
            </div>
            <div style={{ display: "flex", width: "30%", justifyContent: "flex-end", fontSize: 25, fontWeight: 800 }}>{money(item.amount)}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 42 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 430 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "#64748b" }}><div style={{ display: "flex" }}>Subtotal</div><div style={{ display: "flex" }}>{money(subtotal)}</div></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontSize: 21, color: "#64748b" }}><div style={{ display: "flex" }}>Sample GST (18%)</div><div style={{ display: "flex" }}>{money(tax)}</div></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 24, borderTop: "3px solid #0f172a", fontSize: 34, fontWeight: 900 }}><div style={{ display: "flex" }}>Total</div><div style={{ display: "flex" }}>{money(total)}</div></div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", paddingTop: 40, borderTop: "2px solid #e2e8f0" }}>
        <div style={{ display: "flex", fontSize: 19, fontWeight: 800 }}>Payment terms</div>
        <div style={{ display: "flex", marginTop: 10, fontSize: 18, lineHeight: 1.5, color: "#64748b" }}>Payment due within 7 days. This is a sample format; replace all details and confirm the applicable GST treatment.</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 34, fontSize: 16, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>Sample {page.profession.toLowerCase()} invoice template</div>
          <div style={{ display: "flex", fontWeight: 800, color: "#2563eb" }}>Created with InvoiceWala</div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 1500,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
        "Content-Disposition": `inline; filename="${page.slug}.png"`,
      },
    },
  );
}
