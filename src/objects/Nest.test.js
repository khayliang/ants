import Nest from './Nest'
import Ant from './Ant'
import NestGraphic from './NestGraphic'

test('Nest must have NestGraphic property to render on pixijs', () => {
  const nest = new Nest()
  expect(nest.getGraphic()).toBeInstanceOf(NestGraphic)
})

test('Ants can be added to the nest', () => {
  const nest = new Nest()
  const ant = new Ant()
  nest.addAnt(ant)
  expect(nest.ants).toEqual(expect.arrayContaining([ant]))
})

test('Ants added to the nest have start coords at the nest', () => {
  const nest = new Nest()
  const coords = { x: 50, y: 50 }
  nest.setCoords(coords)
  const ant = new Ant()
  nest.addAnt(ant)
  expect(ant.getCoords()).toMatchObject(nest.getCoords())
})
