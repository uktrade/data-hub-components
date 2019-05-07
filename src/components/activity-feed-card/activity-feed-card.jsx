import React from 'react'
import PropTypes from 'prop-types'

class ActivityFeedCard extends React.Component {
  static propTypes = {
    activity: PropTypes.object,
  }

  render() {
    const { activity } = this.props;
    return (
			<div>{activity['object']['dit:subject']}</div>
    )
  }
}

export default ActivityFeedCard
