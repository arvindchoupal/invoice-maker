"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

const fieldClass = "mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-cyan-300/60";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-400";

export default function WorkCompletionCertificateClient() {
  const [data, setData] = useState({
    certificateNumber: "WCC-2026-001",
    issueDate: new Date().toISOString().slice(0, 10),
    client: "Client / Company Name",
    clientAddress: "Client address",
    contractor: "Your Business / Contractor Name",
    project: "Project or service name",
    reference: "Quotation / work order reference",
    startDate: "",
    completionDate: new Date().toISOString().slice(0, 10),
    location: "Project location",
    scope: "Describe the work completed, deliverables supplied and any agreed milestones.",
    remarks: "The work has been completed in accordance with the agreed scope, subject to the observations recorded above.",
    signatory: "Authorized client representative",
    designation: "Designation",
  });

  function update(key: keyof typeof data, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function downloadPdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setDrawColor(34, 211, 238);
    doc.setLineWidth(1.2);
    doc.rect(10, 10, 190, 277);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("WORK COMPLETION CERTIFICATE", 105, 28, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Certificate no: ${data.certificateNumber || "-"}`, 18, 42);
    doc.text(`Issue date: ${data.issueDate || "-"}`, 192, 42, { align: "right" });
    doc.setDrawColor(220);
    doc.line(18, 48, 192, 48);

    doc.setFontSize(11);
    const introduction = `This is to certify that ${data.contractor || "the contractor"} completed the work described below for ${data.client || "the client"}.`;
    doc.text(introduction, 18, 60, { maxWidth: 174, lineHeightFactor: 1.5 });
    let y = 78;
    const row = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 18, y);
      doc.setFont("helvetica", "normal");
      doc.text(value || "-", 62, y, { maxWidth: 126 });
      y += 10;
    };
    row("Client", data.client);
    row("Client address", data.clientAddress);
    row("Project / service", data.project);
    row("Reference", data.reference);
    row("Location", data.location);
    row("Start date", data.startDate);
    row("Completion date", data.completionDate);

    doc.setFont("helvetica", "bold");
    doc.text("Completed scope", 18, y + 4);
    doc.setFont("helvetica", "normal");
    const scopeLines = doc.splitTextToSize(data.scope || "-", 174);
    doc.text(scopeLines, 18, y + 12, { lineHeightFactor: 1.45 });
    y += 18 + scopeLines.length * 5;
    doc.setFont("helvetica", "bold");
    doc.text("Completion statement", 18, y);
    doc.setFont("helvetica", "normal");
    const remarkLines = doc.splitTextToSize(data.remarks || "-", 174);
    doc.text(remarkLines, 18, y + 8, { lineHeightFactor: 1.45 });

    doc.line(18, 245, 80, 245);
    doc.line(130, 245, 192, 245);
    doc.setFontSize(9);
    doc.text(data.contractor || "Contractor", 18, 251);
    doc.text("Contractor / service provider", 18, 257);
    doc.text(data.signatory || "Client representative", 130, 251);
    doc.text(data.designation || "Designation", 130, 257);
    doc.setTextColor(90);
    doc.setFontSize(8);
    doc.text("Generated with InvoiceWala. Both parties should verify the scope and sign only after confirming actual completion.", 105, 277, { align: "center", maxWidth: 170 });
    doc.save(`${(data.certificateNumber || "work-completion-certificate").replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}.pdf`);
  }

  const fields: Array<[keyof typeof data, string, string?]> = [
    ["certificateNumber", "Certificate number"], ["issueDate", "Issue date", "date"], ["client", "Client / company"], ["clientAddress", "Client address"], ["contractor", "Contractor / service provider"], ["project", "Project / service"], ["reference", "Quotation / work order reference"], ["location", "Project location"], ["startDate", "Start date", "date"], ["completionDate", "Completion date", "date"], ["signatory", "Client signatory"], ["designation", "Designation"],
  ];

  return <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6" id="completion-certificate-tool"><div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]"><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Certificate builder</p><h2 className="mt-3 text-3xl font-semibold">Record the completed work</h2></div><button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-200" onClick={downloadPdf} type="button"><Download className="h-4 w-4" />Download PDF</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{fields.map(([key, label, type]) => <label key={key}><span className={labelClass}>{label}</span><input className={fieldClass} type={type || "text"} value={data[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div><label className="mt-5 block"><span className={labelClass}>Completed scope</span><textarea className={`${fieldClass} min-h-32 py-3`} value={data.scope} onChange={(event) => update("scope", event.target.value)} /></label><label className="mt-5 block"><span className={labelClass}>Completion statement / observations</span><textarea className={`${fieldClass} min-h-28 py-3`} value={data.remarks} onChange={(event) => update("remarks", event.target.value)} /></label></div><aside className="lg:sticky lg:top-6 lg:self-start"><div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4"><div className="min-h-[620px] rounded-3xl border-4 border-cyan-700 bg-white p-7 text-slate-950 shadow-2xl"><h3 className="text-center text-2xl font-bold tracking-wide">WORK COMPLETION CERTIFICATE</h3><div className="mt-5 flex justify-between text-xs text-slate-500"><span>{data.certificateNumber}</span><span>{data.issueDate}</span></div><p className="mt-8 text-sm leading-7">This is to certify that <strong>{data.contractor}</strong> completed <strong>{data.project}</strong> for <strong>{data.client}</strong>.</p><dl className="mt-6 grid grid-cols-[130px_1fr] gap-y-3 text-sm"><dt className="font-semibold">Reference</dt><dd>{data.reference}</dd><dt className="font-semibold">Location</dt><dd>{data.location}</dd><dt className="font-semibold">Completion date</dt><dd>{data.completionDate}</dd></dl><div className="mt-7 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase text-slate-400">Completed scope</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6">{data.scope}</p></div><p className="mt-6 text-sm leading-6 text-slate-600">{data.remarks}</p><div className="mt-16 grid grid-cols-2 gap-8 text-xs"><div className="border-t border-slate-400 pt-2">Contractor / service provider</div><div className="border-t border-slate-400 pt-2">{data.signatory}<br />{data.designation}</div></div></div></div></aside></div></section>;
}
