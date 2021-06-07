import Food from '../Food'
import PheromoneNavigation from '../PheromoneNavigation'
import Ant from './Ant'
import StateFoundFood from './StateFoundFood'
import StateNoFood from './StateNoFood'

test('StateNoFood gives radian to move to', () => {
  const ant = new Ant()
  const state = new StateNoFood(ant)
  const rad = state.getDirection()
  expect(typeof rad).toEqual('number')
})

test('StateNoFood gives random radians to move', () => {
  const initialRadians = 0
  const ant = new Ant({
    getRandomValue: () => Math.random(),
    initialRadians,
  })
  const state = new StateNoFood(ant)
  expect(state.getDirection()).not.toEqual(initialRadians)
  expect(state.getDirection()).not.toEqual(initialRadians)
  expect(state.getDirection()).not.toEqual(initialRadians)
  expect(state.getDirection()).not.toEqual(initialRadians)
})

test('StateNoFood sprays a navigation pheromone', () => {
  const addFn = jest.fn()
  const ant = new Ant({
    trail: {
      add: addFn,
    },
  })

  const state = new StateNoFood(ant)
  state.sprayPheromone()
  expect(addFn.mock.calls[0][0]).toBeInstanceOf(PheromoneNavigation)
})

test('When eye detects food, ant state changes to StateFoundFood', () => {
  const ant = new Ant({
    speed: 0,
  })
  const food = new Food()
  food.setCoords({ x: 0, y: 0 })
  ant.setCoords({ x: 5, y: 5 })
  ant.setEye({
    getNearbyObjects: () => [food],
    getNearbyClassInstances: () => [food]
  })

  ant.update()
  expect(ant.state).toBeInstanceOf(StateFoundFood)
})
