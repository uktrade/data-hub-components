import React from 'react'
import { mount } from 'enzyme'

import Form from '../../core/Form'
import FieldInput from '../FieldInput'
import FieldError from '../FieldError'

describe('FieldError', () => {
  let wrapper

  describe('when the validation does not fail', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldError name="testField" />
        </Form>,
      )
    })

    test('should render with the error', () => {
      expect(wrapper.find(FieldError).text()).toEqual('')
    })
  })

  describe('when the validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldError name="testField" />
          <FieldInput type="text" name="testField" validate={() => 'testError'} />
        </Form>,
      )
      wrapper.find('form').simulate('submit')
    })

    test('should render with the error', () => {
      expect(wrapper.find(FieldError).at(0).text()).toEqual('testError')
    })
  })
})
