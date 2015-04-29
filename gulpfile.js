var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');

var PATHS = {
    src: {
      js: 'src/**/*.js',
      html: 'src/**/*.html',
      css: ['src/**/*.css', 'src/**/*.css.map']
    }
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src(PATHS.src.css)
        .pipe(gulp.dest('dist'));
});

gulp.task('play', ['default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.css, ['css']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
      open('http://localhost:' + port);
    });
});

gulp.task('default', ['js', 'html', 'css']);
