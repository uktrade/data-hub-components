import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeed from './ActivityFeed'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

it('renders empty feed', () => {
  const tree = renderer
    .create(<ActivityFeed activities={[]}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders interaction activity', () => {
  const tree = renderer
    .create(<ActivityFeed activities={[interactionActivityFixture]}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
