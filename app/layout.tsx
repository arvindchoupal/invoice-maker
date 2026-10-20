import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { UserActivityTracker } from "@/components/UserActivityTracker";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import { ThemeToggle } from "@/components/ThemeToggle";
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
      suppressHydrationWarning
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3720143157916940"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-slate-50 text-slate-950 antialiased transition-colors duration-200 dark:bg-[#0b0f14] dark:text-slate-50">
        <Script id="invoicewala-theme" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('invoicewala-theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='system'}`}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WVY8QGQWCV" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WVY8QGQWCV');
          `}
        </Script>
        <AnalyticsEvents />
        <Suspense fallback={null}><UserActivityTracker /></Suspense>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
