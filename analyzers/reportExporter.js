export function exportHTML(findings) {
  const html = `<html><body><pre>${JSON.stringify(findings, null, 2)}</pre></body></html>`;
  download("report.html", html);
}

export function exportPDF(findings) {
  const doc = new jspdf.jsPDF();
  doc.text(JSON.stringify(findings, null, 2), 10, 10);
  doc.save("report.pdf");
}

export function exportSARIF(findings) {
  const sarif = {
    version: "2.1.0",
    runs: [{ results: findings }]
  };
  download("report.sarif", JSON.stringify(sarif, null, 2));
}

function download(name, content) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content]));
  a.download = name;
  a.click();
}
