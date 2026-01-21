export function calculateEntropy(buffer) {
  const freq = new Array(256).fill(0);
  buffer.forEach(b => freq[b]++);

  let entropy = 0;
  buffer.forEach(b => {
    const p = freq[b] / buffer.length;
    entropy -= p * Math.log2(p || 1);
  });

  return entropy;
}
