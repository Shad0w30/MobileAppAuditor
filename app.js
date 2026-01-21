import { yaraRules } from './rules/yaraRules.js';
import { exportSARIF } from './exporters/sarifExporter.js';

const worker = new Worker('./workers/scanWorker.js');

document.getElementById('fileInput').onchange = async e => {
  const file = e.target.files[0];
  const buffer = await file.arrayBuffer();

  worker.postMessage({ fileBuffer: buffer, rules: yaraRules });

  worker.onmessage = e => {
    const findings = e.data;
    console.log('Findings:', findings);

    const sarif = exportSARIF(findings);
    console.log('SARIF:', sarif);
  };
};
