var async = require('async');
var fs = require('fs');

function testAsyncSeries(callback) {
    async.series(
        [function (callback) {
            callback(null, 1)
        }, function (callback) {
            callback(null, 2)
        }]
        , function (err, results) {
            console.log(results);
            callback(err, results);
        });
}

// testAsyncSeries(function (err, results) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('results', results);
// });

// function testAsyncWaterfall(callback) {
//     async.waterfall([
//         function (callback) {
//             callback(null, 1, 2);
//         },
//         function (arg1, arg2, callback) {
//             // console.log(arg1, arg2);
//             callback(null, 3);
//         },
//         function (arg1) {
//             callback(null, 'done')
//         }
//     ], function (err, results) {
//         console.log('results', results);
//         callback(err, results);
//     });
// }
//
// testAsyncWaterfall(function (err, result) {
//     if (err) {
//         console.log('err', err);
//         return;
//     }
//     console.log('result：', result);
// });

function testAsyncParallel(callback) {
    // async.parallel([
    //     function (callback) {
    //         setTimeout(function () {
    //             callback(null, 'one');
    //         },2000);
    //     },
    //     function (callback) {
    //         callback(null, 'two');
    //     }
    // ], function (err, results) {
    //     console.log('results:', results);
    //     callback(err, results);
    // });
    async.parallel({
        one: function (callback) {
            setTimeout(function () {
                callback(null, 1);
            },1000);
        },
        two: function (callback) {
            callback(null, 2);
        }
    }, function (err, results) {
        console.log('results:', results);
        callback(err, results);
    });
}

// testAsyncParallel(function (err, results) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('results', results);
// });

// function testAsyncParallelLimit(callback) {
//    async.parallelLimit([
//        function (callback) {
//            callback(null, 1);
//        },
//        function (callback) {
//            callback(null, 2);
//        },
//        function (callback) {
//            callback(null, 3)
//        }
//    ], 2, function (err, results) {
//        // console.log(err, results);
//        callback(err, results);
//    })
// }
//
// testAsyncParallelLimit(function (err, results) {
//     if (err) {
//         console.log('err', err);
//         return;
//     }
//     console.log('results', results);
// });

function testAsyncEachSeries(callback) {
    async.everySeries(['app', 'settings'], function (item, callback) {
        console.log('__dirname', __dirname);
        console.log('__filename', __filename);
        let filepath = __dirname + '\\' + item+'\.js';
        fs.access(filepath, function (err) {
            console.log('err', err);
            callback(null, !err);
        })
    }, function (err, result) {
        console.log('result:', result);
        callback(err, result);
    });
}

// testAsyncEachSeries(function (err, result) {
//    if (err) {
//        console.log('err', err);
//        return;
//    }
//    console.log('result', result);
// });

var EventEmiiter = require('events').EventEmitter;
var event = new EventEmiiter();



function test() {
    var time = Date.now();
    event.on('timeout ok', function () {
        console.log("is ok");
        console.log('time diff: ', Date.now() - time);
    });

    setTimeout(function () {
        event.emit('timeout ok');
    },1500);
}

// test();

// var data = 'www.runoob.com';
//
// var writeStream = fs.createWriteStream('output.txt');
//
// writeStream.write(data, 'UTF8');
//
// writeStream.end();
//
// writeStream.on('finish', function () {
//     console.log('写成完成。');
// });
//
// writeStream.on('error', function (err) {
//    console.log(err.stack);
// });
//
// console.log('程序执行完毕');

//读取

// let data = '';
//
// var readStream = fs.createReadStream('output.txt');
// readStream.setEncoding('UTF8');
//
// readStream.on('data', function (chunk) {
//     data += chunk;
// });
//
// readStream.on('end', function () {
//     console.log(data);
// });
//
// readStream.on('error', function (err) {
//    console.log(err.stack);
// });
//
// console.log('程序执行完毕');

// 写入流
// var data = 'emmmm...';
//
// let writeStream = fs.createWriteStream('output2.txt');
//
// writeStream.write(data, 'UTF8');
//
// writeStream.end();
//
// writeStream.on('finish', function () {
//     console.log('写入完成');
// });
//
// writeStream.on('error', function () {
//    console.log(err.stack);
// });
//
// console.log('程序执行完成');


let readStream = fs.createReadStream('output.txt');
let writeStream = fs.createWriteStream('output2.txt');

readStream.pipe(writeStream)





























