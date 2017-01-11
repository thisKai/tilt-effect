export default function hitTest(
  bounds,
  mouseX,
  mouseY,
) {
  const {
    top,
    left,
    bottom,
    right,
  } = bounds

  // check if pointer is between the left and right edges
  const x = mouseX >= left && mouseX <= right
  // check if pointer is between the top and bottom edges
  const y = mouseY >= top && mouseY <= bottom

  return x && y
}
