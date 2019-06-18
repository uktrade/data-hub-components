import React from 'react'

import {
  Card,
  CardContent,
  CardDetails,
  CardHeading,
  CardMeta,
  CardTable,
} from './card'
import CardUtils from './card/CardUtils'
import InteractionUtils from './InteractionUtils'

export default class Interaction extends React.Component {
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

    return (
      <Card isUpcoming={transformed.isUpcoming}>
        <CardContent>
          <CardHeading link={{ url: transformed.url, text: transformed.subject }}></CardHeading>
          <CardDetails summary="View interaction details" link={{ url: transformed.url, text: 'Go to the interaction detail page' }}>
            <CardTable rows={
              [
                { header: 'Contact(s)', content: CardUtils.getPeopleAsList(activity, 'Contact') },
                { header: 'Adviser(s)', content: CardUtils.getPeopleAsList(activity, 'Adviser') },
                { header: 'Services', content: transformed.service },
              ]
            } />
          </CardDetails>
        </CardContent>
        <CardMeta startTime={transformed.startTime} badge={transformed.badge} />
      </Card>
    )
  }
}
