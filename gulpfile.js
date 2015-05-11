// Include gulp
var gulp = require('gulp');

// Include plugins
var sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    rename      = require('gulp-rename');

// Compile SCSS
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/assets/css'));
});

// Minify Javascript
gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build/assets/js')); 
});

// Default task
gulp.task('default', ['sass', 'js']);
