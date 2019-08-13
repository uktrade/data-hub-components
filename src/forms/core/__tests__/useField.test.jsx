import React from 'react'
import { mount } from 'enzyme'

import Form from '../Form'
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
  describe('when text is typed to the field', () => {
    test('should update state value', () => {
      const wrapper = mount(
        <Form>
          <TestField initialValue="testInitialValue" />
        </Form>,
      )
      const value = wrapper.find('.value')
      const input = wrapper.find('.field')

      expect(value.text()).toEqual('testInitialValue')
      input.simulate('change', { target: { value: 'testValue' } })
      expect(value.text()).toEqual('testValue')
    })
  })

  describe('when focus is removed from the field', () => {
    test('should run validation', () => {
      const wrapper = mount(
        <Form>
          <TestField validate={() => 'testError'} />
        </Form>,
      )
      const input = wrapper.find('.field')
      const touched = wrapper.find('.touched')
      const error = wrapper.find('.error')

      expect(touched.text()).toEqual('false')
      expect(error.text()).toEqual('')
      input.simulate('blur')
      expect(touched.text()).toEqual('true')
      expect(error.text()).toEqual('testError')
    })
  })
})
