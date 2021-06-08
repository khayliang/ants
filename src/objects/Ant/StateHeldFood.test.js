import Food from '../Food'
import Nest from '../Nest'
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

test('When eye detects nest, ant changes direction to nest', () => {
  const initialRadians = 0
  const nest = new Nest()
  const ant = new Ant({
    initialRadians,
    eye: {
      getNearbyClassInstances: () => [nest]
    }
  })
  const food = new Food()
  nest.setCoords({ x: 5, y: 5 })
  ant.setCoords({ x: 0, y: 0 })
  const state = new StateHeldFood(ant, food)
  const newDirection = state.getDirection()
  expect(typeof newDirection).toEqual('number')
  expect(newDirection).not.toEqual(initialRadians)
})
