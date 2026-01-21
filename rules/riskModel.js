export function scoreFinding(severity) {
  return {
    Critical: 9.0,
    High: 7.5,
    Medium: 5.0,
    Low: 2.0
  }[severity] || 1.0;
}
