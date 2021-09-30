const { src, dest, watch, parallel, series } = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-image')
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
function runServer(done) {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })

    watch('./src/*.html', series(generateHTML))
    watch('./src/sass/styles.sass', series(generateCSS))
    watch("./src/*.html").on('change', browserSync.reload)

    done()
}
/*
* Compress images and add to build folder
*/
function compressImages(done) {
    src('./assets/images/*')
        .pipe(imagemin())
        .pipe(dest('./build/assets/images'))

    done()
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

/**
 * Takes and compiles the fonts into the build assets directory
 */
function processFonts(){
    return src('./assets/fonts/*')
        .pipe(dest('./build/assets/fonts'))
}

/*
 * Runs all linters available
 */
function runLinter(done) {
    runJSLinter()
    done()
}

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
exports.fonts = processFonts
exports.html = generateHTML
exports.compress = compressImages
exports.default = series(runLinter, parallel(compressImages, processFonts, generateCSS, generateJs, generateHTML), runServer);
