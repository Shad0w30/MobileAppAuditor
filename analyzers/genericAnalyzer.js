import { scanCrypto } from './cryptoScanner.js';

export async function analyzeGeneric(zip) {
  return await scanCrypto(zip);
}
