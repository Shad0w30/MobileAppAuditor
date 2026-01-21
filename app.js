import { exploreZip } from './analyzers/fileExplorer.js';
import { analyzeAPK } from './analyzers/apkAnalyzer.js';
import { analyzeIPA } from './analyzers/ipaAnalyzer.js';
import { analyzeGeneric } from './analyzers/genericAnalyzer.js';

document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  document.getElementById('status').textContent = 'Processing...';

  const zip = await JSZip.loadAsync(file);
  exploreZip(zip);

  let findings = [];
  if (file.name.endsWith('.apk')) findings = await analyzeAPK(zip);
  else if (file.name.endsWith('.ipa')) findings = await analyzeIPA(zip);
  else findings = await analyzeGeneric(zip);

  renderFindings(findings);
});

function renderFindings(findings) {
  const el = document.getElementById('results');
  el.innerHTML = '<h2>Findings</h2>';
  findings.forEach(f => {
    el.innerHTML += `<div class="issue"><b>${f.title}</b><br>${f.detail}</div>`;
  });
}
