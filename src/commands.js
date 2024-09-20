
var commands = module.exports.commands = {
  "scdo":[
    'getInfo',
    'getBalance',
    'addTx',
    'getAccountNonce',
    'getBlockHeight',
    'getBlock',
    'getBlockByHash',
    'getBlockByHeight',
    'call',
    'getLogs',
    'getCode',
    'generatePayload',
    'estimateGas',
    'getBlockTransactionCount',
    'getBlockTransactionCountByHeight',
    'getBlockTransactionCountByHash',
    'getTransactionByBlockIndex',
    'getTransactionByBlockHeightAndIndex',
    'getTransactionByBlockHashAndIndex',
    'getReceiptByTxHash',
    'getTransactionsFrom',
    'getTransactionsTo',
    'getAccountTransactions',
    'getBlockTransactions',
    'getBlockTransactionsByHeight',
    'getBlockTransactionsByHash',
    'requestAccounts',
    'sendTransaction',
    'signTransaction',
    'signMessage',
    'ecRecover'
  ],
  "txpool":[
    'getTransactionByHash',
    'getDebtByHash',
    'getGasPrice',
    'getTxPoolContent',
    'getTxPoolTxCount',
    'getPendingTransactions',
    'getPendingDebts'
  ],
  "download":[
    'getStatus',
    'isSyncing'
  ],
  "network":[
    'getPeersInfo',
    'getPeerCount',
    'getNetVersion',
    'getProtocolVersion',
    'getNetworkID',
    'isListening'
  ],
  "monitor":[
    'nodeInfo',
    'nodeStats'
  ]
}

module.exports.isCommand = function(command) {
  for (const namespace in commands) {
    for (const key in commands[namespace]) {
      if (commands[namespace][key] === command){
        return true
      }
    }
  }
}

module.exports.getNamespace = function(command) {
  for (const namespace in commands) {
    for (const key in commands[namespace]) {
      if (commands[namespace][key] === command){
        return namespace
      }
    }
  }
}
