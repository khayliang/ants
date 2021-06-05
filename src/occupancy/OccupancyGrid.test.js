import { Graphics } from 'pixi.js'
import GameObject from '../objects/GameObject'
import OccupancyGrid from './OccupancyGrid'
import Tile from './Tile'

test('All tiles from grid can be gotten as array', () => {
  const tileSize = 10
  const width = 55
  const height = 50
  const grid = new OccupancyGrid({
    width,
    height,
    tileSize,
  })
  const tiles = grid.getTiles()
  const expectedTileAmt = Math.ceil(width / tileSize) * Math.ceil(height / tileSize)
  expect(tiles.length).toEqual(expectedTileAmt)
  tiles.forEach((tile) => {
    expect(tile).toBeInstanceOf(Tile)
  })
})

test('Object can be added to grid', () => {
  const tileSize = 10
  const width = 50
  const height = 50
  const grid = new OccupancyGrid({
    width,
    height,
    tileSize,
  })
  const coords = { x: 20, y: 20 }
  const obj = new GameObject(new Graphics())
  obj.setCoords(coords)
  grid.addObject(obj)
  const objs = grid.getObjectsInCoords(coords)
  expect(objs[0]).toBe(obj)
})

test('Object can be removed from the grid', () => {
  const tileSize = 10
  const width = 50
  const height = 50
  const grid = new OccupancyGrid({
    width,
    height,
    tileSize,
  })
  const coords = { x: 20, y: 20 }
  const obj = new GameObject(new Graphics())
  obj.setCoords(coords)
  grid.addObject(obj)
  const objs = grid.getObjectsInCoords(coords)
  expect(objs[0]).toBe(obj)
  grid.removeObject(obj)
  const newObjs = grid.getObjectsInCoords(coords)
  expect(newObjs.length).toBe(0)
})
