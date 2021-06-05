import Map from './Map'
import AntGraphic from './objects/AntGraphic'
import GameObject from './objects/GameObject'

const { Application } = jest.createMockFromModule('pixi.js')

test('objects can be added to the map', () => {
  const app = new Application()

  const mockObject = {
    getGraphic: jest.fn(),
  }

  // mock pixijs ticker add function
  const addChildMock = jest.fn()
  app.stage = {
    addChild: addChildMock,
  }

  const map = new Map(app)
  map.addObject(mockObject)
  expect(addChildMock.mock.calls.length).toBe(1)
  expect(mockObject.getGraphic.mock.calls.length).toBe(1)
})

test('when start map, objects in the map with update method and map update are added to ticker', () => {
  const app = new Application()

  const mockObjects = []
  const objNo = 10
  for (let i = 0; i !== objNo; i += 1) {
    mockObjects.push({
      update: jest.fn(),
    })
  }
  mockObjects.push({})
  // mock pixijs ticker add function
  const addMock = jest.fn()

  app.ticker = {
    add: addMock,
  }

  const map = new Map(app)
  mockObjects.forEach((obj) => map.addObject(obj))
  map.start()
  expect(addMock.mock.calls.length).toBe(objNo + 1)
})

test('Map teleports object to other side if out of bounds', () => {
  const bounds = {
    width: 60,
    height: 60,
  }

  const app = new Application(bounds)
  app.stage = {
    addChild: () => {},
  }
  app.screen = bounds
  const map = new Map(app)

  const obj = new GameObject(new AntGraphic())
  map.addObject(obj)
  let coords = {
    x: 100,
    y: 25,
  }
  obj.setCoords(coords)
  map.update()

  let expectedCoords = {
    x: 0,
    y: bounds.height - coords.y,
  }
  expect(obj.getCoords()).toMatchObject(expectedCoords)

  coords = {
    x: -1,
    y: 25,
  }
  obj.setCoords(coords)
  map.update()

  expectedCoords = {
    x: bounds.width - 1,
    y: bounds.height - coords.y,
  }
  expect(obj.getCoords()).toMatchObject(expectedCoords)

  coords = {
    x: 25,
    y: -1,
  }
  obj.setCoords(coords)
  map.update()

  expectedCoords = {
    x: bounds.width - coords.x,
    y: bounds.height - 1,
  }
  expect(obj.getCoords()).toMatchObject(expectedCoords)

  coords = {
    x: 45,
    y: 100,
  }
  obj.setCoords(coords)
  map.update()

  expectedCoords = {
    x: bounds.width - coords.x,
    y: 0,
  }
  expect(obj.getCoords()).toMatchObject(expectedCoords)
})
