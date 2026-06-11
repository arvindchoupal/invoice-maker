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
    ];
  },
};

export default nextConfig;
