import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedCard from './ActivityFeedCard'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

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




