import Food from './Food'

test('Food can be taken by ant', () => {
  const food = new Food()
  expect(food.isTaken()).toEqual(false)
  food.take()
  expect(food.isTaken()).toEqual(true)
})
