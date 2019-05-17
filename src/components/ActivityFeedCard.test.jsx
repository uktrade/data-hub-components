import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedCard from './ActivityFeedCard'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

it('handles incomplete data', () => {
  const tree = renderer
    .create(<ActivityFeedCard activity={{}}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders interaction activity', () => {
  const tree = renderer
    .create(<ActivityFeedCard activity={interactionActivityFixture}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
