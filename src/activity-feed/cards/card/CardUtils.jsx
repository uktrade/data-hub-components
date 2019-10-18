/* eslint-disable react/prop-types */
import { filter, get, includes, map, some, pickBy } from 'lodash'

const mapPeople = (activity, personType, mapper) => {
  const { attributedTo } = activity.object
  return map(
    filter(attributedTo, ({ type }) => {
      return includes(type, personType)
    }),
    mapper
  )
}

const getContacts = (activity) => {
  return mapPeople(
    activity,
    'dit:Contact',
    ({ id, url, name, 'dit:jobTitle': jobTitle }) => {
      return pickBy({
        id,
        url,
        name,
        jobTitle, // Optional field,
        type: 'Contact',
      })
    }
  )
}

const getAdvisers = (activity) => {
  return mapPeople(
    activity,
    'dit:Adviser',
    ({ id, name, 'dit:emailAddress': emailAddress, 'dit:team': team }) => {
      return pickBy({
        id,
        name,
        emailAddress,
        team: get(team, 'name'), // Only available for Interactions
        type: 'Adviser',
      })
    }
  )
}

export default class CardUtils {
  static canRenderByTypes(activity, types) {
    const activityTypes = get(activity, 'object.type')

    return (
      some(types, (type) => includes(activityTypes, type)) ||
      CardUtils.canRenderByMyActivity(activity, types)
    )
  }

  /*
   * TODO(jf): This is only a prototype, need to check the business rules for the right properties
   *  NB: needs thorough optimisation, as it might affect performance
   */
  static canRenderByMyActivity(activity, myDetails) {
    const types = ['dit:Adviser']
    const activityTypes = get(activity, 'object.attributedTo')

    return activityTypes
      ? some(
          activityTypes.map((item) => {
            return includes(item.type, types[0])
              ? some(myDetails, (detail) => {
                  return (
                    includes(item.email, detail) ||
                    includes(item.name, detail) ||
                    includes(item.id, detail)
                  )
                })
              : false
          }),
          (myActivity) => myActivity === true
        )
      : false
  }

  static getAdvisers(activity) {
    return getAdvisers(activity)
  }

  static getContacts(activity) {
    return getContacts(activity)
  }

  static getAdviser = (activity) => {
    const adviser = {
      id: get(activity, 'actor.id'),
      name: get(activity, 'actor.name'),
      emailAddress: get(activity, 'actor.dit:emailAddress'),
    }

    return adviser.name && adviser.emailAddress ? adviser : null
  }

  static transform(activity) {
    return {
      url: get(activity, 'object.url'),
      subject: get(activity, 'object.dit:subject'),
      service: get(activity, 'object.dit:service.name'),
      startTime: get(activity, 'object.startTime'),
    }
  }
}
