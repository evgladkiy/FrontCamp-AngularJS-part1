const gulp = require('gulp');

// css plugins
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const cssbeautify = require('gulp-cssbeautify');

// js plugins
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

// other plugins
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');


gulp.task('copyHtml', function() {
    return gulp.src('./app/**/*.html')
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./dist'))
});

gulp.task('copyInitData', function() {
    return gulp.src('./app/initData/**/*.*')
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./dist/initData'))
});

gulp.task('buildCss', function() {
    return gulp.src('./assets/css/styles.css')
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./dist/css'))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
});

gulp.task('buildJs', function() {
    return gulp.src('./app/**/*.js')
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream())
});

gulp.task('buildJsLibs', function() {
    return gulp.src('./assets/libs/**/*.js')
        .pipe(plumber())
        .pipe(concat('libs.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/libs'))
});

gulp.task('copyFonts', function() {
    return gulp.src('./assets/libs/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('serve', ['copyHtml', 'buildCss', 'buildJs'], function() {
    browserSync.init({
        server: './dist',
    });
    gulp.watch('assets/css/*.css', ['buildCss']);
    gulp.watch('app/**/*.html', ['copyHtml']);
    gulp.watch('app/**/*.js', ['buildJs']);

});

gulp.task('build', ['copyHtml', 'copyInitData', 'buildCss', 'buildJs', 'buildJsLibs', 'copyFonts'])
gulp.task('dev', ['build', 'serve']);
