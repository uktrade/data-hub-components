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

const TITLES = {
  add: 'New investment project added',
}

export default class InvestmentProject extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  static canRender(activity) {
    return CardUtils.canRenderByTypes(activity, [
      'dit:InvestmentProject',
    ])
  }

  render() {
    const { activity, showDetails } = this.props

    const type = get(activity, 'type')
    const title = TITLES[type.toLowerCase()]
    const url = get(activity, 'object.url')
    const name = get(activity, 'object.name')
    const investmentType = get(activity, 'object.dit:investmentType.name')
    const addedBy = CardUtils.getAddedBy(activity)
    const estimatedLandDate = DateUtils.format(get(activity, 'object.dit:estimatedLandDate'))
    const contacts = CardUtils.getContactsWithJobTitle(activity)

    // Specific to Foreign direct investment (FDI) only
    const totalInvestment = NumberUtils.currency(get(activity, 'object.dit:totalInvestment'))
    const foreignEquityInvestment = NumberUtils.currency(get(activity, 'object.dit:foreignEquityInvestment'))
    const grossValueAdded = NumberUtils.currency(get(activity, 'object.dit:grossValueAdded'))
    const numberNewJobs = NumberUtils.decimal(get(activity, 'object.dit:numberNewJobs'))

    const published = get(activity, 'published')

    return (
      <Card>
        <CardHeader>
          <CardHeading link={{ url, text: name }} blockText={`${title} - ${investmentType}`} />
          <CardMeta startTime={published} />
        </CardHeader>
        <CardDetails
          summary="Key details and people for this project"
          link={{ url, text: 'Go to the investment project detail page' }}
          showDetails={showDetails}
        >
          <CardTable rows={
            [
              { header: 'Investment Type', content: investmentType },
              { header: 'Added by', content: addedBy },
              { header: 'Estimated land date', content: estimatedLandDate },
              { header: 'Company contact(s)', content: contacts },
              { header: 'Total Investment', content: totalInvestment },
              { header: 'Capital expenditure value', content: foreignEquityInvestment },
              { header: 'Gross value added (GVA)', content: grossValueAdded },
              { header: 'Number of new jobs', content: numberNewJobs },
            ]}
          />
        </CardDetails>
      </Card>
    )
  }
}
