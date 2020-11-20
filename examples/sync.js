const scdojs  = require('../src/scdo');
const client = new scdojs("http://127.0.0.1:8037").client;

client.send("getInfo", function(err, result){
    if (err){
        console.log(err)
        return
    }

    console.log("async"+JSON.stringify(result))
})

var result = client.sendSync("getInfo")
console.log("sendSync"+JSON.stringify(result))

var result = client.execSync("getInfo")
console.log("execSync"+JSON.stringify(result))
