import babel from 'rollup-plugin-babel'

const dev = process.env.NODE_ENV === 'development'

export default {
  exports: 'default',
  plugins: [babel()],
  name: 'TiltEffect',
  sourcemap: dev,
}
