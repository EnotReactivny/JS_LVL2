//Подключение плагинов

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var gulpIf = require('gulp-if');



//Задачи для gulp

//Hello World
gulp.task('hello', function(){
	console.log('Hello world');
});

//Компиляция Sass файлов
gulp.task('sass-compile', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
})

//Watch
gulp.task('watch', ['browserSync', 'sass-compile'], function(){
	gulp.watch('app/scss/**/*.scss',['sass-compile']);
	//Обновление браузера при любых изменениях в HTML или JS
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
})


//Browser Sync
gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir:'app'
		},
	})
})

//Оптимизация CSS и JS файлов c помощью useref

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		   .pipe(useref())
		   .pipe(gulpIf('*.js', uglify()))
		   .pipe(gulpIf('*.css', minifyCSS()))
		   .pipe(gulp.dest('dist'));
})