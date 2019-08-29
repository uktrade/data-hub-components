import React from 'react'
import { mount } from 'enzyme'

import Form from '../Form'
import FieldInput from '../FieldInput'
import FieldError from '../FieldError'

describe('FieldInput', () => {
  let wrapper

  describe('when the field does specify label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" label="testLabel" name="testField" />
        </Form>,
      )
    })

    test('should render the input', () => {
      expect(wrapper.find('input[type="text"]').exists()).toBeTruthy()
    })

    test('should render the field with a label', () => {
      expect(wrapper.find('label').exists()).toBeTruthy()
    })
  })

  describe('when the field does not specify label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" />
        </Form>,
      )
    })

    test('should render the field without a label', () => {
      expect(wrapper.find('label').exists()).toBeFalsy()
    })
  })

  describe('when the validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" validate={() => 'testError'} />
        </Form>,
      )
      const testField1 = wrapper.find('#testField')
      testField1.simulate('change', { target: { value: 'testValue' } })
      wrapper.simulate('submit')
    })

    test('should render with an error', () => {
      expect(wrapper.find(FieldError).text()).toEqual('testError')
    })
  })
})
