import {hitTest, tiltRotation, tiltTransform} from './helper.js'

export default function TiltEffect({
  tilt,
  hit=tilt,
  draggable=false
}){
  let _isTilting = false

  const state = {
    get isTilting(){ return _isTilting },
    set isTilting(val){
      _isTilting = val
      tilt.classList.toggle('tilted', val)
      if(val){
        hit.style.transform = 'none'
        state.bounds = hit.getBoundingClientRect()
      }else{
        tilt.style.transform = 'none'
      }
    },
    isPointerDown: false,
    bounds: null
  }
  const onPointerMove = e => {
    const {clientX, clientY} = e

    if(hitTest(state.bounds, clientX, clientY)){
      state.isTilting = true;
    }else{
      state.isTilting = false;
    }
    if(state.isTilting){
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY)
    }
  }

  const onPointerUp = e => {
    state.isTilting = false
    state.isPointerDown = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('dragend', onPointerUp)
  }
  hit.addEventListener('pointerdown', e => {
    state.isTilting = true
    state.isPointerDown = true

    const {clientX, clientY} = e
    setTimeout(()=>{
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY)
    }, 0)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('dragend', onPointerUp)
  })
}