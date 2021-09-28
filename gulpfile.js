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
    return src('./src/js/**.js')
        // .pipe(concat())
        .pipe(dest('./build/js'))
}

/*
 * Run a local server, serving the build directory
 */
function runServer(cb) {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })

    watch('./src/*.html', generateHTML)
    watch('./src/sass/styles.sass', generateCSS)
    watch("./src/*.html").on('change', browserSync.reload)
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
function runLinter(done) {
    runJSLinter()
    done()
}

/*
* Compress images
*/

/*
* Build Spritesheet
*/

/*
 * Clean the build directory
 */

exports.css = generateCSS
exports.js = generateJs
exports.jsLint = runJSLinter
exports.serve = runServer
exports.html = generateHTML
exports.default = series(runLinter, parallel(generateCSS, generateJs, generateHTML), runServer);
