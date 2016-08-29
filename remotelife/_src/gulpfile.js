var fs = require('fs'),
		gulp = require('gulp'),
    gutil = require('gulp-util'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		cssnano = require('gulp-cssnano'),
		combineMq = require('gulp-combine-mq'),
		mainNavJson = [],		
    pageCounter = 0,
    titleRegExp = /var title \=(.*?)\n/g;

gulp.task('markup', function() {
	console.log("HTML STARTED!");
	pageCounter = 0;
	fs.readdir("./markup", function(err,files){
  	/*
  		READ THE MARKUP DIRECTORY
  	*/
  	// console.log("READ DIRECTORY\n", files);
  	if (err) throw err;
  	files.map(function(file,ind,arr){
  		// console.log(file);
  		if(file.indexOf(".pug") > 0){
      	currentFile = fs.readFileSync("./markup/" + file, 'utf8');
      	fileName = file;
				pageTitle = currentFile.match(titleRegExp)[0].replace('var title = \'','').replace('\'\n','') || "NO VALUE";
				mainNavJson.push({"file":fileName,"title":pageTitle});
				pageCounter++;      
      } 
			console.log(mainNavJson);
  	});  	
		gulp.src('./markup/*.pug')
			.pipe(pug({
				pretty: false,
				data: {
					"pages": mainNavJson,
					"hobbies": JSON.parse( fs.readFileSync('./markup/data/stagnant-hobbies.json', { encoding: 'utf8' }) )
				}
			}).on('error', gutil.log))
			.pipe(gulp.dest('../'))
  });
});

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
    gulp.watch('./markup/**/*.pug', ['markup'])
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