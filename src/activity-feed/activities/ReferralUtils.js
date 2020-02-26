import { get } from 'lodash'
import { BADGES } from '../constants'

export default class ReferralUtils {
  static getStatus(activity) {
    const status = get(activity, 'object.dit:status')
    return BADGES.REFERRAL[status.toUpperCase()]
  }
}
