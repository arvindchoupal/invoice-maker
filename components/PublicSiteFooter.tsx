import Link from "next/link";
import { PublicFooterLinks } from "@/components/PublicFooterLinks";

const footerSeoLinks = [
  ["/free-invoice-generator", "Free invoice generator"],
  ["/gst-invoice-generator", "GST invoice generator"],
  ["/freelancer-invoice-generator", "Freelancer invoice"],
  ["/contractor-invoice-generator", "Contractor invoice"],
  ["/receipt-generator", "Receipt generator"],
  ["/purchase-order-generator", "Purchase order generator"],
  ["/tools/pdf-to-invoice-extractor", "PDF to invoice AI"],
];

export function PublicSiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 text-sm text-slate-400">
        <div>
          <p>InvoiceWala · invoicewala.shop</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {footerSeoLinks.map(([href, label]) => (
              <Link className="hover:text-white" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <PublicFooterLinks />
      </div>
    </footer>
  );
}
