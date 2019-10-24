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
import BasicActivityTypeFilter from '../filters/BasicActivityTypeFilter'

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
        expect(wrapper.find(ActivityFeedFilters).exists()).toBe(true)
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

  describe('when the "Basic Activities Filter" is mounted', () => {
    let wrapper

    const activities = [].concat(
      ...[
        companiesHouseAccountsDueFixture,
        hmrcExportOfGoodsFixture,
        interactionActivityFixture, // visible activity by default
        omisOrderAddedFixture, // visible activity by default
      ]
    )

    const defaultFilterValue = ACTIVITY_TYPE_FILTERS.length
      ? ACTIVITY_TYPE_FILTERS[2].value
      : ''

    const showAllActivitiesFilterValue = ACTIVITY_TYPE_FILTERS.length
      ? ACTIVITY_TYPE_FILTERS[0].value
      : ''

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeed
          activities={activities}
          totalActivities={activities.length}
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
        />
      )
    })

    describe('when filter is enabled', () => {
      test('should render the filter', () => {
        expect(wrapper.find(BasicActivityTypeFilter).exists()).toBe(true)
      })

      test('should receive the default filter value', () => {
        expect(wrapper.find(ActivityFeed).state().filteredActivity).toBe(
          defaultFilterValue
        )
      })

      test('should have a default value active', () => {
        expect(
          wrapper.find(BasicActivityTypeFilter).props().filteredActivity
        ).toBe(defaultFilterValue)
      })

      test('should only show the relevant activities', () => {
        expect(wrapper.find('ol li details').length).toBe(2)
      })
    })

    describe('when the filter that should list all activities is selected', () => {
      beforeAll(() => {
        wrapper.find('select').simulate('change', {
          target: { value: showAllActivitiesFilterValue },
        })
      })

      test('should have the "all" value active', () => {
        expect(
          wrapper.find(BasicActivityTypeFilter).props().filteredActivity
        ).toStrictEqual([])
      })

      test('should show all activities', () => {
        expect(wrapper.find('ol li details').length).toBe(activities.length)
      })
    })
  })
})
