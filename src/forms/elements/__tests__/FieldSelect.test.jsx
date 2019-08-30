import React from 'react'
import { mount } from 'enzyme'

import Form from '../Form'
import FieldSelect from '../FieldSelect'

describe('FieldSelect', () => {
  let wrapper

  describe('when the field does specify label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldSelect
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
          <FieldSelect
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
    let options

    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldSelect
            name="testField"
            options={[
              { label: 'testOptionLabel1', value: 'testOptionValue1' },
              { label: 'testOptionLabel2', value: 'testOptionValue2' },
            ]}
          />
        </Form>,
      )
      options = wrapper.find('option')
    })

    test('should render the options', () => {
      expect(wrapper.find('select > option').length).toEqual(3)
    })

    test('should render a default empty option', () => {
      expect(options.first().text()).toEqual('Please select')
      expect(options.first().prop('value')).toEqual('')
    })

    test('should render a label for each option', () => {
      expect(options.at(1).text()).toEqual('testOptionLabel1')
      expect(options.at(2).text()).toEqual('testOptionLabel2')
    })

    test('should render a value for each option', () => {
      expect(options.at(1).prop('value')).toEqual('testOptionValue1')
      expect(options.at(2).prop('value')).toEqual('testOptionValue2')
    })
  })

  describe('when the field validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldSelect name="testField" validate={() => 'testError'} />
        </Form>,
      )
      wrapper.find('form').simulate('submit')
    })

    test('should render with an error', () => {
      expect(wrapper.find('span').at(1).text()).toEqual('testError')
    })
  })

  describe('when an "emptyOption" prop is specified', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldSelect name="testField" emptyOption="testEmptyOption" />
        </Form>,
      )
    })

    test('should create an empty option with the same value', () => {
      expect(wrapper.find('option').first().text()).toEqual('testEmptyOption')
    })
  })
})
