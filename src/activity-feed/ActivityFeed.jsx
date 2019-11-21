import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import Activity from './Activity'
import ActivityFeedHeader from './ActivityFeedHeader'
import ActivityFeedFilters from './ActivityFeedFilters'
import ActivityFeedShowAll from './ActivityFeedShowAll'
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
    onLoadMore: PropTypes.func,
    sendQueryParams: PropTypes.func,
    children: PropTypes.node,
    activities: PropTypes.arrayOf(PropTypes.object),
    activityTypeFilters: PropTypes.object,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
    contentText: PropTypes.string,
    contentLink: PropTypes.string,
    totalActivities: PropTypes.number,
    isGlobalUltimate: PropTypes.bool,
    dnbHierachyCount: PropTypes.number,
    isTypeFilterFlagEnabled: PropTypes.bool,
    isGlobalUltimateFlagEnabled: PropTypes.bool,
  }

  static defaultProps = {
    onLoadMore: () => {},
    sendQueryParams: () => {},
    children: null,
    activities: [],
    activityTypeFilters: {},
    hasMore: false,
    isLoading: false,
    contentText: null,
    contentLink: null,
    totalActivities: 0,
    isGlobalUltimate: false,
    dnbHierachyCount: null,
    isTypeFilterFlagEnabled: false,
    isGlobalUltimateFlagEnabled: false,
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
      activityTypeFilter: dataHubActivity ? dataHubActivity.value : '',
      showDnbHierarchy: false,
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
    this.showActivitiesFromAllCompanies = this.showActivitiesFromAllCompanies.bind(
      this
    )
  }

  onActivityTypeFilterChange(e) {
    const activityTypeFilter = e.target.value
    const { sendQueryParams } = this.props
    const { showDnbHierarchy } = this.state

    sendQueryParams({
      activityTypeFilter,
      showDnbHierarchy,
    })

    this.setState({
      activityTypeFilter,
    })
  }

  showActivitiesFromAllCompanies(e) {
    const showDnbHierarchy = e.target.checked
    const { sendQueryParams } = this.props
    const { activityTypeFilter } = this.state

    sendQueryParams({
      activityTypeFilter,
      showDnbHierarchy,
    })

    this.setState({
      showDnbHierarchy,
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
      contentText,
      contentLink,
      children,
      totalActivities,
      isGlobalUltimate,
      dnbHierachyCount,
      isTypeFilterFlagEnabled,
      isGlobalUltimateFlagEnabled,
    } = this.props
    const { activityTypeFilters, activityTypeFilter, showDetails } = this.state
    const hasFilters = isTypeFilterFlagEnabled || isGlobalUltimateFlagEnabled

    return (
      <ActivityFeedContainer>
        <ActivityFeedHeader
          totalActivities={totalActivities}
          contentText={contentText}
          contentLink={contentLink}
        />

        {hasFilters && (
          <ActivityFeedFilters
            activityTypeFilters={activityTypeFilters}
            activityTypeFilter={activityTypeFilter}
            onActivityTypeFilterChange={this.onActivityTypeFilterChange}
            showActivitiesFromAllCompanies={this.showActivitiesFromAllCompanies}
            isGlobalUltimate={isGlobalUltimate}
            dnbHierachyCount={dnbHierachyCount}
            isTypeFilterFlagEnabled={isTypeFilterFlagEnabled}
            isGlobalUltimateFlagEnabled={isGlobalUltimateFlagEnabled}
          />
        )}

        {activities.length > 0 && (
          <ActivityFeedShowAll
            onChange={this.onShowDetailsClick}
            checked={showDetails}
          >
            Show details for all activities
          </ActivityFeedShowAll>
        )}

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
