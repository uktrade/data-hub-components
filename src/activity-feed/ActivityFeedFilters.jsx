import React from 'react'
import PropTypes from 'prop-types'

import BasicActivityTypeFilter from './filters/BasicActivityTypeFilter'
import ShowDetailsFilter from './filters/ShowDetailsFilter'

export default class ActivityFeedFilters extends React.PureComponent {
  static propTypes = {
    isActivityTypeFilterEnabled: PropTypes.bool.isRequired,
  }

  render() {
    const { isActivityTypeFilterEnabled } = this.props

    if (isActivityTypeFilterEnabled) {
      return <BasicActivityTypeFilter {...this.props} />
    } else {
      return <ShowDetailsFilter {...this.props} />
    }
  }
}
