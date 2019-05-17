import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeed from './ActivityFeed'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

test('should render empty feed', () => {
  const tree = renderer
    .create(<ActivityFeed activities={[]}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('should render activity', () => {
  const tree = renderer
    .create(<ActivityFeed activities={[interactionActivityFixture]}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
