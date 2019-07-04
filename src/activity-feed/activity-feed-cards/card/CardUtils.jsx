import {
  filter, get, includes, map, some,
} from 'lodash'

const getPeople = (activity, personSubType) => {
  const { attributedTo } = activity.object
  return map(filter(attributedTo, ({ type }) => {
    return includes(type, `dit:${personSubType}`)
  }), ({ id, url, name, 'dit:jobTitle': jobTitle, 'dit:team': team }) => {
    return {
      id,
      url,
      name,
      teamName: team ? team.name : null,
      jobTitle,
      type: personSubType,
    }
  })
}

export default class CardUtils {
  static canRenderByTypes(activity, types) {
    const activityTypes = get(activity, 'object.type')

    return some(types, type => includes(activityTypes, type))
  }

  static transform(activity) {
    return {
      url: get(activity, 'object.url'),
      subject: get(activity, 'object.dit:subject'),
      service: get(activity, 'object.dit:service.name'),
      startTime: get(activity, 'object.startTime'),
    }
  }

  static getAdvisers(activity) {
    return getPeople(activity, 'Adviser')
  }

  static getContacts(activity) {
    return getPeople(activity, 'Contact')
  }

  static getAddedBy = (activity) => {
    const addedBy = {
      name: get(activity, 'actor.name'),
      emailAddress: get(activity, 'actor.dit:emailAddress'),
    }

    if (!addedBy.name || !addedBy.emailAddress) {
      return null
    }

    return addedBy
  }
}
