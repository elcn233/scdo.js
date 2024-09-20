const { keccak256, toUtf8Bytes, concat, recoverAddress, SigningKey, joinSignature } = require('./ethersUtils');
const { ADDRESS_PREFIX } = require('./address');
// const { getBase58CheckAddress } = require('./crypto');
const { hexStr2byteArray } = require('./code');

const SCDO_MESSAGE_PREFIX = "\x19SCDO Signed Message:\n";

function hashMessage(message) {
    if (typeof(message) === "string") { 
        message = toUtf8Bytes(message);
    }

    if (Array.isArray(message)) {
        message = new Uint8Array(message);
    }

    return keccak256(concat([
        toUtf8Bytes(SCDO_MESSAGE_PREFIX),
        toUtf8Bytes(String(message.length)),
        message
    ]));
}

function signMessage(message, privateKey) {
    if(!privateKey.match(/^0x/)) {
        privateKey =  '0x' + privateKey;
    }
    
    const signingKey = new SigningKey(privateKey);
    const messageDigest = hashMessage(message);
    const signature = signingKey.sign(messageDigest);
    
    return joinSignature(signature);
}

// function verifyMessage(message, signature) {
//     if(!signature.match(/^0x/)) {
//       signature =  '0x' + signature;
//     }
//     const recovered = recoverAddress(hashMessage(message), signature);
//     const base58Address = getBase58CheckAddress(hexStr2byteArray(recovered.replace(/^0x/, ADDRESS_PREFIX)));
    
//     return base58Address;
// }

module.exports = {
    SCDO_MESSAGE_PREFIX,
    hashMessage,
    signMessage,
    // verifyMessage
};
