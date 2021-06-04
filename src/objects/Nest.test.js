import Nest from "./Nest"
import Ant from "./Ant"
import NestGraphic from "./NestGraphic"

test('Nest must have NestGraphic property to render on pixijs', () => {
  const nest = new Nest()
  expect(nest.getGraphic()).toBeInstanceOf(NestGraphic)
})

test("Ants can be added to the nest", () => {
  const nest = new Nest()
  const ant = new Ant()
  nest.addAnt(ant)
  expect(nest.ants).toEqual(expect.arrayContaining([ant]))
})

