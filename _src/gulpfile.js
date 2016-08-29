var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify');

gulp.task('markup', function() {
	console.log("HTML STARTED!");
	gulp.src('./markup/*.jade')
		.pipe(jade({
			pretty: false,
			locals: {
				'pages': ['one','two','three']
			}
		}).on('error', gutil.log))
		.pipe(gulp.dest('../'))
	gulp.src('./markup/bloggery/*.jade')
		.pipe(jade({
			pretty: false,
			locals: {
				'pages': ['one','two','three']
			}
		}).on('error', gutil.log))
		.pipe(gulp.dest('../bloggery/'))
	gulp.src('./markup/services/*.jade')
		.pipe(jade({
			pretty: false,
			locals: {
				'pages': ['one','two','three']
			}
		}).on('error', gutil.log))
		.pipe(gulp.dest('../services/'))
});

gulp.task('styles', function () {
	return gulp.src('./styles/main.styl')
		.pipe(stylus().on('error', gutil.log))
		.pipe(gulp.dest('../public/styles'))
		.pipe(rename({suffix: '.min'} ).on('error', gutil.log))
		.pipe(gulp.dest('../public/styles'))
});


gulp.task('js', function () {
	return gulp.src('./js/**/*.js')
    .pipe(concat('main.js').on('error', gutil.log))
		.pipe(gulp.dest('../public/js'))
		.pipe(uglify({
				mangle:false,
				compress:false
			}).on('error', gutil.log))
		.pipe(rename({suffix: '.min'} ).on('error', gutil.log))
		.pipe(gulp.dest('../public/js'))
});


gulp.task('watch', function() {
    gulp.watch('./markup/**/*.jade', ['markup'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
    gulp.watch('./styles/**/*.styl', ['styles'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
    gulp.watch('./js/**/*.js', ['js'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
});

gulp.task('default', ['markup','styles','js']);