import base from './rollup.base.config'

export default Object.assign({}, base, {
  input: 'src/main-umd.js',
  output: {
    file: './docs/script/tilt-effect.js',
    format: 'umd',
  },
})
