import { get, includes } from 'lodash'
import { RED, GREEN, BLUE } from 'govuk-colours'

const STATUS = {
  DRAFT: 'draft',
  COMPLETE: 'complete',
  UPCOMING: 'upcoming',
  INCOMPLETE: 'incomplete',
  CANCELLED: 'cancelled',
}

const BADGES = {
  COMPLETE: {
    text: 'Interaction',
    borderColour: GREEN,
  },
  UPCOMING: {
    text: 'Upcoming interaction',
    borderColour: BLUE,
  },
  INCOMPLETE: {
    text: 'Incomplete interaction',
    borderColour: BLUE,
  },
  CANCELLED: {
    text: 'Cancelled interaction',
    borderColour: RED,
  },
  SERVICE_DELIVERY: {
    text: 'Service delivery',
    borderColour: GREEN,
  },
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
      ? BADGES.SERVICE_DELIVERY
      : BADGES[status.toUpperCase()]

    const isUpcoming = status === STATUS.UPCOMING
    const typeText = isServiceDelivery(activity)
      ? 'service delivery'
      : 'interaction'

    return {
      badge,
      isUpcoming,
      typeText,
    }
  }
}
