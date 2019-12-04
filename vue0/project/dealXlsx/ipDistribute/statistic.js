const excel = require("./excel");
const fs = require("fs");
var {
    DBName,
    MongoUrl: url
} = require('./url');
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/ips1202";
let cityMap = new Map();

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(DBName);
    dbo.collection("ips"). find().toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result.length);
        result.forEach(item => {
            let thisCityIpNum = cityMap.has(item.addr) ? cityMap.get(item.addr) + 1 : 1;
            cityMap.set(item.addr, thisCityIpNum)
        });
        let cityArr = Array.from(cityMap);


        var excelData = [['地址', '数量']];
        excelData = excelData.concat(cityArr);
        excel.generate('ip地址', excelData, __dirname);
        console.log("over~");
        db.close();
    });
});

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("ips");
//     dbo.collection("ips"). find().toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result.length);
//         result.forEach(item => {
//             let thisCityIpNum = cityMap.has(item.addr) ? cityMap.get(item.addr) + 1 : 1;
//             cityMap.set(item.addr, thisCityIpNum)
//         });
//         let cityArr = Array.from(cityMap);
//
//
//         var excelData = [['地址', '数量']];
//         excelData = excelData.concat(cityArr);
//         excel.generate('ip地址', excelData, __dirname);
//         console.log("over~");
//
//
//         // let cityString = '';
//         // cityArr.forEach(item=>{
//         //     cityString += `${item[0]}：${item[1]}\n`
//         // });
//         // fs.writeFile('ip-city.txt', cityString, (err, data) => {
//         //     if(err) {
//         //         console.warn('写入ip-city.txt失败！');
//         //         throw err;
//         //         return;
//         //     }
//         //     console.log('写入ip-city.txt成功！');
//         // })
//         db.close();
//     });
// });



//test
// let result = [
//     {
//         ip: '12:12:12',
//         addr: "长春市"
//     },{
//         ip: '12:12:12',
//         addr: "深圳市"
//     },{
//         ip: '12:12:12',
//         addr: "上海市"
//     },{
//         ip: '12:12:12',
//         addr: "长春市"
//     },{
//         ip: '12:12:12',
//         addr: "杭州市"
//     },{
//         ip: '12:12:12',
//         addr: "北京市"
//     },{
//         ip: '12:12:12',
//         addr: "北京市"
//     },{
//         ip: '12:12:12',
//         addr: "长春市"
//     },
// ];
// result.forEach(item => {
//     let thisCityIpNum = cityMap.has(item.addr) ? cityMap.get(item.addr) + 1 : 1;
//     cityMap.set(item.addr, thisCityIpNum)
// });
//
// console.log(cityMap);