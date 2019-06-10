import React from 'react'
import moment from 'moment/moment'
import {
  filter,
  get,
  includes,
  map,
  some,
} from 'lodash'
import {
  Details,
  Link,
  Table,
  H3,
} from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

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
    const advisers = getPeople(activity, 'Adviser')
    const subject = get(activity, 'object.dit:subject')
    const service = get(activity, 'object.dit:service.name')
    const url = get(activity, 'object.url')

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
            <Table.Row>
              <Table.CellHeader style={{fontWeight: 'normal', border: 0}}>Advisers</Table.CellHeader>
              <Table.Cell style={{border: 0}}>
                {advisers.map(({id, name, emailAddress}) => {
                  return <React.Fragment key={id}>
                      <span>
                        {name} <Link href={"mailto:" + emailAddress}>{emailAddress}</Link>
                      </span>
                  </React.Fragment>
                })}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.CellHeader style={{fontWeight: 'normal', border: 0}}>Services</Table.CellHeader>
              <Table.Cell style={{border: 0}}>{service}</Table.Cell>
            </Table.Row>
          </Table>
          <Link href={url}>Go to the interaction detail page</Link>
        </CardDetails>
      </Card>
    )
  }
}
