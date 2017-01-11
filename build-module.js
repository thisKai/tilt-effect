var fs = require('fs')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var pkg = require('./package.json')

var development = process.env.NODE_ENV === 'development'

var rollupOptionsBase = {
  exports: 'default',
  plugins: [babel()],
}
var rollupOptionsUMD = Object.assign({}, rollupOptionsBase, {
  entry: 'src/main-umd.js',
})
var rollupOptionsES = Object.assign({}, rollupOptionsBase, {
  entry: 'src/main-es.js',
})

var bundleOptionsBase = {
  moduleName: 'TiltEffect',
  sourceMap: development,
}
var bundleOptionsUMD = Object.assign({}, bundleOptionsBase, {
  dest: pkg.main,
  format: 'umd',
})
var bundleOptionsES = Object.assign({}, bundleOptionsBase, {
  dest: pkg.module,
  format: 'es',
})

function build(bundleType, rollupOptions, bundleOptions) {
  console.log('Trying to build tilt-effect for', bundleType, '(', development ? 'development' : 'production', ')')

  rollup.rollup(rollupOptions)
    .then(function (bundle) {
      return bundle.write(bundleOptions)
        .then(function () {
          console.log('Finished building tilt-effect for', bundleType)
        })
    })
    .catch(function (err) {
      console.error('Building tilt-effect for', bundleType, 'failed\n', err)
    })

}

build('umd', rollupOptionsUMD, bundleOptionsUMD)
build('es', rollupOptionsES, bundleOptionsES)
