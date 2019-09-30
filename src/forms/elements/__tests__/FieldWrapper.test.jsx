import React from 'react'
import { mount } from 'enzyme'
import Label from '@govuk-react/label'
import HintText from '@govuk-react/hint-text'
import { ERROR_COLOUR } from 'govuk-colours'
import { BORDER_WIDTH_FORM_ELEMENT_ERROR, SPACING } from '@govuk-react/constants'

import FieldWrapper from '../FieldWrapper'

describe('FieldWrapper', () => {
  let wrapper

  describe('When the only a required name prop is specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName">Test default</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test default')
    })

    test('should not add a label', () => {
      expect(wrapper.find(Label).exists()).toBeFalsy()
    })

    test('should not add a legend', () => {
      expect(wrapper.find('fieldset legend').exists()).toBeFalsy()
    })

    test('should not add a hint text', () => {
      expect(wrapper.find(HintText).exists()).toBeFalsy()
    })
  })

  describe('When the label prop is specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName" label="testLabel">Test label</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test label')
    })

    test('should add a label', () => {
      expect(wrapper.find(Label).text()).toEqual('testLabel')
    })

    test('should not add error styles', () => {
      const label = wrapper.find(Label)
      expect(label).toHaveStyleRule('border-left', undefined)
      expect(label).toHaveStyleRule('margin-right', undefined)
      expect(label).toHaveStyleRule('padding-left', undefined)
    })
  })

  describe('When the legend prop is specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName" legend="testLegend">Test legend</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test legend')
    })

    test('should add a legend within fieldset', () => {
      expect(wrapper.find('fieldset legend').text()).toEqual('testLegend')
    })

    test('should not add error styles', () => {
      const legend = wrapper.find('fieldset legend')
      expect(legend).toHaveStyleRule('border-left', undefined)
      expect(legend).toHaveStyleRule('margin-right', undefined)
      expect(legend).toHaveStyleRule('padding-left', undefined)
    })
  })

  describe('When the hint prop is specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName" hint="testHint">Test hint</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test hint')
    })

    test('should set the hint text', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })

    test('should not add error styles', () => {
      const hint = wrapper.find(HintText)
      expect(hint).toHaveStyleRule('border-left', undefined)
      expect(hint).toHaveStyleRule('margin-right', undefined)
      expect(hint).toHaveStyleRule('padding-left', undefined)
    })
  })

  describe('When the label and error props are specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName" label="testLabel" error="testError">Test error</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test error')
    })

    test('should add a label', () => {
      expect(wrapper.find(Label).text()).toEqual('testLabel')
    })

    test('should add error styles to the label', () => {
      const label = wrapper.find(Label)
      expect(label).toHaveStyleRule('border-left', `${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR}`)
      expect(label).toHaveStyleRule('margin-right', SPACING.SCALE_3)
      expect(label).toHaveStyleRule('padding-left', SPACING.SCALE_2)
    })
  })

  describe('When the legend and error props are specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName" legend="testLegend" error="testError">Test error</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test error')
    })

    test('should add a legend', () => {
      expect(wrapper.find('fieldset legend').text()).toEqual('testLegend')
    })

    test('should add error styles to the legend', () => {
      const legend = wrapper.find('fieldset legend')
      expect(legend).toHaveStyleRule('border-left', `${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR}`)
      expect(legend).toHaveStyleRule('margin-right', SPACING.SCALE_3)
      expect(legend).toHaveStyleRule('padding-left', SPACING.SCALE_2)
    })
  })

  describe('When the hint and error props are specified', () => {
    beforeAll(() => {
      wrapper = mount(<FieldWrapper name="testName" hint="testHint" error="testError">Test error</FieldWrapper>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('Test error')
    })

    test('should add a hint', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })

    test('should add error styles to the legend', () => {
      const hint = wrapper.find(HintText)
      expect(hint).toHaveStyleRule('border-left', `${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR}`)
      expect(hint).toHaveStyleRule('margin-right', SPACING.SCALE_3)
      expect(hint).toHaveStyleRule('padding-left', SPACING.SCALE_2)
    })
  })
})
