import React from 'react'
import {storiesOf} from '@storybook/react'

import {GridCol, GridRow, Main} from 'govuk-react'

import ActivityFeed from './ActivityFeed'
import activityFeedFixtures from '../../fixtures/activity_feed'
import {includes} from 'lodash'

import datahubBackground from '../../assets/images/data-hub-one-list-corp.png'

const filteredActivities = activityFeedFixtures.filter(activity => {
  return includes(activity['object']['type'], 'dit:Interaction')
})

class ActivityFeedDemoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: filteredActivities,
      isLoading: false,
    }
  }

  onLoadMore = () => {
    const activities = this.state.activities.concat(filteredActivities)
    this.setState({
      isLoading: true,
    })

    // Simulate delay.
    setTimeout(() => {
      this.setState({
        activities,
        isLoading: false,
      })
    }, 1500)
  }

  render() {
    const {activities, isLoading} = this.state
    return (
      <ActivityFeed activities={activities} isLoading={isLoading} onLoadMore={this.onLoadMore}/>
    )
  }
}

storiesOf('ActivityFeed', module)
  .add('Entire feed', () => <ActivityFeedDemoApp />)
  .add('Data Hub company page', () => {
    return <Main>
      <GridRow>
        <GridCol>
          <img src={datahubBackground} width="960" alt="DataHub" />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <ActivityFeedDemoApp />
        </GridCol>
      </GridRow>
    </Main>
  })
