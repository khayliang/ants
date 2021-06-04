import { Graphics } from 'pixi.js'

import GameObject from './GameObject'

test('GameObject must have graphic', () => {
  const graphic = new Graphics()
  const obj = new GameObject(graphic)
  expect(obj.getGraphic()).toBe(graphic)
})

test('Coordinate of GameObject can be set', () => {
  const obj = new GameObject(new Graphics())
  const coords = {
    x: 50,
    y: 50,
  }
  obj.setCoords(coords)
  const objCoords = obj.getCoords()
  expect(objCoords).toMatchObject(coords)
})
