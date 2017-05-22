var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('public/js/**/*');
});

gulp.task('html', function() {
  gulp.src('/public/*.html');
});

gulp.task('css', function() {
  gulp.src('public/css/*.css');
});

gulp.task('sass', function () {
  return gulp.src('public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/**/*', ['js']);
  gulp.watch('public/css/*.css', ['css']);
  gulp.watch('public/scss/*.scss',['sass']);
  gulp.watch(['public/*.html',
    'public/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('public/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'sass','css', 'webserver']);
