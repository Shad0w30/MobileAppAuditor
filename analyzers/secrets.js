export function scanSecrets(strings) {
  return strings
    .filter(s => /AIza[0-9A-Za-z-_]{35}|secret|apikey/i.test(s.value))
    .map(s => ({
      severity: "High",
      title: "Hardcoded Secret",
      description: "Potential hardcoded secret detected",
      file: s.file,
      location: "DEX string",
      masvs: "MASVS-CRYPTO-1"
    }));
}
