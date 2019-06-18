import {filter, get, includes, map, some} from 'lodash'
import {Link} from 'govuk-react'
import React from 'react'

const getPeople = (activity, personSubType) => {
  return map(filter(activity['object']['attributedTo'], ({type}) => {
    return includes(type, `dit:${personSubType}`)
  }), ({id, name, 'dit:emailAddress': emailAddress}) => {
    return {
      id,
      name,
      emailAddress,
    }
  })
}

export default class CardUtils {
  static canRenderByTypes(activity, types) {
    const activityTypes = get(activity, 'object.type')

    return some(types, (type) => {
      return includes(activityTypes, type)
    })
  }

  static transform(activity) {
    return {
      url: get(activity, 'object.url'),
      subject: get(activity, 'object.dit:subject'),
      service: get(activity, 'object.dit:service.name'),
      startTime: get(activity, 'object.startTime'),
    }
  }

  static getPeopleAsList(activity, personSubType) {
    const people = getPeople(activity, personSubType)
    return people.map(({id, name, emailAddress}) => (
      <span key={id}>
        {name} <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>
      </span>
    ))
  }
}