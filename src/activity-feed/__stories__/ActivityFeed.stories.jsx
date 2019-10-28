import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import GridCol from '@govuk-react/grid-col'
import GridRow from '@govuk-react/grid-row'
import Main from '@govuk-react/main'
import { SPACING } from '@govuk-react/constants'
import { ACTIVITY_TYPE_FILTERS } from '../constants'

import ActivityFeed from '../ActivityFeed'
import activityFeedFixtures from '../__fixtures__'
import datahubBackground from './images/data-hub-one-list-corp.png'

addDecorator(withKnobs)

/**
 * This component is used only for Storybook - to productionize your feature you'll also need to update
 * `ActivityFeedApp.jsx to reflect the changes.
 */
class ActivityFeedDemoApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activities: [],
      queryParams: {},
      isLoading: false,
      hasMore: true,
      offset: 0,
      error: false,
    }

    this.setFilterQueryParams = this.setFilterQueryParams.bind(this)
  }

  async componentDidMount() {
    await this.onLoadMore()
  }

  fetchActivities = () =>
    new Promise((resolve) => {
      // Simulate delay.
      setTimeout(() => {
        resolve({
          activities: activityFeedFixtures,
          total: 1000,
        })
      }, 1500)
    })

  onLoadMore = async () => {
    const { activities, offset, queryParams } = this.state
    const limit = 20

    this.setState({
      isLoading: true,
    })

    try {
      const { activities: newActivities, total } = await this.fetchActivities(
        offset,
        limit,
        queryParams
      )
      const allActivities = activities.concat(newActivities)

      this.setState({
        isLoading: false,
      })

      this.setState({
        activities: allActivities,
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

  setFilterQueryParams(queryParams) {
    this.setState({ queryParams }, this.onLoadMore)
  }

  render() {
    const { activities, isLoading, hasMore, error, total } = this.state
    const isEmptyFeed = activities.length === 0 && !hasMore

    return (
      <div>
        <ActivityFeed
          sendQueryParams={this.setFilterQueryParams}
          activities={activities}
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          totalActivities={total}
          hasMore={hasMore}
          onLoadMore={this.onLoadMore}
          isLoading={isLoading}
          addContentText="Add interaction"
          addContentLink="/companies/3335a773-a098-e211-a939-e4115bead28a/interactions/create"
          isFilterEnabled={true}
        >
          {isEmptyFeed && !error && <div>There are no activities to show.</div>}
          {error && <div>Error occurred while loading activities.</div>}
        </ActivityFeed>
      </div>
    )
  }
}

storiesOf('ActivityFeed', module)
  .add('Entire feed', () => <ActivityFeedDemoApp />)
  .add('Data Hub company page', () => (
    <Main>
      <GridRow>
        <GridCol>
          <img src={datahubBackground} width="960" alt="DataHub" />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol style={{ margin: SPACING.SCALE_2 }}>
          <ActivityFeedDemoApp />
        </GridCol>
      </GridRow>
    </Main>
  ))
  .add('Empty feed', () => <ActivityFeed />)
  .add('With error', () => {
    class ActivityFeedErrorDemoApp extends ActivityFeedDemoApp {
      fetchActivities = () => {
        throw new Error('Fake error!')
      }
    }
    return <ActivityFeedErrorDemoApp />
  })
