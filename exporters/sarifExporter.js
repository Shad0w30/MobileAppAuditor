export function exportSARIF(findings) {
  return {
    version: '2.1.0',
    runs: [{
      tool: {
        driver: {
          name: 'Browser Mobile Analyzer'
        }
      },
      results: findings.map(f => ({
        ruleId: f.ruleId,
        message: { text: f.message },
        locations: [{
          physicalLocation: {
            artifactLocation: { uri: f.file }
          }
        }]
      }))
    }]
  };
}
