/* eslint-disable react/prop-types */

import {
  filter, get, includes, map, some,
} from 'lodash'
import { Link } from 'govuk-react'
import React from 'react'

const createEmailAddressMarkup = ({ id, name, emailAddress, teamName }) => {
  if (!name || !emailAddress) {
    return null
  }

  const formattedEmailAddress = teamName ? `${emailAddress},` : emailAddress

  return (
    <span key={id}>
      {name}, <Link href={`mailto:${emailAddress}`}>{formattedEmailAddress}</Link> {teamName}
    </span>
  )
}

const getPeople = (activity, personSubType) => {
  const { attributedTo } = activity.object
  return map(filter(attributedTo, ({ type }) => {
    return includes(type, `dit:${personSubType}`)
  }), ({ id, url, name, 'dit:jobTitle': jobTitle, 'dit:emailAddress': emailAddress, 'dit:team': team }) => {
    return {
      id,
      url,
      name,
      jobTitle,
      emailAddress,
      team: team ? team.name : null,
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
    const name = get(activity, 'actor.name')
    const emailAddress = get(activity, 'actor.dit:emailAddress')
    return createEmailAddressMarkup({ name, emailAddress })
  }
}
