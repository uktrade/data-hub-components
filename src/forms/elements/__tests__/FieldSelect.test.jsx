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
      const errorContainer = wrapper.find('span').at(1)
      expect(errorContainer.text()).toEqual('testError')
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

  describe('when one of the options is selected', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {form => (
            <>
              <FieldSelect
                name="testField"
                options={[
                  { label: 'testOptionLabel1', value: 'testOptionValue1' },
                  { label: 'testOptionLabel2', value: 'testOptionValue2' },
                ]}
              />
              <div id="values">{form.values.testField}</div>
            </>
          )}
        </Form>,
      )
      const testField1 = wrapper.find('select')
      testField1.simulate('change', { target: { value: 'testOptionValue2' } })
    })

    test('should update field value', () => {
      expect(wrapper.find('select').prop('defaultValue')).toEqual('testOptionValue2')
    })

    test('should update value in form state', () => {
      expect(wrapper.find('#values').text()).toEqual('testOptionValue2')
    })
  })
})
