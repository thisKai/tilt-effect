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

export function tiltRotation(bounds, mouseX, mouseY) {
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
  const x = (centerX - mouseX) / -width / 16
  const y = (centerY - mouseY) / height / 16

  return {x, y}
}

export function tiltTransform(bounds, mouseX, mouseY) {
  const {x, y} = tiltRotation(bounds, mouseX, mouseY)
  const {width, height} = bounds
  const maxSize = width > height ? width : height
  const minSize = width < height ? width : height
  const perspective = minSize*6
  const translateZ = -20
  // const extraTransform = 'translateY(1px)'
  const extraTransform = ''

  return `perspective(${perspective}px) translateZ(${translateZ}px) rotateY(${x}turn) rotateX(${y}turn) ${extraTransform}`
}