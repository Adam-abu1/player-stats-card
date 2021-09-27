const { src, dest, watch, parallel, series } = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create()
    // sassLint = require('gulp-sass-lint')

/*
 * Process the templates and convert necessary files to html then move them to build directory
 * For the time being I am working with just html
 */
function generateHTML() {
    return src('./src/index.html')
        .pipe(dest('./build'))
}

/*
 * Process sass files into css then add them to build directory
 */
function generateCSS() {
    return src('./src/sass/*.sass')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest('./build/css'))
        .pipe(browserSync.stream())
}

/*
 * Generate and minify js files
 */
function generateJs() {
    src('./src/js/**.js')
        .pipe(concat())
        .pipe(dest('./build/js'))
}

/*
 * Compress images
 */

/*
 * Build Spritesheet
 */

/*
 * Watch for file changes
 */
function watchFiles() {
    watch('views/**.html', generateHTML);
    watch('sass/**.scss', generateCSS);
    watch([ '**/*.js', '!node_modules/**'], runJSLinter);
}

/*
 * Clean the build directory
 */

/*
 * Run a local server, serving the build directory
 */
function runServer() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })

    watch('views/**.html', generateHTML);
    watch('sass/**.scss', generateCSS);
    watch("./public/**.html").on('change', browserSync.reload);
}

/*
 * Refresh browser in response to changes made
 */

/*
 * loads eslint configuration and lints code
 */
function runJSLinter() {
    return src(['**/*.js','!node_modules/**'])
        .pipe(eslint({
            'configFile': './.eslintrc.json'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

/*
 * Runs all linters available
 */
function runLinter() {
    runJSLinter()
}

exports.css = generateCSS
exports.js = generateJs
exports.jsLint = runJSLinter
exports.serve = runServer
exports.html = generateHTML;
exports.watch = watchFiles;
exports.default = series(runLinter, parallel(generateCSS,generateHTML), runServer);
