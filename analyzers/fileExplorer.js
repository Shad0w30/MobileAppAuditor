export function renderFileTree(zip) {
  const tree = document.getElementById("fileTree");
  tree.innerHTML = "";

  const root = {};

  Object.keys(zip.files).forEach(path => {
    const parts = path.split("/");
    let current = root;
    parts.forEach(p => {
      if (!current[p]) current[p] = {};
      current = current[p];
    });
  });

  tree.appendChild(buildNode(root, zip));
}

function buildNode(node, zip, prefix = "") {
  const ul = document.createElement("ul");

  for (const key in node) {
    const li = document.createElement("li");
    const fullPath = prefix + key;

    if (Object.keys(node[key]).length) {
      li.textContent = "📁 " + key;
      li.appendChild(buildNode(node[key], zip, fullPath + "/"));
    } else {
      li.textContent = "📄 " + key;
      li.onclick = async () => {
        const file = zip.file(fullPath);
        if (!file) return;

        const isText = /\.(xml|plist|smali|java|js|swift|kt)$/i.test(fullPath);
        const content = isText
          ? await file.async("text")
          : "[Binary file – preview disabled]";

        document.getElementById("filePreview").textContent = content;
      };
    }
    ul.appendChild(li);
  }
  return ul;
}
