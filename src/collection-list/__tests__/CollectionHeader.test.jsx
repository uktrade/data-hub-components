import React from 'react'
import { mount } from 'enzyme'
import CollectionHeader from '../CollectionHeader'
import capitalProfileHeading from '../__fixtures__/capitalProfileHeading'

describe('CollectionHeader', () => {
  let wrapper

  describe('when props are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionHeader
          totalItems={capitalProfileHeading.totalItems}
          itemName={capitalProfileHeading.itemName}
          addItemText={capitalProfileHeading.addItemText}
          addItemUrl={capitalProfileHeading.addItemUrl}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionHeader).exists()).toBe(true)
    })

    test('should render the totalItems and itemName', () => {
      expect(wrapper.find('h2').text()).toBe('1 profile')
    })

    test('should render the addItemText', () => {
      expect(wrapper.find('a').text()).toBe('Add profile')
    })

    test('should render the addItemUrl', () => {
      expect(wrapper.find("a[href='#']")).toHaveLength(1)
    })
  })

  describe('when the totalItems is > 1 and no addItemText and addItemUrl are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionHeader
          totalItems={2}
          itemName={capitalProfileHeading.itemName}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionHeader).exists()).toBe(true)
    })

    test('should render the totalItems with the itemNamePlural', () => {
      expect(wrapper.find('h2').text()).toBe('2 profiles')
    })

    test('should not render the addItem button', () => {
      expect(wrapper.find('a').exists()).toBe(false)
    })
  })
})
