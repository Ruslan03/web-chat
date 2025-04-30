import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

// Kunci rahasia enkripsi
const SECRET_KEY = "my-voice-call-key";

// Encrypt nama ke UID (angka string)
export function encryptNameToUID(name: string): string {
  const encrypted = AES.encrypt(name, SECRET_KEY).toString(); // hasil base64
  const hex = Buffer.from(encrypted).toString("hex");
  return BigInt("0x" + hex).toString(); // jadi angka string
}

// Decrypt UID (angka string) ke nama
export function decryptUIDToName(uidStr: string): string {
  const hex = BigInt(uidStr).toString(16);
  const base64 = Buffer.from(hex, "hex").toString();
  const decrypted = AES.decrypt(base64, SECRET_KEY);
  return decrypted.toString(encUtf8);
}