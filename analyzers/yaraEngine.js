export function runYara(text, rules) {
  return rules
    .filter(r => r.patterns.some(p => text.includes(p)))
    .map(r => ({
      ruleId: r.id,
      description: r.description,
      severity: r.severity,
      masvs: r.masvs
    }));
}
