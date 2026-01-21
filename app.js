import { renderFileTree } from "./analyzers/fileExplorer.js";
import { renderFindings } from "./analyzers/findingsUI.js";

const input = document.getElementById("fileInput");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

/**
 * IMPORTANT:
 * ❌ DO NOT use { type: "module" }
 * This MUST be a classic worker
 */
const worker = new Worker("worker.js");

worker.onmessage = e => {
  const { type, data } = e.data;

  if (type === "progress") {
    progressText.textContent = data.text;
    progressBar.value = data.value;
  }

  if (type === "result") {
    renderFileTree(data.files);
    renderFindings(data.findings);
    progressText.textContent = "Scan complete";
    progressBar.value = 100;
  }
};

input.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  progressText.textContent = "Reading file...";
  progressBar.value = 5;

  // ✅ ArrayBuffer is cloneable
  const buffer = await file.arrayBuffer();

  worker.postMessage({
    filename: file.name,
    buffer
  });
});
