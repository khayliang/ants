import { isEqual, uniqWith } from 'lodash'
import doesCoordExceedBounds from '../utils/doesCoordExceedBounds'
import getCoordsWithinMap from '../utils/getCoordsWithinMap'
import Tile from './Tile'

export default class PartitionGrid {
  constructor({ width, height, tileSize = 50 } = {}) {
    this.width = width
    this.height = height
    this.tileSize = tileSize
    const tiles = []
    for (let y = 0; y !== Math.ceil(height / tileSize); y += 1) {
      const arr = []
      for (let x = 0; x !== Math.ceil(width / tileSize); x += 1) {
        const tile = new Tile({
          x: x * tileSize,
          y: y * tileSize,
          width: tileSize,
          height: tileSize,
        })
        arr.push(tile)
      }
      tiles.push(arr)
    }
    this.tiles = tiles
    this.locations = new WeakMap()
  }

  getTiles() {
    return this.tiles.flat()
  }

  addObject(obj) {
    const coords = obj.getCoords()
    const xTile = Math.floor(coords.x / this.tileSize)
    const yTile = Math.floor(coords.y / this.tileSize)
    this.locations.set(obj, { x: xTile, y: yTile })
    this.tiles[yTile][xTile].addObject(obj)
  }

  removeObject(obj) {
    const pos = this.locations.get(obj)
    this.tiles[pos.y][pos.x].removeObject(obj)
  }

  getObjectsInCoords(coords) {
    if (doesCoordExceedBounds(coords, { width: this.width, height: this.height })) return []
    const { x, y } = getCoordsWithinMap(coords, { width: this.width, height: this.height })
    const xTile = Math.floor(x / this.tileSize)
    const yTile = Math.floor(y / this.tileSize)
    return this.tiles[yTile][xTile].getObjects()
  }

  getObjectsInMultipleCoords(coordsList) {
    const tileCoordsList = coordsList.reduce((arr, coords) => {
      if (doesCoordExceedBounds(coords, { width: this.width, height: this.height })) return arr
      const { x, y } = getCoordsWithinMap(coords, { width: this.width, height: this.height })
      arr.push({
        x: Math.floor(x / this.tileSize),
        y: Math.floor(y / this.tileSize),
      })
      return arr
    }, [])
    const filteredCoordsList = uniqWith(tileCoordsList, isEqual)
    return filteredCoordsList.reduce(
      (allObjs, { x, y }) => [...allObjs, ...this.tiles[y][x].getObjects()],
      [],
    )
  }

  update() {
    this.getTiles().forEach((tile) => tile.update())
  }
}
