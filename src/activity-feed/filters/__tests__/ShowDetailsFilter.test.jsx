import React from 'react'
import { mount, shallow } from 'enzyme'

import ShowDetailsFilter from '../ShowDetailsFilter'

describe('ShowDetailsFilter', () => {
  let wrapper

  describe('when the details for all activities are hidden', () => {
    beforeAll(() => {
      wrapper = mount(
        <ShowDetailsFilter onShowDetailsClick={() => {}} showDetails={false} />
      )
    })

    test('renders filters', () => {
      expect(wrapper.find(ShowDetailsFilter).exists()).toBe(true)
    })
  })

  describe('when the details for all activities are shown', () => {
    beforeAll(() => {
      wrapper = mount(
        <ShowDetailsFilter onShowDetailsClick={() => {}} showDetails={true} />
      )
    })

    test('renders filters', () => {
      expect(wrapper.find(ShowDetailsFilter).exists()).toBe(true)
    })
  })

  describe('when the "Show details for all activities" checkbox is clicked', () => {
    const onShowDetailsClickMock = jest.fn()

    beforeEach(() => {
      wrapper = shallow(
        <ShowDetailsFilter
          onShowDetailsClick={onShowDetailsClickMock}
          showDetails={false}
        />
      )

      wrapper.find('Checkbox').simulate('change', {
        target: { checked: true },
      })
    })

    afterEach(() => {
      onShowDetailsClickMock.mockReset()
    })

    test('should call onShowDetailsClick', () => {
      expect(onShowDetailsClickMock.mock.calls.length).toEqual(1)
    })
  })
})
