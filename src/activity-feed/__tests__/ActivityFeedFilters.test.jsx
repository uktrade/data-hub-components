import React from 'react'
import { mount } from 'enzyme'
import ActivityFeedFilters from '../ActivityFeedFilters'
import BasicActivityTypeFilter from '../filters/BasicActivityTypeFilter'
import ShowDetailsFilter from '../filters/ShowDetailsFilter'

describe('ActivityFeedFilters without BasicActivityTypeFilter', () => {
  let wrapper

  describe('when no activity type filters exist', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedFilters
          activityTypeFilters={[]}
          isTypeFilterEnabled={false}
          onShowDetailsClick={() => {}}
          showDetails={false}
        />
      )
    })

    test('renders the ShowDetailsFilter filters', () => {
      expect(wrapper.find(ActivityFeedFilters).exists()).toBe(true)
      expect(wrapper.find(BasicActivityTypeFilter).exists()).toBe(false)
      expect(wrapper.find(ShowDetailsFilter).exists()).toBe(true)
    })
  })

  describe('when activity type filters do exist', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedFilters
          activityTypeFilters={[
            {
              label: 'hello',
              value: 'hello',
            },
            {
              label: 'hello',
              value: 'hello',
            },
          ]}
          filteredActivity="hello"
          isTypeFilterEnabled={true}
          onShowDetailsClick={() => {}}
          onActivityTypeFilterChange={() => {}}
          showDetails={false}
        />
      )
    })

    test('renders the BasicActivityTypeFilter filters', () => {
      expect(wrapper.find(ActivityFeedFilters).exists()).toBe(true)
      expect(wrapper.find(BasicActivityTypeFilter).exists()).toBe(true)
      expect(wrapper.find(ShowDetailsFilter).exists()).toBe(false)
    })
  })
})
