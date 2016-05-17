var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    babel = require("gulp-babel"),
    livereload = require("gulp-livereload"),
    nodemon = require("gulp-nodemon"),
    templateCache = require("gulp-angular-templatecache");

const src = {
    css: {
        app: [
            "./client/css/main.css"
        ],
        vendors: [
            "./client/components/bootstrap/dist/css/bootstrap.min.css"
        ]
    },
    fonts: {
        vendors: [
            "./client/components/bootstrap/dist/fonts/*"
        ]
    },
    js: {
        app: [
            "./client/js/app.js",
            "./client/js/**/*.js"
        ],
        vendors: [
            "./client/components/jquery/dist/jquery.min.js",
            "./client/components/angular/angular.min.js",
            "./client/components/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "./client/components/angular-route/angular-route.min.js",
            "./client/components/validate/validate.min.js",
            "./client/components/rtc/dist/rtc.min.js",
            "./shared/**/*.js"
            //"./"
        ]
    }
};

function errorHandler(e) {
    console.log(e.toString());
    this.emit("end");
}

gulp.task("start", function () {
    nodemon({
        script: "server.js"
        , ext: "js"
        , env: {"NODE_ENV": "development"}
    })
});

gulp.task("css:vendors", function () {
    gulp.src(src.css.vendors)
        .pipe(concat("vendors.min.css"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(livereload());

    gulp.src(src.fonts.vendors)
        .pipe(gulp.dest("./public/fonts/"))
});

gulp.task("css:app", function () {
    gulp.src(src.css.app)
        .pipe(gulp.dest("./public/css"))
        .pipe(livereload());
});

gulp.task("js:app", function () {
    gulp.src(src.js.app)
        .pipe(babel({
            presets: ["es2015"]
        }))
        .on("error", errorHandler)
        .pipe(uglify())
        .on("error", errorHandler)
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest("./public/js"))
        .pipe(livereload());
});

gulp.task("js:vendors", function () {
    gulp.src(src.js.vendors)
        .pipe(concat("vendors.min.js"))
        .pipe(gulp.dest("./public/js"))
        .pipe(livereload());
});

gulp.task("js:templates", function () {
    gulp.src("./client/**/*.html")
        .pipe(templateCache())
        .on("error", errorHandler)
        .pipe(gulp.dest("public/js"))
        .pipe(livereload());
});

gulp.task("watch", ["js:app", "js:templates", "js:vendors", "css:vendors", "css:app"], function () {
    livereload.listen();
    gulp.run("start");
    gulp.watch(src.js.app, ["js:app"]);
    gulp.watch(src.js.vendors, ["js:vendors"]);
    gulp.watch("./client/js/**/*.html", ["js:templates"]);
    gulp.watch(src.css.app, ["css:app"]);
});


gulp.task("default", ["js:app", "js:templates", "js:vendors", "css:vendors", "css:app"], function () {

});