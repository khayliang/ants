import TileGraphic from "./TileGraphic"

test("TileGraphic can set a tint", () => {
  const graphic = new TileGraphic({x: 0, y: 0, width: 0, height: 0})
  const tint = 0x123456
  graphic.setTint(tint)
  expect(graphic.tint).toEqual(tint)
})