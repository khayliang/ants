import getCoordsWithinMap from './getCoordsWithinMap'

test('Function returns coords within map if coords exceed map size', () => {
  const bounds = {
    width: 60,
    height: 60,
  }

  let coords = {
    x: 100,
    y: 25,
  }
  let newCoords = getCoordsWithinMap(coords, bounds)
  let expectedCoords = {
    x: coords.x - bounds.width,
    y: 25,
  }
  expect(newCoords).toMatchObject(expectedCoords)

  coords = {
    x: -1,
    y: 25,
  }
  newCoords = getCoordsWithinMap(coords, bounds)
  expectedCoords = {
    x: bounds.width + coords.x,
    y: coords.y,
  }
  expect(newCoords).toMatchObject(expectedCoords)

  coords = {
    x: 25,
    y: -1,
  }
  newCoords = getCoordsWithinMap(coords, bounds)

  expectedCoords = {
    x: coords.x,
    y: bounds.height + coords.y,
  }
  expect(newCoords).toMatchObject(expectedCoords)

  coords = {
    x: 45,
    y: 100,
  }
  newCoords = getCoordsWithinMap(coords, bounds)

  expectedCoords = {
    x: coords.x,
    y: coords.y - bounds.height,
  }
  expect(newCoords).toMatchObject(expectedCoords)

  coords = {
    x: -1,
    y: -1,
  }
  newCoords = getCoordsWithinMap(coords, bounds)
  expectedCoords = {
    x: bounds.width + coords.x,
    y: bounds.height + coords.y,
  }
  expect(newCoords).toMatchObject(expectedCoords)
})
