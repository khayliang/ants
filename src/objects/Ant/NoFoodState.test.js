import Eye from '../Eye'
import Food from '../Food'
import Pheromone from '../Pheromone'
import Ant from './Ant'
import FoundFoodState from './FoundFoodState'
import NoFoodState from './NoFoodState'

test('NoFoodState gives radian to move to', () => {
  const ant = new Ant()
  const state = new NoFoodState(ant)
  const rad = state.getDirection()
  expect(typeof rad).toEqual('number')
})

test('NoFoodState gives random radians to move', () => {
  const initialRadians = 0
  const ant = new Ant({
    getRandomValue: () => Math.random(),
    initialRadians,
  })
  const state = new NoFoodState(ant)
  expect(state.getDirection()).not.toEqual(initialRadians)
  expect(state.getDirection()).not.toEqual(initialRadians)
  expect(state.getDirection()).not.toEqual(initialRadians)
  expect(state.getDirection()).not.toEqual(initialRadians)
})

test('NoFoodState sprays a default pheromone', () => {
  const addFn = jest.fn()
  const ant = new Ant({
    trail: {
      add: addFn,
    },
  })

  const state = new NoFoodState(ant)
  state.sprayPheromone()
  expect(addFn.mock.calls[0][0]).toBeInstanceOf(Pheromone)
})

test('When eye detects food, ant state changes to FoundFoodState', () => {
  const ant = new Ant()
  const food = new Food()
  food.setCoords({ x: 0, y: 0 })
  ant.setCoords({ x: 0, y: 0 })
  ant.setEye({
    getNearbyObjects: () => [food],
  })

  ant.update()
  expect(ant.state).toBeInstanceOf(FoundFoodState)
})
