import React from 'react'
import { mount } from 'enzyme'

import CollectionItem from '../CollectionItem'
import Metadata from '../../metadata/Metadata'
import Badge from '../../badge/Badge'
import MetadataItem from '../../metadata/MetadataItem'

import capitalProfileItem from '../__fixtures__/capitalProfileItem'

describe('CollectionItem', () => {
  let wrapper

  describe('when props are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionItem
          headingUrl={capitalProfileItem.headingUrl}
          headingText={capitalProfileItem.headingText}
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
        wrapper.find('a[href="https://example.com/profile/1"]')
      ).toHaveLength(1)
    })

    test('should render the badge', () => {
      expect(wrapper.find(Badge).text()).toBe('United States')
    })

    test('should render the metadata', () => {
      const sectorMeta = 'Sector Finance'
      const addressMeta = 'Address 123 Random Street, Lucky City'
      expect(wrapper.find(Metadata).text()).toBe(sectorMeta + addressMeta)
    })
  })

  describe('when no badges or metadata are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionItem
          headingUrl={capitalProfileItem.headingUrl}
          headingText={capitalProfileItem.headingText}
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
        wrapper.find('a[href="https://example.com/profile/1"]')
      ).toHaveLength(1)
    })

    test('should not render the badge component', () => {
      expect(wrapper.find(Badge)).toHaveLength(0)
    })
    test('should not render the metadata component', () => {
      expect(wrapper.find(MetadataItem)).toHaveLength(0)
    })
  })

  describe('when no heading URL is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionItem
          headingText={capitalProfileItem.headingText}
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

    test('should not render the headingUrl', () => {
      expect(wrapper.find('a')).toHaveLength(0)
    })
  })
})
