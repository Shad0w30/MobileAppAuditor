export function renderFindings(findings) {
  const container = document.getElementById("findings");
  container.innerHTML = "<h2>🔍 Findings</h2>";

  ["critical", "high", "medium", "low"].forEach(sev => {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${sev.toUpperCase()}</h3>`;

    findings
      .filter(f => f.severity === sev)
      .forEach(f => section.appendChild(renderFinding(f)));

    container.appendChild(section);
  });
}

function renderFinding(f) {
  const div = document.createElement("div");
  div.className = `finding ${f.severity}`;

  const title = document.createElement("h4");
  title.textContent = f.title;

  const details = document.createElement("div");
  details.className = "finding-details";
  details.style.display = "none";
  details.innerHTML = `
    <p><b>Description:</b> ${f.description}</p>
    <p><b>File:</b> ${f.file || "N/A"}</p>
    <p><b>Location:</b> ${f.location || "N/A"}</p>
  `;

  title.onclick = () => {
    details.style.display =
      details.style.display === "none" ? "block" : "none";
  };

  div.append(title, details);
  return div;
}
