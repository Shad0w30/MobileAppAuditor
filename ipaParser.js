export async function parseIPA(file) {
  const zip = await JSZip.loadAsync(file);
  const files = {};
  const tree = {};

  for (const [path, entry] of Object.entries(zip.files)) {
    files[path] = entry;
    buildTree(tree, path);
  }

  const plistPath = Object.keys(files).find(p => p.endsWith('Info.plist'));
  let metadata = {};

  if (plistPath) {
    const plistData = await files[plistPath].async('arraybuffer');
    metadata = plist.parse(plistData);
  }

  return { files, tree, metadata };
}

function buildTree(root, path) {
  const parts = path.split('/');
  let current = root;
  for (const part of parts) {
    if (!part) continue;
    current[part] = current[part] || {};
    current = current[part];
  }
}
