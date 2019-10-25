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
import accountsAreDueFixture from '../__fixtures__/companies_house/accounts_are_due'
import incorporatedFixture from '../__fixtures__/companies_house/incorporated'
import exportOfGoodsFixture from '../__fixtures__/hmrc/export_of_goods'
import interactionFixture from '../__fixtures__/interactions/interaction'

addDecorator(withKnobs)

/**
 * This component is used only for Storybook - to productionize your feature you'll also need to update
 * `ActivityFeedApp.jsx to reflect the changes.
 */
class ActivityFeedDemoApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterQueryParams: {},
      activities: [],
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
      const items = [
        activityFeedFixtures,
        [accountsAreDueFixture, incorporatedFixture, exportOfGoodsFixture],
        interactionFixture,
      ]
      const fixture = items[Math.floor(Math.random() * items.length)]

      // Simulate delay.
      setTimeout(() => {
        resolve({
          activities: fixture,
          total: 1000,
        })
      }, 1500)
    })

  onLoadMore = async () => {
    const { activities, offset, filterQueryParams } = this.state
    const limit = 20

    this.setState({
      isLoading: true,
    })
    // TODO(jf): remove when done
    // eslint-disable-next-line no-console
    console.log(offset, filterQueryParams)

    try {
      const { activities: newActivities, total } = await this.fetchActivities(
        offset,
        limit,
        filterQueryParams
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

  setFilterQueryParams(filterQueryParams) {
    this.setState({ filterQueryParams }, this.onLoadMore)
  }

  render() {
    const { activities, isLoading, hasMore, error, total } = this.state
    const isEmptyFeed = activities.length === 0 && !hasMore

    return (
      <div>
        <ActivityFeed
          sendFilterQueryParams={this.setFilterQueryParams}
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
