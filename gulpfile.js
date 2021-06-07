"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var sass = require('gulp-sass');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: "./app/build",
    port: 3002
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./app/build/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src(['./node_modules/bootstrap/*scss/*', './node_modules/bootstrap/dist/*js/*'])
    .pipe(gulp.dest('./app/build/vendor/bootstrap'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js',
    ])
    .pipe(gulp.dest('./app/build/vendor/jquery'));

    var masonry = gulp.src([
      './node_modules/masonry-layout/dist/*',
    ])
    .pipe(gulp.dest('./app/build/vendor/masonry'));

    var owlCarousel = gulp.src([
      './node_modules/owl.carousel/dist/**/*',
    ])
    .pipe(gulp.dest('./app/build/vendor/owlcarousel'));

    var select2 = gulp.src([
      './node_modules/@ttskch/select2-bootstrap4-theme/dist/*',
      './node_modules/select2/dist/js/*',
      './node_modules/select2/dist/css/*',
    ])
    .pipe(gulp.dest('./app/build/vendor/select2'));

    var fontawesome = gulp.src([
      './node_modules/@fortawesome/fontawesome-free/*css/all.min.css',
      './node_modules/@fortawesome/fontawesome-free/*webfonts/*',
    ])
    .pipe(gulp.dest('./app/build/vendor/fontawesome'));

    var gsap = gulp.src([
      './node_modules/gsap/dist/*',
    ])
    .pipe(gulp.dest('./app/build/vendor/gsap'));

  return merge(bootstrap, jquery, masonry, owlCarousel, select2,fontawesome, gsap);
}

function gulpTask(done) {
  // Gets .html and .nunjucks files in pages
  var nunjucks = gulp.src('app/pages/**/*.+(html|njk)')
  .pipe(data(function() {
    return require('./app/data.json')
  }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in build folder
  .pipe(gulp.dest('app/build'));

  // Gets assets files in build
  var assets = gulp.src('app/*assets/**/*')
  .pipe(gulp.dest('app/build'));

  // Gets scss compiled to css
  var assets = gulp.src('app/assets/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/build/assets/css/'));

  done();
}




// Watch filesz
function watchFiles() {
  gulp.watch("./app/build/**/*.css", browserSyncReload);
  gulp.watch("./app/build/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor,gulpTask);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;