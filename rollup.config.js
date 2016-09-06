import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/main.js',
  format: 'umd',
  moduleName: 'TiltEffect',
  plugins: [ babel() ],
  dest: 'dist/tilt-effect.js'
}