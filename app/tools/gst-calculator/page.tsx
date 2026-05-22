import type { Metadata } from "next";
import GstCalculatorClient from "./GstCalculatorClient";

export const metadata: Metadata = {
  title: "GST Calculator India | Inclusive, Exclusive, CGST, SGST, IGST",
  description:
    "Free GST calculator for India. Calculate inclusive or exclusive GST, split CGST/SGST or IGST, share results, download a breakdown and convert GST calculations into Ledgerly invoices.",
};

export default function GstCalculatorPage() {
  return <GstCalculatorClient />;
}
