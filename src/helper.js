export function hitTest(bounds, mouseX, mouseY) {
  const {
    top,
    left,
    bottom,
    right
  } = bounds;

  // check if pointer is between the left and right edges
  const x = mouseX >= left && mouseX <= right
  // check if pointer is between the top and bottom edges
  const y = mouseY >= top && mouseY <= bottom

  return x && y
}

export function tiltRotation(bounds, mouseX, mouseY, tiltAmount) {
  // find the distance from the center of the element to the pointer
  const {
    top,
    left,
    width,
    height
  } = bounds;

  // center of element
  const centerX = left + (width / 2)
  const centerY = top + (height / 2)


  // distance from pointer to center of element
  const x = (centerX - mouseX) / -width / (16 / tiltAmount)
  const y = (centerY - mouseY) / height / (16 / tiltAmount)

  return {x, y}
}

export function tiltTransform(bounds, mouseX, mouseY, tiltAmount, sink) {
  const {x, y} = tiltRotation(bounds, mouseX, mouseY, tiltAmount)
  const {width, height} = bounds

  const perspective = 400;
  const translateZ = -10*sink
  
  const extraTransform = ''

  return `perspective(${perspective}px) translateZ(${translateZ}px) rotateY(${x}turn) rotateX(${y}turn) ${extraTransform}`
}