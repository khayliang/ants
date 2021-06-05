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
