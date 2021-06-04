import Ant from './Ant'
import AntGraphic from './AntGraphic'

test('Ant must have AntGraphic property to render on pixijs', () => {
  const ant = new Ant()
  expect(ant.getGraphic()).toBeInstanceOf(AntGraphic)
})

test('Ant must have an update function', () => {
  const ant = new Ant()
  expect(ant.update).toBeDefined()
})
