var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoPrefixer = require('gulp-autoprefixer');
var gulpInject = require('gulp-inject');
var tinypngs = require('gulp-tinypng-compress');







/*************************
    DEFAULT TASKS
**************************/

/* Serve */
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    })
    done();
}

/* Sass Compiler */
function sassCompile(done) {
    gulp.src('./src/assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoPrefixer('last 10 versions'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
}

/* Reload */
function reload(done){
    browserSync.reload();
    done();
}

/* Watch Files */
function watchFiles(done){
    gulp.watch('./src/assets/sass/**/*.scss', sassCompile);
    gulp.watch('./src/*.html', reload);
    gulp.watch('./src/assets/js/**/*.js', reload);
    done();
}





/*************************
    DIST TASKS
**************************/

/* Optimize Images */
function distImageOptimize(done) {
    gulp.src('./src/assets/images/**/*.{png,jpg,jpeg}')
        .pipe(tinypngs({
            key: 'xYMAfkMBuKzyZZdshqwIuYfv8I8bmWBe',
            sigFile: './src/images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('./dist/assets/images'));

    gulp.src('./src/assets/images/**/*.{gif,ico,svg}')
        .pipe(gulp.dest('./dist/assets/images'));

    done();
}


/* Move Fonts */
function distFonts(done) {
    gulp.src('./src/assets/fonts/*').pipe(gulp.dest('./dist/assets/fonts'));
    done();
}


/* Move css with minify */
function distCss(done) {
    gulp.src('./src/assets/css/**/*.css')
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/assets/css'));

    gulp.src('./src/assets/css/style.css')
        .pipe(cleancss())
        .pipe(gulp.dest('./dist/assets/css'));

    done();
}


/* Move js with minify */
function distJs(done) {
    gulp.src('./src/assets/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
    done();
}


/* Move HTML files */
function distHTML(done){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('dist'));

    done();
}




/*************************
    BUILD TASKS
**************************/

/* Optimize Images */
function buildImageOptimize(done) {
    gulp.src('./src/assets/images/**/*.{png,jpg,jpeg}')
        .pipe(tinypngs({
            key: 'xYMAfkMBuKzyZZdshqwIuYfv8I8bmWBe',
            sigFile: './src/images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('./build/assets/images'));

    gulp.src('./src/assets/images/**/*.{gif,ico,svg}')
        .pipe(gulp.dest('./build/assets/images'));

    done();
}


/* Move Fonts */
function buildFonts(done) {
    gulp.src('./src/assets/fonts/*').pipe(gulp.dest('./build/assets/fonts'));
    done();
}


function buildCss(done) {
    gulp.src('./src/assets/css/style.css')
        .pipe(cleancss())
        .pipe(gulp.dest('./build/assets/css'));

    done();
}


/* Move js with minify */
function buildJs(done) {
    gulp.src('./src/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/assets/js'));
    done();
}


/* Move HTML files */
function buildHTML(done){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('build'));

    done();
}


function buildCssBundle(done){
    gulp.src('./src/assets/js/vendors/*.js')
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/assets/js/vendors'));

    done();
}


/* build js */
// function buildJs() {
//     return gulp.src('./src/js/**/**/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/js'));
// }

/* build inject */
// function buildInject() {
//     gulp.parallel(buildCss, buildJs);

//     var plugincss = gulp.src('./src/*.html')
//         .pipe(gulpInject(css), {
//             relative: true
//         })
//         .pipe(gulp.dest('./build'));

//     var pluginjs = gulp.src('./src/*.html')
//         .pipe(gulpInject(js), {
//             relative: true
//         })
//         .pipe(gulp.dest('./build'));

//     var jsUtilb = gulp.src('./src/js/vendor/ui/*')
//         .pipe(gulp.dest('./build/js/vendor/ui'));

//     return gulp.parallel(plugincss, pluginjs, jsUtilb);
// }


/* distribution plugin assets bundle */
// function distPlugins() {
//     var jsPlugins = gulp.src(['./src/js/vendor/jquery/*.js', './src/js/vendor/*.js'])
//         .pipe(uglify())
//         .pipe(concat('plugins.min.js'))
//         .pipe(gulp.dest('./dist/js'));

//     var pluginCss = gulp.src('./src/css/**/*')
//         .pipe(cleancss())
//         .pipe(concat('plugins.min.css'))
//         .pipe(gulp.dest('dist/css'));

//     var jsAsset = gulp.src('./src/js//vendor/ui/*')
//         .pipe(gulp.dest('./src/js/vendor/ui'))

//     return gulp.parallel(jsPlugins, pluginCss, jsAsset);
// }

/* martplace css/js */
// function martAssets() {
//     var martJs = gulp.src(['src/js/*.js'])
//         .pipe(concat('script.min.js'))
//         .pipe(gulp.dest('dist/js'));

//     var martCss = gulp.src('src/style.css')
//         .pipe(cleancss())
//         .pipe(gulp.dest('dist'));
//     var martHtml = gulp.src('./src/*.html')
//         .pipe(gulp.dest('dist'));

//     return gulp.parallel(martJs, martCss, martHtml);
// }






/* inject assets to html files */
// function injectFiles() {
//     var css = gulp.src('./src/*.html').pipe(gulpInject(css), {relative: true})
//         .pipe(gulp.dest('./src'));
//     var js = gulp.src('./src/*.html').pipe(gulpInject(js), {relative: true})
//         .pipe(gulp.dest('./src'));

//     return gulp.parallel(css, js);
// }

// function customFunc(){
//     return gulp.src('./dist/*.html')
//         .pipe(
//             gulpInject(gulp.src(['dist/js/**', 'dist/css/**', 'dist/style.css']), {
//                 relative: true
//             })
//         )
//         .pipe(gulp.dest('dist'));
// }



// exports.default = gulp.series(serve, sassCompile, watchFiles);
// exports.build = buildImageOptimize;
// exports.dist = gulp.series( gulp.parallel(sassCompile, distPlugins, martAssets, distFonts, distImageOptimize), customFunc);


gulp.task("default", gulp.parallel(serve, sassCompile, watchFiles));
gulp.task("dist", gulp.parallel(distImageOptimize, distFonts, distCss, distJs, distHTML));
gulp.task("build", gulp.parallel(buildImageOptimize, buildFonts, buildCss, buildCssBundle, buildJs, buildHTML));

