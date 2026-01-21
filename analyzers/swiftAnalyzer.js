export function scanSwift(text) {
  const findings = [];
  if (/SecTrustEvaluate/.test(text)) {
    findings.push({
      title: 'Insecure TLS Trust Evaluation',
      masvs: 'MSTG-NETWORK-3',
      severity: 'High'
    });
  }
  return findings;
}
