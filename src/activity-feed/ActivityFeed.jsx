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
    activities: PropTypes.arrayOf(PropTypes.object),
    onLoadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
  }

  static defaultProps = {
    activities: [],
    hasMore: false,
    isLoading: false,
  }

  render() {
    const {
      activities,
      onLoadMore,
      hasMore,
      isLoading,
      addContentText,
      addContentLink,
    } = this.props

    return (
      <ActivityFeedContainer>
        <ActivityFeedHeader totalCards={activities.length} addContentText={addContentText} addContentLink={addContentLink} />

        <ActivityFeedCardList>
          {activities.map(activity => {
            return <li key={activity.id}>
              <ActivityFeedCard activity={activity} />
            </li>
          })}
        </ActivityFeedCardList>

        {hasMore && <ActivityFeedPagination isLoading={isLoading} onLoadMore={onLoadMore} />}

        {this.props.children}
      </ActivityFeedContainer>
    )
  }
}
