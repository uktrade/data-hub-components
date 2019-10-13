import React from 'react'
import renderer from 'react-test-renderer'

import BasicActivityTypeFilter from '../BasicActivityTypeFilter'

describe('BasicActivityTypeFilter', () => {
  describe('when the details for all activities are hidden', () => {
    test('renders filters', () => {
      const tree = renderer
        .create(
          <BasicActivityTypeFilter
            activityTypeFilters={[]}
            filteredActivity={[]}
            onActivityTypeFilterChange={() => {}}
            onShowDetailsClick={() => {}}
            showDetails={false}
            value={[]}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
