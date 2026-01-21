export function cryptoChecks(strings) {
  const findings = [];

  strings.forEach(s => {
    if (/MD5|SHA1/i.test(s.value)) {
      findings.push({
        severity: "Medium",
        title: "Weak Hash Algorithm",
        description: "Usage of weak cryptographic hash detected",
        file: s.file,
        location: "string",
        masvs: "MASVS-CRYPTO-4"
      });
    }
  });

  return findings;
}
