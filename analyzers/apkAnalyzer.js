import { scanCrypto } from './cryptoScanner.js';

export async function analyzeAPK(zip) {
  const findings = [];

  const manifest = zip.file('AndroidManifest.xml');
  if (manifest) {
    const content = await manifest.async('uint8array');
    if (content.includes(0x64)) {
      findings.push({
        title: 'AndroidManifest Found',
        detail: 'Manifest detected – ensure exported components reviewed'
      });
    }
  }

  const crypto = await scanCrypto(zip);
  return findings.concat(crypto);
}
