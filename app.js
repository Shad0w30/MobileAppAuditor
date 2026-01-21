import { parseIPA } from './ipa/ipaParser.js';
import { renderFileTree } from './ipa/fileTree.js';
import { showFile } from './ipa/fileViewer.js';
import { runMASVSChecks } from './ipa/masvsChecks.js';
import { renderDashboard } from './ipa/dashboard.js';

document.getElementById('ipaInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const ipaData = await parseIPA(file);

  renderFileTree(
    ipaData.tree,
    (filePath) => showFile(filePath, ipaData.files)
  );

  document.getElementById('appDetails').textContent =
    JSON.stringify(ipaData.metadata, null, 2);

  const findings = runMASVSChecks(ipaData);
  renderDashboard(findings);
});
