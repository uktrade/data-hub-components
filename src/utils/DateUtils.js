import moment from 'moment/moment'

export default class DateUtils {
  static format(dateStr) {
    return moment(dateStr).format('DD MMM YYYY')
  }
}
