import Pheromone from "../Pheromone"
import Ant from "./Ant"
import NoFoodState from "./NoFoodState"

test("NoFoodState gives radian to move to", () => {
  const ant = new Ant()
  const state = new NoFoodState(ant)
  const rad = state.getDirection()
  expect(typeof rad).toEqual('number')
})

test('NoFoodState sprays a default pheromone', () => {
  const addFn = jest.fn()
  const ant = new Ant({
    defaultTrail: {
      add: addFn
    },
  })

  const state = new NoFoodState(ant)
  state.sprayPheromone()
  expect(addFn.mock.calls[0][0]).toBeInstanceOf(Pheromone)
})
