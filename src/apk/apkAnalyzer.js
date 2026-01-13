import { parseManifest } from "./manifestParser.js";
import { checkPermissions } from "./permissionRules.js";
import { scanSecrets } from "../static-analysis/secretScanner.js";
import { mapMASVS } from "../masvs/masvsMapper.js";

export async function analyzeAPK(zip) {
  const findings = [];

  const manifest = await parseManifest(zip);
  findings.push(...checkPermissions(manifest));

  findings.push(...await scanSecrets(zip));

  return mapMASVS(findings);
}
