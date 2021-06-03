import { Application } from 'pixi.js'

import Map from './map'

jest.mock('pixi.js')

const app = new Application()

test('when start map, objects are added to ticker', () => {
  const mockObjects = []
  const objNo = 10
  for (let i = 0; i !== objNo; i += 1) {
    mockObjects.push({
      update: jest.fn(),
    })
  }

  // mock pixijs ticker add function
  const addMock = jest.fn()
  app.ticker = {
    add: addMock,
  }

  const map = new Map(app, mockObjects)
  map.start()
  expect(addMock.mock.calls.length).toBe(objNo)
})
