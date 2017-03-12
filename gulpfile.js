var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
 

gulp.task('uglify', function() {  
   gulp.src('quickQuery.js')
   .pipe(uglify())
   .pipe(rename("quickQuery.min.js"))
   .pipe(gulp.dest('./')); 
});  
