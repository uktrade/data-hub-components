import moment from 'moment'
import DateUtils from '../DateUtils'

describe('DateUtils.js', () => {
  describe('the format() function', () => {
    test("should correctly format today's date", () => {
      const today = moment().format('DD MMM YYYY')
      expect(DateUtils.format()).toEqual(today)
    })

    test('should correctly format a given date', () => {
      expect(DateUtils.format('1973-10-01')).toEqual('01 Oct 1973')
    })
  })
})
