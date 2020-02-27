var gulp = require('gulp'),

    minifycss = require('gulp-minify-css'),

    concat = require('gulp-concat'),

    uglify = require('gulp-uglify'),

    rename = require('gulp-rename'),

    del = require('del');



// 压缩css

// gulp.task('minifycss', function () {

//     return gulp.src('src/*.css')      //压缩的文件

//         .pipe(gulp.dest('minified/css'))   //输出文件夹

//         .pipe(minifycss());   //执行压缩

// });

// gulp.task('minifyjs', function() {

//     return gulp.src('src/*.js')

//         .pipe(concat('main.js'))    //合并所有js到main.js

//         .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹

//         .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名

//         .pipe(uglify())    //压缩

//         .pipe(gulp.dest('minified/js'));  //输出

// });
gulp.task('minifyjs', function () {

    return gulp.src('dist/*.js')
        // .pipe(concat('main.js'))    //合并所有js到main.js

        // .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹

        // .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名

        .pipe(uglify())    //压缩

        .pipe(gulp.dest('distmin/'));  //输出

});
gulp.task('clean', function (cb) {

    del(['distmin/*.js'], cb)

});

gulp.task('default', ['clean'], function () {

    gulp.start('minifyjs');

});
// // 配置
// var gulp = require('gulp');
// var uglify = require('gulp-uglify'); //js
// // var cleanCSS = require('gulp-clean-css'); //css
// var rename = require("gulp-rename"); //重命名
// // var babel = require("gulp-babel"); //ES6转ES5

// gulp.task('default', ['auto']);

// gulp.task('jscompress', function () {
//     return gulp.src('dist/*.js') //转es5之后的js目录
//         .pipe(rename({ suffix: '' })) //重命名配置
//         .pipe(uglify())
//         .pipe(gulp.dest('dist.min/js')); //输出的文件夹
// });

// // gulp.task('csscompress', function () {
// //     return gulp.src('css/*.css') //css文件地址
// //         .pipe(rename({ suffix: '.min' }))
// //         .pipe(cleanCSS())
// //         .pipe(gulp.dest('dist/css'));
// // });

// // // ES6转化为ES5
// // gulp.task("es62es5", function () {
// //     return gulp.src("js/*.js") //es6文件地址
// //         .pipe(babel())
// //         .pipe(gulp.dest("dist"));
// // });

// // 在命令行使用 gulp auto 启动监听
// gulp.task('auto', function () {
//     // 监听文件修改，当文件被修改则执行
//     // gulp.watch('dist/*.js', ['es62es5']);
//     gulp.watch('dist/*.js', ['jscompress']);
//     // gulp.watch('css/*.css', ['csscompress']);
// });