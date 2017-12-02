import tiltTransform from './transform'
import hitTest from './hit'

/**
 * tilt an element when it is pressed
 * @param {Object} options
 * @param {HTMLElement} options.tilt - the element to be tilted
 * @param {HTMLElement} options.hit - the element that listens to pointer events, this defaults to whichever element was passed to the "tilt" option
 * @param {boolean} options.draggable
 * @param {number} options.tiltAmount
 * @param {number} options.sinkAmount
 */
export default function TiltEffect({
  tilt,
  hit = tilt,
  draggable = false,
  tiltAmount = 1,
  sinkAmount = 1,
}) {
  let _isTilting = false

  const state = {
    get isTilting() { return _isTilting },
    set isTilting(val) {
      _isTilting = val
      tilt.classList.toggle('tilted', val)
      if (val) {
        hit.style.transform = 'none'
        state.bounds = hit.getBoundingClientRect()
      } else {
        tilt.style.transform = 'none'
      }
    },
    isPointerDown: false,
    bounds: null,
  }
  const onPointerMove = e => {
    const { clientX, clientY } = e

    if (hitTest(state.bounds, clientX, clientY)) {
      state.isTilting = true
    } else {
      state.isTilting = false
    }
    if (state.isTilting) {
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY, tiltAmount, sinkAmount)
    }
  }

  const onPointerUp = e => {
    state.isTilting = false
    state.isPointerDown = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('dragend', onPointerUp)
  }
  const onPointerDown = e => {
    state.isTilting = true
    state.isPointerDown = true

    const { clientX, clientY } = e
    setTimeout(() => {
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY, tiltAmount, sinkAmount)
    }, 0)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('dragend', onPointerUp)
  }

  hit.addEventListener('pointerdown', onPointerDown)

  return {
    destroy() {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('dragend', onPointerUp)
      hit.removeEventListener('pointerdown', onPointerDown)
    },

    get tilt() { return tilt },
    set tilt(value) { tilt = value },

    get hit() { return hit },
    set hit(value) { hit = value },

    get draggable() { return draggable },
    set draggable(value) { drag = value },

    get tiltAmount() { return tiltAmount },
    set tiltAmount(value) { tiltAmount = value },

    get sinkAmount() { return sinkAmount },
    set sinkAmount(value) { sinkAmount = value },
  }
}
