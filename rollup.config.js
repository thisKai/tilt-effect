import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const dev = process.env.NODE_ENV === 'development'

const base = {
  exports: 'default',
  plugins: [babel()],
  name: 'TiltEffect',
  sourcemap: dev,
}
export default [
  Object.assign({}, base, {
    input: 'src/main-umd.js',
    output: {
      file: pkg.browser,
      format: 'umd',
    },
  }),
  Object.assign({}, base, {
    input: 'src/main-umd.js',
    output: {
      file: pkg.main,
      format: 'cjs',
    },
  }),
  Object.assign({}, base, {
    input: 'src/main-es.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
  }),
]