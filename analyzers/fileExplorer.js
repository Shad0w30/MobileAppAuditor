export function renderFileTree(zip) {
  const container = document.getElementById("fileTree");
  container.innerHTML = "<h2>📂 File Explorer</h2>";

  const tree = {};

  for (const path in zip.files) {
    const parts = path.split("/");
    let node = tree;
    parts.forEach((p, i) => {
      node[p] ??= { children: {}, path, isFile: i === parts.length - 1 && !zip.files[path].dir };
      node = node[p].children;
    });
  }

  container.appendChild(renderNode(tree, zip));
}

function renderNode(node, zip) {
  const ul = document.createElement("ul");
  ul.className = "tree";

  for (const name in node) {
    const entry = node[name];
    const li = document.createElement("li");

    if (entry.isFile) {
      li.textContent = `📄 ${name}`;
      li.className = "file";
      li.onclick = () => preview(zip, entry.path);
    } else {
      li.textContent = `📁 ${name}`;
      li.className = "folder";
      const child = renderNode(entry.children, zip);
      child.style.display = "none";
      li.onclick = () => child.style.display = child.style.display === "none" ? "block" : "none";
      li.appendChild(child);
    }

    ul.appendChild(li);
  }
  return ul;
}

async function preview(zip, path) {
  const pre = document.getElementById("filePreview");
  const buf = await zip.files[path].async("arraybuffer");
  const bytes = new Uint8Array(buf);
  const binary = bytes.some(b => b === 0);

  pre.textContent = binary
    ? `[Binary file – preview disabled]\n\n${path}`
    : new TextDecoder().decode(bytes).slice(0, 15000);
}
