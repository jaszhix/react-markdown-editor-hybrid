var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var webpackStream = require('webpack-stream');
var config = require('./webpack.config');

gulp.task('demo', function() {
  return gulp.src('./demo/index.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest('./demo/'));
});