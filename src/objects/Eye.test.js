import { isEqual } from 'lodash'
import { Graphics } from 'pixi.js'
import Eye from './Eye'
import GameObject from './GameObject'

test('Eye can get get objects infront of it', () => {
  const currCoords = { x: 0, y: 0 }
  const rad = 0.2
  const viewDistance = 10
  const fov = 0.52 // 30 degrees -> rad

  const getObjectsMock = jest.fn()

  const obj = new GameObject(new Graphics())
  obj.setCoords(currCoords).setRadians(rad)
  const eye = new Eye({
    getObjectsAtCoords: getObjectsMock,
    object: obj,
    viewDistance,
    fov,
  })

  eye.getObjectsInfront()

  const peekedCoords = {
    x: currCoords.x + viewDistance * Math.cos(rad),
    y: currCoords.y + viewDistance * Math.sin(rad),
  }
  const calledCoords = getObjectsMock.mock.calls[0][0]
  expect(calledCoords).toMatchObject(peekedCoords)
})

test("Eye can get get objects to it's right side based on FOV", () => {
  const currCoords = { x: 0, y: 0 }
  const rad = 0.2
  const viewDistance = 10
  const fov = 0.52 // 30 degrees -> rad

  const getObjectsMock = jest.fn()

  const obj = new GameObject(new Graphics())
  obj.setCoords(currCoords).setRadians(rad)
  const eye = new Eye({
    getObjectsAtCoords: getObjectsMock,
    object: obj,
    viewDistance,
    fov,
  })

  eye.getObjectsRight()

  const peekedCoords = {
    x: currCoords.x + viewDistance * Math.cos(rad - fov),
    y: currCoords.y + viewDistance * Math.sin(rad - fov),
  }
  const calledCoords = getObjectsMock.mock.calls[0][0]
  expect(calledCoords).toMatchObject(peekedCoords)
})

test("Eye can get get objects to it's left side based on FOV", () => {
  const currCoords = { x: 0, y: 0 }
  const rad = 0.2
  const viewDistance = 10
  const fov = 0.52 // 30 degrees -> rad

  const getObjectsMock = jest.fn()

  const obj = new GameObject(new Graphics())
  obj.setCoords(currCoords).setRadians(rad)
  const eye = new Eye({
    getObjectsAtCoords: getObjectsMock,
    object: obj,
    viewDistance,
    fov,
  })

  eye.getObjectsLeft()

  const peekedCoords = {
    x: currCoords.x + viewDistance * Math.cos(rad + fov),
    y: currCoords.y + viewDistance * Math.sin(rad + fov),
  }
  const calledCoords = getObjectsMock.mock.calls[0][0]
  expect(calledCoords).toMatchObject(peekedCoords)
})

test("Eye can get objects from tiles near it's own object", () => {
  const currCoords = { x: 0, y: 0 }
  const rad = 0.2
  const viewDistance = 10
  const fov = 0.52 // 30 degrees -> rad

  const getObjectsMock = jest.fn(() => [])

  const obj = new GameObject(new Graphics())
  obj.setCoords(currCoords).setRadians(rad)
  const eye = new Eye({
    getObjectsAtCoords: getObjectsMock,
    object: obj,
    viewDistance,
    fov,
  })

  eye.getNearbyObjects()

  const peekedCoordsFront = {
    x: currCoords.x + viewDistance * Math.cos(rad),
    y: currCoords.y + viewDistance * Math.sin(rad),
  }
  const peekedCoordsRight = {
    x: currCoords.x + viewDistance * Math.cos(rad - fov),
    y: currCoords.y + viewDistance * Math.sin(rad - fov),
  }
  const peekedCoordsLeft = {
    x: currCoords.x + viewDistance * Math.cos(rad + fov),
    y: currCoords.y + viewDistance * Math.sin(rad + fov),
  }

  const flattenedCalls = getObjectsMock.mock.calls.flat()
  flattenedCalls.forEach((coord) => {
    let match = false
    if (
      isEqual(coord, peekedCoordsLeft) ||
      isEqual(coord, peekedCoordsFront) ||
      isEqual(coord, peekedCoordsRight)
    ) {
      match = true
    }
    expect(match).toBe(true)
  })
})
