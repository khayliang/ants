// give coordinate of other end of bounds, if coordinate exceed bounds
export default (coords, mapSize) => {
  const { x, y } = coords
  const { width, height } = mapSize

  let newCoords = { x, y }

  // corner cases

  // top right
  if (newCoords.x > width && newCoords.y < 0) {
    return { x: newCoords.x - width, y: height + newCoords.y }
  } // top left
  if (newCoords.x < 0 && newCoords.y < 0) {
    return { x: width + newCoords.x, y: height + newCoords.y }
  } // bottom right
  if (newCoords.x > width && newCoords.y > height) {
    return { x: newCoords.x - width, y: newCoords.y - height }
  } // bottom left
  if (newCoords.x < 0 && newCoords.y > height) {
    return { x: width + newCoords.x, y: newCoords.y - height }
  }

  // edge cases
  if (newCoords.x >= width) {
    newCoords = { x: 0, y: height - newCoords.y }
  } else if (newCoords.x < 0) {
    newCoords = { x: width - 1, y: height - newCoords.y }
  }

  if (newCoords.y >= height) {
    newCoords = { x: width - newCoords.x, y: 0 }
  } else if (newCoords.y < 0) {
    newCoords = { x: width - newCoords.x, y: height - 1 }
  }

  return newCoords
}
