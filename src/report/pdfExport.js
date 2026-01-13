export function exportPDF(findings) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("Mobile App Security Report", 10, 10);

  let y = 20;
  findings.forEach(f => {
    pdf.text(`${f.severity} - ${f.issue}`, 10, y);
    y += 8;
  });

  pdf.save("security-report.pdf");
}
