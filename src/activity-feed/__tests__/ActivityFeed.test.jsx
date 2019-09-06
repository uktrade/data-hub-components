import React from 'react'
import renderer from 'react-test-renderer'
import { uniqueId } from 'lodash'
import { mount } from 'enzyme'
import { Details } from 'govuk-react'

import Checkbox from '@govuk-react/checkbox'
import ActivityFeed from '../ActivityFeed'
import interactionActivityFixture from '../__fixtures__/interactions/interaction'


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

  describe('when the "Show details for all activities" checkbox is mounted', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount((<ActivityFeed
        totalActivities={1}
        activities={[interactionActivityFixture]}
      />))
    })

    test('should display the checkbox in "unchecked" state', () => {
      expect(wrapper.find(Checkbox).prop('checked')).toBeFalsy()
    })

    test('should display all cards in closed state', () => {
      expect(wrapper.find(Details).first().prop('open')).toBeFalsy()
      expect(wrapper.find(Details).last().prop('open')).toBeFalsy()
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

      test('should open all cards', () => {
        expect(wrapper.find(Details).first().prop('open')).toBeTruthy()
        expect(wrapper.find(Details).last().prop('open')).toBeTruthy()
      })
    })

    describe('when the checkbox is unchecked', () => {
      beforeAll(() => {
        wrapper.find('input').simulate('change', {
          target: { checked: false },
        })
      })

      test('should display the checkbox in "unchecked" state', () => {
        expect(wrapper.find(Checkbox).prop('checked')).toBeFalsy()
      })

      test('should close all cards', () => {
        expect(wrapper.find(Details).first().prop('open')).toBeFalsy()
        expect(wrapper.find(Details).last().prop('open')).toBeFalsy()
      })
    })
  })
})
