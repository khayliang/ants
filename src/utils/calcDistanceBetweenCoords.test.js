import calculateDistanceBetweenCoords from "./calcDistanceBetweenCoords"

test("Calculate distance between coordinates", () => {
  const coord1 = {x: 0, y: 0}
  const coord2 = {x: 5, y: 5}
  const expectedDist =  Math.hypot(5, 5)
  const dist = calculateDistanceBetweenCoords(coord1, coord2)
  expect(dist).toEqual(expectedDist)
})