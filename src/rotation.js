export default function tiltRotation(
  bounds,
  mouseX,
  mouseY,
  tiltAmount,
) {
  // find the distance from the center of the element to the pointer
  const {
    top,
    left,
    width,
    height,
  } = bounds

  // center of element
  const centerX = left + (width / 2)
  const centerY = top + (height / 2)


  // distance from pointer to center of element
  const x = (centerX - mouseX) / -width / (16 / tiltAmount)
  const y = (centerY - mouseY) / height / (16 / tiltAmount)

  return { x, y }
}
