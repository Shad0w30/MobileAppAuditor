importScripts("../lib/jszip.min.js");

self.onmessage = async (e) => {
  const { fileBuffer, rules } = e.data;
  const zip = await JSZip.loadAsync(fileBuffer);
  const findings = [];

  for (const entry of Object.values(zip.files)) {
    if (entry.dir) continue;

    const isText =
      entry.name.endsWith(".xml") ||
      entry.name.endsWith(".plist") ||
      entry.name.endsWith(".smali") ||
      entry.name.endsWith(".java") ||
      entry.name.endsWith(".js") ||
      entry.name.endsWith(".swift");

    let content = null;

    if (isText) {
      try {
        content = await entry.async("text");
      } catch {
        continue;
      }
    }

    // 🔍 YARA-style scanning
    if (content) {
      for (const rule of rules) {
        for (const pattern of rule.patterns) {
          if (content.includes(pattern)) {
            findings.push({
              ruleId: rule.id,
              file: entry.name,
              severity: rule.severity,
              masvs: rule.masvs,
              message: rule.description
            });
            break;
          }
        }
      }
    }

    // 🔬 Binary entropy check
    if (!isText) {
      const buffer = await entry.async("uint8array");
      const entropy = calculateEntropy(buffer);
      if (entropy > 7.5) {
        findings.push({
          ruleId: "HIGH_ENTROPY",
          file: entry.name,
          severity: "Medium",
          masvs: "MSTG-CRYPTO-1",
          message: "High entropy binary (possible encryption/packing)"
        });
      }
    }
  }

  postMessage(findings);
};

function calculateEntropy(data) {
  const freq = new Array(256).fill(0);
  data.forEach(b => freq[b]++);
  let entropy = 0;

  for (const count of freq) {
    if (!count) continue;
    const p = count / data.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}
