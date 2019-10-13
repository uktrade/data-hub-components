import React from 'react'
import renderer from 'react-test-renderer'
import { uniqueId } from 'lodash'
import { mount } from 'enzyme'
import Details from '@govuk-react/details'

import Checkbox from '@govuk-react/checkbox'
import Select from '@govuk-react/select'
import ActivityFeed from '../ActivityFeed'
import interactionActivityFixture from '../__fixtures__/interactions/interaction'

const generateActivities = (total) =>
  Array.from({ length: total }, () => ({
    ...interactionActivityFixture,
    id: uniqueId(),
  }))

describe('ActivityFeed', () => {
  describe('when the feed is empty', () => {
    test('should render empty feed', () => {
      const tree = renderer.create(<ActivityFeed />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a single activity', () => {
    test('should render single activity with appropriate header', () => {
      const tree = renderer
        .create(
          <ActivityFeed
            totalActivities={1}
            activities={[interactionActivityFixture]}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are more activities to load', () => {
    test('should render with "Load more" link', () => {
      const tree = renderer
        .create(
          <ActivityFeed
            totalActivities={20}
            activities={generateActivities(20)}
            hasMore={true}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when activities are being loaded', () => {
    test('should display a loader', () => {
      const tree = renderer
        .create(<ActivityFeed isLoading={true} hasMore={true} />)
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
          </ActivityFeed>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
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

      test('should display the checkbox in "unchecked" state', () => {
        expect(wrapper.find(Checkbox).prop('checked')).toBeFalsy()
      })

      test('should close details for all cards', () => {
        const openDetails = wrapper.find(Details).map((d) => d.prop('open'))
        expect(openDetails).not.toContainEqual(true)
      })
    })
  })

  describe('when the Activity Feed has activity type filters', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <ActivityFeed
          totalActivities={1}
          activities={[interactionActivityFixture]}
        />
      )
    })

    test('should display the dropdown in the default state, showing all activity', () => {
      expect(
        wrapper
          .render()
          .find('select')
          .val()
      ).toEqual('all')
    })

    describe('when the dropdown is changed', () => {
      beforeAll(() => {
        wrapper.find('select').simulate('change', {
          target: { value: 'hello,hello' },
        })
      })

      test('should display the dropdown with the selected value', () => {
        expect(wrapper.find(Select).prop('value')).toEqual(['hello', 'hello'])
      })
    })
  })
})
