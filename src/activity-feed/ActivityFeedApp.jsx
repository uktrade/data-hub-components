import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ActivityFeed from './ActivityFeed'

/**
 * This component is not visible in Storybook - remember to also port your changes here,
 * as this one is going into production.
 */
export default class ActivityFeedApp extends React.Component {
  static propTypes = {
    addActivityTypeFilter: PropTypes.object,
    addContentLink: PropTypes.string,
    addContentText: PropTypes.string,
    apiEndpoint: PropTypes.string.isRequired,
    isFilterEnabled: PropTypes.bool,
    render: PropTypes.func,
  }

  static defaultProps = {
    addActivityTypeFilter: {},
    addContentLink: null,
    addContentText: null,
    isFilterEnabled: false,
    render: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      error: false,
      queryParams: props.addActivityTypeFilter.dataHubActivity
        ? { 'object.type': props.addActivityTypeFilter.dataHubActivity.value }
        : {},
      hasMore: true,
      isLoading: true,
      offset: 0,
      total: 0,
    }

    this.onLoadMore = this.onLoadMore.bind(this)
    this.setFilterQueryParams = this.setFilterQueryParams.bind(this)
  }

  async componentDidMount() {
    await this.onLoadMore()
  }

  async onLoadMore() {
    const { offset } = this.state
    this.getActivities(offset)
  }

  async getActivities(offset = 0) {
    const { activities, queryParams } = this.state
    const { apiEndpoint } = this.props
    const limit = 20
    const filterParams = { queryParams }

    this.setState({
      isLoading: true,
      activities: offset ? activities : [],
    })

    try {
      const {
        activities: newActivities,
        total,
      } = await ActivityFeedApp.fetchActivities(
        apiEndpoint,
        offset,
        limit,
        filterParams
      )

      this.setActivityState({
        activities: offset ? activities.concat(newActivities) : newActivities,
        limit,
        offset,
        total,
      })
    } catch (e) {
      this.setState({
        isLoading: false,
        hasMore: false,
        error: true,
      })
    }
  }

  setActivityState({ activities, limit, offset, total }) {
    this.setState({
      activities,
      isLoading: false,
      hasMore: total > activities.length,
      offset: offset + limit,
      total,
    })
  }

  async onFilterActivity() {
    this.getActivities()
  }

  static async fetchActivities(apiEndpoint, offset, limit, queryParams = {}) {
    const params = {
      size: limit,
      from: offset,
      ...queryParams,
    }

    const { data } = await axios.get(apiEndpoint, { params })
    const { total, hits } = data.hits

    return {
      total,
      activities: hits.map((hit) => hit._source),
    }
  }

  setFilterQueryParams(queryParams) {
    this.setState({ queryParams }, this.onFilterActivity)
  }

  render() {
    const { activities, isLoading, hasMore, error, total } = this.state
    const {
      addActivityTypeFilter,
      addContentText,
      addContentLink,
      isFilterEnabled,
      render,
    } = this.props

    const isEmptyFeed = activities.length === 0 && !hasMore
    return (
      <ActivityFeed
        activities={activities}
        activityTypeFilters={addActivityTypeFilter}
        addContentText={addContentText}
        addContentLink={addContentLink}
        isFilterEnabled={isFilterEnabled}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={this.onLoadMore}
        sendQueryParams={this.setFilterQueryParams}
        totalActivities={total}
      >
        {isEmptyFeed && !error && <div>There are no activities to show.</div>}
        {error && <div>Error occurred while loading activities.</div>}
        {render && render(this.state, this.props)}
      </ActivityFeed>
    )
  }
}
