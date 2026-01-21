export function scanSecrets(strings) {
  const findings = [];

  strings.forEach(s => {
    if (/AIza[0-9A-Za-z-_]{35}/.test(s.value)) {
      findings.push({
        severity: "High",
        title: "Hardcoded Google API Key",
        description: "API key detected in application strings",
        file: s.file,
        location: "string",
        masvs: "MASVS-CRYPTO-1"
      });
    }
  });

  return findings;
}
