var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-minify-css'),
    newer        = require('gulp-newer'),
    livereload   = require('gulp-livereload'),
    plumber      = require('gulp-plumber'),
    beep         = require('beepbeep'),
    colors       = require('colors');
//---------------------------------------------

var CssDestination = './',
    sass_main    = './sass/main.scss';

// SASS (style)
gulp.task('style', function () {

    console.log('[sass]'.bold.magenta + ' Compiling Sass');

    return gulp.src(sass_main)
        .pipe(plumber(function () {
            beep();
            console.log('[sass]'.bold.magenta + ' There was an issue compiling Sass\n'.bold.red);
            this.emit('end');
        }))
        .pipe(newer(CssDestination))
        .pipe(sass())
        .pipe(minifyCSS({advanced:false}))
        .pipe(autoprefixer({ browsers: ['last 2 version', 'IE 10'], cascade: false }))
        .pipe(gulp.dest(CssDestination))
        .pipe(livereload());
});

// DEFAULT
gulp.task('default', ['watch', 'style']);

// WATCH
gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('./sass/main.scss',  ['style']   );
});