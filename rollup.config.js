import pkg from './package.json'
import base from './rollup.base.config'

export default [
  Object.assign({}, base, {
    input: 'src/main-umd.js',
    output: [{
      file: pkg.browser,
      format: 'umd',
    },{
      file: pkg.main,
      format: 'cjs',
    }],
  }),
  Object.assign({}, base, {
    input: 'src/main-es.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
  }),
]
