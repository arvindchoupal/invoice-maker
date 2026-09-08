import type { Metadata } from "next";
import WeddingExperience from "./WeddingExperience";

export const metadata: Metadata = {
  title: "Kalam & Farhan — Wedding Invitation",
  description:
    "With the blessings of Allah, Kalam Ansari and Farhan Ansari invite you to celebrate their wedding in Kushinagar.",
  openGraph: {
    title: "Kalam & Farhan are getting married",
    description: "4 November 2026 · Kasia, Kushinagar",
    images: [
      {
        url: "/wedding/couple-portrait.png",
        width: 1066,
        height: 1600,
        alt: "Kalam and Farhan wedding portrait",
      },
    ],
  },
};

export default function WeddingPage() {
  return <WeddingExperience />;
}
