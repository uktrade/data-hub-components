import React from 'react'
import { mount } from 'enzyme'
import CollectionItem from '../CollectionItem'
import capitalProfileItem from '../__fixtures__/capitalProfileItem'
import interactionItem from '../__fixtures__/interactionItem'

describe('CollectionItem', () => {
  let wrapper

  describe('when props are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionItem
          itemId={capitalProfileItem.itemId}
          headingText={capitalProfileItem.headerText}
          basePath={capitalProfileItem.basePath}
          subPath={capitalProfileItem.subPath}
          badges={capitalProfileItem.badges}
          metadata={capitalProfileItem.metadata}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionItem).exists()).toBe(true)
    })

    test('should render the headingText', () => {
      expect(wrapper.find('h3').text()).toBe('Mars Exports Ltd')
    })

    test('should render the headingUrl', () => {
      expect(
        wrapper.find('a[href="/companies/1/investments/large-capital-profile"]')
      ).toHaveLength(1)
    })

    test('should render the badge', () => {
      expect(
        wrapper
          .find('span')
          .at(0)
          .text()
      ).toBe('United States')
    })
    test('should render the metadata', () => {
      expect(
        wrapper
          .find('span')
          .at(1)
          .text()
      ).toBe('Updated on 5 September 2019')
    })
  })

  describe('when no badges or metadata are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionItem
          itemId={interactionItem.itemId}
          headingText={interactionItem.headerText}
          basePath={interactionItem.basePath}
          subPath={null}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionItem).exists()).toBe(true)
    })

    test('should render the headingText', () => {
      expect(wrapper.find('h3').text()).toBe('Leadership Academy')
    })

    test('should render the headingUrl without subPath', () => {
      expect(wrapper.find('a[href="/interactions/1"]')).toHaveLength(1)
    })

    test('should not render the badge component', () => {
      expect(
        wrapper
          .find('span')
          .at(0)
          .exists()
      ).toBe(false)
    })
    test('should not render the metadata component', () => {
      expect(
        wrapper
          .find('span')
          .at(1)
          .exists()
      ).toBe(false)
    })
  })
})
