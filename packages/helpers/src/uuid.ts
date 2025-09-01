export function randomUUID() {
  if (typeof window === 'undefined') {
    const crypto = require('crypto');
    return crypto.randomUUID() as string;
  }

  return self.crypto.randomUUID() as string;
}
