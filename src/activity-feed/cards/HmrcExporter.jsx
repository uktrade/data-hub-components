import React from 'react'
import { get } from 'lodash'

import PropTypes from 'prop-types'
import {
  Card,
  CardDetails, CardDetailsList,
  CardHeader,
  CardHeading,
  CardMeta,
  CardTable,
} from './card'

import {
  DefaultItemRenderer,
} from './card/item-renderers'

import CardUtils from './card/CardUtils'
import { SOURCE_TYPES } from '../constants'

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
    const startTime = get(activity, 'object.startTime')
    const reference = get(activity, 'object.attributedTo.name')
    const summary = get(activity, 'summary')
    const exportItemCodes = get(activity, 'object.dit:exportItemCodes')
    const exportItemCodesCollection = exportItemCodes.map((value) => {
      return {
        value,
        id: value,
      }
    })


    return (
      <Card>
        <CardHeader>
          <CardHeading
            blockText="HMRC"
            sourceType={SOURCE_TYPES.external}
            subHeading="Exporters records show that"
            summary={summary}
          />
          <CardMeta startTime={startTime} />
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
                  itemPropName="value"
                  itemRenderer={DefaultItemRenderer}
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
