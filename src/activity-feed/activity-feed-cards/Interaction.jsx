import React from 'react'

import PropTypes from 'prop-types'
import {
  Card,
  CardDetails,
  CardHeader,
  CardHeading,
  CardMeta,
  CardTable,
  PeopleList,
} from './card'

import CardUtils from './card/CardUtils'
import InteractionUtils from './InteractionUtils'

export default class Interaction extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, [
      'dit:Interaction',
      'dit:ServiceDelivery',
    ])
  }

  render() {
    const { activity } = this.props
    const transformed = {
      ...CardUtils.transform(activity),
      ...InteractionUtils.transform(activity),
    }

    const contacts = CardUtils.getContacts(activity)
    const advisers = CardUtils.getAdvisers(activity)

    return (
      <Card isUpcoming={transformed.isUpcoming}>
        <CardHeader>
          <CardHeading link={{ url: transformed.url, text: transformed.subject }} />
          <CardMeta startTime={transformed.startTime} badge={transformed.badge} />
        </CardHeader>
        <CardDetails
          summary={`View ${transformed.typeText} details`}
          link={{ url: transformed.url, text: `Go to the ${transformed.typeText} detail page` }}
        >
          <CardTable rows={
            [
              { header: 'Company contact(s)', content: <PeopleList people={contacts} /> },
              { header: 'Adviser(s)', content: <PeopleList people={advisers} /> },
              { header: 'Services', content: transformed.service },
            ]
          }
          />
        </CardDetails>
      </Card>
    )
  }
}
