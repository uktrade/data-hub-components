import React from 'react'
import { mount } from 'enzyme'

import FormStateful from '../../elements/FormStateful'
import useField from '../useField'

const TestField = (props) => {
  const field = useField({
    name: 'testField',
    label: 'testLabel',
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
  let wrapper
  let value
  let input
  let touched
  let error

  describe('when field is mounted with `initialValue`', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <TestField
            initialValue="testInitialValue"
            validate={() => 'testError'}
          />
        </FormStateful>
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

    describe('when form is submitted without filling the field', () => {
      beforeAll(() => {
        wrapper.simulate('submit')
      })

      test('should validate the field', () => {
        expect(touched.text()).toEqual('true')
        expect(error.text()).toEqual('testError')
      })
    })
  })

  describe('when form is submitted without filling the required field', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <TestField required="testRequiredError" />
        </FormStateful>
      )
      error = wrapper.find('.error')
      wrapper.simulate('submit')
    })

    test('should return error for the required field', () => {
      expect(error.text()).toEqual('testRequiredError')
    })
  })
})
