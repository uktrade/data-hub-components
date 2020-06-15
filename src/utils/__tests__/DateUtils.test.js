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

  describe('the isDateValid() function', () => {
    test('should return true if valid', () => {
      expect(DateUtils.isDateValid('2020', '1', '1')).toEqual(true)
      expect(DateUtils.isDateValid('2020', '01', '01')).toEqual(true)
      expect(DateUtils.isDateValid(2020, 1, 1)).toEqual(true)
    })

    test('should return false if invalid', () => {
      expect(DateUtils.isDateValid('2020', '0', '1')).toEqual(false)
      expect(DateUtils.isDateValid('2020', '0', '01')).toEqual(false)
      expect(DateUtils.isDateValid(2020, 0, 1)).toEqual(false)
    })
  })

  describe('the isShortDateValid() function', () => {
    test('should return true if valid', () => {
      expect(DateUtils.isShortDateValid('2020', '1')).toEqual(true)
      expect(DateUtils.isShortDateValid('2020', '01')).toEqual(true)
      expect(DateUtils.isShortDateValid(2020, 1)).toEqual(true)
    })

    test('should return false if invalid', () => {
      expect(DateUtils.isShortDateValid('2020', '0')).toEqual(false)
      expect(DateUtils.isShortDateValid('2020', '13')).toEqual(false)
      expect(DateUtils.isShortDateValid(2020, 0)).toEqual(false)
    })
  })

  describe('transform value to DD-MM-YYYY', () => {
    test('empty or incomplete date should return null', () => {
      expect(DateUtils.transformValueForAPI({})).toEqual(null)
      expect(
        DateUtils.transformValueForAPI({ day: '', month: '', year: '' })
      ).toEqual(null)
      expect(
        DateUtils.transformValueForAPI({ day: '', month: '04', year: '2020' })
      ).toEqual(null)
    })
    describe('transforming long date formats', () => {
      test('with leading 0 should render YYYY-MM-DD', () => {
        expect(
          DateUtils.transformValueForAPI({
            year: '2020',
            month: '09',
            day: '09',
          })
        ).toEqual('2020-09-09')
      })

      test('without leading 0 should render YYYY-MM-DD', () => {
        expect(
          DateUtils.transformValueForAPI({
            year: '2020',
            month: '9',
            day: '9',
          })
        ).toEqual('2020-09-09')
      })
    })

    describe('transforming short date formats', () => {
      test('with leading 0 should render YYYY-MM-DD', () => {
        expect(
          DateUtils.transformValueForAPI({
            year: '2020',
            month: '09',
          })
        ).toEqual('2020-09-01')
      })
      test('without leading 0 should render YYYY-MM-DD', () => {
        expect(
          DateUtils.transformValueForAPI({
            year: '2020',
            month: '9',
          })
        ).toEqual('2020-09-01')
      })
    })
  })
})
