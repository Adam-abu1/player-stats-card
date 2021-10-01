const { src, dest, parallel, series } = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-image'),
    spritesmith = require('gulp.spritesmith'),
    buffer = require('vinyl-buffer'),
    merge = require('merge-stream')

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
}

/*
 * Generate Js files in the build directory to be served
 */
function generateJs() {
    return src('./src/js/**.js')
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
function processFonts() {
    return src('./assets/fonts/*')
        .pipe(dest('./build/assets/fonts'))
}

/*
* Build Spritesheet
*/
function buildSpriteSheet() {
    const spriteData =  src('./assets/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'spriteSheet.png',
            cssName: 'spriteSheet.sass'
        })),
        imgStream = spriteData.img
            .pipe(buffer())
            .pipe(imagemin())
            .pipe(dest('./build/assets/spritesheet')),
        cssStream = spriteData.css
            .pipe(dest('./src/sass'))

    return merge(imgStream, cssStream)
}

exports.css = generateCSS
exports.js = generateJs
exports.jsLint = runJSLinter
exports.serve = runServer
exports.fonts = processFonts
exports.html = generateHTML
exports.compressImages = compressImages
exports.spriteSheet = buildSpriteSheet
exports.default = series(runJSLinter, parallel(compressImages, processFonts, generateCSS, generateJs, generateHTML), runServer)
