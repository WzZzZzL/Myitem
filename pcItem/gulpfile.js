const gulp = require("gulp"),
  htmlmin = require("gulp-htmlmin"),
  cleanCss = require("gulp-clean-css"),
  del = require("del"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  connect = require("gulp-connect"),
  sass = require("gulp-sass");

// 在每次开启新任务之前先把dist删掉
const delDist = () => del(["dist"]);

// 先把所有的任务用到的文件源路径和目标路径做一个统一规划
const path = {
  html: {
    src: "src/**/*.html",
    dest: "dist"
  },
  css: {
    src: "src/css/**/*.scss",
    dest: "dist/css"
  },
  js: {
    src: "src/js/**/*.js",
    dest: "dist/js"
  },
  img: {
    src: "src/images/**/*",
    dest: "dist/images"
  },
  libs: {
    src: "src/libs/**/*",
    dest: "dist/libs"
  }
};

// 制定html任务：通过函数的方式
const html = () => {
  // 需要把任务代码return
  return gulp
    .src(path.html.src)
    .pipe(
      htmlmin({
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
      })
    )
    .pipe(gulp.dest(path.html.dest))
    .pipe(connect.reload());
};

// css任务：先把scss文件编译成css，再压缩
const css = () => {
  return gulp
    .src(path.css.src)
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest(path.css.dest))
    .pipe(connect.reload());
};

// js任务
const js = () => {
  return gulp
    .src(path.js.src)
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(path.js.dest))
    .pipe(connect.reload());
};

// img任务：复制到dist里
const img = () => gulp.src(path.img.src).pipe(gulp.dest(path.img.dest));

// libs任务
const libs = () => gulp.src(path.libs.src).pipe(gulp.dest(path.libs.dest));

// server任务
const server = () => {
  connect.server({
    root: "dist",
    livereload: true,
    port: 1030
  });
};

// watch任务：监听一些文件的修改，一旦被修改了就自动重启对应的任务
const watch = () => {
  gulp.watch(path.html.src, html);
  gulp.watch(path.css.src, css);
  gulp.watch(path.js.src, js);
};

// gulp.series 是同步执行任务，第一个执行完了才能执行第二个
// gulp.parallel 是异步执行任务，多个任务同时运行
module.exports.default = gulp.series(
  delDist,
  gulp.parallel(html, css, js, img, libs, server, watch)
);

// module.exports = {
//   delDist,
//   html,
//   css
// }
