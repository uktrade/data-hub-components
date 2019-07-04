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
  PeopleList,
  AddedBy,
} from './card'

import CardUtils from './card/CardUtils'

export default class Omis extends React.PureComponent {
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
    const contacts = CardUtils.getContacts(activity)

    let adviser = CardUtils.getAddedBy(activity)
    adviser = adviser ? <AddedBy adviser={adviser} /> : null

    return (
      <Card>
        <CardHeader>
          <CardHeading link={{ url, text: reference }} blockText="New Order (OMIS) added" />
          <CardMeta startTime={published} />
        </CardHeader>
        <CardDetails
          summary="View key details and people for this order"
          link={{ url, text: 'Go to the order detail page' }}
        >
          <CardTable rows={
            [
              { header: 'Country', content: country },
              { header: 'UK region', content: ukRegion },
              { header: 'Added by', content: adviser },
              { header: 'Company contact', content: <PeopleList people={contacts} /> },
            ]}
          />
        </CardDetails>
      </Card>
    )
  }
}
