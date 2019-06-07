import React from 'react'
import renderer from 'react-test-renderer'
import MockDate from 'mockdate'

import ActivityFeed from './ActivityFeed'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

// Lock the date so moment's relative date doesn't break our deterministic tests.
MockDate.set(1559750582706)

describe('ActivityFeed', () => {
  test('renders empty feed', () => {
    const tree = renderer
      .create(<ActivityFeed />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders single activity', () => {
    const tree = renderer
      .create(<ActivityFeed totalActivities={1} activities={[interactionActivityFixture]}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders with "Load more" link', () => {
    const tree = renderer
      .create(<ActivityFeed
        totalActivities={20}
        activities={
          Array.from({ length: 20 }, (e, i) => {
            return {
              ...interactionActivityFixture,
              id: i,
            }
          })
        }
        hasMore={true}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders with loader', () => {
    const tree = renderer
      .create(
        <ActivityFeed
          isLoading={true}
          hasMore={true}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders its children', () => {
    const tree = renderer
      .create(
        <ActivityFeed>
          <div>Child element to test</div>
        </ActivityFeed>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})




