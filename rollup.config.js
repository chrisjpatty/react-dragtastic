import babel from 'rollup-plugin-babel';
const pkg = require('./package.json');

export default {
  input: './src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  external: [
    'react',
    'prop-types',
    'shortid'
  ],
  plugins: [
    babel({
      include: 'src/**'
    })
  ]
};
