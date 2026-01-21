import { scanCrypto } from './cryptoScanner.js';

export async function analyzeIPA(zip) {
  const findings = [];

  const plistFile = Object.keys(zip.files).find(f => f.endsWith('Info.plist'));
  if (plistFile) {
    const content = await zip.file(plistFile).async('text');
    const plist = window.plist.parse(content);

    if (plist.NSAppTransportSecurity?.NSAllowsArbitraryLoads) {
      findings.push({
        title: 'ATS Disabled',
        detail: 'NSAllowsArbitraryLoads = true'
      });
    }
  }

  return findings.concat(await scanCrypto(zip));
}
