import React from 'react'
import { mount } from 'enzyme'
import axios from 'axios'
import Select from '@govuk-react/select'
import { act } from 'react-dom/test-utils'

import ActivityFeedApp from '../ActivityFeedApp'
import ActivityFeedAction from '../ActivityFeedAction'
import SelectFilter from '../filters/SelectFilter'
import esResults from '../__fixtures__/activity-feed-from-es.json'
import { ACTIVITY_TYPE_FILTERS } from '../constants'
import { flushPromises } from '../../utils/enzyme'

jest.mock('axios')

describe('ActivityFeedApp', () => {
  const companyId = '0f5216e0-849f-11e6-ae22-56b6b6499611'
  const basePath = 'http://localhost:3000'
  const endpoint = `/companies/${companyId}/activity-feed/data`

  const ActivityFeedButtons = (
    <>
      <ActivityFeedAction text="Refer this company" link="/referral" />
      <ActivityFeedAction
        text="Add interaction"
        link="/companies/3335a773-a098-e211-a939-e4115bead28a/interactions/create"
      />
    </>
  )

  let wrapper

  describe('when retrieveing the activities - success', () => {
    beforeAll(async () => {
      axios.get.mockResolvedValue({ data: esResults })
      wrapper = mount(
        <ActivityFeedApp
          activityTypeFilter="dataHubActivity"
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          actions={ActivityFeedButtons}
          apiEndpoint={`${basePath}${endpoint}`}
          isGlobalUltimateFlagEnabled={true}
          isTypeFilterFlagEnabled={true}
        />
      )
      await act(flushPromises)
      wrapper.update()
    })

    test('it should update the activities state', () => {
      const expected = esResults.hits.hits.map((hit) => hit._source)
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.activities).toStrictEqual(expected)
    })

    test('it should update the isLoading state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.isLoading).toBe(false)
    })

    test('it should update the hasMore state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.hasMore).toBe(true)
    })

    test('it should update the from state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.from).toBe(20)
    })

    test('it should update the total state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.total).toBe(100)
    })
  })

  describe('when retrieveing the activities - failure', () => {
    beforeAll(async () => {
      axios.get.mockResolvedValue({ status: 400 })
      wrapper = mount(
        <ActivityFeedApp
          activityTypeFilter="dataHubActivity"
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          actions={ActivityFeedButtons}
          apiEndpoint={`${basePath}${endpoint}`}
          isGlobalUltimateFlagEnabled={true}
          isTypeFilterFlagEnabled={true}
        />
      )

      await act(flushPromises)

      wrapper.update()
    })

    test('it should update the activities state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.activities).toEqual([])
    })

    test('it should update the isLoading state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.isLoading).toEqual(false)
    })

    test('it should update the hasMore state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.hasMore).toEqual(false)
    })

    test('it should update the error state', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.error).toEqual(true)
    })
  })

  describe('when the Activity Type filter is changed to "externalActivity"', () => {
    beforeAll(async () => {
      axios.get.mockResolvedValue({ data: esResults })

      wrapper = mount(
        <ActivityFeedApp
          activityTypeFilter="dataHubActivity"
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          actions={ActivityFeedButtons}
          apiEndpoint={`${basePath}${endpoint}`}
          isGlobalUltimateFlagEnabled={true}
          isTypeFilterFlagEnabled={true}
        />
      )

      wrapper.find('select').simulate('change', {
        target: { value: 'externalActivity' },
      })

      await act(flushPromises)

      wrapper.update()
    })

    test('should display the SelectFilter component with the selected value', () => {
      const selectFilter = wrapper.find(SelectFilter)
      expect(selectFilter.prop('value')).toBe('externalActivity')
    })

    test('should display the Select component with the selected value', () => {
      const select = wrapper.find(Select)
      expect(select.prop('input')).toEqual({ defaultValue: 'externalActivity' })
    })

    test('should pass the filter parameters up to this parent', () => {
      const state = wrapper.find(ActivityFeedApp).state()
      expect(state.queryParams).toEqual({
        activityTypeFilter: 'externalActivity',
        showDnbHierarchy: false,
      })
    })
  })
})
