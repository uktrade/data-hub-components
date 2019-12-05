import React from 'react'
import { uniqueId } from 'lodash'
import { mount } from 'enzyme'
import Details from '@govuk-react/details'
import Checkbox from '@govuk-react/checkbox'
import { ACTIVITY_TYPE_FILTERS } from '../constants'
import Activity from '../Activity'
import ActivityFeed from '../ActivityFeed'
import ActivityFeedHeader from '../ActivityFeedHeader'
import ActivityFeedFilters from '../ActivityFeedFilters'
import ActivityFeedPagination from '../ActivityFeedPagination'

import companiesHouseAccountsDueFixture from '../__fixtures__/companies_house/accounts_are_due'
import hmrcExportOfGoodsFixture from '../__fixtures__/hmrc/export_of_goods'
import interactionActivityFixture from '../__fixtures__/interactions/interaction'
import omisOrderAddedFixture from '../__fixtures__/omis/order_added'

function generateActivities(total) {
  return Array.from({ length: total }, () => ({
    ...interactionActivityFixture,
    id: uniqueId(),
  }))
}

describe('ActivityFeed', () => {
  describe('when rendering the feed', () => {
    let wrapper

    describe('when the feed is empty', () => {
      beforeAll(() => {
        wrapper = mount(<ActivityFeed />)
      })

      test('should render empty feed', () => {
        expect(wrapper.find(ActivityFeedHeader).exists()).toBe(true)
        expect(wrapper.find(ActivityFeedFilters).exists()).toBe(false)
        expect(wrapper.find(ActivityFeed).exists()).toBe(true)
        expect(wrapper.find(Activity).exists()).toBe(false)
      })
    })

    describe('when there is a single activity', () => {
      beforeAll(() => {
        wrapper = mount(
          <ActivityFeed
            totalActivities={[interactionActivityFixture].length}
            activities={[interactionActivityFixture]}
            activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          />
        )
      })

      test('should render single activity', () => {
        expect(
          wrapper.find(ActivityFeed).props('activities').activities.length
        ).toBe(1)
        expect(wrapper.find(Activity).exists()).toBe(true)
      })
    })

    describe('when there are more activities to load than the 20 per page limit', () => {
      const activities = generateActivities(21)

      beforeAll(() => {
        wrapper = mount(
          <ActivityFeed
            totalActivities={activities.length}
            activities={activities}
            hasMore={activities.length > 20}
            onLoadMore={() => {}}
          />
        )
      })

      test('should render with "Load more" link', () => {
        expect(
          wrapper
            .find(ActivityFeed)
            .at(0)
            .props('activities').activities.length
        ).toBe(21)
        expect(wrapper.find(ActivityFeedPagination).exists()).toBe(true)
      })
    })

    describe('when there are less activities to load than the 20 per page limit', () => {
      beforeAll(() => {
        const activities = generateActivities(19)
        wrapper = mount(
          <ActivityFeed
            totalActivities={activities.length}
            activities={activities}
            hasMore={activities.length > 20}
            activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          />
        )
      })

      test('should render without "Load more" link', () => {
        expect(
          wrapper
            .find(ActivityFeed)
            .at(0)
            .props('activities').activities.length
        ).toBe(19)
        expect(wrapper.find(ActivityFeedPagination).exists()).toBe(false)
      })
    })

    describe('when activities are being loaded', () => {
      beforeAll(() => {
        wrapper = mount(<ActivityFeed isLoading={true} hasMore={true} />)
      })

      test('should display a loader', () => {
        expect(wrapper.find(ActivityFeedPagination).props().isLoading).toBe(
          true
        )
      })
    })

    describe('when calling onLoadMore', () => {
      const onLoadMoreSpy = jest.spyOn(ActivityFeed.defaultProps, 'onLoadMore')

      beforeAll(() => {
        wrapper = mount(<ActivityFeed isLoading={false} hasMore={true} />)
      })

      test('should call onLoadMore after pagination button click', () => {
        wrapper.find('button').simulate('click')
        expect(onLoadMoreSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when the "Show details for all activities" checkbox is mounted', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeed
          totalActivities={1}
          activities={[interactionActivityFixture]}
        />
      )
    })

    test('should display the checkbox in "unchecked" state', () => {
      expect(wrapper.find(Checkbox).prop('checked')).toBeFalsy()
    })

    test('should close details for all cards', () => {
      const openDetails = wrapper.find(Details).map((d) => d.prop('open'))
      expect(openDetails).not.toContainEqual(true)
    })

    describe('when the checkbox is clicked', () => {
      beforeAll(() => {
        wrapper.find('input').simulate('change', {
          target: { checked: true },
        })
      })

      test('should display the checkbox in "checked" state', () => {
        expect(wrapper.find(Checkbox).prop('checked')).toBeTruthy()
      })

      test('should open details for all cards', () => {
        const openProps = wrapper.find(Details).map((d) => d.prop('open'))
        expect(openProps).not.toContainEqual(false)
      })
    })

    describe('when the checkbox is unchecked', () => {
      beforeAll(() => {
        wrapper.find('input').simulate('change', {
          target: { checked: false },
        })
      })

      test('should display the show details checkbox in "unchecked" state', () => {
        expect(wrapper.find(Checkbox).prop('checked')).toBeFalsy()
      })

      test('should close details for all cards', () => {
        const openDetails = wrapper.find(Details).map((d) => d.prop('open'))
        expect(openDetails).not.toContainEqual(true)
      })
    })
  })

  describe('the Activity Type filters"', () => {
    let wrapper

    const activities = [].concat(
      ...[
        companiesHouseAccountsDueFixture,
        hmrcExportOfGoodsFixture,
        interactionActivityFixture, // visible activity by default
        omisOrderAddedFixture, // visible activity by default
      ]
    )

    const { allActivity, myActivity, dataHubActivity } = ACTIVITY_TYPE_FILTERS

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeed
          activities={activities}
          hasMore={true}
          totalActivities={activities.length}
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          dnbHierarchyCount={3}
          isTypeFilterFlagEnabled={true}
          isGlobalUltimateFlagEnabled={true}
        />
      )
    })

    describe('when activity type select filter is enabled', () => {
      test('should render the filter', () => {
        expect(wrapper.find(ActivityFeedFilters).exists()).toBe(true)
      })

      test('should receive the default filter value', () => {
        expect(wrapper.find(ActivityFeed).state().activityTypeFilter).toBe(
          dataHubActivity.value
        )
      })

      test('should have a default value active', () => {
        expect(
          wrapper.find(ActivityFeedFilters).props().activityTypeFilter
        ).toBe(dataHubActivity.value)
      })
    })

    describe('when the filter that should list all activities is selected', () => {
      beforeAll(() => {
        wrapper.find('select').simulate('change', {
          target: { value: allActivity.value },
        })
      })

      test('should show all activities', () => {
        expect(wrapper.find('ol li details').length).toBe(activities.length)
      })
    })

    describe('when the filter is My Activity', () => {
      const spySendQueryParams = jest.spyOn(
        ActivityFeed.defaultProps,
        'sendQueryParams'
      )

      beforeAll(() => {
        wrapper.find('select').simulate('change', {
          target: { value: myActivity.value },
        })
      })

      test('set the query params to the value selected', () => {
        expect(spySendQueryParams).toHaveBeenCalledWith({
          activityTypeFilter: 'myActivity',
          showDnbHierarchy: false,
        })
      })
    })

    describe('when the filter is DH Activity', () => {
      const spySendQueryParams = jest.spyOn(
        ActivityFeed.defaultProps,
        'sendQueryParams'
      )

      beforeAll(() => {
        wrapper.find('select').simulate('change', {
          target: { value: dataHubActivity.value },
        })
      })

      test('set the query params to the value selected', () => {
        expect(spySendQueryParams).toHaveBeenCalledWith({
          activityTypeFilter: dataHubActivity.value,
          showDnbHierarchy: false,
        })
      })
    })
  })

  describe('the D&B Ultimate HQ subsidiaries filter', () => {
    const sendQueryParamsSpy = jest.fn()
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeed
          activities={[]}
          sendQueryParams={sendQueryParamsSpy}
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          dnbHierarchyCount={3}
          isGlobalUltimate={true}
          isTypeFilterFlagEnabled={true}
          isGlobalUltimateFlagEnabled={true}
        />
      )
    })

    afterEach(() => sendQueryParamsSpy.mockClear())

    describe('selecting the checkbox', () => {
      beforeEach(() => {
        wrapper
          .find('input[name="ultimateHQSubsidiariesFilter"]')
          .simulate('change', { target: { checked: true } })
      })

      test('should send the correct query params', () => {
        expect(sendQueryParamsSpy).toHaveBeenCalledWith({
          activityTypeFilter: 'dataHubActivity',
          showDnbHierarchy: true,
        })
      })

      test('should update the state', () => {
        const state = wrapper.find(ActivityFeed).state()
        expect(state.showDnbHierarchy).toBe(true)
      })
    })

    describe('deselecting the checkbox', () => {
      beforeEach(() => {
        wrapper
          .find('input[name="ultimateHQSubsidiariesFilter"]')
          .simulate('change', { target: { checked: false } })
      })

      test('should send the correct query params', () => {
        expect(sendQueryParamsSpy).toHaveBeenCalledWith({
          activityTypeFilter: 'dataHubActivity',
          showDnbHierarchy: false,
        })
      })

      test('should update the state', () => {
        const state = wrapper.find(ActivityFeed).state()
        expect(state.showDnbHierarchy).toBe(false)
      })
    })
  })
})
