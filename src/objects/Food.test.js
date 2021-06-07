import Food from './Food'

test('Food can be taken by ant', () => {
  const food = new Food()
  expect(food.isTaken()).toEqual(false)
  food.take()
  expect(food.isTaken()).toEqual(true)
})

test('When food is taken, food removes itself from the grid and app', () => {
  const onTakenMock = jest.fn()
  const food = new Food({
    onTake: onTakenMock,
  })
  food.take()
  expect(onTakenMock).toHaveBeenCalledWith(food)
})
