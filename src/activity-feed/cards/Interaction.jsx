import React from 'react'

import PropTypes from 'prop-types'
import {
  Card,
  CardDetails,
  CardHeader,
  CardHeading,
  CardMeta,
  CardTable,
  CardDetailsList,
} from './card'

import { ContactItemRenderer, AdviserItemRenderer } from './card/item-renderers'

import CardUtils from './card/CardUtils'
import InteractionUtils from './InteractionUtils'

export default class Interaction extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, [
      'dit:Interaction',
      'dit:ServiceDelivery',
    ])
  }

  render() {
    const { activity, showDetails } = this.props
    const transformed = {
      ...CardUtils.transform(activity),
      ...InteractionUtils.transform(activity),
    }

    const contacts = CardUtils.getContacts(activity)
    const advisers = CardUtils.getAdvisers(activity)

    return (
      <Card isUpcoming={transformed.isUpcoming}>
        <CardHeader>
          <CardHeading
            link={{ url: transformed.url, text: transformed.subject }}
          />
          <CardMeta
            startTime={transformed.startTime}
            badge={transformed.badge}
          />
        </CardHeader>
        <CardDetails
          summary={`View ${transformed.typeText} details`}
          link={{
            url: transformed.url,
            text: `Go to the ${transformed.typeText} detail page`,
          }}
          showDetails={showDetails}
        >
          <CardTable
            rows={[
              {
                header: 'Company contact(s)',
                content: (
                  <CardDetailsList
                    itemRenderer={ContactItemRenderer}
                    items={contacts}
                  />
                ),
              },
              {
                header: 'Adviser(s)',
                content: (
                  <CardDetailsList
                    itemRenderer={AdviserItemRenderer}
                    items={advisers}
                  />
                ),
              },
              { header: 'Services', content: transformed.service },
            ]}
          />
        </CardDetails>
      </Card>
    )
  }
}
