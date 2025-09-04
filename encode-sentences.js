// encode-sentences.js
const CryptoJS = require("crypto-js");
const fs = require("fs");

const password = process.env.SENTENCES_PASSWORD;
if (!password) {
  console.error("No password set in SENTENCES_PASSWORD environment variable.");
  process.exit(1);
}
const data = fs.readFileSync("sentences.json", "utf8");
const encrypted = CryptoJS.AES.encrypt(data, password).toString();
fs.writeFileSync("sentences.enc", JSON.stringify({ data: encrypted }));
