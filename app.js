import { yaraRules } from "./rules/yaraRules.js";
import { exportSARIF } from "./exporters/sarifExporter.js";
import { exportHTML } from "./exporters/htmlReport.js";

const worker = new Worker("./workers/scanWorker.js");

document.getElementById("fileInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  document.getElementById("status").textContent = "Scanning...";

  const buffer = await file.arrayBuffer();
  worker.postMessage({ fileBuffer: buffer, rules: yaraRules });

  worker.onmessage = (event) => {
    const findings = event.data;
    document.getElementById("status").textContent =
      `Scan completed: ${findings.length} findings`;

    renderResults(findings);

    // Optional exports
    window.exportSARIF = () => exportSARIF(findings);
    window.exportHTML = () => exportHTML(findings);
  };
});

function renderResults(findings) {
  const el = document.getElementById("results");
  el.innerHTML = "<h2>Findings</h2>";

  if (!findings.length) {
    el.innerHTML += "<p>No issues detected.</p>";
    return;
  }

  findings.forEach(f => {
    el.innerHTML += `
      <div class="issue">
        <b>${f.ruleId}</b><br>
        File: ${f.file}<br>
        Severity: ${f.severity}<br>
        MASVS: ${f.masvs}<br>
        ${f.message}
      </div>
    `;
  });
}
