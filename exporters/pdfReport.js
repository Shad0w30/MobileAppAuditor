export function exportPDF(findings) {
  const doc = new jspdf.jsPDF();
  doc.text('Mobile App Security Report', 10, 10);
  findings.forEach((f, i) => {
    doc.text(`${i+1}. ${f.title} (${f.severity})`, 10, 20 + i * 10);
  });
  doc.save('report.pdf');
}
