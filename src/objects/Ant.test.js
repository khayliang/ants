import { Ant, AntGraphic } from './Ant'

test('Ant must have graphic property to render on pixijs', () => {
  const ant = new Ant()
  expect(ant.getGraphic()).toBeInstanceOf(AntGraphic)
})

test('Ant must have an update function', () => {
  const ant = new Ant()
  expect(ant.update).toBeDefined()
})
