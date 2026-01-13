export async function parseManifest(zip) {
  const file = zip.file("AndroidManifest.xml");
  const buffer = await file.async("arraybuffer");
  const parser = new AXMLParser(buffer);
  return parser.parse();
}
