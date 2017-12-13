import tiltTransform from './transform'
import hitTest from './hit'

/**
 * tilt an element when it is pressed
 *
 * @param {Object} options
 * @param {HTMLElement} options.tiltElement - the element that will be transformed
 * @param {HTMLElement} options.hitElement - the element that listens to pointer events, by default it is the same as the tiltElement
 * @param {boolean} options.draggable - don't handle pointer move events, set to true if the tiltElement is draggable
 * @param {number} options.tiltAmount
 * @param {number} options.sinkAmount
 *
 * @return {TiltEffectInstance} a tilt effect instance
 */
export default function TiltEffect({
  tiltElement,
  hitElement = tiltElement,
  draggable = false,
  tiltAmount = 1,
  sinkAmount = 1,
}) {
  let _isTilting = false

  const state = {
    get isTilting() { return _isTilting },
    set isTilting(val) {
      _isTilting = val
      tiltElement.classList.toggle('tilted', val)
      if (val) {
        hitElement.style.transform = 'none'
        state.bounds = hitElement.getBoundingClientRect()
      } else {
        tiltElement.style.transform = 'none'
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
      tiltElement.style.transform = tiltTransform(state.bounds, clientX, clientY, tiltAmount, sinkAmount)
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
      tiltElement.style.transform = tiltTransform(state.bounds, clientX, clientY, tiltAmount, sinkAmount)
    }, 0)

    if(!draggable){
      window.addEventListener('pointermove', onPointerMove)
    }
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('dragend', onPointerUp)
  }

  hitElement.addEventListener('pointerdown', onPointerDown)

  return {
    destroy() {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('dragend', onPointerUp)
      hitElement.removeEventListener('pointerdown', onPointerDown)
    },

    get tiltElement() { return tiltElement },
    set tiltElement(value) { tiltElement = value },

    get hitElement() { return hitElement },
    set hitElement(value) { hitElement = value },

    get draggable() { return draggable },
    set draggable(value) { draggable = value },

    get tiltAmount() { return tiltAmount },
    set tiltAmount(value) { tiltAmount = value },

    get sinkAmount() { return sinkAmount },
    set sinkAmount(value) { sinkAmount = value },
  }
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
