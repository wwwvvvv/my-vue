let xlsx = require('node-xlsx');
let fs = require('fs');
let path = require('path');
let dateFormat = require('dateformat');
let me = {
    generate(name, data, dir) {
        let buffer = this.generateBuffer(name, data);
        let excelPath = path.resolve(dir, name + '_' + dateFormat(new Date(), 'mmddHHMM') + '.xlsx');
        fs.writeFileSync(excelPath, buffer, 'utf-8');
        return excelPath;
    },
    generateBuffer(name, data) {
        return xlsx.build([{name: name, data: data}]);
    },
    parse(dirname, excelName) {
        return xlsx.parse(`${dirname}/${excelName}`);
    }
};
module.exports = me;