import React from 'react'
import { storiesOf } from '@storybook/react'
import { GridCol, GridRow, Main } from 'govuk-react'
import { includes } from 'lodash'

import ActivityFeed from './ActivityFeed'
import activityFeedFixtures from '../../fixtures/activity_feed'
import datahubBackground from '../../assets/images/data-hub-one-list-corp.png'

const filteredActivities = activityFeedFixtures.filter(activity => {
  return includes(activity['object']['type'], 'dit:Interaction')
})

class ActivityFeedDemoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      isLoading: false,
      hasMore: true,
      offset: 0,
      error: false,
    }
  }

  async componentDidMount() {
    await this.onLoadMore()
  }

  fetchActivities = (offset, limit) => {
    return new Promise((resolve, reject) => {
      // Simulate delay.
      setTimeout(() => {
        resolve({
          activities: filteredActivities,
          total: 10,
        })
      }, 1500)
    })
  }

  onLoadMore = async () => {
    const { offset } = this.state
    const limit = 20

    this.setState({
      isLoading: true,
    })

    try {
      const { activities, total } = await this.fetchActivities(offset, limit)
      const allActivities = this.state.activities.concat(activities)

      this.setState({
        isLoading: false,
      })

      this.setState({
        activities: allActivities,
        hasMore: total > allActivities.length,
        offset: offset + limit,
      })
    }
    catch (e) {
      console.log(e.message)
      this.setState({
        isLoading: false,
        hasMore: false,
        error: true,
      })
    }
  }

  render() {
    const { activities, isLoading, hasMore, error } = this.state

    return (
      <div>
        <ActivityFeed
          activities={activities}
          hasMore={hasMore}
          onLoadMore={this.onLoadMore}
          isLoading={isLoading}
          addContentText="Add interaction"
          addContentLink="/companies/3335a773-a098-e211-a939-e4115bead28a/interactions/create"
        />

        {error && <div>Couldn't load more activities.</div>}
      </div>
    )
  }
}

storiesOf('ActivityFeed', module)
  .add('Entire feed', () => <ActivityFeedDemoApp/>)
  .add('Data Hub company page', () => {
    return <Main>
      <GridRow>
        <GridCol>
          <img src={datahubBackground} width="960" alt="DataHub"/>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <ActivityFeedDemoApp/>
        </GridCol>
      </GridRow>
    </Main>
  })
