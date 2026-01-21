const weakPatterns = [
  { regex: /MD5|md5/i, issue: 'MD5 hash usage' },
  { regex: /SHA1|sha1/i, issue: 'SHA1 hash usage' },
  { regex: /Math\.random/i, issue: 'Insecure random generator' },
  { regex: /SSLv3|TLSv1\.0/i, issue: 'Deprecated SSL/TLS version' }
];

export async function scanCrypto(zip) {
  const findings = [];

  for (const file of Object.values(zip.files)) {
    if (file.dir) continue;

    const text = await file.async('text').catch(() => null);
    if (!text) continue;

    weakPatterns.forEach(p => {
      if (p.regex.test(text)) {
        findings.push({
          title: p.issue,
          detail: `Found in ${file.name}`
        });
      }
    });
  }

  return findings;
}
