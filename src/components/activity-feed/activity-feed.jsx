import React from 'react'
import PropTypes from 'prop-types'

import ActivityFeedCard from '../activity-feed-card/activity-feed-card'
import ActivityFeedHeader from '../activity-feed-header/activity-feed-header'
import ActivityFeedPagination from '../activity-feed-pagination/activity-feed-pagination'

export default class ActivityFeed extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { activities } = this.props
    return (
      <React.Fragment>
        <ActivityFeedHeader totalCards={activities.length} />

        {activities.map(activity => {
          return <ActivityFeedCard activity={activity} />
        })}

        <ActivityFeedPagination />
      </React.Fragment>
    )
  }
}
