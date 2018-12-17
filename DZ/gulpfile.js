var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), // Подключаем Sass пакет
    browserSync = require('browser-sync'), // Подключаем пакет browser-sync
    concat = require('gulp-concat'), // Сборка js-файлов в один
    babel = require('gulp-babel'), // Чтобы uglify понимал es6
    uglify = require('gulp-uglifyjs'), // Сжатие js
    cssnano = require('gulp-cssnano'), //Минификация css
    rename = require('gulp-rename'), // Переименование файлов
    del = require('del'), // Пакет для очистки и удаления
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () { // Создаем таск sass
    return gulp.src('app/sass/**/*.sass') // Взяли источник
        .pipe(sass()) // Преобразуем sass в css
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css')) // Выгружаем результат в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { //Создаем задачю browser-sync
    browserSync({ // Выполняем Browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера
        },
        notify: false // отключаем уведомления
    });
});

gulp.task('scripts', function () {
    return gulp.src([
        //'app/js/engine.js'
        'app/js/engine.js',
        'app/js/engine_logic.js',
        'app/js/rev.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/style.css') // Выбираем
        .pipe(cssnano()) //Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс
        .pipe(gulp.dest('app/css')); // Выгрузили
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за SASS файлами
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    // Наблюдение за другими типами файлов
});

gulp.task('clean', function () {
    return del.sync('dist'); // Очищаем папку
});

gulp.task('build', ['clean', 'sass', 'scripts'], function () {
    var buildCss = gulp.src('app/css/style.min.css') // Переносим CSS в продакшен
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src('app/js/scripts.min.js') // Переносим JS в продакшен
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);