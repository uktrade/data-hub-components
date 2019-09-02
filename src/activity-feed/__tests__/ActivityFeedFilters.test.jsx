import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import ActivityFeedFilters from '../ActivityFeedFilters'

describe('ActivityFeedFilters', () => {
  describe('when the details for all activities are hidden', () => {
    test('renders filters', () => {
      const tree = renderer
        .create(<ActivityFeedFilters onShowDetailsClick={() => {}} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the details for all activities are shown', () => {
    test('renders filters', () => {
      const tree = renderer
        .create(<ActivityFeedFilters onShowDetailsClick={() => {}} showDetails={true} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the "Show details for all activities" link is clicked', () => {
    let onShowDetailsClickMock
    let preventDefaultMock

    beforeEach(() => {
      onShowDetailsClickMock = jest.fn()
      preventDefaultMock = jest.fn()

      const wrapper = shallow((<ActivityFeedFilters
        onShowDetailsClick={onShowDetailsClickMock}
        showDetails={false}
      />))

      wrapper.find('ShowDetails').simulate('click', { preventDefault: preventDefaultMock })
    })

    test('should prevent default', () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should call onShowDetailsClick', () => {
      expect(onShowDetailsClickMock.mock.calls.length).toEqual(1)
    })
  })
})
