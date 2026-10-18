import { loanReportSections, money, type LoanProjectInput } from "./loan-project";

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
const filename = (p: LoanProjectInput) => `${p.business.replace(/[^a-z0-9]+/gi, "-").slice(0, 60) || "business"}-loan-project-report`;

export async function exportLoanExcel(p: LoanProjectInput) {
  const { Workbook } = await import("exceljs");
  const workbook = new Workbook();
  workbook.creator = "InvoiceWala"; workbook.created = new Date();
  for (const section of loanReportSections(p)) {
    const sheet = workbook.addWorksheet(section.title.replace(/[\/*?:[\]]/g, "").slice(0, 31));
    sheet.addRow([section.title]); sheet.addRow(section.headers);
    for (const row of section.rows) sheet.addRow(row);
    sheet.views = [{ state: "frozen", ySplit: 2, xSplit: 1 }];
    sheet.columns.forEach((column, i) => { column.width = i === 0 ? 48 : section.headers.length === 2 ? 85 : 22; });
    sheet.eachRow((row, index) => {
      row.eachCell(cell => {
        cell.alignment = { vertical: "top", wrapText: true };
        if (typeof cell.value === "number") cell.numFmt = '#,##0.00;[Red](#,##0.00)';
        if (index <= 2) { cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F3447" } }; }
      });
      row.height = index <= 2 ? 28 : section.headers.length === 2 ? 48 : 30;
    });
    sheet.pageSetup = { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  }
  const notes = workbook.addWorksheet("Read me");
  notes.addRow(["Calculated snapshot: edit inputs in the generator and export again to recalculate."]);
  notes.getColumn(1).width = 110;
  const bytes = await workbook.xlsx.writeBuffer();
  download(new Blob([bytes as ArrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${filename(p)}.xlsx`);
}

export async function exportLoanPdf(p: LoanProjectInput) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const sections = loanReportSections(p);
  const left = 14, width = 269, bottom = 190;
  let y = 20;
  const heading = (title: string) => {
    doc.setFontSize(16); doc.setTextColor(15, 52, 71); doc.text(title, left, 15);
    doc.setFontSize(8); doc.setTextColor(70); doc.text("InvoiceWala | Business loan project report | User-supplied projections | INR", left, 22); y = 31;
  };
  // Built-in PDF fonts support Latin text. Keep entered Unicode legible via an embedded font when needed.
  if (/[\u0080-\uffff]/.test([p.business, p.owner, p.address, p.activity, p.purpose].join(""))) {
    throw new Error("For PDF, please enter business details in English / Roman Hindi. Excel supports Hindi text.");
  }
  sections.forEach((section, s) => {
    if (s) doc.addPage(); heading(section.title);
    const firstWidth = section.headers.length === 2 ? 96 : 79;
    const colWidth = (width - firstWidth) / (section.headers.length - 1);
    const drawRow = (row: (string | number)[], header = false) => {
      const lines = row.map((value, i) => doc.splitTextToSize(typeof value === "number" ? money(value) : value, (i === 0 ? firstWidth : colWidth) - 5) as string[]);
      const height = Math.max(9, ...lines.map(l => l.length * 4 + 4));
      if (y + height > bottom) { doc.addPage(); heading(`${section.title} (continued)`); }
      let x = left;
      doc.setFontSize(8); doc.setFont("helvetica", header ? "bold" : "normal");
      lines.forEach((line, i) => {
        const w = i === 0 ? firstWidth : colWidth;
        doc.setFillColor(header ? 225 : 248, header ? 237 : 250, header ? 243 : 252);
        doc.setDrawColor(215); doc.rect(x, y, w, height, "FD");
        doc.setTextColor(25); doc.text(line, x + 2, y + 5); x += w;
      }); y += height;
    };
    drawRow(section.headers, true); section.rows.forEach(row => drawRow(row));
  });
  for (let page = 1; page <= doc.getNumberOfPages(); page++) {
    doc.setPage(page); doc.setFontSize(8); doc.setTextColor(90);
    doc.text(`Planning report - not audited or certified. Review before bank submission. | ${page} / ${doc.getNumberOfPages()}`, left, 202);
  }
  doc.save(`${filename(p)}.pdf`);
}
