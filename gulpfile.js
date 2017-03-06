const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const run = require('gulp-run');


/**
 * Bundles and transpiles ES6 to ES5 bundled
 * @param srcFiles
 * @private
 */
function _jsBuild(srcFiles) {

    var tasks = srcFiles.map(function(entry) {

        var fileName =  entry.namespace.toLowerCase() + (entry.moduleName ? "." + entry.moduleName : "") + ".js";

        return browserify({
            entries: [entry.src],
            debug: true
            //standalone: config.namespace
        })
            .transform(babelify, {presets: ["es2015"],sourceMaps:true})
            .bundle()
            .pipe(source(entry.src))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(rename(fileName))
            //.pipe(gulp.dest(entry.distPath))
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest(entry.distPath))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(entry.distPath))
            .pipe(gutil.noop())
    });

    return tasks;

}


/**
 * Compile SCSS to CSS
 * @param srcFiles
 * @private
 */
function _scssBuild(srcFiles) {

    let tasks = srcFiles.map(function(entry) {

        var fileName =  entry.namespace.toLowerCase() + (entry.moduleName ? "." + entry.moduleName : "") + ".css";

        gulp.src(entry.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(rename(fileName))
            .pipe(gulp.dest(entry.distPath));

    });

    return tasks;

}


/**
 * ESLint
 * @private
 */
function _esLint(src) {

    src = src || ['**/*.js','!node_modules/**'];

    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

}



/* ------------------------------------------------------------ */
/* SDK                                                          */
/* ------------------------------------------------------------ */
gulp.task('build:sdk', function () {

    _jsBuild([
        {
            src: './src/index.js',
            distPath: './dist',
            moduleName: 'sdk',
            namespace: 'Foodberry'
        }
    ]);

    _scssBuild([
        {
            src: './src/scss/main.scss',
            distPath: './dist',
            moduleName: 'sdk',
            namespace: 'Foodberry'
        }
    ]);

});
