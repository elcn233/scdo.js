const Scdo = require('../src/scdo');

require('../src/scdo');

var client = new Scdo().client;


// Error:CONNECTION ERROR: Couldn't connect to node http://localhost:8037.
// Error:leveldb: not found
client.send("getTransactionByHash", "0x579786960cbb87f0a344842c5258bf45b04b084a6b966e2841710d14b5c69575",
    function(result,err){
        if (err){
            console.log(err.message)
            return
        }
        console.log("async"+JSON.stringify(result))
});
client.send("getInfo", function(result,err){
    if (err){
        console.log(err.message)
        return
    }
    console.log("async"+JSON.stringify(result))
})