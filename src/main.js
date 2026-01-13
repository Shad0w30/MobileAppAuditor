import { loadZip } from "./fileLoader.js";
import { detectFileType } from "./fileType.js";
import { analyzeAPK } from "./apk/apkAnalyzer.js";
import { analyzeIPA } from "./ipa/ipaAnalyzer.js";
import { renderResults } from "./ui.js";

window.startScan = async function () {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Upload APK or IPA");

  const zip = await loadZip(file);
  const type = detectFileType(file);

  let findings = [];
  if (type === "apk") findings = await analyzeAPK(zip);
  if (type === "ipa") findings = await analyzeIPA(zip);

  renderResults(findings);
};
