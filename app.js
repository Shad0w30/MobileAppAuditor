import { renderFileTree } from "./analyzers/fileExplorer.js";
import { renderFindings } from "./analyzers/findingsRenderer.js";
import { exportHTML, exportPDF, exportSARIF } from "./analyzers/reportExporter.js";

const worker = new Worker("worker.js", { type: "module" });

const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let currentFindings = [];

fileInput.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  const zip = await JSZip.loadAsync(file);
  renderFileTree(zip);

  progressText.textContent = "Scanning…";
  progressBar.style.width = "5%";

  worker.postMessage({ type: "scan", zip });
});

worker.onmessage = e => {
  if (e.data.type === "progress") {
    progressBar.style.width = `${e.data.percent}%`;
    progressText.textContent = e.data.text;
  }

  if (e.data.type === "result") {
    currentFindings = e.data.findings;
    renderFindings(currentFindings);
    progressBar.style.width = "100%";
    progressText.textContent = "Scan complete";
  }
};

document.getElementById("exportHTML").onclick = () => exportHTML(currentFindings);
document.getElementById("exportPDF").onclick = () => exportPDF(currentFindings);
document.getElementById("exportSARIF").onclick = () => exportSARIF(currentFindings);
