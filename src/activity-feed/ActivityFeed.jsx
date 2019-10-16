import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { ACTIVITY_TYPE_FILTERS } from './constants'

import Activity from './Activity'
import ActivityFeedHeader from './ActivityFeedHeader'
import ActivityFeedFilters from './ActivityFeedFilters'
import ActivityFeedPagination from './ActivityFeedPagination'

const ActivityFeedContainer = styled('div')`
  margin: ${SPACING.SCALE_2} 0;
`

const ActivityFeedCardList = styled('ol')`
  list-style-type: none;
  padding: 0;
  margin-top: ${SPACING.SCALE_2};

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

  constructor(props) {
    super(props)
    this.state = {
      filteredActivity: ACTIVITY_TYPE_FILTERS.length
        ? ACTIVITY_TYPE_FILTERS[2].value
        : [],
      showDetails: false,
      isActivityTypeFilterEnabled: !!ACTIVITY_TYPE_FILTERS.length,
      activityTypeFilters: ACTIVITY_TYPE_FILTERS,
    }

    this.onActivityTypeFilterChange = this.onActivityTypeFilterChange.bind(this)
    this.onShowDetailsClick = this.onShowDetailsClick.bind(this)
  }

  onActivityTypeFilterChange(e) {
    const value = e.target.value.split(',')

    this.setState({
      filteredActivity: e.target.value === 'all' ? [] : value,
    })
  }

  onShowDetailsClick(e) {
    this.setState({
      showDetails: e.target.checked,
    })
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
    const {
      activityTypeFilters,
      filteredActivity,
      isActivityTypeFilterEnabled,
      showDetails,
    } = this.state

    return (
      <ActivityFeedContainer>
        <ActivityFeedHeader
          totalActivities={totalActivities}
          addContentText={addContentText}
          addContentLink={addContentLink}
        />
        <ActivityFeedFilters
          activityTypeFilters={activityTypeFilters}
          filteredActivity={filteredActivity}
          isActivityTypeFilterEnabled={isActivityTypeFilterEnabled}
          onActivityTypeFilterChange={this.onActivityTypeFilterChange}
          onShowDetailsClick={this.onShowDetailsClick}
          showDetails={showDetails}
        />
        <ActivityFeedCardList>
          {activities.map((activity) => (
            <li key={activity.id}>
              <Activity
                activity={activity}
                filter={filteredActivity}
                showDetails={showDetails}
              />
            </li>
          ))}
        </ActivityFeedCardList>

        {hasMore && (
          <ActivityFeedPagination
            isLoading={isLoading}
            onLoadMore={onLoadMore}
          />
        )}

        {children}
      </ActivityFeedContainer>
    )
  }
}
