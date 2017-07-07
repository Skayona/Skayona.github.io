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
	return gulp.src('src/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 3 versions', '> 1%', 'ie 10', 'ie 11'],
            cascade: false
        }))
		.pipe(gulp.dest('src/sass/out'))
		.pipe(browserSync.reload({stream: true}))
});


// js-libs
gulp.task('scripts', function(){
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',

	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))
});


// css-libs min
gulp.task('css', ['sass'], function(){
	return gulp.src('src/sass/out/*.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}))
});



// broewser-sync
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	})
});




// del in dist
gulp.task('clearCache', function(){
	return del.sync('www')
});



// img compress
gulp.task('img', function(){
	return gulp.src('src/images/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('www/images'));
});





//browser-watch
gulp.task('watch', ['browser-sync', 'css', 'scripts'], function() {
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/sass/**/*.css', ['css']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});




//production
gulp.task('build', ['img', 'sass', 'scripts'], function(){
	var buildCss = gulp.src([
		'src/css/*.css'])
		.pipe(gulp.dest('www/css'))

	var bildJs = gulp.src('src/js/**/*')
		.pipe(gulp.dest('www/js'))

	var bildHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('www'))

	var buildVideo = gulp.src([
		'src/videos/**'])
		.pipe(gulp.dest('www/videos'))

});