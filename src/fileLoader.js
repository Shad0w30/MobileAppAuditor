export async function loadZip(file) {
  const buffer = await file.arrayBuffer();
  return await JSZip.loadAsync(buffer);
}
