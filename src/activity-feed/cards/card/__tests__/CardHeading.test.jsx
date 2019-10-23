import React from 'react'
import renderer from 'react-test-renderer'
import CardHeading from '../CardHeading'

describe('CardHeading', () => {
  describe('when the all data items are passed', () => {
    test('should render the card heading', () => {
      const tree = renderer
        .create(
          <CardHeading
            blockText="View block card heading"
            sourceType=" source type "
            subHeading="View sub heading"
            summary="view summary"
            link={{ text: 'Go to the detail page', url: '#' }}
          />
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when sourceType is missing', () => {
    test('should render the default card heading', () => {
      const tree = renderer
        .create(
          <CardHeading
            blockText="View block card heading"
            link={{ text: 'Go to the detail page', url: '#' }}
          />
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when link is missing', () => {
    test('should render the heading without a link', () => {
      const tree = renderer
        .create(
          <CardHeading
            blockText="View block card heading"
            link={{ text: 'Go to the detail page', url: '#' }}
          />
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
