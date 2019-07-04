import React from 'react'
import renderer from 'react-test-renderer'

import PeopleList from './PeopleList'

describe('PeopleList.js', () => {
  describe('when the list of people is empty', () => {
    test('should not render an empty list', () => {
      const people = []
      const tree = renderer.create(<PeopleList people={people} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
