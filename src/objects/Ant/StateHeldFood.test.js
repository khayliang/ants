import Food from '../Food'
import PheromoneFood from '../PheromoneFood'
import Ant from './Ant'
import StateHeldFood from './StateHeldFood'

test('StateHeldFood sprays food pheromone', () => {
  const addFn = jest.fn()
  const ant = new Ant({
    trail: {
      add: addFn,
    },
  })

  const state = new StateHeldFood(ant, new Food())
  state.sprayPheromone()
  expect(addFn.mock.calls[0][0]).toBeInstanceOf(PheromoneFood)
})
