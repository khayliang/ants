import { isEqual } from 'lodash'
import { Graphics } from 'pixi.js'
import Eye from './Eye'
import GameObject from './GameObject'

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

  const ownCoords = currCoords
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

  const calls = getObjectsMock.mock.calls[0][0]
  calls.forEach((coord) => {
    let match = false
    if (
      isEqual(coord, peekedCoordsLeft) ||
      isEqual(coord, peekedCoordsFront) ||
      isEqual(coord, peekedCoordsRight) ||
      isEqual(coord, ownCoords)
    ) {
      match = true
    }
    expect(match).toBe(true)
  })
})
