export function renderFileTree(fileList) {
  const tree = {};
  fileList.forEach(path => {
    const parts = path.split("/");
    let node = tree;
    parts.forEach(p => {
      node[p] = node[p] || {};
      node = node[p];
    });
  });

  const container = document.getElementById("fileTree");
  container.innerHTML = "<h3>📂 Files</h3>";
  container.appendChild(build(tree));
}

function build(node) {
  const ul = document.createElement("ul");
  ul.className = "tree";

  for (const name in node) {
    const li = document.createElement("li");

    if (Object.keys(node[name]).length) {
      li.textContent = "📁 " + name;
      li.className = "folder";
      li.onclick = () => li.classList.toggle("open");
      li.appendChild(build(node[name]));
    } else {
      li.textContent = name;
      li.className = "file";
    }

    ul.appendChild(li);
  }
  return ul;
}
