import React from 'react'
import renderer from 'react-test-renderer'

import ActivityFeedFilters from '../ActivityFeedFilters'

describe('ActivityFeedFilters', () => {
  describe('when the details for all activities are hidden', () => {
    test('renders filters', () => {
      const tree = renderer
        .create(
          <ActivityFeedFilters
            isActivityTypeFilterEnabled={false}
            onShowDetailsClick={() => {}}
            showDetails={false}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
