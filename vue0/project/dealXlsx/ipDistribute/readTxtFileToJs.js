var fs = require('fs');

fs.readFile('./ips-new.txt', 'utf-8', function (err,data) {
   if(err) {
       console.log(err);
   } else {
       // console.log(data);
       let ipData = String(data).split('\n');
       var ipSet = new Set();
       ipData.forEach(item => {
           ipSet.add(item);
       });
       ipData = Array.from(ipSet);
       console.log('去重后：', ipData.length);
       fs.writeFile("ip.js",'let ips = ' + JSON.stringify(ipData)+';\n module.exports = ips;', err => {
           if(!err) console.log("success~");
       });
   }
});