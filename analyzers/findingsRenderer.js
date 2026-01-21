export function renderFindings(findings) {
  const container = document.getElementById("results");
  container.innerHTML = "<h2>🔍 Security Findings</h2>";

  const groups = { Critical: [], High: [], Medium: [], Low: [] };
  findings.forEach(f => groups[f.severity].push(f));

  for (const sev in groups) {
    if (!groups[sev].length) continue;

    const sec = document.createElement("div");
    sec.className = `severity ${sev.toLowerCase()}`;

    sec.innerHTML = `<h3>${sev} (${groups[sev].length})</h3>`;

    groups[sev].forEach(f => {
      const card = document.createElement("div");
      card.className = "finding";

      const title = document.createElement("div");
      title.className = "finding-title";
      title.textContent = f.title;

      const details = document.createElement("div");
      details.className = "finding-details";
      details.style.display = "none";
      details.innerHTML = `
        <p>${f.description}</p>
        <p><b>File:</b> ${f.file}</p>
        <p><b>Location:</b> ${f.location || "N/A"}</p>
        <p><b>MASVS:</b> ${f.masvs || "-"}</p>
      `;

      title.onclick = () =>
        details.style.display = details.style.display === "none" ? "block" : "none";

      card.append(title, details);
      sec.appendChild(card);
    });

    container.appendChild(sec);
  }
}
