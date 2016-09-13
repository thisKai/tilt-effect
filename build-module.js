var fs = require('fs')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')

var development = process.env.NODE_ENV === 'development'

console.log('Trying to build tilt-effect for '+ (development ? 'development' : 'production'));

var rollupOptions = {
  entry: 'src/main.js',
  exports: 'default',
  plugins: [ babel() ]
}
var bundleOptions = {
  format: 'umd',
  moduleName: 'TiltEffect',
  dest: 'dist/tilt-effect.js'
}

if(development){
  var cache

  rollupOptions.cache = cache

  bundleOptions.sourceMap = true
}

rollup.rollup(rollupOptions).then( function(bundle) {

  return bundle.write(bundleOptions).then( function() {
    console.log('Finished building tilt-effect');
  })

}).catch( function(err) {

  console.error('Building tilt-effect failed\n', err)

})
