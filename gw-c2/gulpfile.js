var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify			= require('gulp-uglifyjs'),
	cssnano			= require('gulp-cssnano'),
	rename			= require('gulp-rename'),
	del				= require('del'),
	imagemin		= require('gulp-imagemin'),
	pngquant		= require('imagemin-pngquant'),
	cache       	= require('gulp-cache'),
	autoprefixer 	= require('gulp-autoprefixer');


// sass - css
gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 5 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: false
        }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


// js-libs
gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/owlcarousel/owl.carousel.min.js',
		'app/libs/materialize/dist/js/materialize.min.js',
		'app/libs/wow/dist/wow.min.js',
		'app/libs/spincrement/jquery.spincrement.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});


// css-libs min
gulp.task('css', ['sass'], function(){
	return gulp.src('app/sass/out/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css/min'))
});



// broewser-sync
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});




// del in dist
gulp.task('clearCache', function(){
	return del.sync('dist')
});



// img compress
gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});





//browser-watch
gulp.task('watch', ['browser-sync', 'css', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});




//production
gulp.task('build', ['img', 'sass', 'scripts'], function(){
	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css',
	])
		.pipe(gulp.dest('dist/css'))


	var bildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))

	var bildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

});