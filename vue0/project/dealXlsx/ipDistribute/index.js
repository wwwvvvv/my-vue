const fs = require("fs");
const path = require("path");
const excel = require("./excel");
const http = require("http");
const qs = require("querystring");

// var ipData = xlsx.parse(__dirname,'ip.xlsx')[0].data;
var ipDataArr = excel.parse(__dirname,'ip.xlsx')[0].data;
// console.log(ipDataArr);
var ipSet = new Set();

for(let i = 1; i < ipDataArr.length; i++) {
    ipSet.add(ipDataArr[i][0]);
}

var ipData = Array.from(ipSet);
//
// var excelData = [['IP']];
// ipData.forEach(item => {
//     excelData.push([item]);
// });
// excel.generate('ip-unique', excelData,__dirname);
fs.writeFile("ip.js",'let ips = ' + JSON.stringify(ipData), err => {
    if(!err) console.log("success~");
});

console.log(ipData.length);
