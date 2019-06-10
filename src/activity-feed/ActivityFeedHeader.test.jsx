import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedHeader from './ActivityFeedHeader'

describe('ActivityFeedHeader', () => {
  test('renders header without props', () => {
    const tree = renderer
      .create(<ActivityFeedHeader />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders header with all props defined', () => {
    const tree = renderer
      .create(
        <ActivityFeedHeader
          totalActivities={999}
          addContentText="Test button"
          addContentLink="http://testing.example.com"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})



