export default function calculateDistanceBetweenCoords (coord1, coord2) {
  return Math.hypot(coord2.y - coord1.y, coord2.x - coord1.x)
}