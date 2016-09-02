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
    isMouseDown: false,
    bounds: null
  }
  const onMouseMove = e => {
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

  const onMouseUp = e => {
    state.isTilting = false
    state.isMouseDown = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('dragend', onMouseUp)
  }
  hit.addEventListener('mousedown', e => {
    state.isTilting = true
    state.isMouseDown = true

    const {clientX, clientY} = e
    setTimeout(()=>{
      tilt.style.transform = tiltTransform(state.bounds, clientX, clientY)
    }, 0)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('dragend', onMouseUp)
  })
}