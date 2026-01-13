export function mapMASVS(findings) {
  return findings.map(f => ({
    ...f,
    category: f.masvs || "MASVS-GENERAL"
  }));
}
