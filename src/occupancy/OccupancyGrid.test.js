import OccupancyGrid from './OccupancyGrid'
import Tile from './Tile'

test('Tiles from grid can be gotten', () => {
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
