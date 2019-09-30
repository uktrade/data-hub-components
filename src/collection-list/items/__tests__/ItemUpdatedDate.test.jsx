import React from 'react'
import { mount } from 'enzyme'
import ItemMeta from '../ItemMeta'

describe('ItemMeta', () => {
  let wrapper

  describe('when a label and value are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemMeta label="Updated on" value="12 September 2019" />,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemMeta).exists()).toBe(true)
    })

    test('should render the label and value as text', () => {
      expect(wrapper.find(ItemMeta).at(0).text()).toBe('Updated on 12 September 2019')
    })
  })

  describe('when no label and value are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemMeta />,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemMeta).exists()).toBe(true)
    })

    test('should render no label or value', () => {
      expect(wrapper.find(ItemMeta).at(0).text()).toBe(' ')
    })
  })
})
