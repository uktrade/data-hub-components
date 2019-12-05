import React from 'react'
import { mount } from 'enzyme'

import ActivityFeedFilters from '../ActivityFeedFilters'
import ActivityFeedCheckbox from '../ActivityFeedCheckbox'
import SelectFilter from '../filters/SelectFilter'
import { ACTIVITY_TYPE_FILTERS } from '../constants'

const {
  allActivity,
  myActivity,
  externalActivity,
  dataHubActivity,
} = ACTIVITY_TYPE_FILTERS

const activityTypeFilters = [
  allActivity,
  myActivity,
  externalActivity,
  dataHubActivity,
]

const activityTypeFilter = allActivity.value

describe('ActivityFeedFilters', () => {
  let wrapper

  describe('when the filters are hidden', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedFilters
          activityTypeFilters={[]}
          activityTypeFilter=""
          onActivityTypeFilterChange={() => {}}
          showActivitiesFromAllCompanies={() => {}}
          dnbHierarchyCount={null}
          isGlobalUltimate={false}
          isGlobalUltimateFlagEnabled={false}
          isTypeFilterFlagEnabled={false}
        />
      )
    })

    test('should not render either filter components', () => {
      expect(wrapper.find(ActivityFeedCheckbox).exists()).toBe(false)
      expect(wrapper.find(SelectFilter).exists()).toBe(false)
    })
  })

  describe('when the filters are shown', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeedFilters
          activityTypeFilters={activityTypeFilters}
          activityTypeFilter={activityTypeFilter}
          onActivityTypeFilterChange={() => {}}
          showActivitiesFromAllCompanies={() => {}}
          dnbHierarchyCount={3}
          isGlobalUltimate={true}
          isGlobalUltimateFlagEnabled={true}
          isTypeFilterFlagEnabled={true}
        />
      )
    })

    test('should render both filter components', () => {
      expect(wrapper.find(ActivityFeedCheckbox).exists()).toBe(true)
      expect(wrapper.find(SelectFilter).exists()).toBe(true)
    })
  })
})
