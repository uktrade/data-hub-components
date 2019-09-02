import NumberUtils from '../NumberUtils'

describe('NumberUtils.js', () => {
  describe('the decimal() function', () => {
    test('should return null when the decimal is undefined', () => {
      expect(NumberUtils.decimal()).toEqual(null)
    })

    test('should add 2 commas to 1 million', () => {
      expect(NumberUtils.decimal(1000000)).toEqual('1,000,000')
    })
  })
})
