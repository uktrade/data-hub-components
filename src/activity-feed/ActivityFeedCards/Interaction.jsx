import React from 'react'
import moment from 'moment/moment'
import {
  filter,
  get,
  includes,
  map,
} from 'lodash'
import {
  Details,
  Link,
  Paragraph,
  Table,
  H3,
} from 'govuk-react'

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

export default class Interaction extends React.Component {
  static canRender(activity) {
    const type = get(activity, 'object.type')

    return includes(type, 'dit:Interaction')
  }

  render() {
    const {activity} = this.props
    const published = moment(activity.published).fromNow()
    const advisers = getPeople(activity, 'Adviser')
    const subject = get(activity, 'object.dit:subject')
    const service = get(activity, 'object.dit:service.name')
    const url = get(activity, 'object.url')

    return (
      <div style={{border: '1px solid #c0c0c0', padding: '10px'}}>
        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
          <div style={{flexGrow: 1, marginBottom: '10px'}}>
            <Paragraph>An interaction with the company took place</Paragraph>
          </div>
          <div style={{flexGrow: 1, marginBottom: '10px', textAlign: 'right'}}>
            <Paragraph>{published}</Paragraph>
          </div>
          <div style={{width: '100%', marginBottom: '10px'}}>
            <H3 style={{fontWeight: 'normal', color: '#005ea5'}}>{subject}</H3>
          </div>
        </div>
        <Details summary="Who was involved" style={{fontSize: '100%', marginBottom: 0}}>
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
              <Table.CellHeader style={{fontWeight: 'normal', border: 0}}>DIT team</Table.CellHeader>
              <Table.Cell style={{border: 0}}>
                team
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.CellHeader style={{fontWeight: 'normal', border: 0}}>Services</Table.CellHeader>
              <Table.Cell style={{border: 0}}>{service}</Table.Cell>
            </Table.Row>
          </Table>
          <Link href={url}>Go to the interaction detail page</Link>
        </Details>
      </div>
    )
  }
}