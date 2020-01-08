// 配置
var gulp = require('gulp');
var uglify = require('gulp-uglify'); //js
// var cleanCSS = require('gulp-clean-css'); //css
var rename = require("gulp-rename"); //重命名
// var babel = require("gulp-babel"); //ES6转ES5

gulp.task('default', ['auto']);

gulp.task('jscompress', function () {
    return gulp.src('dist/*.js') //转es5之后的js目录
        .pipe(rename({ suffix: '' })) //重命名配置
        .pipe(uglify())
        .pipe(gulp.dest('dist.min/js')); //输出的文件夹
});

// gulp.task('csscompress', function () {
//     return gulp.src('css/*.css') //css文件地址
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(cleanCSS())
//         .pipe(gulp.dest('dist/css'));
// });

// // ES6转化为ES5
// gulp.task("es62es5", function () {
//     return gulp.src("js/*.js") //es6文件地址
//         .pipe(babel())
//         .pipe(gulp.dest("dist"));
// });

// 在命令行使用 gulp auto 启动监听
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行
    // gulp.watch('dist/*.js', ['es62es5']);
    gulp.watch('dist/*.js', ['jscompress']);
    // gulp.watch('css/*.css', ['csscompress']);
});