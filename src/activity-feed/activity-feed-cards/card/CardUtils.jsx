/* eslint-disable react/prop-types */
import {
  filter, get, includes, map, some,
} from 'lodash'

const getContacts = (activity) => {
  const { attributedTo } = activity.object
  return map(filter(attributedTo, ({ type }) => {
    return includes(type, 'dit:Contact')
  }), ({ id, url, name, 'dit:jobTitle': jobTitle }) => {
    return {
      id,
      url,
      name,
      jobTitle, // Optional field
    }
  })
}

const getAdvisers = (activity) => {
  const { attributedTo } = activity.object
  return map(filter(attributedTo, ({ type }) => {
    return includes(type, 'dit:Adviser')
  }), ({ id, name, 'dit:emailAddress': emailAddress, 'dit:team': team }) => {
    return {
      id,
      name,
      emailAddress,
      team: get(team, 'name'), // Only available for Interactions
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
    return getAdvisers(activity)
  }

  static getContacts(activity) {
    return getContacts(activity)
  }

  static getAddedBy = (activity) => {
    const adviser = {
      name: get(activity, 'actor.name'),
      emailAddress: get(activity, 'actor.dit:emailAddress'),
    }

    if (!adviser.name || !adviser.emailAddress) {
      return null
    }

    return adviser
  }
}
