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

  describe('passing an options object to currencyGBP()', () => {
    test('should format to 2 significant digits', () => {
      const expected = NumberUtils.currencyGBP(1234567.89, {
        maximumSignificantDigits: 2,
      })
      expect('£1,200,000').toEqual(expected)
    })
  })

  describe('passing an options object to currencyUSD()', () => {
    test('should format to 2 significant digits', () => {
      const expected = NumberUtils.currencyUSD(1234567.89, {
        maximumSignificantDigits: 2,
      })
      expect('$1,200,000').toEqual(expected)
    })
  })

  describe('the roundToSignificantDigits() function', () => {
    test('should return null when the value is null', () => {
      expect(NumberUtils.roundToSignificantDigits(null, 2)).toEqual(null)
    })

    test('should round to 2 significant digits (not scientific notation)', () => {
      expect(NumberUtils.roundToSignificantDigits(104, 2)).toEqual(100)
      expect(NumberUtils.roundToSignificantDigits(105, 2)).toEqual(110)
      expect(NumberUtils.roundToSignificantDigits(106, 2)).toEqual(110)
    })
  })
})
