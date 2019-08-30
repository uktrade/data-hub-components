import React from 'react'
import { mount } from 'enzyme'

import Form from '../../elements/Form'
import useField from '../useField'

const TestField = (props) => {
  const field = useField({
    name: 'testField',
    label: 'testLabel',
    validate: () => 'testError',
    ...props,
  })

  return (
    <div id={field.name}>
      <input
        className="field"
        type="text"
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      <span className="value">{field.value}</span>
      <span className="touched">{JSON.stringify(field.touched)}</span>
      <span className="error">{field.error}</span>
    </div>
  )
}

describe('useField', () => {
  describe('when field is mounted with `initialValue`', () => {
    let wrapper
    let value
    let input
    let touched
    let error

    beforeAll(() => {
      wrapper = mount(
        <Form>
          <TestField initialValue="testInitialValue" />
        </Form>,
      )
      value = wrapper.find('.value')
      input = wrapper.find('.field')
      touched = wrapper.find('.touched')
      error = wrapper.find('.error')
    })

    test('should store the initial value in the form state', () => {
      expect(value.text()).toEqual('testInitialValue')
    })

    describe('when text is typed to the field', () => {
      beforeAll(() => {
        input.simulate('change', { target: { value: 'testValue' } })
      })

      test('should update state value', () => {
        expect(value.text()).toEqual('testValue')
      })
    })

    describe('when focus is removed from the field', () => {
      beforeAll(() => {
        input.simulate('blur')
      })

      test('should set touched to TRUE', () => {
        expect(touched.text()).toEqual('true')
      })
    })

    describe('when form is submitted', () => {
      beforeAll(() => {
        wrapper.simulate('submit')
      })

      test('should validate the field', () => {
        expect(touched.text()).toEqual('true')
        expect(error.text()).toEqual('testError')
      })
    })
  })
})
