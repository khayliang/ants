// give coordinate of other end of bounds, if coordinate exceed bounds
export default (coords, mapSize) => {
  const { x, y } = coords
  const { width, height } = mapSize

  if (x >= width) {
    return { x: 0, y: height - y }
  }
  if (x < 0) {
    return { x: width - 1, y: height - y }
  }

  if (y >= height) {
    return { x: width - x, y: 0 }
  }
  if (y < 0) {
    return { x: width - x, y: height - 1 }
  }

  return coords
}
