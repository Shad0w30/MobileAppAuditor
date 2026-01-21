importScripts("../lib/jszip.min.js");

self.onmessage = async (e) => {
  const { buffer } = e.data;
  const zip = await JSZip.loadAsync(buffer);

  const findings = [];
  let totalChecks = 0;
  let completedChecks = 0;

  const files = Object.values(zip.files);

  for (const entry of files) {
    if (entry.dir) continue;

    totalChecks++;

    const isText = /\.(xml|plist|smali|java|js|swift|kt)$/i.test(entry.name);

    if (!isText) {
      const data = await entry.async("uint8array");
      const entropy = calculateEntropy(data);

      if (entropy > 7.5) {
        findings.push({
          issue: "High-Entropy Binary Section Detected",
          severity: "Medium",
          category: "Obfuscation / Secrets Protection",
          file: entry.name,
          location: `Byte offset: 0x0 – 0x${data.length.toString(16)}`,
          evidence: `Entropy score: ${entropy.toFixed(2)}`,
          description:
            "Binary contains high-entropy regions indicating encrypted, packed, or compressed data. Review runtime decryption logic and embedded secrets."
        });
      }
    }

    completedChecks++;
    postMessage({ progress: completedChecks, total: totalChecks });
  }

  postMessage({ done: true, findings });
};

function calculateEntropy(data) {
  const freq = new Array(256).fill(0);
  for (const b of data) freq[b]++;
  let entropy = 0;

  for (const count of freq) {
    if (!count) continue;
    const p = count / data.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}
