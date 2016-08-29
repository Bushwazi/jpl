var fs = require('fs'),
		gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		cssnano = require('gulp-cssnano'),
		combineMq = require('gulp-combine-mq');


gulp.task('styles', function () {
	return gulp.src('./styles/main.styl')
		.pipe(stylus().on('error', gutil.log))
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(gulp.dest('../public/styles'))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'} ).on('error', gutil.log))
		.pipe(gulp.dest('../public/styles'))
});


gulp.task('js', function () {
	return gulp.src('./js/**/*.js')
    .pipe(concat('main.js').on('error', gutil.log))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
		.pipe(gulp.dest('../public/js'))
		.pipe(uglify({
				mangle:false,
				compress:false
			}).on('error', gutil.log))
		.pipe(rename({suffix: '.min'} ).on('error', gutil.log))
		.pipe(gulp.dest('../public/js'))
});


gulp.task('watch', function() {
    gulp.watch('./styles/**/*.styl', ['styles'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
    gulp.watch('./js/**/*.js', ['js'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
});

gulp.task('default', ['styles','js']);