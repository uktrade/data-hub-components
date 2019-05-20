import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeed from './ActivityFeed'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

describe('ActivityFeed', () => {
  describe('when there are no activities', () => {
    test('should render empty feed', () => {
      const tree = renderer
        .create(<ActivityFeed activities={[]}/>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are activities', () => {
    test('should render activity', () => {
      const tree = renderer
        .create(<ActivityFeed activities={[interactionActivityFixture]}/>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})




