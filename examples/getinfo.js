var scdojs  = require('../src/scdo');

var client = new scdojs("http://127.0.0.1:8037").client;

// async - Call mode 1
let sendR = client.send("getInfo",function(result,err){
    if (err){
        console.log(err.message);
    }else{
        console.log(result);
    }
});


// // async - Call mode 2
let execR = client.exec("getInfo",function(result,err){
    if (err){
        console.log(err.message);
    }else{
        console.log(result);
    }
});

// async - Call mode 3
client.getInfo(function(result,err){
    if (err){
        console.log(err.message);
    }else{
        console.log(result);
    }
})
// sync - Call mode 1
let info = client.sendSync("getInfo");
console.log(info);

// // sync - Call mode 2
let execI = client.execSync("getInfo");
console.log(execI);
