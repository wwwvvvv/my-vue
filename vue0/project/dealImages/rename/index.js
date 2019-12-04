const fs = require('fs');
const beforeDir = __dirname +'\\before';
const afterDir = __dirname +'\\after';

fs.readdir(beforeDir, (err, files) => {
    console.log(files);
    files.forEach(filename => {
        let oldFilePath = beforeDir + '/' + filename;
        let newFileName = filename.split("_")[0] + '.png';
        let newFilePath = afterDir + '/' + newFileName;
        fs.rename(oldFilePath, newFilePath, err => {
            if (!err) {
                console.log('替换完成！')
            }
        });
    })
});