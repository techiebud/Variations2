
var gulp = require("gulp");
gulp.task("html", function() {
	return gulp.src("app/**/*.html")
	.pipe(gulp.dest("public/app"))	
});
gulp.task("img", function() {
	return gulp.src("img/**/*.*")
	.pipe(gulp.dest("public/img"))	
});
gulp.task("css", function() {
	return gulp.src("css/**/*.css")
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
gulp.task("favicon", function() {
	return gulp.src("favicon.ico")
	.pipe(gulp.dest("public"))	
});
gulp.task("manifest", function() {
	return gulp.src("manifest.json")
	.pipe(gulp.dest("public"))	
});
gulp.task("service-worker", function() {
	return gulp.src("service-worker.js")
	.pipe(gulp.dest("public"))	
});
gulp.task("vendor", function() {
	return gulp.src("js/vendor/*.*")
	.pipe(gulp.dest("public/js/vendor"))	
});
gulp.task("appjs", function() {
	return gulp.src("js/app/app.js")
	.pipe(gulp.dest("public/js/app"))	
});
gulp.task("info", function() {
	return gulp.src("info*.html")
	.pipe(gulp.dest("public"))	
});

gulp.task("public", ["html", "img", "css", "fonts", "documents", "favicon","manifest", "service-worker", "vendor", "appjs", "info"]);


