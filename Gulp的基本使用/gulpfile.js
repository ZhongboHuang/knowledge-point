const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');

// gulp.task("first", () => {
//     console.log("gulp执行了");

//     gulp.src("./src/css/base.css")
//         .pipe(gulp.dest("./dist/css"))
// });
//产生问题
//The following tasks did not complete: first
//Did you forget to signal async completion?

//解决办法 1.利用 async await
// gulp.task("first", async() => {
//     await console.log("gulp执行了");

//     gulp.src("./src/css/base.css")
//         .pipe(gulp.dest("./dist/css"))
// });

//解决办法 2.利用 done 回调函数
gulp.task("first", done => {
    console.log("gulp执行了");

    gulp.src("./src/css/base.css")
        .pipe(gulp.dest("./dist/css"))

    done()
});

gulp.task("html", done => {
    gulp.src("./src/*.html")
        // 使用 gulp-file-include 插件
        .pipe(fileinclude())
        // 使用 gulp-htmlmin 插件
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist"));
    done()
});