export async function parsePlist(zip) {
  const plistFile = Object.values(zip.files)
    .find(f => f.name.endsWith("Info.plist"));

  const buffer = await plistFile.async("arraybuffer");
  return plist.parse(buffer);
}
