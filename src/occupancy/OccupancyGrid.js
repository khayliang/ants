import Tile from './Tile'

export default class {
  constructor({ width, height, tileSize = 50 } = {}) {
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
  }

  getTiles() {
    return this.tiles.flat()
  }
}
