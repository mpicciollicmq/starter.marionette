var gulp = require('gulp');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')({
    pattern: ['*', '!jshint']
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var port = $.util.env.port || 9000;
var src = 'src/';
var dist = 'dist/';
var tests = 'tests/';

gulp.task('scripts', () => {
    return gulp.src(webpackConfig.entry)
    .pipe($.webpackStream(webpackConfig))
    .on('error', function(error) {
        $.util.log($.util.colors.red(error.message));
        this.emit('end');
    })
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('html', () => {
    return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task('styles', () => {
    return gulp.src(src + 'styles/*.scss')
    .pipe($.sass({ outputStyle: isProduction ? 'compressed' : 'expanded' }))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.connect.reload());
});

gulp.task('serve', () => {
    $.connect.server({
        root: dist,
        port: port,
        livereload: {
            port: 35728
        }
    });
});

gulp.task('static', (cb) => {
    return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', () => {
    gulp.watch(src + 'styles/*.scss', ['styles']);
    gulp.watch(src + 'index.html', ['html']);
    gulp.watch([src + 'app/**/*.js', src + 'app/**/*.hbs'], ['scripts']);
});

gulp.task('lint', () => {
    return gulp.src([src + 'app/**/*.js', tests + '**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('test', $.shell.task('npm test'));

gulp.task('clean', (cb) => {
    del([dist], cb);
});

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', (cb) => {
    $.runSequence('clean', 'lint', 'test', 'static', 'html', 'scripts', 'styles', cb);
});