const {
    keccak256,
    sha256,
    toUtf8Bytes,
    toUtf8String,
    recoverAddress,
    SigningKey,
    AbiCoder,
    Signature,
    concat,
    id,
    Mnemonic,
    Wordlist,
    wordlists,
    Wallet: ethersWallet,
    HDNodeWallet: ethersHDNodeWallet,
    getBytes,
    computeHmac,
} = require('ethers');

const { Interface } = require('@ethersproject/abi');

const splitSignature = (sigBytes) => Signature.from(sigBytes);
const joinSignature = (splitSig) => Signature.from(splitSig).serialized;
const arrayify = (value) => getBytes(value);
const FormatTypes = {
    sighash: 'sighash',
    minimal: 'minimal',
    full: 'full',
    json: 'json',
};
const isValidMnemonic = Mnemonic.isValidMnemonic;

computeHmac.register((algorithm, key, data) => {
    return computeHmac._(algorithm, Buffer.from(key), Buffer.from(data));
});

module.exports = {
    keccak256,
    sha256,
    toUtf8Bytes,
    toUtf8String,
    recoverAddress,
    SigningKey,
    Signature,
    AbiCoder,
    Interface,
    FormatTypes,
    splitSignature,
    joinSignature,
    arrayify,
    ethersWallet,
    ethersHDNodeWallet,
    concat,
    id,
    Mnemonic,
    Wordlist,
    wordlists,
    isValidMnemonic,
};
