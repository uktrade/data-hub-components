import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedHeader from '../ActivityFeedHeader'

describe('ActivityFeedHeader', () => {
  test('renders header without props', () => {
    const tree = renderer.create(<ActivityFeedHeader />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders header with all props defined', () => {
    const tree = renderer
      .create(
        <ActivityFeedHeader
          totalActivities={999}
          contentText="Test button"
          contentLink="http://testing.example.com"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders header with one activity', () => {
    const tree = renderer
      .create(<ActivityFeedHeader totalActivities={1} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
