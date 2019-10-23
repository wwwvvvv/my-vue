//插件
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');  //压缩js
var rename = require('gulp-rename');  //重命名
var cleanCss = require('gulp-clean-css');//压缩CSS
var htmlMin = require('gulp-htmlmin'); //压缩html
var imagemin = require('gulp-imagemin');//压缩图片
// var pngquant = require('imagemin-pngquant');//深度压缩图片
var concat = require("gulp-concat");//文件合并
var autoprefixer = require("gulp-autoprefixer"); //根据设置浏览器版本自动处理浏览器前缀
var browserify = require('gulp-browserify'); //js模块合并 --- CommonJS
var babelify    = require('babelify');
var argv = require('yargs').argv;
var clean = require('gulp-clean');
var zip = require('gulp-zip');

let app = 'project/'+ argv.app;
//gulp tasks
//download-page  tasks
gulp.task('serve', function (done) {
    var browserSyncConfig = {
        server: {
            baseDir: app + '/dist',// 启动服务的目录 默认 index.html
            index: 'index.html' // 自定义启动文件名
        },
        open: 'external' //决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
        // injectChanges: true
    };
    browserSync.init(browserSyncConfig);  // 启动Browsersync服务
    done();
});

gulp.task("htmlMin", function () {
    console.log("htmlmin-------------")
    var options = {
        removeComments: false,                // 清除HTML注释
        collapseWhitespace: false,            // 压缩HTML
        collapseBooleanAttributes: true,     // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,         // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,    // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: false, //压缩页面JS
        minifyCSS: false, //压缩页面CSS，
        // ignoreCustomFragments: [
        //     /<%[\s\S]*?%>/,
        //     /<\?[\s\S]*?\?>/
        //     ///<head[\s\S]*?<\/head>/
        // ],
        trimCustomFragments: true,
        ignoreCustomComments: [/^!/, /^br/]
    };
    return gulp.src(app + "/src/*.html")
        .pipe(htmlMin(options))
        .pipe(gulp.dest(app + '/dist'));
});

gulp.task('dealCss', function () {
    // return gulp.src(app + '/src/scss/*.scss')
    //     .pipe(sass())
    //     .pipe(autoprefixer())
    //     // .pipe(cleanCss({
    //     //     level: 2,
    //     //     debug: true
    //     // }, (details) => { console.log(`css optimize: ${details.stats.originalSize} ——> ${details.stats.minifiedSize}`)}))
    //     .pipe(rename({
    //         basename: 'main'
    //     }))
    //     .pipe(gulp.dest(app + '/dist/stylesheets'))
    //     .pipe(browserSync.stream());
    console.log('app-name', app);
    return gulp.src(app + '/src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        // .pipe(cleanCss({
        //     level: 2,
        //     debug: true
        // }, (details) => { console.log(`css optimize: ${details.stats.originalSize} ——> ${details.stats.minifiedSize}`)}))
        // .pipe(rename({
        //     basename: 'main'
        // }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(app + '/dist/stylesheets'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    console.log("scripts task!!!!!!!!!");
    return gulp.src(app + '/src/javascript/main.js')
        .pipe(browserify({
            transform: [babelify.configure({
                // browserify默认不会bable处理node_modules http://npm.taobao.org/package/babelify
                ignore: /hammer|iscroll/,
                sourceMaps: false
            })],
            insertGlobals : true,
            debug : true,

            fullPaths: false // 试试属性

        }))
        .pipe(rename({
            basename: 'bundle'
        }))
        .pipe(gulp.dest(app + '/dist/javascript'))
});

gulp.task("images", function (done) {
    return gulp.src(app + "/src/images/**/*").pipe(gulp.dest(app + "/dist/images"));
});

gulp.task('copy-js', function (done) {
    console.log('copy');
    return gulp.src([app + '/src/javascript/**/*.js','!' + app + '/src/javascript/main.js'])
        .pipe(gulp.dest(app + '/dist/javascript'));

});

gulp.task("watch", function () {
    // console.log(app);
    gulp.watch(app + '/src/*.html').on("change",gulp.series('htmlMin'));
    gulp.watch(app + '/src/scss/*.scss').on("change",gulp.series('dealCss'));
    gulp.watch(app + '/src/javascript/*.js').on("change",gulp.series('scripts'));
    // gulp.watch([app + '/src/javascript/**/*.js','!'+app + '/src/javascript/main.js']).on("change",gulp.series('copy-js'));
    gulp.watch([app + '/src/javascript/**/*.js']).on("change",gulp.series('copy-js'));
    gulp.watch(app + '/dist/*.html').on("change", browserSync.reload);
    gulp.watch(app + '/dist/javascript/**/*.js').on("change", browserSync.reload);
    gulp.watch(app + '/dist/css/*.css').on("change", browserSync.reload);

});

gulp.task("zip", function (done) {
    var app = argv.app;
    var filePath = app + '/dist/';
    console.log('开始压缩， 压缩文件的路径为：' + filePath);
    gulp.src([filePath + "**/*.*","!"+filePath+"javascript/*"])
        .pipe(zip(app + '.zip'))
        .pipe(gulp.dest(app));
    console.log("压缩完成！");
    done();
});


gulp.task('dev', gulp.series(gulp.parallel('dealCss', 'htmlMin', 'scripts',"images"), 'serve', 'watch'), function (done) {
    console.log("default task done!");
});
