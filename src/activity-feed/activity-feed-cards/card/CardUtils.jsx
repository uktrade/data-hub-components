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

const createJobTitleMarkup = ({ id, url, name, jobTitle }) => {
  if (!name) {
    return null
  }

  const contactJobTitle = jobTitle ? `(${jobTitle})` : null

  return (
    <span key={id}>
      <Link href={url}>{name}</Link> {contactJobTitle}
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
      teamName: team ? team.name : null,
      jobTitle,
      emailAddress,
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

  static getPeopleAsList(activity, personSubType) {
    const people = getPeople(activity, personSubType)
    return people.map(obj => createEmailAddressMarkup(obj))
  }

  static getContactsWithJobTitle(activity) {
    const people = getPeople(activity, 'Contact')
    return people.map(obj => createJobTitleMarkup(obj))
  }

  static getAddedBy = (activity) => {
    const name = get(activity, 'actor.name')
    const emailAddress = get(activity, 'actor.dit:emailAddress')
    return createEmailAddressMarkup({ name, emailAddress })
  }
}
