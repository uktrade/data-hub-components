import React from 'react'
import { mount } from 'enzyme'
import Item from '../Item'

describe('Item', () => {
  let wrapper

  describe('when a child is passed', () => {
    beforeAll(() => {
      wrapper = mount(<Item>Test Child</Item>)
    })

    test('should render the component', () => {
      expect(wrapper.find(Item).exists()).toBe(true)
    })

    test('should render children', () => {
      expect(wrapper.text()).toBe('Test Child')
    })
  })

  describe('when no children are passed', () => {
    beforeAll(() => {
      wrapper = mount(<Item />)
    })

    test('should render the component', () => {
      expect(wrapper.find(Item).exists()).toBe(true)
    })

    test('should render no children', () => {
      expect(wrapper.text()).toBe('')
    })
  })
})
