(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.TiltEffect = factory());
}(this, (function () { 'use strict';

function tiltRotation(bounds, mouseX, mouseY, tiltAmount) {
  // find the distance from the center of the element to the pointer
  var top = bounds.top,
      left = bounds.left,
      width = bounds.width,
      height = bounds.height;

  // center of element

  var centerX = left + width / 2;
  var centerY = top + height / 2;

  // distance from pointer to center of element
  var x = (centerX - mouseX) / -width / (16 / tiltAmount);
  var y = (centerY - mouseY) / height / (16 / tiltAmount);

  return { x: x, y: y };
}

function tiltTransform(bounds, mouseX, mouseY, tiltAmount, sinkAmount) {
  var _tiltRotation = tiltRotation(bounds, mouseX, mouseY, tiltAmount),
      x = _tiltRotation.x,
      y = _tiltRotation.y;

  var width = bounds.width,
      height = bounds.height;


  var perspective = 400;
  var translateZ = -10 * sinkAmount;

  var extraTransform = '';

  return 'perspective(' + perspective + 'px) translateZ(' + translateZ + 'px) rotateY(' + x + 'turn) rotateX(' + y + 'turn) ' + extraTransform;
}

function hitTest(bounds, mouseX, mouseY) {
  var top = bounds.top,
      left = bounds.left,
      bottom = bounds.bottom,
      right = bounds.right;

  // check if pointer is between the left and right edges

  var x = mouseX >= left && mouseX <= right;
  // check if pointer is between the top and bottom edges
  var y = mouseY >= top && mouseY <= bottom;

  return x && y;
}

/**
 * tilt an element when it is pressed
 *
 * @param {Object} options
 * @param {HTMLElement} options.tiltElement - the element that will be transformed
 * @param {HTMLElement} options.hitElement - the element that listens to pointer events, by default it is the same as the tiltElement
 * @param {boolean} options.draggable
 * @param {number} options.tiltAmount
 * @param {number} options.sinkAmount
 *
 * @return {TiltEffectInstance} a tilt effect instance
 */
function TiltEffect$1(_ref) {
  var tiltElement = _ref.tiltElement,
      _ref$hitElement = _ref.hitElement,
      hitElement = _ref$hitElement === undefined ? tiltElement : _ref$hitElement,
      _ref$draggable = _ref.draggable,
      draggable = _ref$draggable === undefined ? false : _ref$draggable,
      _ref$tiltAmount = _ref.tiltAmount,
      tiltAmount = _ref$tiltAmount === undefined ? 1 : _ref$tiltAmount,
      _ref$sinkAmount = _ref.sinkAmount,
      sinkAmount = _ref$sinkAmount === undefined ? 1 : _ref$sinkAmount;

  var _isTilting = false;

  var state = {
    get isTilting() {
      return _isTilting;
    },
    set isTilting(val) {
      _isTilting = val;
      tiltElement.classList.toggle('tilted', val);
      if (val) {
        hitElement.style.transform = 'none';
        state.bounds = hitElement.getBoundingClientRect();
      } else {
        tiltElement.style.transform = 'none';
      }
    },
    isPointerDown: false,
    bounds: null
  };
  var onPointerMove = function onPointerMove(e) {
    var clientX = e.clientX,
        clientY = e.clientY;


    if (hitTest(state.bounds, clientX, clientY)) {
      state.isTilting = true;
    } else {
      state.isTilting = false;
    }
    if (state.isTilting) {
      tiltElement.style.transform = tiltTransform(state.bounds, clientX, clientY, tiltAmount, sinkAmount);
    }
  };

  var onPointerUp = function onPointerUp(e) {
    state.isTilting = false;
    state.isPointerDown = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('dragend', onPointerUp);
  };
  var onPointerDown = function onPointerDown(e) {
    state.isTilting = true;
    state.isPointerDown = true;

    var clientX = e.clientX,
        clientY = e.clientY;

    setTimeout(function () {
      tiltElement.style.transform = tiltTransform(state.bounds, clientX, clientY, tiltAmount, sinkAmount);
    }, 0);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('dragend', onPointerUp);
  };

  hitElement.addEventListener('pointerdown', onPointerDown);

  return {
    destroy: function destroy() {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('dragend', onPointerUp);
      hitElement.removeEventListener('pointerdown', onPointerDown);
    },


    get tiltElement() {
      return tiltElement;
    },
    set tiltElement(value) {
      tiltElement = value;
    },

    get hitElement() {
      return hitElement;
    },
    set hitElement(value) {
      hitElement = value;
    },

    get draggable() {
      return draggable;
    },
    set draggable(value) {
      drag = value;
    },

    get tiltAmount() {
      return tiltAmount;
    },
    set tiltAmount(value) {
      tiltAmount = value;
    },

    get sinkAmount() {
      return sinkAmount;
    },
    set sinkAmount(value) {
      sinkAmount = value;
    }
  };
}

/**
 * @typedef {Object} TiltEffectInstance
 * @property {function()} destroy remove all event handlers created by this instance
 * @property {HTMLElement} tiltElement
 * @property {HTMLElement} hitElement
 * @property {boolean} draggable
 * @property {number} tiltAmount
 * @property {number} sinkAmount
 */

TiltEffect$1.hitTest = hitTest;
TiltEffect$1.tiltTransform = tiltTransform;

return TiltEffect$1;

})));
