// Include CryptoJS library (make sure to include it in your project)
// You can download it from: https://cryptojs.gitbook.io/docs/
const CryptoJSUtil = require("crypto-js");

/**
 * Encrypts the given text using AES encryption.
 * 
 * @param text The text to encrypt.
 * @returns The encrypted text.
 */

// Encryption function
export function encrypt(text: string) {
  // Get the SALT from the system environment variable or use a default value "omg" if not available
  const SALT = process.env.SALT || "omg";
  // Encrypt the text using AES encryption with the provided SALT
  const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
  // Return the encrypted text
  return cipherText;
}

// Decryption function
export function decrypt(cipherText: string) {
  // Get the SALT from the system environment variable
  const SALT = process.env.SALT || "defaultSALT";
   // Decrypt the cipher text using AES decryption with the provided SALT
  const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
   // Convert the decrypted bytes to the original text using UTF-8 encoding
  const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
  // Return the decrypted original text
  return originalText;
}