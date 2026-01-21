export function exportHTML(findings) {
  const html = `
    <html><body>
    <h1>Security Findings</h1>
    ${findings.map(f => `
      <div>
        <b>${f.title}</b><br>
        Severity: ${f.severity}<br>
        MASVS: ${f.masvs}
      </div>
    `).join('')}
    </body></html>
  `;
  const blob = new Blob([html], { type: 'text/html' });
  window.open(URL.createObjectURL(blob));
}
