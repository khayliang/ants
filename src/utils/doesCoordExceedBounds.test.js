import doesCoordExceedBounds from "./doesCoordExceedBounds"

test("Test if fn returns true if exceed", () => {
  const bounds = {width: 50, height: 50}
  const coord = {x: 60, y: 60}
  const exceed = doesCoordExceedBounds(coord, bounds)
  expect(exceed).toEqual(true)
})

test("Test if fn returns false if does not exceed", () => {
  const bounds = {width: 50, height: 50}
  const coord = {x: 30, y: 30}
  const exceed = doesCoordExceedBounds(coord, bounds)
  expect(exceed).toEqual(false)
})