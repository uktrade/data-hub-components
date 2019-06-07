import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import { set } from 'lodash'

import ActivityFeedCard from './ActivityFeedCard'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'
import serviceDeliveryActivityFixture from '../../fixtures/activity_feed/interactions/service_delivery'
import MockDate from 'mockdate'

// Lock the date so moment's relative date doesn't break our deterministic tests.
MockDate.set(1559750582706)

describe('ActivityFeedCard', () => {
  describe('when the interaction is empty', () => {
    test('should render null', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={{}}/>)
        .toJSON()
      expect(tree).toBeNull()
    })
  })

  describe('when there is an interaction', () => {
    test('should render interaction activity', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={interactionActivityFixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft in the past', () => {
    test('should render interaction activity with "Incomplete interaction" badge', () => {
      const fixture = { ...interactionActivityFixture };
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.startTime', moment().subtract(1, 'years').toISOString())
      const tree = renderer
        .create(<ActivityFeedCard activity={fixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft and upcoming', () => {
    test('should render interaction activity with "Upcoming interaction" badge', () => {
      const fixture = { ...interactionActivityFixture };
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.startTime', moment().add(1, 'days').toISOString())
      const tree = renderer
        .create(<ActivityFeedCard activity={fixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a service delivery', () => {
    test('should render service delivery activity', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={serviceDeliveryActivityFixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is an activity item of arbitrary type', () => {
    test('should render default activity', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={{
          object: {
            'dit:subject': 'subject',
          }
        }}/>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})




