import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeed from './activity-feed'

test('renders empty feed', () => {
  const tree = renderer
    .create(<ActivityFeed activities={[]} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
