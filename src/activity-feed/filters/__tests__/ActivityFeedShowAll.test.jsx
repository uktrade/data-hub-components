import React from 'react'
import { mount } from 'enzyme'

import ActivityFeedShowAll from '../../ActivityFeedShowAll'
import ActivityFeedCheckbox from '../../ActivityFeedCheckbox'

describe('ActivityFeedShowAll', () => {
  let wrapper

  describe('when the checkbox "Show details for all activities" is checked', () => {
    const onChangeSpy = jest.fn()

    beforeEach(() => {
      wrapper = mount(
        <ActivityFeedShowAll onChange={onChangeSpy} checked={false}>
          Show details for all activities
        </ActivityFeedShowAll>
      )
    })

    test('should call the onChange event handler', () => {
      wrapper
        .find('input[name="activityFeedShowAll"]')
        .simulate('change', { target: { checked: true } })
      expect(onChangeSpy).toHaveBeenCalledTimes(1)
    })

    test('should have the correct labeling', () => {
      expect(wrapper.find(ActivityFeedCheckbox).text()).toEqual(
        'Show details for all activities'
      )
    })
  })
})
