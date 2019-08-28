import React from 'react'
import renderer from 'react-test-renderer'
import { uniqueId } from 'lodash'
import { mount } from 'enzyme'
import { Details } from 'govuk-react'

import ActivityFeed from './ActivityFeed'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'


const generateActivities = total => Array.from({ length: total }, () => ({
  ...interactionActivityFixture,
  id: uniqueId(),
}))


describe('ActivityFeed', () => {
  describe('when the feed is empty', () => {
    test('should render empty feed', () => {
      const tree = renderer
        .create(<ActivityFeed />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a single activity', () => {
    test('should render single activity with appropriate header', () => {
      const tree = renderer
        .create(<ActivityFeed
          totalActivities={1}
          activities={[interactionActivityFixture]}
        />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })


  describe('when there are more activities to load', () => {
    test('should render with "Load more" link', () => {
      const tree = renderer
        .create(<ActivityFeed
          totalActivities={20}
          activities={generateActivities(20)}
          hasMore={true}
        />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when activities are being loaded', () => {
    test('should display a loader', () => {
      const tree = renderer
        .create(
          <ActivityFeed
            isLoading={true}
            hasMore={true}
          />,
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the activity feed has child elements', () => {
    test('should render the children', () => {
      const tree = renderer
        .create(
          <ActivityFeed>
            <div>Child element to test</div>
          </ActivityFeed>,
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the "Show details for all activities" link is clicked', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount((<ActivityFeed
        totalActivities={1}
        activities={[interactionActivityFixture]}
      />))

      wrapper.find('ShowDetails').at(0).simulate('click')
    })

    test('should change the link text', () => {
      expect(wrapper.find('ShowDetails').at(0).prop('children')).toEqual([
        'Hide',
        ' details for all activities',
      ])
    })

    test('should open all cards', () => {
      expect(wrapper.find(Details).at(0).prop('open')).toEqual(true)
    })
  })
})
