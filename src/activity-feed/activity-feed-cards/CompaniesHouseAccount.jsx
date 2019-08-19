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
} from './card'

import CardUtils from './card/CardUtils'
import DateUtils from '../../utils/DateUtils'
import NumberUtils from '../../utils/NumberUtils'
import { SOURCE_TYPES } from '../constants'

export default class CompaniesHouseAccount extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, [
      'dit:Accounts',
    ])
  }

  render() {
    const { activity, showDetails } = this.props

    const published = get(activity, 'published')
    const reference = get(activity, 'object.name')
    const taxonomy = get(activity, 'dit:taxonomy')
    const summary = get(activity, 'summary')
    const balanceSheetDate = DateUtils.format(get(activity, 'object.dit:balanceSheetDate'))
    const netAssetsLiabilities = NumberUtils.currency(get(activity, 'object.dit:netAssetsLiabilitiesIncludingPensionAssetLiability'))
    const periodEnd = DateUtils.format(get(activity, 'object.dit:periodEnd'))
    const periodStart = DateUtils.format(get(activity, 'object.dit:periodStart'))
    const shareholderFunds = NumberUtils.currency(get(activity, 'object.dit:shareholderFunds'))

    return (
      <Card>
        <CardHeader>
          <CardHeading
            link={{ taxonomy, text: reference }}
            blockText="Companies House"
            sourceType={SOURCE_TYPES.external}
            subHeading="Accounts records show that"
            summary={summary}
          />

          <CardMeta startTime={published} />
        </CardHeader>

        <CardDetails
          summary="View key details for this account"
          link={{ taxonomy, text: 'Go to the Companies House accounts page' }}
          showDetails={showDetails}
        >
          <CardTable rows={
            [
              { header: 'Balance sheet date', content: balanceSheetDate },
              { header: 'Net assets liabilities including pension asset liability', content: netAssetsLiabilities },
              { header: 'Period start', content: periodStart },
              { header: 'Period end', content: periodEnd },
              { header: 'Shareholder funds', content: shareholderFunds },
            ]}
          />
        </CardDetails>
      </Card>
    )
  }
}
