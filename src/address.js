const ADDRESS_SIZE = 34;
const ADDRESS_PREFIX = "41";
const ADDRESS_PREFIX_BYTE = 0x41;
const ADDRESS_PREFIX_REGEX = /^(41)/;

const SCDO_BIP39_PATH_PREFIX = "m/44'/195'";
const SCDO_BIP39_PATH_INDEX_0 = SCDO_BIP39_PATH_PREFIX + "/0'/0/0";

const utils = require('./utils'); // 假设utils是一个外部模块

const address = {
    fromHex(address) {
        if (!utils.isHex(address))
            return address;

        return utils.crypto.getBase58CheckAddress(
            utils.code.hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX))
        );
    },
    toHex(address) {
        if (utils.isHex(address))
            return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);

        return utils.code.byteArray2hexStr(
            utils.crypto.decodeBase58Address(address)
        ).toLowerCase();
    },
    fromPrivateKey(privateKey, strict = false) {
        try {
            return utils.crypto.pkToAddress(privateKey, strict);
        } catch {
            return false;
        }
    }
}

module.exports = {
    ADDRESS_SIZE,
    ADDRESS_PREFIX,
    ADDRESS_PREFIX_BYTE,
    ADDRESS_PREFIX_REGEX,
    SCDO_BIP39_PATH_PREFIX,
    SCDO_BIP39_PATH_INDEX_0,
    address
};
