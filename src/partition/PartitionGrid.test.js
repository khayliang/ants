import { Graphics } from 'pixi.js'
import GameObject from '../objects/GameObject'
import PartitionGrid from './PartitionGrid'
import Tile from './Tile'

test('All tiles from grid can be gotten as array', () => {
  const tileSize = 10
  const width = 55
  const height = 50
  const grid = new PartitionGrid({
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
  const tileSize = 50
  const width = 50
  const height = 50
  const grid = new PartitionGrid({
    width,
    height,
    tileSize,
  })
  const coords = { x: 20, y: 20 }
  const obj = new GameObject(new Graphics())
  obj.setCoords(coords)
  grid.addObject(obj)
  const [tile] = grid.getTiles()
  const [objInTile] = tile.getObjects()
  expect(objInTile).toBe(obj)
})

test('Object added to grid can be gotten by coords', () => {
  const tileSize = 10
  const width = 50
  const height = 50
  const grid = new PartitionGrid({
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

test('Multiple coords can be given to grid', () => {
  const tileSize = 10
  const width = 50
  const height = 50
  const grid = new PartitionGrid({
    width,
    height,
    tileSize,
  })
  const coordsList = [
    { x: 20, y: 20 },
    { x: 40, y: 40 },
    { x: 10, y: 10 },
  ]
  coordsList.forEach((coord) => {
    const obj = new GameObject(new Graphics())
    obj.setCoords(coord)
    grid.addObject(obj)
  })

  const objs = grid.getObjectsInMultipleCoords(coordsList)
  expect(objs.length).toBe(3)
})

test('Object can be removed from the grid', () => {
  const tileSize = 10
  const width = 50
  const height = 50
  const grid = new PartitionGrid({
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

test('Occupancy grid can update tiles', () => {
  const tileSize = 50
  const width = 50
  const height = 50
  const grid = new PartitionGrid({
    width,
    height,
    tileSize,
  })
  const tiles = grid.getTiles()
  const mockUpdate = jest.fn()
  tiles.forEach((tile) => {
    tile.update = mockUpdate
  })
  grid.update()
  expect(mockUpdate).toHaveBeenCalled()
})

test('Coords that exceed bounds arent gotten from tile', () => {
  const tileSize = 10
  const width = 50
  const height = 50
  const grid = new PartitionGrid({
    width,
    height,
    tileSize,
  })
  const coordsList = [
    { x: 60, y: 60 },
    { x: -5, y: -5 },
    { x: -50, y: 3 },
    { x: 33, y: 60 },
  ]
  coordsList.forEach((coord) => {
    const obj = new GameObject(new Graphics(), { width, height })
    obj.setCoords(coord)
    grid.addObject(obj)
  })

  const objs1 = grid.getObjectsInMultipleCoords(coordsList)
  expect(objs1.length).toBe(0)
  const objs2 = grid.getObjectsInCoords(coordsList[0])
  expect(objs2.length).toBe(0)
})
