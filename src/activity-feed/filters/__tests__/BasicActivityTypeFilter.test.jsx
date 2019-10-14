import React from 'react'
import { mount } from 'enzyme'

import BasicActivityTypeFilter from '../BasicActivityTypeFilter'

describe('BasicActivityTypeFilter', () => {
  let wrapper

  describe('renders filters', () => {
    beforeAll(() => {
      wrapper = mount(
        <BasicActivityTypeFilter
          activityTypeFilters={[]}
          filteredActivity={[]}
          onActivityTypeFilterChange={() => {}}
          onShowDetailsClick={() => {}}
          showDetails={false}
          value={[]}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(BasicActivityTypeFilter).exists()).toBe(true)
    })
  })
})
