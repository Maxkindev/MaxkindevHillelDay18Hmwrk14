// ==============================
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

// ==============================
function style() {
  return gulp.src('./src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.', {addComment: false}))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
}

// ==========
function buildHtml() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
}

// ==========
function buildCss() {
  return gulp.src('./src/assets/css/**/*.css')
    .pipe(gulp.dest('./dist/assets/css'));
}

// ==========
function buildImages() {
  return gulp.src('./src/assets/images/**/*.*')
    .pipe(gulp.dest('./dist/assets/images'));
}

// ==========
function buildFonts() {
  return gulp.src('./src/assets/fonts/**/*.*')
    .pipe(gulp.dest('./dist/assets/fonts'));
}

// ==========
function cleanDist() {
  return del('./dist');
}

// ====================
// cb - callback function
function localServer(cb) {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    port: 7300,
    notify: false
  });
  cb();
}

// ====================
function watch() {
  gulp.watch('./src/assets/scss/**/*.scss', style);
  gulp.watch('./src/**/**/*.html').on('change', browserSync.reload);
}

// ==============================
// gulp's commands for single use.
// exports.style = style;
// exports.cleanDist = cleanDist;
 
// ==========
// If ready to -> build <- project's final files for customer
exports.build = gulp.series(
  cleanDist, 
  buildHtml, 
  buildCss, 
  buildImages, 
  buildFonts
);

// ====================
// ==== Explanation for my future kids and grandkids ====
// exports.default is GULP's DEFAULT METHOD.
// Type-> gulp <- in terminal to run this default method.
exports.default = gulp.parallel(
  localServer, 
  watch
);