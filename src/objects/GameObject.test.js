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

test('radians of GameObject can be set', () => {
  const obj = new GameObject(new Graphics())
  const rad = 2
  obj.setRadians(rad)
  const objRad = obj.getRadians()
  expect(objRad).toEqual(rad)
})

test('When setting radians, use graphics setRadians function if present', () => {
  const graphic = new Graphics()
  graphic.setRadians = jest.fn()
  const obj = new GameObject(graphic)
  const rad = 2
  obj.setRadians(rad)
  expect(graphic.setRadians.mock.calls.length).toBe(1)
})

test('GameObject can set a tint', () => {
  const graphic = new Graphics()
  const obj = new GameObject(graphic)
  const tint = 0x123456
  obj.setTint(tint)
  expect(graphic.tint).toEqual(tint)
})

test('GameObject can reset tint', () => {
  const graphic = new Graphics()
  const originalTint = graphic.tint
  const obj = new GameObject(graphic)
  const tint = 0x123456
  obj.setTint(tint)
  expect(graphic.tint).toEqual(tint)
  obj.resetTint()
  expect(graphic.tint).toEqual(originalTint)
})

test("Test calculate difference of radians of coords from GameObject", () => {
  const graphic = new Graphics()
  const obj = new GameObject(graphic)  
  obj.setRadians(0)
    .setCoords({x: 0, y: 0})
  const diff = obj.radiansDiffFrom({x: 5, y: 5})
  expect(diff).toEqual(Math.PI/4)
})
