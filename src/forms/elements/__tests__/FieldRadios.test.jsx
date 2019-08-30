import React from 'react'
import { mount } from 'enzyme'
import Radio from '@govuk-react/radio'

import Form from '../Form'
import FieldRadios from '../FieldRadios'

describe('FieldRadios', () => {
  let wrapper

  describe('when the field does specify label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios
            name="testField"
            label="testLabel"
          />
        </Form>,
      )
    })

    test('should render the field with a label', () => {
      const label = wrapper.find('span')
      expect(label.exists()).toBeTruthy()
      expect(label.text()).toEqual('testLabel')
    })
  })

  describe('when the field does not specify label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios
            name="testField"
          />
        </Form>,
      )
    })

    test('should render the field without a label', () => {
      const label = wrapper.find('span')
      expect(label.text()).toEqual('')
    })
  })

  describe('when the field does specify options', () => {
    let radios

    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios
            name="testField"
            options={[
              { label: 'testOptionLabel1', value: 'testOptionValue1' },
              { label: 'testOptionLabel2', value: 'testOptionValue2' },
            ]}
          />
        </Form>,
      )
      radios = wrapper.find(Radio)
    })

    test('should render the radio inputs', () => {
      expect(wrapper.find('input[type="radio"]').length).toEqual(2)
    })

    test('should render a label for each option', () => {
      expect(radios.first().text()).toEqual('testOptionLabel1')
      expect(radios.at(1).text()).toEqual('testOptionLabel2')
    })

    test('should render a value for each option', () => {
      expect(radios.first().prop('value')).toEqual('testOptionValue1')
      expect(radios.at(1).prop('value')).toEqual('testOptionValue2')
    })
  })

  describe('when the field validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios name="testField" validate={() => 'testError'} />
        </Form>,
      )
      wrapper.find('form').simulate('submit')
    })

    test('should render with an error', () => {
      expect(wrapper.find('span').at(1).text()).toEqual('testError')
    })
  })
})
