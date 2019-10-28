import React from 'react'
import nock from 'nock'

import { mount } from 'enzyme'
import Select from '@govuk-react/select'
import ActivityFeedApp from '../ActivityFeedApp'
import esResults from '../__fixtures__/activity-feed-from-es'

import activityFeedFixtures from '../__fixtures__'
import BasicActivityTypeFilter from '../filters/BasicActivityTypeFilter'
import { ACTIVITY_TYPE_FILTERS } from '../constants'
import SelectFilter from '../filters/SelectFilter'

describe('ActivityFeedApp', () => {
  const companyId = '0f5216e0-849f-11e6-ae22-56b6b6499611'
  const addContentLink = `/companies/${companyId}/interactions/create`
  const apiBaseUrl = 'http://nock:3000'
  const apiPath = `/companies/${companyId}/activity-feed/data`
  const apiEndpoint = apiBaseUrl + apiPath
  let wrapper

  describe('when fetching the activity feed with no activities', () => {
    nock(apiBaseUrl)
      .persist()
      .get(/companies.*$/)
      .reply(200, esResults)

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedApp
          activities={activityFeedFixtures}
          addContentText="Add interaction"
          addContentLink={addContentLink}
          apiEndpoint={apiEndpoint}
          render={(state) => {
            if (state.error) {
              throw Error('Exception raised.')
            }
          }}
        />
      )
    })

    test('should render the app with an empty feed', () => {
      expect(wrapper.find(ActivityFeedApp).exists()).toBe(true)
      expect(wrapper.state().activities.length).toBe(0)
    })
  })

  describe('when fetching the activity feed with activities and no filters', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedApp
          activities={activityFeedFixtures}
          addContentText="Add interaction"
          addContentLink={addContentLink}
          apiEndpoint={apiEndpoint}
          render={(state) => {
            if (state.error) {
              throw Error('Exception raised.')
            }
          }}
        />
      )
    })

    test('should render the app without the activity filter', () => {
      expect(wrapper.find(ActivityFeedApp).exists()).toBe(true)
      expect(wrapper.props().activities.length).toBe(
        activityFeedFixtures.length
      )
      expect(wrapper.find(BasicActivityTypeFilter).exists()).toBe(false)
    })
  })

  describe('when fetching the activity feed with activities and filters', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedApp
          activities={activityFeedFixtures}
          addActivityTypeFilter={ACTIVITY_TYPE_FILTERS}
          addContentText="Add interaction"
          addContentLink={addContentLink}
          apiEndpoint={apiEndpoint}
          isFilterEnabled={true}
          render={(state) => {
            if (state.error) {
              throw Error('Exception raised.')
            }
          }}
        />
      )
    })

    test('should render the app with the activity filter', () => {
      expect(wrapper.find(ActivityFeedApp).exists()).toBe(true)
      expect(wrapper.props().activities.length).toBe(
        activityFeedFixtures.length
      )
      expect(wrapper.find(BasicActivityTypeFilter).exists()).toBe(true)
    })
  })

  describe('when the filter is changed', () => {
    const testFilterValue = ACTIVITY_TYPE_FILTERS.values.length
      ? ACTIVITY_TYPE_FILTERS.values[2].value // All external activity
      : ''

    const spyGetActivities = jest.spyOn(
      ActivityFeedApp.prototype,
      'getActivities'
    )

    const spyFetchActivities = jest.spyOn(
      ActivityFeedApp.prototype.constructor,
      'fetchActivities'
    )

    const spySetActivityState = jest.spyOn(
      ActivityFeedApp.prototype,
      'setActivityState'
    )

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedApp
          activities={activityFeedFixtures}
          addActivityTypeFilter={ACTIVITY_TYPE_FILTERS}
          addContentText="Add interaction"
          addContentLink={addContentLink}
          apiEndpoint={apiEndpoint}
          isFilterEnabled={true}
          render={(state) => {
            if (state.error) {
              throw Error('Exception raised.')
            }
          }}
        />
      )

      wrapper.find('select').simulate('change', {
        target: { value: testFilterValue.join(',') },
      })
    })

    test('should display the selectFilter component with the selected value', () => {
      expect(wrapper.find(SelectFilter).prop('value')).toEqual(testFilterValue)
      expect(wrapper.find(Select).prop('input')).toEqual({
        defaultValue: testFilterValue.join(','),
      })
    })

    test('should pass the filter parameters up to this parent', () => {
      expect(wrapper.state().queryParams[0]['object.type']).toEqual(
        testFilterValue
      )
    })

    test('should call the getActivities method with offset=0 ', () => {
      expect(spyGetActivities).toHaveBeenCalledWith(0)
    })

    test('should fetch activities with the given filter params ', () => {
      expect(spyFetchActivities).toHaveBeenCalledWith(apiEndpoint, 0, 20, {
        queryParams: [{ 'object.type': testFilterValue }],
      })
    })

    test('should set the activity state with the right params ', async () => {
      const esResponseFixture = esResults.hits.hits.map((hit) => hit._source)
      const {
        activities: newActivities,
        total,
      } = await ActivityFeedApp.fetchActivities(apiEndpoint, 0, 20, {
        queryParams: [{ 'object.type': testFilterValue }],
      })
      expect(newActivities).toStrictEqual(esResponseFixture)
      expect(total).toBe(100)

      expect(spySetActivityState).toHaveBeenCalledWith({
        activities: esResponseFixture,
        limit: 20,
        offset: 0,
        total,
      })
    })
  })
})
