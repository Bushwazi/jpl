var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    cmq = require('gulp-combine-media-queries'),
    removeLogs = require('gulp-removelogs'),
    jade = require('gulp-jade'),
    filesize = require('gulp-filesize');
 
gulp.task('html', function() {
    gulp.src('./jade/*.jade')
        .pipe(jade({
            pretty: true,
        }).on('error', gutil.log))
        .pipe(gulp.dest('../'))
});

gulp.task('css', function () {
  gulp.src('./styles/main.styl')
    .pipe(stylus().on('error', gutil.log))
    .pipe(cmq({ log: true }))
    .pipe(autoprefixer('last 3 version', 'Explorer 8').on('error', gutil.log))
    .pipe(gulp.dest('../assets/styles/'))
    .pipe(rename({suffix: '.min'} ).on('error', gutil.log))
    .pipe(minifycss().on('error', gutil.log))
    .pipe(gulp.dest('../assets/styles/'));
});

gulp.task('js', function() {
    // create a file for all the js that requires it be loaded in the head.
    gulp.src(['./js/polyfill/picturefill.min.js', './js/lib/modernizr.js'])
        .pipe(concat('in-head.js'))
        .pipe(gulp.dest('../assets/js/'))
        .pipe(filesize());
    // create a file for all the js that can be loaded at the bottom of the page
    gulp.src(['./js/polyfill/classList.min.js', './js/init.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('../assets/js/'))
        .pipe(rename({suffix: '.min'} ))
        .pipe(removeLogs().on('error', gutil.log))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('../assets/js/'));
});

gulp.task('compress_images', function () {
    /*
        I just duplicated the "img" folder and called it "img_uncompressed". Then run this to recreate the "img" folder.
    */
    return gulp.src('../assets/img_uncompressed/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }).on('error', gutil.log))
        .pipe(gulp.dest('../assets/img/'));
});

gulp.task('watch', function() {
    gulp.watch('../**/jade/**/*.jade', ['html'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
    gulp.watch('../**/styles/**/*.styl', ['css'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
    gulp.watch('../**/js/**/*.js', ['js'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
});

gulp.task('default', ['html','css','js']);