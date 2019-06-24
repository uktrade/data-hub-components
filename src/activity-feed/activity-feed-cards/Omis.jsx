import React from 'react'
import { get } from 'lodash'

import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardDetails,
  CardHeading,
  CardHeadingBlock,
  CardMeta,
  CardTable,
} from './card'

import CardUtils from './card/CardUtils'

export default class Omis extends React.Component {
  static propTypes = {
    activity: PropTypes.object.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, [
      'dit:OMISOrder',
    ])
  }

  render() {
    const { activity } = this.props

    const published = get(activity, 'published')
    const reference = get(activity, 'object.name')
    const country = get(activity, 'object.dit:country.name')
    const ukRegion = get(activity, 'object.dit:ukRegion.name')
    const url = get(activity, 'object.url')

    return (
      <Card>
        <CardContent>
          <CardHeadingBlock text="New Order (OMIS) added" />
          <CardHeading link={{ url, text: reference }} />
          <CardDetails
            summary="View key details and people for this order"
            link={{ url, text: 'Go to the order detail page' }}
          >
            <CardTable rows={
              [
                { header: 'Country', content: country },
                { header: 'UK region', content: ukRegion },
                { header: 'Added by', content: CardUtils.getAddedBy(activity) },
                { header: 'Company contact', content: CardUtils.getContactsWithJobTitle(activity) },
              ]}
            />
          </CardDetails>
        </CardContent>
        <CardMeta startTime={published} />
      </Card>
    )
  }
}
