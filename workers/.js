import { extractDexStrings } from "./analyzers/dexStrings.js";
import { scanSecrets } from "./analyzers/secrets.js";
import { cryptoChecks } from "./analyzers/cryptoChecks.js";
import { mapMASVS } from "./analyzers/masvs.js";

self.onmessage = async e => {
  if (e.data.type !== "scan") return;

  const zip = e.data.zip;
  let findings = [];

  self.postMessage({ type: "progress", percent: 20, text: "Extracting DEX strings" });
  const strings = await extractDexStrings(zip);

  self.postMessage({ type: "progress", percent: 40, text: "Detecting secrets" });
  findings.push(...scanSecrets(strings));

  self.postMessage({ type: "progress", percent: 60, text: "Crypto & TLS checks" });
  findings.push(...cryptoChecks(strings));

  self.postMessage({ type: "progress", percent: 80, text: "MASVS mapping" });
  findings = mapMASVS(findings);

  self.postMessage({ type: "result", findings });
};
