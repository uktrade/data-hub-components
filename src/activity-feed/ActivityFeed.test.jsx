import React from 'react'
import renderer from 'react-test-renderer'
import MockDate from 'mockdate'
import { uniqueId } from 'lodash'
import { mount } from 'enzyme'
import ActivityFeed from './ActivityFeed'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'

// Lock the date so moment's relative date doesn't break our deterministic tests.
MockDate.set(1559750582706)

const FEED_MAX_RENDER_TIME_SECONDS = 3.0

const generateActivities = total => Array.from({ length: total }, () => ({
  ...interactionActivityFixture,
  id: uniqueId(),
}))

class MockedActivityFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
    }
  }

  onLoadMore = () => {
    this.setState((prevState) => {
      const { activities } = prevState
      const allActivities = activities.concat(generateActivities(10))

      return {
        activities: allActivities,
      }
    })
  }

  render() {
    const { activities } = this.state
    return (
      <ActivityFeed
        hasMore={true}
        onLoadMore={this.onLoadMore}
        activities={activities}
      />
    )
  }
}

describe('ActivityFeed', () => {
  describe('when the feed is empty', () => {
    test('should render empty feed', () => {
      const tree = renderer
        .create(<ActivityFeed />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a single activity', () => {
    test('should render single activity with appropriate header', () => {
      const tree = renderer
        .create(<ActivityFeed
          totalActivities={1}
          activities={[interactionActivityFixture]}
        />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })


  describe('when there are more activities to load', () => {
    test('should render with "Load more" link', () => {
      const tree = renderer
        .create(<ActivityFeed
          totalActivities={20}
          activities={generateActivities(20)}
          hasMore={true}
        />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when activities are being loaded', () => {
    test('should display a loader', () => {
      const tree = renderer
        .create(
          <ActivityFeed
            isLoading={true}
            hasMore={true}
          />,
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the activity feed has child elements', () => {
    test('should render the children', () => {
      const tree = renderer
        .create(
          <ActivityFeed>
            <div>Child element to test</div>
          </ActivityFeed>,
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the activity feed has many activities', () => {
    test(`should render the entire feed under ${FEED_MAX_RENDER_TIME_SECONDS}s`, () => {
      const timeStart = process.hrtime()

      const wrapper = (
        <MockedActivityFeed />
      )
      const button = mount(wrapper).find('button')
      for (let i = 0; i < 20; i += 1) {
        button.simulate('click')
      }

      const [seconds, nanoseconds] = process.hrtime(timeStart)
      const totalTimeElapsed = parseFloat(`${seconds}.${nanoseconds}`)

      expect(totalTimeElapsed).toBeLessThanOrEqual(FEED_MAX_RENDER_TIME_SECONDS)
    })
  })
})
