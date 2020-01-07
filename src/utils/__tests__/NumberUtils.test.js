import NumberUtils from '../NumberUtils'

describe('NumberUtils.js', () => {
  describe('the decimal() function', () => {
    test('should return null when the decimal is undefined', () => {
      expect(NumberUtils.decimal()).toEqual(null)
    })

    test('should add 2 commas to 1 million', () => {
      expect(NumberUtils.decimal(1000000)).toEqual('1,000,000')
    })

    test('should handle value with 0', () => {
      expect(NumberUtils.decimal(0)).toEqual('0')
    })
  })

  describe('the currencyGBP() function', () => {
    test('should handle null', () => {
      expect(NumberUtils.currencyGBP(null)).toEqual(null)
    })

    test('should correctly format zero', () => {
      expect(NumberUtils.currencyGBP(0)).toEqual('£0')
    })

    test('should correctly format 1 million', () => {
      expect(NumberUtils.currencyGBP(1000000)).toEqual('£1,000,000')
    })
  })

  describe('the currencyUSD() function', () => {
    test('should handle null', () => {
      expect(NumberUtils.currencyUSD(null)).toEqual(null)
    })

    test('should correctly format zero', () => {
      expect(NumberUtils.currencyUSD(0)).toEqual('$0')
    })

    test('should correctly format 1 million', () => {
      expect(NumberUtils.currencyUSD(1000000)).toEqual('$1,000,000')
    })
  })
})
