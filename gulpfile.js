const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('buildjs', () => {
  return gulp.src(['src/index.js', 'src/dnd-reducer.js', 'src/DragAndDrop.js'])
    .pipe(babel({
        presets: ['es2015', 'react', 'stage-0']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('buildcss', () => {
  return gulp.src('src/DragAndDrop.css')
    .pipe(gulp.dest('build'));
})

gulp.task('build', ['buildjs', 'buildcss'])
