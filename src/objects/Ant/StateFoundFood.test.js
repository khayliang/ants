import Food from '../Food'
import Ant from './Ant'
import StateFoundFood from './StateFoundFood'
import StateHeldFood from './StateHeldFood'
import StateNoFood from './StateNoFood'

test('When eye detects food, ant changes direction to food', () => {
  const initialRadians = 0
  const ant = new Ant({
    initialRadians,
  })
  const food = new Food()
  food.setCoords({ x: 5, y: 5 })
  ant.setCoords({ x: 0, y: 0 })
  const state = new StateFoundFood(ant, food)
  const newDirection = state.getDirection()
  expect(typeof newDirection).toEqual('number')
  expect(newDirection).not.toEqual(initialRadians)
})

test('When chasing food but food taken, ant changes state to StateNoFood', () => {
  const initialRadians = 0
  const ant = new Ant({
    initialRadians,
  })
  const food = new Food()
  food.setCoords({ x: 5, y: 5 })
  food.take()
  ant.setCoords({ x: 0, y: 0 })
  const state = new StateFoundFood(ant, food)
  state.getDirection()
  expect(ant.state).toBeInstanceOf(StateNoFood)
})

test('When ant touches targetFood, ant changes state to StateHeldFood', () => {
  const initialRadians = 0
  const ant = new Ant({
    initialRadians,
    reachDistance: 10,
    speed: 0,
  })
  const food = new Food()
  food.setCoords({ x: 5, y: 5 })
  ant.setCoords({ x: 0, y: 0 })
  ant.setEye({
    getNearbyObjects: () => [food],
    getNearbyClassInstances: (classType) => {
      if (classType.name === Food.name) {
        return [food]
      }
      return []
    },
  })
  ant.update()
  ant.update()
  ant.update()
  ant.update()

  expect(food.isTaken()).toEqual(true)
  expect(ant.state).toBeInstanceOf(StateHeldFood)
})
