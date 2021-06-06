import { Graphics } from 'pixi.js'
import GameObject from '../objects/GameObject'
import Tile from './Tile'

test('Objects can be added to tile', () => {
  const tile = new Tile({ x: 0, y: 0, width: 0, height: 0 })
  const obj = new GameObject(new Graphics())
  tile.addObject(obj)
  const objs = tile.getObjects()
  expect(objs[0]).toBe(obj)
})

test('Objects can be removed from tile', () => {
  const tile = new Tile({ x: 0, y: 0, width: 0, height: 0 })
  const obj = new GameObject(new Graphics())
  tile.addObject(obj)
  const objs = tile.getObjects()
  expect(objs[0]).toBe(obj)
  tile.removeObject(obj)
  const newObjs = tile.getObjects()
  expect(newObjs.length).toEqual(0)
})

test('When tile is queried, tint color is changed', () => {
  const tint = 0x489362
  const tile = new Tile({ x: 0, y: 0, width: 0, height: 0, tint })
  const graphic = tile.getGraphic()
  tile.getObjects()
  expect(graphic.tint).toEqual(tint)
})

test('When tile is updates after being queried, tint color is resetted', () => {
  const tint = 0x489362
  const tile = new Tile({ x: 0, y: 0, width: 0, height: 0, tint })
  const graphic = tile.getGraphic()
  const originalTint = graphic.tint
  tile.getObjects()
  expect(graphic.tint).toEqual(tint)
  tile.update()
  expect(graphic.tint).toEqual(originalTint)
})
