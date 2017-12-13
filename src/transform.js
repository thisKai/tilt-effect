import tiltRotation from './rotation'

export default function tiltTransform(
  bounds,
  mouseX,
  mouseY,
  tiltAmount,
  sinkAmount,
) {
  const { x, y } = tiltRotation(
    bounds,
    mouseX,
    mouseY,
    tiltAmount,
  )
  const { width, height } = bounds

  const perspective = 400
  const translateZ = -10 * sinkAmount

  return `perspective(${perspective}px) translateZ(${translateZ}px) rotateY(${x}turn) rotateX(${y}turn)`
}
