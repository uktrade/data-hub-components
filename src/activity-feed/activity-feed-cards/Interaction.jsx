import React from 'react'
import moment from 'moment/moment'
import {
  filter,
  get,
  includes,
  isEmpty,
  map,
  some,
} from 'lodash'
import {
  Details,
  H3,
  Link,
  Table,
} from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'

const Card = styled('div')`
  border: ${({ isUpcoming }) => isUpcoming ? '1px dashed #c0c0c0' : '1px solid #c0c0c0'};
  padding: ${SPACING.SCALE_3};
  display: flex;
  flex-flow: row wrap;
`

const CardContent = styled('div')`
  flex: 50%;
  
  & > H3 {
    font-weight: normal;
    color: #005ea5;
    margin-bottom: ${SPACING.SCALE_2};
    
    & > a:link, a:visited, a:hover, a:active {
      text-decoration: none;
    }
  }
`

const CardDetails = styled(Details)`
  font-size: 100%;
  margin: ${SPACING.SCALE_3} 0 0;
`

const CardMeta = styled('div')`
  text-align: right;
`

const CardBadges = styled('div')`
  padding: ${SPACING.SCALE_2} 0 ${SPACING.SCALE_2};
`

const Badge = styled('span')`
  border: 2px solid #c0c0c0;
  border-radius: 4px;
  padding: 2px 4px;
`

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

const getStatus = (activity, startTime) => {
  const apiStatus = get(activity, 'object.dit:status')
  switch (apiStatus) {
    case STATUS.DRAFT:
      const isArchived = get(activity, 'object.dit:archived')
      if (isArchived) {
        return STATUS.CANCELLED
      }
      const isUpcoming = new Date(startTime) > new Date()
      return isUpcoming ? STATUS.UPCOMING : STATUS.INCOMPLETE
    case STATUS.COMPLETE:
      return STATUS.COMPLETE
    default:
      return STATUS.UNKNOWN;
  }
}

class DetailsRow extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { header, children } = this.props
    return isEmpty(children) ? null : (
      <Table.Row>
        <Table.CellHeader style={{fontWeight: 'normal', border: 0}}>{header}</Table.CellHeader>
        <Table.Cell style={{border: 0}}>{children}</Table.Cell>
      </Table.Row>
    )
  }
}

export default class Interaction extends React.Component {
  static canRender(activity) {
    const types = get(activity, 'object.type')

    return some([ 'dit:Interaction', 'dit:ServiceDelivery' ], (type) => {
      return includes(types, type)
    })
  }

  render() {
    const { activity } = this.props

    const url = get(activity, 'object.url')
    const subject = get(activity, 'object.dit:subject')
    const service = get(activity, 'object.dit:service.name')
    const startTime = get(activity, 'object.startTime')
    const cardHeaderStartTime = moment(startTime).fromNow()
    const status = getStatus(activity, startTime)
    const badgeLabel =  BADGE_LABELS[status.toUpperCase()]

    const isUpcoming = status === STATUS.UPCOMING
    const contacts = getPeople(activity, 'Contact')
    const contactsList = contacts.map(({id, name, emailAddress}) => (
      <span key={id}>
        {name} <Link href={"mailto:" + emailAddress}>{emailAddress}</Link>
      </span>
    ))

    const advisers = getPeople(activity, 'Adviser')
    const advisersList = advisers.map(({id, name, emailAddress}) => (
      <span key={id}>
        {name} <Link href={"mailto:" + emailAddress}>{emailAddress}</Link>
      </span>
    ))

    return (
      <Card isUpcoming={status === STATUS.UPCOMING}>
        <CardContent>
          <H3>
            <Link href={url}>{subject}</Link>
          </H3>
          <CardDetails summary="Who was involved">
            <Table>
              <DetailsRow header="Contact(s)">{contactsList}</DetailsRow>
              <DetailsRow header="Adviser(s)">{advisersList}</DetailsRow>
              <DetailsRow header="Services">{service}</DetailsRow>
            </Table>
            <Link href={url}>Go to the interaction detail page</Link>
          </CardDetails>
        </CardContent>
        <CardMeta>
          {cardHeaderStartTime}
          <CardBadges>
            <Badge>{badgeLabel}</Badge>
          </CardBadges>
        </CardMeta>
      </Card>
    )
  }
}
