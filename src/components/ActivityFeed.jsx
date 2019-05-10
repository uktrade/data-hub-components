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

        <ol style={{ width: '600px', listStyleType: 'none', padding: 0 }}>
          {activities.map(activity => {
            return <li key={activity.id} style={{ marginBottom: '10px' }}>
              <ActivityFeedCard activity={activity} />
            </li>
          })}
        </ol>

        <ActivityFeedPagination />
      </React.Fragment>
    )
  }
}
