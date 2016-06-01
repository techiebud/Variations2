
var gulp = require("gulp");
gulp.task("html", function() {
	return gulp.src("app/**/*.html")
	.pipe(gulp.dest("public/app"))	
});
gulp.task("img", function() {
	return gulp.src("img/*.*")
	.pipe(gulp.dest("public/img"))	
});
gulp.task("css", function() {
	return gulp.src("css/*.css")
	.pipe(gulp.dest("public/css"))	
});
gulp.task("fonts", function() {
	return gulp.src("fonts/*.*")
	.pipe(gulp.dest("public/fonts"))	
});
gulp.task("documents", function() {
	return gulp.src("documents/*.*")
	.pipe(gulp.dest("public/documents"))	
});


gulp.task("public", ["html", "img", "css", "fonts", "documents"]);


