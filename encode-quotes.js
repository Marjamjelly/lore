// encode-quotes.js
const CryptoJS = require("crypto-js");
const fs = require("fs");

const password = process.env.QUOTES_PASSWORD;
if (!password) {
  console.error("No password set in QUOTES_PASSWORD environment variable.");
  process.exit(1);
}
const data = fs.readFileSync("quotes.json", "utf8");
const encrypted = CryptoJS.AES.encrypt(data, password).toString();
fs.writeFileSync("quotes.enc", JSON.stringify({ data: encrypted }));