# Tilt Effect
Windows Phone/Windows 10 style tilt effect for DOM elements written in javascript [demo](https://thiskai.github.io/tilt-effect/demo/index.html)

[![npm version](https://badge.fury.io/js/tilt-effect.svg)](https://www.npmjs.com/package/tilt-effect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Prerequisites
This library uses W3C Pointer Events, so you will need a polyfill &mdash;
[JQuery PEP](https://github.com/jquery/PEP) works well.

## Basic Usage

### CommonJS
```javascript
var TiltEffect = require('tilt-effect')

TiltEffect({
  tiltElement: document.getElementById('tilt-this')
})
```
### ES2015
```javascript
import TiltEffect from 'tilt-effect'

TiltEffect({
  tiltElement: document.getElementById('tilt-this')
})
```

## Documentation
https://thiskai.github.io/tilt-effect
