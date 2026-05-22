import type { Metadata } from "next";
import './globals.css'
export const metadata: Metadata = {
  title: "Ledgerly Invoice Maker",
  description: "Modern invoice maker for teams, freelancers, and finance admins.",
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
