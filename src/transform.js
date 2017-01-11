import tiltRotation from './rotation'

export default function tiltTransform(
  bounds,
  mouseX,
  mouseY,
  tiltAmount,
  sink,
) {
  const { x, y } = tiltRotation(
    bounds,
    mouseX,
    mouseY,
    tiltAmount,
  )
  const { width, height } = bounds

  const perspective = 400
  const translateZ = -10 * sink

  const extraTransform = ''

  return `perspective(${perspective}px) translateZ(${translateZ}px) rotateY(${x}turn) rotateX(${y}turn) ${extraTransform}`
}
