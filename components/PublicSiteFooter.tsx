import { PublicFooterLinks } from "@/components/PublicFooterLinks";

export function PublicSiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 text-sm text-slate-400">
        <div className="max-w-xl">
          <p className="text-lg font-semibold text-slate-100">InvoiceWala</p>
          <p className="mt-2 leading-6">Create GST-ready invoices, share professional PDFs and track payments without accounting complexity.</p>
        </div>
        <PublicFooterLinks />
      </div>
    </footer>
  );
}
