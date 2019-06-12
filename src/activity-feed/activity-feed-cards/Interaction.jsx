import React from 'react'
import moment from 'moment/moment'
import {
  filter,
  get,
  includes,
  map,
  some,
  isEmpty,
} from 'lodash'
import { Details, H3, Link, Table } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'

const Card = styled('div')`
  border: ${props => props.isUpcoming ? '1px dashed #c0c0c0' : '1px solid #c0c0c0'};
  padding: ${SPACING.SCALE_3};
`

const CardHeader = styled('div')`
  display: flex;
  flex-flow: row wrap;
  
  & > div {
    margin-bottom: ${SPACING.SCALE_1};
  }
`

const CardHeaderSubject = styled('div')`
  flex: 50%;
  
  & > H3 {
    font-weight: normal;
    color: #005ea5;
    margin-bottom: ${SPACING.SCALE_2};
  }
`

const CardHeaderBadges = styled('div')`
  text-align: right;
`

const CardDetails = styled(Details)`
  font-size: 100%;
  margin-bottom: 0;
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
    children: PropTypes.node.isRequired,
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
    const isUpcoming = status === STATUS.UPCOMING

    const startTime = get(activity, 'object.startTime')
    const cardHeaderStartTime = moment(startTime).fromNow()

    const status = getStatus(activity, startTime)
    const badgeLabel =  BADGE_LABELS[status.toUpperCase()]

    const contacts = getPeople(activity, 'Contact')
    const advisers = getPeople(activity, 'Adviser')
    const subject = get(activity, 'object.dit:subject')
    const service = get(activity, 'object.dit:service.name')
    const url = get(activity, 'object.url')

    const contactsList = contacts.map(({id, name, emailAddress}) => (
      <span key={id}>
        {name} <Link href={"mailto:" + emailAddress}>{emailAddress}</Link>
      </span>
    ))

    const advisersList = advisers.map(({id, name, emailAddress}) => (
      <span key={id}>
        {name} <Link href={"mailto:" + emailAddress}>{emailAddress}</Link>
      </span>
    ))

    return (
      <Card isUpcoming={isUpcoming}>
        <CardHeader>
          <CardHeaderSubject>
            <H3>{subject}</H3>
          </CardHeaderSubject>
          <CardHeaderBadges>
            {cardHeaderStartTime}
            <div style={{ padding: '10px 0 10px' }}><Badge>{badgeLabel}</Badge></div>
          </CardHeaderBadges>
        </CardHeader>
        <CardDetails summary="Who was involved">
          <Table>
            <DetailsRow header="Contact(s)">{contactsList}</DetailsRow>
            <DetailsRow header="Adviser(s)">{advisersList}</DetailsRow>
            <DetailsRow header="Services">{service}</DetailsRow>
          </Table>
          <Link href={url}>Go to the interaction detail page</Link>
        </CardDetails>
      </Card>
    )
  }
}
