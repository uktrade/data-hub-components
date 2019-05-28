import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import ActivityFeedCard from './ActivityFeedCard'
import ActivityFeedHeader from './ActivityFeedHeader'
import ActivityFeedPagination from './ActivityFeedPagination'

const ActivityFeedContainer = styled('div')`
  margin: ${SPACING.SCALE_2};
`

const ActivityFeedCardList = styled('ol')`
  list-style-type: none;
  padding: 0;
  
  & > li {
    margin-bottom: ${SPACING.SCALE_2};
  }
`

export default class ActivityFeed extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    hasMore: true,
    isLoading: false,
  }

  render() {
    const { activities, onLoadMore, hasMore, isLoading } = this.props

    return (
      <ActivityFeedContainer>
        <ActivityFeedHeader totalCards={activities.length} />

        <ActivityFeedCardList>
          {activities.map(activity => {
            return <li key={activity.id}>
              <ActivityFeedCard activity={activity} />
            </li>
          })}
        </ActivityFeedCardList>

        {hasMore && <ActivityFeedPagination isLoading={isLoading} onLoadMore={onLoadMore} />}
      </ActivityFeedContainer>
    )
  }
}
