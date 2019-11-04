import React from 'react'
import { mount } from 'enzyme'

import VisuallyHidden from '@govuk-react/visually-hidden'
import Badge from '../Badge'

describe('Badge', () => {
  let wrapper

  describe('when no props were passed', () => {
    beforeAll(() => {
      wrapper = mount(<Badge>testChildren</Badge>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toEqual('testChildren')
    })

    test('should not render a hidden label', () => {
      expect(wrapper.find(VisuallyHidden)).toHaveLength(0)
    })

    test('should render with a default (gray) border', () => {
      expect(wrapper).toHaveStyleRule('border', '2px solid #bfc1c3')
    })
  })

  describe('when a "label" prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(<Badge label="testLabel">testChildren</Badge>)
    })

    test('should render a hidden label', () => {
      expect(wrapper.find(VisuallyHidden).text()).toEqual('testLabel')
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('testChildren')
    })
  })

  describe('when a "borderColour" prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(<Badge borderColour="red">testChildren</Badge>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('testChildren')
    })

    test('should render with a red border', () => {
      expect(wrapper).toHaveStyleRule('border', '2px solid red')
    })
  })
})
