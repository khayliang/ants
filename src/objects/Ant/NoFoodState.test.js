import Ant from "./Ant"
import NoFoodState from "./NoFoodState"

test("NoFoodState gives radian to move to", () => {
  const ant = new Ant()
  const state = new NoFoodState(ant)
  const rad = state.getDirection()
  expect(typeof rad).toEqual('number')
})
