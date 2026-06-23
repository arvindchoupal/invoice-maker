import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/freelancer-invoice-guide",
        destination: "/blog/freelancer-invoice-template",
        permanent: true,
      },
      {
        source: "/blog/gst-bill-format-sample-invoice",
        destination: "/blog/gst-bill-format",
        permanent: true,
      },
      {
        source: "/blog/how-to-create-invoice-numbers",
        destination: "/tools/invoice-number-generator",
        permanent: true,
      },
      {
        source: "/blog/professional-quotation-format-india",
        destination: "/quotation-maker",
        permanent: true,
      },
      {
        source: "/blog/tax-invoice-format",
        destination: "/tax-invoice-format",
        permanent: true,
      },
      {
        source: "/blog/tax-invoice-format-rules-examples",
        destination: "/tax-invoice-format",
        permanent: true,
      },
      {
        source: "/gst-bill-format",
        destination: "/blog/gst-bill-format",
        permanent: true,
      },
      {
        source: "/online-invoice-maker",
        destination: "/free-invoice-generator",
        permanent: true,
      },
      {
        source: "/free-online-invoice-maker",
        destination: "/free-invoice-generator",
        permanent: true,
      },
      {
        source: "/gst-invoice-maker",
        destination: "/gst-invoice-generator",
        permanent: true,
      },
      {
        source: "/gst-calculator",
        destination: "/tools/gst-calculator",
        permanent: true,
      },
      {
        source: "/profit-margin-calculator",
        destination: "/tools/margin-calculator",
        permanent: true,
      },
      {
        source: "/invoice-number-generator",
        destination: "/tools/invoice-number-generator",
        permanent: true,
      },
      {
        source: "/pdf-to-invoice-ai",
        destination: "/tools/pdf-to-invoice-extractor",
        permanent: true,
      },
      {
        source: "/payment-reminder",
        destination: "/tools/payment-reminder-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
