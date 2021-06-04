import { Graphics } from 'pixi.js'

import GameObject from './GameObject'

test('GameObject must have graphic', () => {
  const graphic = new Graphics()
  const obj = new GameObject(graphic)
  expect(obj.getGraphic()).toBe(graphic)
})

test('Coordinate of GameObject can be set', () => {
  const obj = new GameObject(new Graphics())
  const x = 50
  const y = 50
  obj.setCoords({ x, y })
  const graphic = obj.getGraphic()
  const coords = obj.getCoords()
  expect(coords.x).toEqual(x)
  expect(coords.y).toEqual(y)
})
