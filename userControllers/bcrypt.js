const bcrypt = require('bcrypt');

function encode(plaintext) {
    const enpass = bcrypt.hashSync(plaintext, 10);
    return enpass;
}

function decode(plaintext, encryptedText) {
    const depass = bcrypt.compareSync(plaintext, encryptedText);
    return depass;
}

module.exports = {encode, decode};