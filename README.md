# Tilt Effect
Windows Phone/Windows 10 style tilt effect for DOM elements written in javascript

## Prerequisites
This library uses W3C Pointer Events &mdash;
[JQuery PEP](https://github.com/jquery/PEP) definitely works. Despite its name, it doesn't actually require jquery. You could probably use any other polyfill though.

## Basic Usage
```javascript
var TiltEffect = require('tilt-effect')

TiltEffect({
  tilt: document.getElementById('tilt-this')
})
```
