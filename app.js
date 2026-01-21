import { renderFileTree } from "./fileExplorer.js";

const worker = new Worker("workers/scanWorker.js");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

worker.onmessage = (e) => {
  if (e.data.progress !== undefined) {
    const percent = Math.round((e.data.progress / e.data.total) * 100);
    progressBar.style.width = percent + "%";
    progressText.textContent =
      `Scanning ${e.data.progress} / ${e.data.total} checks`;
  }

  if (e.data.done) {
    renderFindings(e.data.findings);
    progressText.textContent = `Scan completed – ${e.data.findings.length} findings`;
  }
};

document.getElementById("fileInput").onchange = async (e) => {
  const file = e.target.files[0];
  const buffer = await file.arrayBuffer();

  progressBar.style.width = "0%";
  progressText.textContent = "Initializing scan…";

  const zip = await JSZip.loadAsync(buffer);
  renderFileTree(zip);

  worker.postMessage({ buffer });
};

function renderFindings(findings) {
  const el = document.getElementById("results");
  el.innerHTML = "";

  findings.forEach(f => {
    el.innerHTML += `
      <div class="issue ${f.severity.toLowerCase()}">
        <h3>${f.issue}</h3>
        <p>${f.description}</p>
        <b>File:</b> ${f.file}<br>
        <b>Location:</b> ${f.location}<br>
        <b>Evidence:</b> ${f.evidence}<br>
        <b>Severity:</b> ${f.severity}
      </div>
    `;
  });
}
