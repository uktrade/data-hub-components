import React from 'react'
import { find } from 'lodash'
import PropTypes from 'prop-types'

import activities from './activities'

function Activity({ activity, showDetails, filter }) {
  const ActivityToRender = find(activities, (a) =>
    a.canRender(activity, filter)
  )

  return ActivityToRender ? (
    <ActivityToRender
      activity={activity}
      filter={filter}
      showDetails={showDetails}
    />
  ) : null
}

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
  showDetails: PropTypes.bool,
  filter: PropTypes.array,
}

Activity.defaultProps = {
  showDetails: false,
  filter: [],
}

export default Activity
