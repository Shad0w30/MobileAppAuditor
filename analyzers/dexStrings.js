export async function extractDexStrings(zip) {
  const results = [];

  for (const name in zip.files) {
    if (!name.endsWith(".dex")) continue;

    const buf = await zip.files[name].async("arraybuffer");
    const bytes = new Uint8Array(buf);
    let cur = [];

    for (const b of bytes) {
      if (b >= 32 && b <= 126) cur.push(b);
      else {
        if (cur.length >= 6) {
          results.push({ file: name, value: new TextDecoder().decode(new Uint8Array(cur)) });
        }
        cur = [];
      }
    }
  }
  return results;
}
