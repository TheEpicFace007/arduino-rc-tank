const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");

gulp.task("default", () => {
  return gulp.src("./build/*.html")
    .pipe(replace("rel=\"stylesheet\">", "rel=\"preload\" as=\"style\">"))
    .pipe(replace("<script src=\"*.js\"", (match, p1, offset, string)  => {
      console.log({ match, p1, offset, string});
      
    }))
    .pipe(gulp.dest("./build"));
}); 