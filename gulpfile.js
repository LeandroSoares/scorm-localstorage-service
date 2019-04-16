const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require("gulp-sourcemaps");

const babelconfig = {
    "presets": [
        "@babel/env"
    ],
    "plugins": [
        "@babel/plugin-transform-object-assign"
    ]
};

function build_no_babel() {
    return gulp
        .src(['./src/**/*.js'])
        .pipe(concat('scorm-localstorage-service.js'))
        .pipe(gulp.dest('./dist'));
}

function build() {
    return gulp
        .src(['./src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel(babelconfig))
        .pipe(concat('scorm-localstorage-service.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./dist'));
}

function watchFiles() {
    return Promise.all([gulp.watch('./src/**/*.js', build)]);
}

const defaults = gulp.series(build_no_babel, build, watchFiles);

gulp.task("default", defaults);
gulp.task("build", gulp.series(build_no_babel, build));