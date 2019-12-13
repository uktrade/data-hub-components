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

  describe('the formatWithTime() function', () => {
    test("should correctly format today's date and time", () => {
      const today = moment().format('D MMM YYYY, h:mma')
      expect(DateUtils.formatWithTime()).toEqual(today)
    })

    test('should correctly format a given date and time', () => {
      const dateAndTime = '2019-12-10T18:12:37.649476Z'
      const formattedDateAndTime = DateUtils.formatWithTime(dateAndTime)
      expect(formattedDateAndTime).toEqual('10 Dec 2019, 6:12pm')
    })
  })
})
