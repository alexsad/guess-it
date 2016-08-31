var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

gulp.task('static_serve', function() {
  connect.server({
    root: ".",
    port: 9000,
    livereload: true,
    middleware: function(connect, opt) {
        var apiProxy = proxy('/socket.io/', {
            target: 'http://127.0.0.1:3000'
            ,changeOrigin: true
            ,pathRewrite: {
                '^/socket.io/' : '/socket.io/'
            }
        });
        return [apiProxy];
    }
  });
});

gulp.task('reload',function(){
	connect.reload();
});

gulp.task('watch',['compile','template','copy_assets'],function(){
    gulp.run('static_serve');
    gulp.watch("./src/**/*.html", ['template']);
    gulp.watch('./src/**/*.ts', ['compile']);
    gulp.watch('./src/**/assets/**/*.*', ['copy_assets']);

    gulp.watch('./dist/**/*.*').on('change',function(file){
    	gulp.src(file.path).pipe(connect.reload());
    });

});
