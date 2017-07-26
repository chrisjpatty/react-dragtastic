const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('buildjs', () => {
  return gulp.src(['example/src/DragAndDrop.js'])
    .pipe(babel({
        presets: ['es2015', 'react', 'stage-0']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['buildjs'])
