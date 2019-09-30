import React from 'react'
import { mount } from 'enzyme'
import ItemMetaWrapper from '../ItemMetaWrapper'

describe('ItemMetaWrapper', () => {
  let wrapper

  describe('when a child is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemMetaWrapper>
        Test Child
        </ItemMetaWrapper>,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemMetaWrapper).exists()).toBe(true)
    })

    test('should render the child', () => {
      expect(wrapper.text()).toBe('Test Child')
    })
  })

  describe('when no children are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <ItemMetaWrapper />,
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(ItemMetaWrapper).exists()).toBe(true)
    })

    test('should render no children', () => {
      expect(wrapper.text()).toBe('')
    })
  })
})
