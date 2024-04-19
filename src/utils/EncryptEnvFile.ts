import * as CryptoJSUtilFile from "crypto-js";
import * as fs from "fs";
import * as path from "path";

// Get the current directory
const currentDir = __dirname;
// Navigate up one level to the 'src' directory
const srcDir = path.resolve(currentDir, "..");
// Set the directory path for the 'config' folder
const configDir = path.resolve(srcDir, "config");

// Define the path for the .env file
let envFilePath = path.join(configDir, ".env");
// If NODE_ENV is set, update the path to the environment-specific .env file
if (process.env.NODE_ENV) {
  envFilePath = path.join(configDir, `.env.${process.env.NODE_ENV}`);
}

/**
 * Encrypts the values in the .env file using AES encryption.
 */
export function encryptEnvFile() {
  // Get the SALT from the environment variable, defaulting to "defaultSALT"
  const SALT = process.env.SALT || "defaultSALT";
  // Read the contents of the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  // Split the file content into lines
  const envLines = envFileContent.split("\n");

  // Encrypt each line that contains a value
  const encryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    // If a value exists, encrypt it
    if (value) {
      const encryptedValue = CryptoJSUtilFile.AES.encrypt(value, SALT).toString();
      return `${key}=${encryptedValue}`;
    }

    // If no value exists, return the original line
    return line;
  });

  // Join the encrypted lines and write them back to the .env file
  const updatedEnvContent = encryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Encryption complete. Updated .env file.");
}

/**
 * Decrypts the values in the .env file using AES decryption.
 */
export function decryptEnvFile() {
  // Get the SALT from the environment variable, defaulting to "defaultSALT"
  const SALT = process.env.SALT || "defaultSALT";
  // Read the contents of the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  // Split the file content into lines
  const envLines = envFileContent.split("\n");

  // Decrypt each line that contains an encrypted value
  const decryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");

    // If an encrypted value exists, decrypt it
    if (value) {
      const decryptedValue = CryptoJSUtilFile.AES.decrypt(value, SALT).toString(CryptoJSUtilFile.enc.Utf8);
      return `${key}=${decryptedValue}`;
    }

    // If no value exists, return the original line
    return line;
  });

  // Join the decrypted lines and write them back to the .env file
  const updatedEnvContent = decryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Decryption complete. Updated .env file.");
}