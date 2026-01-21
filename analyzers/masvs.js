export function scoreMASVS(findings) {
  if (!findings.length) return [];

  return [{
    severity: "Low",
    title: "MASVS Coverage Summary",
    description: `Detected ${findings.length} findings mapped to MASVS`,
    file: "-",
    location: "-",
    masvs: "MASVS-GENERAL"
  }];
}
