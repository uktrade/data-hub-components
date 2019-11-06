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
    isTypeFilterEnabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
    totalActivities: PropTypes.number,
    sendQueryParams: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    activities: [],
    activityTypeFilters: {},
    onLoadMore: () => {},
    hasMore: false,
    isTypeFilterEnabled: false,
    isLoading: false,
    addContentText: null,
    addContentLink: null,
    totalActivities: 0,
    sendQueryParams: () => {},
  }

  constructor(props) {
    const {
      allActivity,
      myActivity,
      externalActivity,
      dataHubActivity,
    } = props.activityTypeFilters

    super(props)
    this.state = {
      filteredActivity: dataHubActivity ? dataHubActivity.value : '',
      showDetails: false,
      activityTypeFilters: [
        allActivity,
        myActivity,
        externalActivity,
        dataHubActivity,
      ],
    }

    this.onActivityTypeFilterChange = this.onActivityTypeFilterChange.bind(this)
    this.onShowDetailsClick = this.onShowDetailsClick.bind(this)
  }

  onActivityTypeFilterChange(e) {
    const filteredActivity = e.target.value
    const { sendQueryParams } = this.props

    this.setState({
      filteredActivity,
    })

    sendQueryParams(filteredActivity)
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
      isTypeFilterEnabled,
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
          isTypeFilterEnabled={isTypeFilterEnabled}
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
