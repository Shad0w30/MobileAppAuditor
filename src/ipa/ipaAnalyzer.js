import { parsePlist } from "./plistParser.js";
import { checkATS } from "./atsRules.js";
import { scanSecrets } from "../static-analysis/secretScanner.js";
import { mapMASVS } from "../masvs/masvsMapper.js";

export async function analyzeIPA(zip) {
  const findings = [];
  const plist = await parsePlist(zip);

  findings.push(...checkATS(plist));
  findings.push(...await scanSecrets(zip));

  return mapMASVS(findings);
}
