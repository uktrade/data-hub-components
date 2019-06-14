import NumberUtils from './NumberUtils'

describe('NumberUtils.js', () => {
  describe('the decimal() function', () => {
    test('should return null when the decimal is undefined', () => {
      expect(NumberUtils.decimal()).toEqual(null)
    })

    test('should not add a comma to tens', () => {
      expect(NumberUtils.decimal(10)).toEqual('10')
    })

    test('should not add a comma to hundreds', () => {
      expect(NumberUtils.decimal(100)).toEqual('100')
    })

    test('should add a single comma to thousands', () => {
      expect(NumberUtils.decimal(1000)).toEqual('1,000')
    })

    test('should add a single comma to hundreds of thousands', () => {
      expect(NumberUtils.decimal(100000)).toEqual('100,000')
    })

    test('should add 2 commas to 1 million', () => {
      expect(NumberUtils.decimal(1000000)).toEqual('1,000,000')
    })

    test('should add 2 commas to 10 million', () => {
      expect(NumberUtils.decimal(10000000)).toEqual('10,000,000')
    })

    test('should add 2 commas to 100 million', () => {
      expect(NumberUtils.decimal(100000000)).toEqual('100,000,000')
    })
    test('should add 3 commas to 1 billion', () => {
      expect(NumberUtils.decimal(1000000000)).toEqual('1,000,000,000')
    })
  })
})
