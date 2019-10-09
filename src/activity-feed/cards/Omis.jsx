import React from 'react'
import { get } from 'lodash'

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

import { AdviserItemRenderer, ContactItemRenderer } from './card/item-renderers'
import { ACTIVITY_TYPE } from '../constants'

import CardUtils from './card/CardUtils'

export default class Omis extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, ACTIVITY_TYPE.Omis)
  }

  render() {
    const { activity, showDetails } = this.props

    const published = get(activity, 'published')
    const reference = get(activity, 'object.name')
    const country = get(activity, 'object.dit:country.name')
    const ukRegion = get(activity, 'object.dit:ukRegion.name')
    const url = get(activity, 'object.url')
    const adviser = CardUtils.getAdviser(activity)
    const contacts = CardUtils.getContacts(activity)

    return (
      <Card>
        <CardHeader>
          <CardHeading
            link={{ url, text: reference }}
            blockText="New Order (OMIS) added"
          />
          <CardMeta startTime={published} />
        </CardHeader>
        <CardDetails
          summary="View key details and people for this order"
          link={{ url, text: 'Go to the order detail page' }}
          showDetails={showDetails}
        >
          <CardTable
            rows={[
              { header: 'Country', content: country },
              { header: 'UK region', content: ukRegion },
              {
                header: 'Added by',
                content: adviser ? (
                  <CardDetailsList
                    itemRenderer={AdviserItemRenderer}
                    items={[adviser]}
                  />
                ) : null,
              },
              {
                header: 'Company contact(s)',
                content: (
                  <CardDetailsList
                    itemRenderer={ContactItemRenderer}
                    items={contacts}
                  />
                ),
              },
            ]}
          />
        </CardDetails>
      </Card>
    )
  }
}
