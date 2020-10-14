const gulp = require('gulp');

gulp.task('first',done => {
    console.log('第一次执行gulp任务');
    gulp.src('./src/css/index.css')
        .pipe(gulp.dest('dist/css'));
        done();//done回调函数的作用是在task完成时通知Gulp
        // gulp不再支持同步任务
})