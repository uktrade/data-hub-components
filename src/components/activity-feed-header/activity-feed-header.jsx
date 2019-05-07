import React from 'react'
import PropTypes from 'prop-types'

import ActivityFeedFilters from '../activity-feed-filters/activity-feed-filters'

class ActivityFeedHeader extends React.Component {
  static propTypes = {
    totalCards: PropTypes.number.isRequired,
  }

  render() {
    const { totalCards } = this.props

    return (
      <article>
        {totalCards} activities
        <button>Add activity</button>

        <ActivityFeedFilters />
      </article>
    )
  }
}

export default ActivityFeedHeader
