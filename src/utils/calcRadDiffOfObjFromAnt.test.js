import Ant from "../objects/Ant"
import Food from "../objects/Food"
import calcRadDiffOfObjFromAnt from "./calcRadDiffOfObjFromAnt"

test("Test calculate difference of radians of object from ant works", () => {
  const ant = new Ant()
  ant.setRadians(0)
    .setCoords({x: 0, y: 0})
  const food = new Food()
  food.setCoords({x: 5, y: 5})
  const diff = calcRadDiffOfObjFromAnt(ant, food)
  expect(diff).toEqual(Math.PI/4)
})
