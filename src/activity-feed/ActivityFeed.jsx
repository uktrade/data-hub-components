import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import ActivityFeedCard from './ActivityFeedCard'
import ActivityFeedHeader from './ActivityFeedHeader'
import ActivityFeedPagination from './ActivityFeedPagination'

const ActivityFeedContainer = styled('div')`
  margin: ${SPACING.SCALE_2} 0;
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
    children: PropTypes.node,
    activities: PropTypes.arrayOf(PropTypes.object),
    onLoadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
    totalActivities: PropTypes.number,
  }

  static defaultProps = {
    children: null,
    activities: [],
    onLoadMore: () => {},
    hasMore: false,
    isLoading: false,
    addContentText: null,
    addContentLink: null,
    totalActivities: 0,
  }

  render() {
    const {
      activities,
      onLoadMore,
      hasMore,
      isLoading,
      addContentText,
      addContentLink,
      totalActivities,
      children,
    } = this.props

    return (
      <ActivityFeedContainer>
        <ActivityFeedHeader
          totalActivities={totalActivities}
          addContentText={addContentText}
          addContentLink={addContentLink}
        />

        <ActivityFeedCardList>
          {activities.map(activity => (
            <li key={activity.id}>
              <ActivityFeedCard activity={activity} />
            </li>
          ))}
        </ActivityFeedCardList>

        {hasMore && <ActivityFeedPagination isLoading={isLoading} onLoadMore={onLoadMore} />}

        {children}
      </ActivityFeedContainer>
    )
  }
}
