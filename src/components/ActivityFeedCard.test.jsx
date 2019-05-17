import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedCard from './ActivityFeedCard'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

test('should render null', () => {
  const tree = renderer
    .create(<ActivityFeedCard activity={{}}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('should render interaction activity', () => {
  const tree = renderer
    .create(<ActivityFeedCard activity={interactionActivityFixture}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
