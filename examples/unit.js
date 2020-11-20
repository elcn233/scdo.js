const util = require('../src/utils')
const scdojs = require('../src/scdo')


console.log(util.toWen(0.5)==50000000) // 50000000
console.log(util.toWen(0.000000018)==1) // 1
console.log(util.fromWen(1.5)==0.00000001) // 0.00000001
console.log(util.fromWen(55555555555555555555555555555555555555)==555555555555555555555555555555)
console.log(util.fromWen(0.9)==0) // 0

let client = new scdojs().client
console.log(client.util.toWen(55555555555555555555555555555555555555)==5555555555555555555555555555555555555500000000) // 5555555555555555555555555555555555555500000000
console.log(client.util.toWen(0.5)==50000000) // 50000000
console.log(client.util.toWen(0.000000018)==1) // 1
console.log(client.util.fromWen(1.5)==0.00000001) // 0.00000001
console.log(client.util.fromWen(55555555555555555555555555555555555555)==555555555555555555555555555555)
console.log(client.util.fromWen(0.9)==0) // 0
