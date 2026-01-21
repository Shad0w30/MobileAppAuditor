/* 
  CLASSIC WORKER
  importScripts IS ALLOWED HERE
*/

importScripts("lib/jszip.min.js");
importScripts("lib/plist.browser.min.js");

self.onmessage = async function (e) {
  const { filename, buffer } = e.data;

  postProgress("Unpacking archive", 15);

  const zip = await JSZip.loadAsync(buffer);

  postProgress("Indexing files", 30);

  const files = Object.keys(zip.files);
  let findings = [];

  if (filename.endsWith(".apk")) {
    findings = await analyzeAPK(zip);
  } else if (filename.endsWith(".ipa")) {
    findings = await analyzeIPA(zip);
  }

  postProgress("Finalizing results", 90);

  self.postMessage({
    type: "result",
    data: {
      files,
      findings
    }
  });
};

function postProgress(text, value) {
  self.postMessage({
    type: "progress",
    data: { text, value }
  });
}

/* =========================
   ANALYZERS (WORKER-SAFE)
   ========================= */

async function analyzeAPK(zip) {
  const results = [];

  for (const path in zip.files) {
    if (/md5|sha1/i.test(path)) {
      results.push({
        severity: "high",
        title: "Insecure Cryptographic Hash",
        description:
          "Use of weak or deprecated cryptographic hash algorithm detected.",
        file: path,
        location: "File name or reference"
      });
    }
  }

  return results;
}

async function analyzeIPA(zip) {
  const results = [];

  for (const path in zip.files) {
    if (path.endsWith("Info.plist")) {
      results.push({
        severity: "medium",
        title: "Info.plist Present",
        description:
          "Review App Transport Security, entitlements, and permissions.",
        file: path,
        location: "Application bundle"
      });
    }
  }

  return results;
}
