import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

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
    activityTypeFilters: PropTypes.object,
    onLoadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    isFilterEnabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
    totalActivities: PropTypes.number,
    sendFilterQueryParams: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    activities: [],
    activityTypeFilters: {},
    onLoadMore: () => {},
    hasMore: false,
    isFilterEnabled: false,
    isLoading: false,
    addContentText: null,
    addContentLink: null,
    totalActivities: 0,
    sendFilterQueryParams: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      filteredActivity: props.activityTypeFilters.default
        ? props.activityTypeFilters.default.value
        : '',
      showDetails: false,
      activityTypeFilters: props.activityTypeFilters.values || [],
    }

    this.onActivityTypeFilterChange = this.onActivityTypeFilterChange.bind(this)
    this.onShowDetailsClick = this.onShowDetailsClick.bind(this)
  }

  onActivityTypeFilterChange(e) {
    const value = e.target.value.split(',')
    const filteredActivity = e.target.value === 'all' ? [] : value

    this.setState({
      filteredActivity,
    })

    /**
     * the `key` param is used for building the query to ES
     * "object.attributedTo.id" - for companies or advisers
     * "object.type" - for activity types
     */
    this.sendFilterQueryParams({
      'object.type': filteredActivity,
    })
  }

  onShowDetailsClick(e) {
    this.setState({
      showDetails: e.target.checked,
    })
  }

  sendFilterQueryParams(filteredActivity) {
    const { sendFilterQueryParams } = this.props
    sendFilterQueryParams(filteredActivity)
  }

  render() {
    const {
      activities,
      onLoadMore,
      hasMore,
      isFilterEnabled,
      isLoading,
      addContentText,
      addContentLink,
      children,
      totalActivities,
    } = this.props
    const { activityTypeFilters, filteredActivity, showDetails } = this.state

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
          isFilterEnabled={isFilterEnabled}
          onActivityTypeFilterChange={this.onActivityTypeFilterChange}
          onShowDetailsClick={this.onShowDetailsClick}
          showDetails={showDetails}
        />
        <ActivityFeedCardList>
          {activities.map((activity) => (
            <li key={activity.id}>
              <Activity activity={activity} showDetails={showDetails} />
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
