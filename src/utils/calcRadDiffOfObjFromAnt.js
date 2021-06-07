export default function calcRadDiffOfObjFromAnt(ant, obj) {
  const antCoords = ant.getCoords()
  const objCoords = obj.getCoords()
  const absoluteRadians = Math.atan2(-objCoords.y + antCoords.y, -objCoords.x + antCoords.x) + Math.PI
  const radiansDiff = absoluteRadians - ant.getRadians()
  return radiansDiff
}