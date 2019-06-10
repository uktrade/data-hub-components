import React from 'react'
import moment from 'moment/moment'
import { filter, get, includes, map, some } from 'lodash'
import { Details, H3, Link, Table } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'

const Card = styled('div')`
  border: 1px solid #c0c0c0;
  padding: ${SPACING.SCALE_3};
`

const CardHeader = styled('div')`
  display: flex;
  flex-flow: row wrap;
  
  & > div {
    margin-bottom: ${SPACING.SCALE_1};
  }
`

const CardHeaderDescription = styled('div')`
  flex-grow: 1;
`

const CardHeaderDate = styled('div')`
  flex-grow: 1;
  text-align: right;
`

const CardHeaderStatus = styled('div')`
  width: 100%;
  padding: ${SPACING.SCALE_2} 0 ${SPACING.SCALE_2};
`

const CardHeaderSubject = styled('div')`
  width: 100%;
  
  & > H3 {
    font-weight: normal;
    color: #005ea5;
    margin-bottom: ${SPACING.SCALE_2};
  }
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

const getDescription = (types) => {
  if (includes(types, 'dit:ServiceDelivery')) {
    return 'A service was provided to the company'
  }

  return 'An interaction with the company took place'
}

const INTERACTION_STATUS = {
  draft: {
    UPCOMING: 'Upcoming interaction',
    INCOMPLETE: 'Incomplete interaction',
  }
}

const getStatus = (activity, isUpcoming) => {
  const status = get(activity, 'object.dit:status')
  if (INTERACTION_STATUS[status]) {
    return isUpcoming ? INTERACTION_STATUS[status].UPCOMING : INTERACTION_STATUS[status].INCOMPLETE
  }
}

class DetailsRow extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { header, children } = this.props
    return (
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
    const types = get(activity, 'object.type')
    const description = getDescription(types)
    const startTime = get(activity, 'object.startTime')
    const isUpcoming = new Date(startTime) > new Date()

    const status = getStatus(activity, isUpcoming)
    const cardHeaderStatus = status ? <CardHeaderStatus><Badge>{status}</Badge></CardHeaderStatus> : null
    const cardHeaderStartTime = moment(startTime).fromNow()

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
      <Card>
        <CardHeader>
          <CardHeaderDescription>
            {description}
          </CardHeaderDescription>
          <CardHeaderDate>
            {cardHeaderStartTime}
          </CardHeaderDate>
          {cardHeaderStatus}
          <CardHeaderSubject>
            <H3>{subject}</H3>
          </CardHeaderSubject>
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
