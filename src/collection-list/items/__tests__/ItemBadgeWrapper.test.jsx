import React from 'react'
import { mount } from 'enzyme'
import ItemBadgeWrapper from '../ItemBadgeWrapper'

describe('ItemBadgeWrapper', () => {
  let wrapper

  describe('when a child is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemBadgeWrapper>
        Test Child
        </ItemBadgeWrapper>,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemBadgeWrapper).exists()).toBe(true)
    })

    test('should render children', () => {
      expect(wrapper.text()).toBe('Test Child')
    })
  })

  describe('when no children are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemBadgeWrapper />,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemBadgeWrapper).exists()).toBe(true)
    })

    test('should render no children', () => {
      expect(wrapper.text()).toBe('')
    })
  })
})
