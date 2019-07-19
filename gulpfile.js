/**
 * Created by Mike on 14.07.2017.
 */

'use strict';

const gulp = require('gulp'),
  /*changed = require('gulp-changed'),*/
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  svgSprite = require('gulp-svg-sprites'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer');

// Pug
gulp.task('pug', function buildHTML() {
  return gulp.src('./app/pug/pages/**/*.pug')
  /*.pipe(changed('./app', {extension: '.html'}))*/
    .pipe(pug(/*{pretty: true}*/))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.stream(/*{match: '**//*.html'}*/));
});

// Sass + autoprefixer
gulp.task('sass', function() {
  return gulp.src('./app/sass/**/*.sass')
  /*.pipe(changed('./app/css', {extension: '.css'}))*/
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

// Browser-sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
    notify: false
  });
});

// Libs.min.js
gulp.task('scripts', function() {
  return gulp.src([
    './app/libs/jquery/dist/jquery.min.js',
    './app/libs/bootstrap/dist/js/bootstrap.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js'));
});

// Libs.min.css
gulp.task('css-libs', gulp.series('sass', function() {
  return gulp.src('./app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/css'));
}));

// Watch
gulp.task('watch', gulp.parallel('browser-sync', 'pug', 'css-libs', 'scripts', function() {
  gulp.watch('./app/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('./app/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('./app/js/**/*.js', browserSync.reload);
}));

// svgSprite
gulp.task('svg', function() {
  return gulp.src('./app/img/svg/*.svg')
    .pipe(svgSprite({
      //mode: 'symbols',
      svg: {
        sprite: '../img/svg-sprite.svg'
      },
      preview: {
        sprite: 'svg-sprite.html'
      },
      cssFile: '../css/_svg-sprite.css',
      svgPath: '%f',
      pngPath: '%f',
      padding: 2
    }))
    .pipe(gulp.dest('./app/img'));
});

// Clean dist
gulp.task('clean', function(done) {
  del.sync('./dist');
  done();
});

// Img min
gulp.task('img', function() {
  return gulp.src('./app/img/*.+(jpg|png|svg)')
  /*.pipe(cache(imagemin({
   interlaced: true,
   progressive: true,
   svgoPlugins: [{removeViewBox: false}],
   use: [pngquant()]
   })))*/
    .pipe(gulp.dest('./dist/img'));
});

// Build
gulp.task('build', gulp.series('clean', 'img', 'sass', 'scripts', function(done) {
  var buildCss = gulp.src([
    './app/css/main.css',
    './app/css/libs.min.css'
  ])
    .pipe(gulp.dest('./dist/css'));

  var buildFonts = gulp.src('./app/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));

  var buildJs = gulp.src('./app/js/**/*')
    .pipe(gulp.dest('./dist/js'));

  var buildHtml = gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist'));

  var favicon = gulp.src('./app/favicon.ico')
    .pipe(gulp.dest('./dist'));
  done();
}));

// Clear cache
gulp.task('clear', function() {
  return cache.clearAll();
});