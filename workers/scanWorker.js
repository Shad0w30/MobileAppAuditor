importScripts('../lib/jszip.min.js');

self.onmessage = async (e) => {
  const { fileBuffer, rules } = e.data;
  const zip = await JSZip.loadAsync(fileBuffer);

  const results = [];

  for (const f of Object.values(zip.files)) {
    if (f.dir) continue;
    const data = await f.async('uint8array');

    rules.forEach(rule => {
      if (rule.regex && rule.regex.test(new TextDecoder().decode(data))) {
        results.push({
          ruleId: rule.id,
          file: f.name,
          message: rule.description,
          severity: rule.severity,
          masvs: rule.masvs
        });
      }
    });
  }

  postMessage(results);
};
