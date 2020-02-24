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

const getCompany = (activity) => {
  return get(activity, 'object.attributedTo', [])
    .filter(({ type }) => type !== 'dit:Company')
    .map(({ name }) => ({ name }))
    .shift()
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

const canRenderByTypes = (activity, types) => {
  const activityTypes = get(activity, 'object.type')

  return some(types, (type) => includes(activityTypes, type))
}

const getAdviser = (activity) => {
  const adviser = {
    id: get(activity, 'actor.id'),
    name: get(activity, 'actor.name'),
    emailAddress: get(activity, 'actor.dit:emailAddress'),
  }

  return adviser.name && adviser.emailAddress ? adviser : null
}

const getRoleDetails = (activity, role) => {
  return activity.object.attributedTo.filter(
    (attr) => attr['dit:DataHubCompanyReferral:role'] === role
  )
}

const transformReferral = (activity) => {
  const [sender] = getRoleDetails(activity, 'sender')
  const [recipient] = getRoleDetails(activity, 'recipient')

  return {
    id: get(activity, 'id'),
    startTime: get(activity, 'object.startTime'),
    subject: get(activity, 'object.dit:subject'),
    status: get(activity, 'object.dit:status'),
    sender: {
      name: get(sender, 'name'),
      email: get(sender, 'dit:emailAddress'),
      team: get(sender, 'dit:team[name]'),
    },
    recipient: {
      name: get(recipient, 'name'),
      email: get(recipient, 'dit:emailAddress'),
      team: get(recipient, 'dit:team[name]'),
    },
    completedOn: get(activity, 'object.dit:completedOn'),
  }
}

const transform = (activity) => ({
  url: get(activity, 'object.url'),
  subject: get(activity, 'object.dit:subject'),
  service: get(activity, 'object.dit:service.name'),
  startTime: get(activity, 'object.startTime'),
})

export default {
  canRenderByTypes,
  getAdvisers,
  getContacts,
  getCompany,
  getAdviser,
  transformReferral,
  transform,
}
