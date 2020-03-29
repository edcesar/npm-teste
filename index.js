const crypto = require("crypto");
module.exports = {
  decryptPayload: function(key, wrappedKey, payload) {
    let decryptedKey = decrypt(wrappedKey, key);
    let decryptedMsg = decrypt(payload, decryptedKey);
    return decryptedMsg.toString("utf8");
  }
};
function decrypt(encrypted, key) {
  let encryptedBuffer = Buffer.from(encrypted, "base64");
  let hmac = new Buffer.alloc(32);
  let iv = new Buffer.alloc(16);
  encryptedBuffer.copy(hmac, 0, 0, 32);
  encryptedBuffer.copy(iv, 0, 32, 48);
  let data = Buffer.from(encryptedBuffer).slice(48);
  var hash = crypto
    .createHmac("SHA256", key)
    .update(Buffer.concat([iv, data]))
    .digest();
  if (!hmac.equals(hash)) {
    return "";
  }
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    crypto
      .createHash("sha256")
      .update(key)
      .digest(),
    iv
  );
  let decryptedData = Buffer.concat([decipher.update(data), decipher.final()]);
  return decryptedData;
}

// teste
