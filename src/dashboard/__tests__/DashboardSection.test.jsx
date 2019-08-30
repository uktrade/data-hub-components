import React from 'react'
import { mount } from 'enzyme'
import DashboardSection from '../DashboardSection'

const initialProps = {
  heading: 'My Companies',
  headingSlotComponent: <div className="slot">Slot component</div>,
  subHeading: 'Sub heading',
  showSubHeading: true,
}

describe('Dashboard Header section', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<DashboardSection {...initialProps} />)
  })
  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  test('should display heading', () => {
    expect(wrapper.find('h2').text()).toEqual('My Companies')
  })
  test('should display a slot component', () => {
    expect(wrapper.find('.slot').text()).toEqual('Slot component')
  })
  test('should display a sub heading', () => {
    expect(wrapper.find('p').text()).toEqual('Sub heading')
  })
  describe('when hiding a sub heading', () => {
    test('sub heading should be hidden', () => {
      const props = {
        ...initialProps,
        showSubHeading: false,
      }
      wrapper = mount(<DashboardSection {...props} />)
      expect(wrapper.find('p')).toHaveLength(0)
    })
  })
})
