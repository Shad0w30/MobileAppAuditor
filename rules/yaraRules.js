export const yaraRules = [
  {
    id: 'WEAK_HASH',
    patterns: ['MD5', 'SHA1'],
    description: 'Weak hashing algorithm detected',
    severity: 'High',
    masvs: 'MSTG-CRYPTO-4'
  },
  {
    id: 'INSECURE_RANDOM',
    patterns: ['Math.random'],
    description: 'Insecure RNG used',
    severity: 'Medium',
    masvs: 'MSTG-CRYPTO-6'
  }
];
