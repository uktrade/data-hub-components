import { get, includes } from 'lodash'

const STATUS = {
  DRAFT: 'draft',
  COMPLETE: 'complete',
  UPCOMING: 'upcoming',
  INCOMPLETE: 'incomplete',
  CANCELLED: 'cancelled',
  UNKNOWN: 'unknown',
}

const BADGE_LABELS = {
  COMPLETE: 'Completed interaction',
  UPCOMING: 'Upcoming interaction',
  INCOMPLETE: 'Incomplete interaction',
  CANCELLED: 'Cancelled interaction',
  COMPLETED_SERVICE_DELIVERY: 'Completed service delivery',
}

const getStatus = (activity) => {
  const apiStatus = get(activity, 'object.dit:status')

  if (apiStatus === STATUS.DRAFT) {
    const isArchived = get(activity, 'object.dit:archived')
    if (isArchived) {
      return STATUS.CANCELLED
    }
    const startTime = get(activity, 'object.startTime')
    const isUpcoming = new Date(startTime) > new Date()
    return isUpcoming ? STATUS.UPCOMING : STATUS.INCOMPLETE
  }

  return STATUS.COMPLETE
}

const isServiceDelivery = (activity) => {
  const activityTypes = get(activity, 'object.type')
  return includes(activityTypes, 'dit:ServiceDelivery')
}

export default class CardUtils {
  static transform(activity) {
    const status = getStatus(activity)
    const badge = isServiceDelivery(activity)
      ? BADGE_LABELS.COMPLETED_SERVICE_DELIVERY
      : BADGE_LABELS[status.toUpperCase()]
    const isUpcoming = status === STATUS.UPCOMING
    const typeText = isServiceDelivery(activity) ? 'service delivery' : 'interaction'

    return {
      badge,
      isUpcoming,
      typeText,
    }
  }
}
