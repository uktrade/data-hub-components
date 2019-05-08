import React from 'react'
import PropTypes from 'prop-types'

import ActivityFeedCard from './ActivityFeedCard'
import ActivityFeedHeader from './ActivityFeedHeader'
import ActivityFeedPagination from './ActivityFeedPagination'

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
