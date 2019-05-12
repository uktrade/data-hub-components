import React from 'react'
import PropTypes from 'prop-types'
import { Link, InsetText, Table, Paragraph, H3 } from 'govuk-react'
import { filter, includes, get, map } from 'lodash'
import moment from 'moment'

const getPeople = (activity, personSubType) => {
  return map(filter(activity['object']['attributedTo'], ({ type }) => {
      return includes(type, `dit:${personSubType}`)
    }), ({ id, name, 'dit:emailAddress': emailAddress }) => {
      return {
        id,
        name,
        emailAddress,
      }
    })
}

export default class ActivityFeedCard extends React.Component {
  static propTypes = {
    activity: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      showMoreContent: false,
    }

    this.onMoreContentClick = this.onMoreContentClick.bind(this)
  }

  onMoreContentClick(event) {
    event.preventDefault()

    this.setState({ showMoreContent: !this.state.showMoreContent })
  }

  render() {
    const { activity } = this.props
    const published = moment(activity.published).fromNow()
    const advisers = getPeople(activity, 'Adviser')
    const subject = get(activity, 'object.dit:subject')
    const service = get(activity, 'object.dit:service.name')
    const url = get(activity, 'object.url')

    return (
      <div style={{ border: '1px solid #c0c0c0', padding: '10px' }}>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          <div style={{ flexGrow: 1, marginBottom: '10px' }}>
            <Paragraph>An interaction with the company took place</Paragraph>
          </div>
          <div style={{ flexGrow: 1, marginBottom: '10px', textAlign: 'right' }}>
            <Paragraph>{published}</Paragraph>
          </div>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <H3 style={{ fontWeight: 'normal', color: '#005ea5' }}>{subject}</H3>
          </div>
        </div>
        <Link href="#" onClick={this.onMoreContentClick}>Who was involved</Link>
        {
          this.state.showMoreContent ? <div>
            <InsetText style={{ backgroundColor: '#f8f8f8', marginTop: '10px' }}>
              <Table>
                <Table.Row>
                  <Table.CellHeader style={{ fontWeight: 'normal', border: 0 }}>Advisers</Table.CellHeader>
                  <Table.Cell style={{ border: 0 }}>
                    {advisers.map(({ id, name, emailAddress }) => {
                      return <React.Fragment key={id}>
                          <span>
                            {name} <Link href={"mailto:" + emailAddress}>{emailAddress}</Link>
                          </span>
                      </React.Fragment>
                    })}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.CellHeader style={{ fontWeight: 'normal', border: 0 }}>DIT team</Table.CellHeader>
                  <Table.Cell style={{ border: 0 }}>
                    team
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.CellHeader style={{ fontWeight: 'normal', border: 0 }}>Services</Table.CellHeader>
                  <Table.Cell style={{ border: 0 }}>{service}</Table.Cell>
                </Table.Row>
              </Table>
              <Link href={url}>Go to the interaction detail page</Link>
            </InsetText>
          </div> : null
        }
      </div>
    )
  }
}
