import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'

import Form from '../Form'
import FieldInput from '../FieldInput'

describe('FieldInput', () => {
  let wrapper

  describe('when the field does specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" label="testLabel" />
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

  describe('when the field does not specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" />
        </Form>,
      )
    })

    test('should render the field without a label', () => {
      const label = wrapper.find('span')
      expect(label.text()).toEqual('')
    })
  })

  describe('when the field does specify a legend', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldInput type="text" name="testField" legend="testLegend" />
        </Form>,
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
        </Form>,
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
          <FieldInput type="text" name="testField" validate={() => 'testError'} />
        </Form>,
      )
      wrapper.simulate('submit')
    })

    test('should render with an error', () => {
      const errorContainer = wrapper.find('span').at(1)
      expect(errorContainer.text()).toEqual('testError')
    })
  })

  describe('when the text is typed to the field', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {form => (
            <>
              <FieldInput type="text" name="testField" />
              <div id="values">{form.values.testField}</div>
            </>
          )}
        </Form>,
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
})
