// give coordinate of other end of bounds, if coordinate exceed bounds
export default (coords, mapSize) => {
  const { x, y } = coords
  const { width, height } = mapSize

  let newCoords = { x, y }

  // edge cases
  if (newCoords.x >= width) {
    newCoords = { x: newCoords.x - width, y: newCoords.y }
  } else if (newCoords.x < 0) {
    newCoords = { x: newCoords.x + width, y: newCoords.y }
  }

  if (newCoords.y >= height) {
    newCoords = { x: newCoords.x, y: newCoords.y - height }
  } else if (newCoords.y < 0) {
    newCoords = { x: newCoords.x, y: newCoords.y + height }
  }

  return newCoords
}
