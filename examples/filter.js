var scdojs  = require('../src/scdo');

var client =new scdojs().client;

var txs = client.filterBlockTx(2979704, "1S01a64ed0a476b1b128e7b196a3ebb34662825231", 2)
console.log("sync:"+JSON.stringify(txs))
