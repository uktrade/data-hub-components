import React from 'react'
import { mount } from 'enzyme'
import Select from '@govuk-react/select'

import BasicActivityTypeFilter from '../BasicActivityTypeFilter'
import ActivityFeed from '../../ActivityFeed'
import interactionActivityFixture from '../../__fixtures__/interactions/interaction'
import SelectFilter from '../SelectFilter'
import { ACTIVITY_TYPE_FILTERS } from '../../constants'

const { allActivity, dataHubActivity } = ACTIVITY_TYPE_FILTERS
const defaultFilterValue = dataHubActivity ? dataHubActivity.value : ''
const testFilterValue = allActivity ? allActivity.value : ''

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

  describe('when the Activity Feed has activity type filters', () => {
    beforeAll(() => {
      wrapper = mount(
        <ActivityFeed
          totalActivities={1}
          activityTypeFilters={ACTIVITY_TYPE_FILTERS}
          activities={[interactionActivityFixture]}
          isFilterEnabled={true}
        />
      )
    })

    test('should display the dropdown in the default state, showing all activity', () => {
      expect(
        wrapper
          .render()
          .find('select')
          .val()
      ).toEqual(defaultFilterValue.join(','))
    })

    describe('when the dropdown is changed', () => {
      beforeAll(() => {
        wrapper.find('select').simulate('change', {
          target: { value: testFilterValue.join(',') },
        })
      })

      test('should display the selectFilter component with the selected value', () => {
        expect(wrapper.find(SelectFilter).prop('value')).toEqual(
          testFilterValue
        )

        expect(wrapper.find(Select).prop('input')).toEqual({
          defaultValue: testFilterValue.join(','),
        })
      })
    })
  })
})
