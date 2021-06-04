import { Application } from 'pixi.js'

import Map from './Map'

jest.mock('pixi.js')

const app = new Application()

test('objects can be added to the map', () => {
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

test('when start map, objects in the map with update method are added to ticker', () => {
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
  expect(addMock.mock.calls.length).toBe(objNo)
})
