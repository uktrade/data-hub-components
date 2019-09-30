import React from 'react'
import { mount } from 'enzyme'
import ItemBadge from '../ItemBadge'

describe('ItemBadge', () => {
  let wrapper

  describe('when text is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemBadge>USA</ItemBadge>,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemBadge).exists()).toBe(true)
    })

    test('should render the text', () => {
      expect(wrapper.find(ItemBadge).at(0).text()).toBe('USA')
    })
  })

  describe('when no text is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemBadge />,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemBadge).exists()).toBe(true)
    })

    test('should render no text', () => {
      expect(wrapper.find(ItemBadge).at(0).text()).toBe('')
    })
  })
})
