import { exportPDF } from "./report/pdfExport.js";

export function renderResults(findings) {
  const div = document.getElementById("results");
  div.innerHTML = "<h2>Findings</h2>";

  findings.forEach(f => {
    div.innerHTML += `
      <div class="${f.severity.toLowerCase()}">
        <b>${f.issue}</b><br/>
        Severity: ${f.severity}<br/>
        MASVS: ${f.category}<br/>
        File: ${f.file || "-"}
      </div><hr/>
    `;
  });

  const btn = document.createElement("button");
  btn.innerText = "Export PDF";
  btn.onclick = () => exportPDF(findings);
  div.appendChild(btn);
}
