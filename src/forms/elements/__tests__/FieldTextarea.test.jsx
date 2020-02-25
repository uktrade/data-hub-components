import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import Label from '@govuk-react/label'
import ErrorText from '@govuk-react/error-text'

import FormStateful from '../FormStateful'
import FieldTextarea from '../FieldTextarea'
import FieldWrapper from '../FieldWrapper'

describe('FieldTextarea', () => {
  describe('when the field is mounted', () => {
    test('should set default attributes on the textarea element', () => {
      const wrapper = mount(
        <FormStateful initialValues={{ testField: 'testValue' }}>
          <FieldTextarea name="testField" />
        </FormStateful>
      )
      const textarea = wrapper.find('textarea')
      expect(textarea.prop('id')).toEqual('testField')
      expect(textarea.prop('name')).toEqual('testField')
      expect(textarea.prop('rows')).toEqual('5')
      expect(textarea.prop('value')).toEqual('testValue')
      expect(textarea.prop('onBlur')).toBeInstanceOf(Function)
      expect(textarea.prop('onChange')).toBeInstanceOf(Function)
    })
  })

  describe('when the field does specify a label', () => {
    test('should render the textarea and a label', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTextarea name="testField" label="testLabel" />
        </FormStateful>
      )
      expect(wrapper.find('textarea').exists()).toBe(true)
      expect(wrapper.find(Label).exists()).toBe(true)
    })
  })

  describe('when the field does not specify a label', () => {
    test('should render the field without a label', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTextarea name="testField" />
        </FormStateful>
      )
      expect(wrapper.find(Label).exists()).toBe(false)
    })
  })

  describe('when the field does specify a legend', () => {
    test('should render the field with a legend', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTextarea name="testField" legend="testLegend" />
        </FormStateful>
      )
      expect(wrapper.find('legend').text()).toEqual('testLegend')
    })
  })

  describe('when the field does specify a hint', () => {
    test('should render the field with a legend', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTextarea name="testField" hint="testHint" />
        </FormStateful>
      )
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the validation fails', () => {
    test('should render error message', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTextarea name="testField" validate={() => 'testError'} />
        </FormStateful>
      )
      wrapper.find('form').simulate('submit')

      expect(wrapper.find(ErrorText).text()).toEqual('testError')

      const inputWrapper = wrapper
        .find(FieldWrapper)
        .find('div')
        .at(1)
      expect(inputWrapper).toHaveStyleRule('border-left', '4px solid #b10e1e')
      expect(inputWrapper).toHaveStyleRule('margin-right', '15px')
      expect(inputWrapper).toHaveStyleRule('padding-left', '10px')
    })
  })

  describe('when the text is typed to the field', () => {
    test('should update field value', () => {
      const wrapper = mount(
        <FormStateful>
          {(form) => (
            <>
              <FieldTextarea name="testField" />
              <div id="values">{form.values.testField}</div>
            </>
          )}
        </FormStateful>
      )
      const testField1 = wrapper.find('textarea')
      testField1.simulate('change', { target: { value: 'testValue' } })

      expect(wrapper.find('textarea').prop('value')).toEqual('testValue')
      expect(wrapper.find('#values').text()).toEqual('testValue')
    })
  })

  describe('when extra props are passed to the component', () => {
    test('should render textarea with all the extra props', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTextarea name="testField" rows={1} cols={10} />
        </FormStateful>
      )
      const textarea = wrapper.find('textarea')
      expect(textarea.prop('rows')).toEqual(1)
      expect(textarea.prop('cols')).toEqual(10)
    })
  })
})
