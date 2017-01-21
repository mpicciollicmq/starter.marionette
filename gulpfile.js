var webpack       = require('webpack');
var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var webpackConfig = require('./webpack.config');

var DevWebpackCompiler = (() => {
    var devCompiler;
    
    function createCompiler() {
        var conf = Object.create(webpackConfig);
        conf.devtool = 'source-map';
        conf.debug = true;
        conf.watch = true;
        conf.output.path = '.tmp/scripts';
        return webpack(conf);
    }
    
    return {
        getWebpack: () => {
            if (!devCompiler) {
                devCompiler = createCompiler();
            }
            return devCompiler;
        }
    }
})();

gulp.task('jshint', () => {
    return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'])
    .pipe($.jshint({ lookup: true }))
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', () => {
    return gulp.src('app/styles/*.scss')
    .pipe($.changed('styles', {extension: '.scss'}))
    .pipe($.sass())
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('html', ['styles'], () => {
    var lazypipe = require('lazypipe');
    var minifyCSS = require('gulp-minify-css');
    var cssChannel = lazypipe()
    .pipe(minifyCSS)
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});
    
    return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

gulp.task('connect', ['styles'], () => {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
    .use(DevWebpackCompiler.getWebpack())
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    .use('/node_modules', serveStatic('node_modules'))
    .use(serveIndex('app'));
    
    require('http').createServer(app)
    .listen(9000)
    .on('listening', () => {
        console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('templates', () => {
    return gulp.src('app/scripts/**/*.hbs')
    .pipe($.minifyHtml())
    .pipe($.handlebars())
    .pipe($.defineModule('commonjs'))
    .pipe(gulp.dest('.tmp/scripts'))
});

gulp.task('webpack', ['templates'], (callback) => {
    DevWebpackCompiler.getWebpack().run((err, stats) => {
        if (err) throw new $.util.PluginError('webpack', err);
        $.util.log('[webpack]', stats.toString({colors: true}));
        callback();
    });
});

gulp.task('dist', () => {
    return gulp.src([
        'app/*.*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    var del = require('del')
    del(['.tmp', 'dist']);
});

gulp.task('webpack:build', ['templates'], (callback) => {
    var conf = Object.create(webpackConfig);
    
    conf.plugins = conf.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    
    webpack(conf, (err, stats) => {
        if(err) throw new $.util.PluginError('webpack:build', err);
        $.util.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('watch', ['connect'], () => {
    $.livereload.listen();
    
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        '.tmp/scripts/**/*.js'
    ]).on('change', $.livereload.changed);
    
    gulp.watch('app/scripts/**/*.js', ['webpack']);
    gulp.watch('app/scripts/**/*.hbs', ['webpack']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('serve', ['webpack', 'connect', 'watch']);

gulp.task('build', ['jshint', 'webpack:build', 'html', 'dist'], () => {
    var size = $.size({title: 'build', gzip: true })
    return gulp.src('dist/**/*.js')
    .pipe(size)
    .pipe($.notify({
        onLast: true,
        title: 'Build complete',
        message: () => {
            return 'Total scripts size (gzip) ' + size.prettySize;
        }
    }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});