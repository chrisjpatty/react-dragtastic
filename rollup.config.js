import babel from 'rollup-plugin-babel'
const pkg = require('./package.json')

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'ReactDragtastic',
      globals: { react: 'React', 'prop-types': 'PropTypes' }
    },
    { file: pkg.module, format: 'es' }
  ],
  external: ['react', 'prop-types'],
  plugins: [
    babel({
      include: 'src/**'
    })
  ]
}
