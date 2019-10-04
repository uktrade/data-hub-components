import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import Label from '@govuk-react/label'
import ErrorText from '@govuk-react/error-text'

import Form from '../Form'
import FieldInput from '../FieldInput'

describe('FieldInput', () => {
  let wrapper

  describe('when the field is mounted', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" />
        </Form>
      )
    })

    test('should set default attributes on the input', () => {
      const input = wrapper.find('input[type="text"]')
      expect(input.prop('id')).toEqual('testField')
      expect(input.prop('name')).toEqual('testField')
      expect(input.prop('type')).toEqual('text')
      expect(input.prop('value')).toEqual('')
      expect(input.prop('onBlur')).toBeInstanceOf(Function)
      expect(input.prop('onChange')).toBeInstanceOf(Function)
    })
  })

  describe('when the field does specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" label="testLabel" />
        </Form>
      )
    })

    test('should render the input', () => {
      expect(wrapper.find('input[type="text"]').exists()).toBeTruthy()
    })

    test('should render the field with a label', () => {
      expect(wrapper.find(Label).exists()).toBeTruthy()
    })
  })

  describe('when the field does not specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" />
        </Form>
      )
    })

    test('should render the field without a label', () => {
      expect(wrapper.find(Label).exists()).toBeFalsy()
    })
  })

  describe('when the field does specify a legend', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" legend="testLegend" />
        </Form>
      )
    })

    test('should render the field with a legend', () => {
      expect(wrapper.find('legend').text()).toEqual('testLegend')
    })
  })

  describe('when the field does specify a hint', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" hint="testHint" />
        </Form>
      )
    })

    test('should render the field with a legend', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput
            type="text"
            name="testField"
            validate={() => 'testError'}
          />
        </Form>
      )
      wrapper.simulate('submit')
    })

    test('should render with an error', () => {
      const inputWrapper = wrapper.find('div').at(1)
      expect(wrapper.find(ErrorText).text()).toEqual('testError')
      expect(inputWrapper).toHaveStyleRule('border-left', '4px solid #b10e1e')
      expect(inputWrapper).toHaveStyleRule('margin-right', '15px')
      expect(inputWrapper).toHaveStyleRule('padding-left', '10px')
    })
  })

  describe('when the text is typed to the field', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {(form) => (
            <>
              <FieldInput type="text" name="testField" />
              <div id="values">{form.values.testField}</div>
            </>
          )}
        </Form>
      )
      const testField1 = wrapper.find('input')
      testField1.simulate('change', { target: { value: 'testValue' } })
    })

    test('should update field value', () => {
      expect(wrapper.find('input').prop('value')).toEqual('testValue')
    })

    test('should update value in form state', () => {
      expect(wrapper.find('#values').text()).toEqual('testValue')
    })
  })

  describe('when extra props are passed to the component', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput
            type="text"
            name="testField"
            minLength={3}
            maxLength={10}
          />
        </Form>
      )
    })

    test('should render input with all the extra props', () => {
      const input = wrapper.find('input[type="text"]')
      expect(input.prop('minLength')).toEqual(3)
      expect(input.prop('maxLength')).toEqual(10)
    })
  })
})
