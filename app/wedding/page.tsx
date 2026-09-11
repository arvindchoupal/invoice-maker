import type { Metadata } from "next";
import WeddingExperience from "./WeddingExperience";

export const metadata: Metadata = {
  title: "Kalam & Farhan — Wedding Invitation",
  description:
    "With the blessings of Allah, Kalam Ansari and Farhan Ansari invite you to celebrate their wedding in Kushinagar.",
  openGraph: {
    title: "Kalam & Farhan are getting married",
    description: "4 November 2026 · Kasia, Kushinagar",
    type: "website",
    images: [
      {
        url: "/wedding/hero-wedding.jpg",
        width: 1145,
        height: 1374,
        alt: "Kalam and Farhan wedding portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalam & Farhan are getting married",
    description: "4 November 2026 · Kasia, Kushinagar",
    images: ["/wedding/hero-wedding.jpg"],
  },
};

export default function WeddingPage() {
  return <WeddingExperience />;
}
