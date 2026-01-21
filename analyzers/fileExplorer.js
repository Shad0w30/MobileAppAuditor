export function exploreZip(zip) {
  const tree = document.getElementById('fileTree');
  tree.innerHTML = '<h2>Files</h2>';

  Object.keys(zip.files).forEach(path => {
    const div = document.createElement('div');
    div.textContent = path;
    tree.appendChild(div);
  });
}
