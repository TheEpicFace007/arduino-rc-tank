const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");

gulp.task("default", () => {
  return gulp.src("./build/*.html")
    .pipe(replace("rel=\"stylesheet\">", "rel=\"preload\" as=\"style\">"))
    .pipe(gulp.dest("./build"));
}); 