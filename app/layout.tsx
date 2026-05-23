import type { Metadata } from "next";
import './globals.css'
export const metadata: Metadata = {
  title: "InvoiceWala — GST invoices & billing",
  description:
    "Create GST invoices, track payments, import bills, and manage clients. Built for Indian businesses at invoicewala.shop.",
  metadataBase: new URL("https://invoicewala.shop"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-slate-50 text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50">{children}</body>
    </html>
  );
}
