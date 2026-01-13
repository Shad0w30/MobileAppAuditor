import { RULES } from "./regexRules.js";

export async function scanSecrets(zip) {
  const findings = [];

  for (const name in zip.files) {
    if (!/\.(js|json|xml|smali|swift|m)$/.test(name)) continue;

    const content = await zip.files[name].async("string");

    RULES.forEach(rule => {
      if (rule.regex.test(content)) {
        findings.push({
          issue: rule.name,
          file: name,
          severity: rule.severity,
          masvs: "MASVS-STORAGE-2"
        });
      }
    });
  }
  return findings;
}
