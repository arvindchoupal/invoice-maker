import { ArrowRight, CheckCircle2, Clock3, Download, FileText, LayoutDashboard, Search, Settings, Users } from "lucide-react";

export function HeroDesktopWorkspace() {
  return <div className="desktop-workspace">
    <aside className="workspace-sidebar">
      <div className="workspace-brand"><span>IW</span>InvoiceWala</div>
      <p className="workspace-overline">WORKSPACE</p>
      {[[LayoutDashboard,"Overview"],[FileText,"Invoices"],[Users,"Customers"],[Clock3,"Payments"]].map(([Icon,label])=>{const NavIcon=Icon as typeof FileText;return <div key={String(label)} className={`workspace-nav ${label === "Invoices" ? "selected" : ""}`}><NavIcon size={17}/>{String(label)}{label === "Invoices" && <span>24</span>}</div>})}
      <div className="workspace-tip"><span>YOUR BUSINESS, ORGANIZED</span><b>Make room for great work.</b><p>Invoices, customers and payments in one place.</p><div>Explore your tools <ArrowRight size={12}/></div></div>
      <div className="workspace-account"><span>NS</span><div><b>Northstar Studio</b><p>Business workspace</p></div><Settings size={15}/></div>
    </aside>
    <div className="workspace-main">
      <header className="workspace-topbar"><span>Workspace <span>/</span> Invoices <span>/</span> <b>INV-0024</b></span><div><Search size={15}/><span className="workspace-avatar">NS</span></div></header>
      <div className="workspace-body">
        <div className="workspace-title"><div><p>INVOICES / PREVIEW</p><h3>Every detail, ready to send.</h3></div><span><CheckCircle2 size={12}/>All changes saved</span></div>
        <div className="workspace-metrics"><div><span>Invoice amount</span><b>₹29,500<span> INR</span></b></div><div><span>Payment status</span><b className="workspace-pending">● Awaiting payment</b></div><div><span>Due date</span><b>24 Oct 2026</b></div></div>
        <div className="workspace-document-toolbar"><div><FileText size={16}/><b>Invoice preview</b><span>INV-0024</span></div><div><span><Download size={13}/>Download PDF</span><b className="workspace-send">Send invoice <ArrowRight size={13}/></b></div></div>
        <article className="workspace-paper">
          <div className="workspace-paper-heading"><div className="workspace-studio"><span>NS</span><div><b>Northstar Studio</b><p>Design that moves your business forward.</p></div></div><div><h4>INVOICE</h4><p>#INV-0024</p></div></div>
          <div className="workspace-addresses"><div><label>BILLED TO</label><b>Aarav Enterprises</b><p>New Delhi, India</p><p>GSTIN: 07ABCDE1234F1Z5</p></div><div><label>ISSUED BY</label><b>Northstar Studio</b><p>New Delhi, India</p><p>Issued 10 Oct 2026 · Due 24 Oct 2026</p></div></div>
          <table><thead><tr><th>DESCRIPTION</th><th>QTY</th><th>RATE</th><th>AMOUNT</th></tr></thead><tbody><tr><td><b>Website design & development</b><p>Design, development and project delivery</p></td><td>1</td><td>₹25,000</td><td>₹25,000</td></tr></tbody></table>
          <div className="workspace-paper-bottom"><div><label>PAYMENT TERMS</label><p>Payment due within 14 days.</p><p>Thank you for choosing Northstar Studio.</p><span><CheckCircle2 size={12}/>GST-ready invoice</span></div><div className="workspace-totals"><p><span>Subtotal</span><b>₹25,000</b></p><p><span>GST · 18%</span><b>₹4,500</b></p><div><span>Total payable <small>INR</small></span><strong>₹29,500</strong></div></div></div>
        </article>
        <div className="workspace-footnote"><CheckCircle2 size={12}/>Your invoice is ready to download and share.<span>Sample invoice preview</span></div>
      </div>
    </div>
  </div>;
}
