## Visa Checkout encPaymentData Decrypt

```Shell
foo@bar:~$ npm i visa-checkout-decrypt
```

```javascript
const { decryptPayload } = require("./decryptPayload");

const data = decryptPayload(sharedSecret, encKey, encPaymentData);

console.log(data); // Your decrypted data

```
