import React from 'react'
import { get, uniqueId } from 'lodash'

import PropTypes from 'prop-types'
import {
  Card,
  CardDetails, CardDetailsList,
  CardHeader,
  CardHeading,
  CardMeta,
  CardTable,
} from './card'

import CardUtils from './card/CardUtils'
import DateUtils from '../../utils/DateUtils'

export default class HmrcExporter extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, [
      'dit:Export',
    ])
  }

  render() {
    const { activity, showDetails } = this.props

    const published = DateUtils.format(get(activity, 'published'))
    const reference = get(activity, 'object.attributedTo.name')
    const summary = get(activity, 'summary')
    const exportItemCodes = get(activity, 'object.dit:exportItemCodes')
    const exportItemCodesCollection = exportItemCodes.map((value, index) => {
      const id = uniqueId(`id-${index}`)
      return {
        id,
        value,
      }
    })

    return (
      <Card>
        <CardHeader>
          <CardHeading
            blockText="HMRC"
            sourceType="externalDataSource"
            subHeading="Exporters records show that"
            summary={summary}
          />
          <CardMeta startTime={published} />
        </CardHeader>

        <CardDetails
          summary="View key export details"
          showDetails={showDetails}
        >
          <CardTable rows={
            [
              { header: 'Company name', content: reference },

              {
                header: 'Export Item code(s)',
                content: <CardDetailsList
                  itemRenderer={GenericItemRenderer}
                  items={exportItemCodesCollection}
                />,
              },
            ]}
          />
        </CardDetails>
      </Card>
    )
  }
}
