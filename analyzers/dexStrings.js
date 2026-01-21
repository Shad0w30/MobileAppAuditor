export async function extractDexStrings(zip) {
  const results = [];

  for (const name in zip.files) {
    if (!name.endsWith(".dex")) continue;

    const buf = await zip.files[name].async("arraybuffer");
    const bytes = new Uint8Array(buf);

    let current = [];
    for (let i = 0; i < bytes.length; i++) {
      if (bytes[i] >= 32 && bytes[i] <= 126) {
        current.push(bytes[i]);
      } else if (current.length >= 6) {
        results.push({ file: name, value: new TextDecoder().decode(new Uint8Array(current)) });
        current = [];
      } else {
        current = [];
      }
    }
  }
  return results;
}
