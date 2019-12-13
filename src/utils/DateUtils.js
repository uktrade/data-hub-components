import moment from 'moment'

export default class DateUtils {
  static format(dateStr) {
    return moment(dateStr).format('DD MMM YYYY')
  }

  static formatWithTime(dateTimeStr) {
    return moment(dateTimeStr).format('D MMM YYYY, h:mma')
  }
}
