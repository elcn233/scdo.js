const utils = require('../index');
const { encodeParamsV2ByABI, decodeParamsV2ByABI } = require('../abi');
const injectpromise = require('injectpromise');
const { Interface } = require('@ethersproject/abi');
const { BigNumber } = require('bignumber.js');

const getFunctionSelector = abi => {
    abi.stateMutability = abi.stateMutability ? abi.stateMutability.toLowerCase() : 'nonpayable';
    abi.type = abi.type ? abi.type.toLowerCase() : '';
    if (abi.type === 'fallback' || abi.type === 'receive') return '0x';
    let iface = new utils.ethersUtils.Interface([abi]);
    if (abi.type === 'event') {
        return iface.getEvent(abi.name).format(utils.ethersUtils.FormatTypes.sighash);
    }
    return iface.getFunction(abi.name).format(utils.ethersUtils.FormatTypes.sighash);
}

const decodeOutput = (abi, output) => {
    return decodeParamsV2ByABI(abi, output);
};

class Method {
    constructor(contract, abi) {
        this.scdo = contract.scdo;
        this.contract = contract;

        this.abi = abi;
        this.name = abi.name || (abi.name = abi.type);
        this.inputs = abi.inputs || [];
        this.outputs = abi.outputs || [];

        this.functionSelector = getFunctionSelector(abi);
        this.signature = this.scdo.util.sha3(this.functionSelector, false).slice(0, 8);
        this.injectPromise = injectpromise(this);

        this.defaultOptions = {
            feeLimit: this.scdo.util.feeLimit,
            callValue: 0,
            userFeePercentage: 100,
            shouldPollResponse: false, // Only used for sign()
        };
    }

    decodeInput(data) {
        return decodeOutput(this.inputs, '0x' + data);
    }

    onMethod(...args) {
        let rawParameter = '';
        if (this.abi && !/event/i.test(this.abi.type)) {
            rawParameter = encodeParamsV2ByABI(this.abi, args);
        }

        return {
            call: (options = {}) => {
                options = {
                    ...options,
                    rawParameter
                };

                return this._call(options);
            },
            send: (options = {}) => {
                options = {
                    ...options,
                    rawParameter
                };

                return this._send(options);
            },
            watch: (options = {}) => {
                return this._watch(options);
            },
            encodeAbi: () => {
                return rawParameter;
            }
        }
    }

    async _call(options = {}) {
        this.check();

        const { stateMutability } = this.abi;

        if (!['pure', 'view'].includes(stateMutability.toLowerCase()))
            throw new Error(`Methods with state mutability "${stateMutability}" must use send()`);
       
        const result = await this.scdo.client.call(this.contract.address, options.rawParameter, -1);
        var outputArray = decodeOutput(this.abi, result.result);
        outputArray.forEach((value, index) => {
            if (value._isBigNumber) {
                outputArray[index] = BigNumber(value.toString());
            }
        })
        return outputArray;
    }

    async _send(options = {}) {
        this.check();

        const { stateMutability } = this.abi;

        if (['pure', 'view'].includes(stateMutability.toLowerCase()))
            throw new Error(`Methods with state mutability "${stateMutability}" must use call()`);

        const transaction = {
            "to": this.contract.address,
            "payload": options.rawParameter
        };

        for (let [key, value] of Object.entries(options)) {
            if (key === 'rawParameter') continue;
            transaction[key] = value;
        }

        const result = await this.scdo.client.sendTransaction(transaction);

        return result;
    }

    async _watch(options = {}) {
        this.check();

        const height = options.height || -1;

        if (!this.abi.type || !/event/i.test(this.abi.type))
            throw new Error('Invalid method type for event watching');

        const result = await this.scdo.client.getLogs(height, this.contract.address, this.abi, this.name);
        return result;
    }

    check() {
        if (!this.contract.address)
            throw new Error('Smart contract is missing address');
    }
}

module.exports = Method;
