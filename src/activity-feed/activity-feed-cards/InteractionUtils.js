import { get } from 'lodash'

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
  UNKNOWN: 'Unknown status',
}

const getStatus = (activity) => {
  const apiStatus = get(activity, 'object.dit:status')
  switch (apiStatus) {
    case STATUS.DRAFT:
      const isArchived = get(activity, 'object.dit:archived')
      if (isArchived) {
        return STATUS.CANCELLED
      }
      const startTime = get(activity, 'object.startTime')
      const isUpcoming = new Date(startTime) > new Date()
      return isUpcoming ? STATUS.UPCOMING : STATUS.INCOMPLETE
    case STATUS.COMPLETE:
      return STATUS.COMPLETE
  }
}

export default class CardUtils {
  static transform(activity) {
    const status = getStatus(activity)
    const badge = BADGE_LABELS[status.toUpperCase()]
    const isUpcoming = status === STATUS.UPCOMING

    return {
      badge,
      isUpcoming,
    }
  }
}