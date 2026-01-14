// Simple encryption/decryption for demonstration
// In production, use crypto-js or similar libraries

// For demo purposes, we'll use a simple base64 encoding (NOT SECURE)
// In production, use proper encryption like TweetNaCl.js or crypto-js

export function encryptPassword(password, masterPassword) {
  // Simple XOR encryption for demo (NOT SECURE)
  // In production, use proper encryption
  const encoded = btoa(password); // Base64 encode
  return encoded;
}

export function decryptPassword(encryptedPassword, masterPassword) {
  // Simple XOR decryption for demo (NOT SECURE)
  // In production, use proper decryption
  try {
    const decoded = atob(encryptedPassword); // Base64 decode
    return decoded;
  } catch (e) {
    return encryptedPassword;
  }
}

// Generate a key from master password (demo version)
export function generateKeyFromMasterPassword(masterPassword) {
  // In production, use PBKDF2 or similar
  return btoa(masterPassword);
}
