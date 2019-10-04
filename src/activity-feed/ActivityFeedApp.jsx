import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ActivityFeed from './ActivityFeed'

export default class ActivityFeedApp extends React.Component {
  static propTypes = {
    apiEndpoint: PropTypes.string.isRequired,
    queryParams: PropTypes.object,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
    render: PropTypes.func,
  }

  static defaultProps = {
    queryParams: {},
    addContentText: null,
    addContentLink: null,
    render: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      isLoading: true,
      hasMore: true,
      offset: 0,
      total: 0,
      error: false,
    }

    this.onLoadMore = this.onLoadMore.bind(this)
  }

  async componentDidMount() {
    await this.onLoadMore()
  }

  async onLoadMore() {
    const { activities, offset } = this.state
    const { apiEndpoint, queryParams } = this.props
    const limit = 20

    this.setState({
      isLoading: true,
    })

    try {
      const {
        activities: newActivities,
        total,
      } = await ActivityFeedApp.fetchActivities(
        apiEndpoint,
        offset,
        limit,
        queryParams
      )
      const allActivities = activities.concat(newActivities)

      this.setState({
        activities: allActivities,
        isLoading: false,
        hasMore: total > allActivities.length,
        offset: offset + limit,
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

  render() {
    const { activities, isLoading, hasMore, total, error } = this.state
    const { addContentText, addContentLink, render } = this.props

    const isEmptyFeed = activities.length === 0 && !hasMore

    return (
      <ActivityFeed
        totalActivities={total}
        addContentText={addContentText}
        addContentLink={addContentLink}
        activities={activities}
        hasMore={hasMore}
        onLoadMore={this.onLoadMore}
        isLoading={isLoading}
      >
        {isEmptyFeed && !error && <div>There are no activities to show.</div>}
        {error && <div>Error occurred while loading activities.</div>}
        {render && render(this.state, this.props)}
      </ActivityFeed>
    )
  }
}
