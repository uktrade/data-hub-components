import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedFilters from './ActivityFeedFilters'

describe('ActivityFeedFilters', () => {
  test('renders filters', () => {
    const tree = renderer
      .create(<ActivityFeedFilters />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
