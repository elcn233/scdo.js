var scdojs  = require('../src/scdo');

var client =new scdojs().client;

// It's suitable for the version 1.5.2
client.getReceiptByTxHash("0x0c77a9aa2fa78dd18daf7066a7df70c748398c2b933e6455fdf67a088dd4a222", "", function(info, err){
    if (err){
        console.log(err.message)
        return
    }
    console.log(info)
});