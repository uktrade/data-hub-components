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
import investmentProjectFixture from '../__fixtures__/interactions/investment_project'
import serviceDeliveryFixture from '../__fixtures__/interactions/service_delivery'
import projectAddedFdiFixture from '../__fixtures__/investment_projects/project_added_fdi'
import projectAddedNonFdiFixture from '../__fixtures__/investment_projects/project_added_non_fdi'
import projectAddedCtiFixture from '../__fixtures__/investment_projects/project_added_cti'
import orderAddedFixture from '../__fixtures__/omis/order_added'

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
      queryParams: [{ 'object.type': ACTIVITY_TYPE_FILTERS.default.value }],
      isLoading: false,
      hasMore: true,
      offset: 0,
      error: false,
    }

    this.setFilterQueryParams = this.setFilterQueryParams.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  async componentDidMount() {
    await this.onLoadMore()
  }

  fetchActivities = (offset = 0, limit = 20, queryParams) => {
    const allActivities = ACTIVITY_TYPE_FILTERS.values[0].value.join()
    const myActivities = ACTIVITY_TYPE_FILTERS.values[1].value
    const externalActivities = ACTIVITY_TYPE_FILTERS.values[2].value.join()
    const dhActivities = ACTIVITY_TYPE_FILTERS.values[3].value.join()
    const items = {
      [allActivities]: activityFeedFixtures,
      [externalActivities]: [
        accountsAreDueFixture,
        incorporatedFixture,
        exportOfGoodsFixture,
      ],
      [myActivities]: [interactionFixture],
      [dhActivities]: [
        interactionFixture,
        investmentProjectFixture,
        serviceDeliveryFixture,
        projectAddedFdiFixture,
        projectAddedNonFdiFixture,
        projectAddedCtiFixture,
        orderAddedFixture,
      ],
    }

    return new Promise((resolve) => {
      // Simulate delay.
      setTimeout(() => {
        resolve({
          activities: items[queryParams[0][Object.keys(queryParams[0])].join()],
          offset,
          limit,
          total: 1000,
        })
      }, 1500)
    })
  }

  async onLoadMore() {
    const { offset } = this.state
    this.getActivities(offset)
  }

  getActivities = async (offset = 0) => {
    const { activities, queryParams } = this.state
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
      const allActivities = offset
        ? activities.concat(newActivities)
        : newActivities

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
    this.setState({ queryParams }, this.onFilterActivity)
  }

  async onFilterActivity() {
    this.getActivities()
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
