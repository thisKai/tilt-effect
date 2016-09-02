'use strict';

function hitTest(bounds, mouseX, mouseY) {
  var top = bounds.top;
  var left = bounds.left;
  var bottom = bounds.bottom;
  var right = bounds.right;

  // check if pointer is between the left and right edges

  var x = mouseX >= left && mouseX <= right;
  // check if pointer is between the top and bottom edges
  var y = mouseY >= top && mouseY <= bottom;

  return x && y;
}

function tiltRotation(bounds, mouseX, mouseY) {
  // find the distance from the center of the element to the pointer
  var top = bounds.top;
  var left = bounds.left;
  var width = bounds.width;
  var height = bounds.height;

  // center of element

  var centerX = left + width / 2;
  var centerY = top + height / 2;

  // distance from pointer to center of element
  var x = (centerX - mouseX) / -width / 16;
  var y = (centerY - mouseY) / height / 16;

  return { x: x, y: y };
}

function tiltTransform(bounds, mouseX, mouseY) {
  var _tiltRotation = tiltRotation(bounds, mouseX, mouseY);

  var x = _tiltRotation.x;
  var y = _tiltRotation.y;
  var width = bounds.width;
  var height = bounds.height;

  var maxSize = width > height ? width : height;
  var minSize = width < height ? width : height;
  var perspective = minSize * 6;
  var translateZ = -20;
  // const extraTransform = 'translateY(1px)'
  var extraTransform = '';

  return 'perspective(' + perspective + 'px) translateZ(' + translateZ + 'px) rotateY(' + x + 'turn) rotateX(' + y + 'turn) ' + extraTransform;
}

function TiltEffect(_ref) {
  var tilt = _ref.tilt;
  var _ref$hit = _ref.hit;
  var hit = _ref$hit === undefined ? tilt : _ref$hit;
  var _ref$draggable = _ref.draggable;
  var draggable = _ref$draggable === undefined ? false : _ref$draggable;

  var _isTilting = false;

  var state = {
    get isTilting() {
      return _isTilting;
    },
    set isTilting(val) {
      _isTilting = val;
      tilt.classList.toggle('tilted', val);
      if (val) {
        hit.style.transform = 'none';
        state.bounds = hit.getBoundingClientRect();
      } else {
        tilt.style.transform = 'none';
      }
    },
    isMouseDown: false,
    bounds: null
  };
  var onMouseMove = function onMouseMove(e) {
    var clientX = e.clientX;
    var clientY = e.clientY;


    if (hitTest(state.bounds, clientX, clientY)) {
      state.isTilting = true;
    } else {
      state.isTilting = false;
    }
    if (state.isTilting) {
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY);
    }
  };

  var onMouseUp = function onMouseUp(e) {
    state.isTilting = false;
    state.isMouseDown = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('dragend', onMouseUp);
  };
  hit.addEventListener('mousedown', function (e) {
    state.isTilting = true;
    state.isMouseDown = true;

    var clientX = e.clientX;
    var clientY = e.clientY;

    setTimeout(function () {
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY);
    }, 0);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('dragend', onMouseUp);
  });
}

module.exports = TiltEffect;