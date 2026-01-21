export function scanSmali(text) {
  const findings = [];
  if (/Ljava\/security\/MessageDigest;->getInstance\("MD5"\)/.test(text)) {
    findings.push({
      title: 'MD5 Hash Usage',
      masvs: 'MSTG-CRYPTO-4',
      severity: 'High'
    });
  }
  return findings;
}
