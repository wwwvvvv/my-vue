const path = require("path");
const excel = require("./excel");
const https = require("https");
const qs = require("querystring");
const ips = require("./ip");
var MongoClient = require('mongodb').MongoClient;
var {
    DBName,
    MongoUrl: url
} = require('./url');
// var url = MongoUrl;
const interval = 1200;
const ipsLen = ips.length;
let currentIdx = 0;

Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(DBName);
    request36IPCN(dbo, db);
});

function request36IPCN(dbo, db) {
    let currentIp = ips[currentIdx];
    let requestUrl = `https://www.36ip.cn/?ip=${currentIp}`;
    https.get(requestUrl, function (data) {
        let resData = "";
        data.on("data", function (chunk) {
            resData += chunk;
        });
        data.on("end",function(){
            let addr = resData.toString().split(" ")[0];
            var myobj = { ip: currentIp, addr: addr, index: currentIdx};
            dbo.collection("ips").insertOne(myobj, function(err, res) {
                if (err) {
                    console.log(`插入错误！！---ip:${currentIp}, index:${currentIdx}, 当前时间：${new Date().Format('yyyy-MM-dd hh:mm:ss')} `);
                    throw err;
                }
                console.log(`文档插入成功！当前时间：${new Date().Format('yyyy-MM-dd hh:mm:ss')} ip: ${currentIp}, 地址：${addr}, index: ${currentIdx}`);
                setTimeout(() => {
                    currentIdx++;
                    if (currentIdx >= ipsLen) {
                        db.close();
                        return;
                    }
                    request36IPCN(dbo, db);
                }, interval);
            });
        })
    })
}
