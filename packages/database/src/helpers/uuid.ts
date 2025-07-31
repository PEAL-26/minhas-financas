export function randomUUID() {
  if (typeof window === 'undefined') {
    const crypto = require('crypto');
    return crypto.randomUUID();
  }

  return self.crypto.randomUUID();
}
