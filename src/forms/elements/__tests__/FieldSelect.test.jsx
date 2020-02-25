import React from 'react'
import { mount } from 'enzyme'
import Label from '@govuk-react/label'
import HintText from '@govuk-react/hint-text'

import FormStateful from '../FormStateful'
import FieldSelect from '../FieldSelect'

describe('FieldSelect', () => {
  let wrapper

  describe('when the field does specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldSelect name="testField" label="testLabel" />
        </FormStateful>
      )
    })

    test('should render the field with a label', () => {
      expect(
        wrapper
          .find(Label)
          .at(0)
          .text()
      ).toEqual('testLabel')
    })
  })

  describe('when the field does not specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldSelect name="testField" emptyOption="" />
        </FormStateful>
      )
    })

    test('should render the field without a label', () => {
      expect(
        wrapper
          .find(Label)
          .at(0)
          .text()
      ).toEqual('')
    })
  })

  describe('when the field does specify a legend', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldSelect name="testField" legend="testLegend" />
        </FormStateful>
      )
    })

    test('should render the field with a legend', () => {
      expect(wrapper.find('legend').text()).toEqual('testLegend')
    })
  })

  describe('when the field does specify a hint', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldSelect name="testField" hint="testHint" />
        </FormStateful>
      )
    })

    test('should render the field with a legend', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the field does specify options', () => {
    let options

    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldSelect
            name="testField"
            options={[
              { label: 'testOptionLabel1', value: 'testOptionValue1' },
              { label: 'testOptionLabel2', value: 'testOptionValue2' },
            ]}
          />
        </FormStateful>
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
        <FormStateful>
          <FieldSelect name="testField" validate={() => 'testError'} />
        </FormStateful>
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
        <FormStateful>
          <FieldSelect name="testField" emptyOption="testEmptyOption" />
        </FormStateful>
      )
    })

    test('should create an empty option with the same value', () => {
      expect(
        wrapper
          .find('option')
          .first()
          .text()
      ).toEqual('testEmptyOption')
    })
  })

  describe('when one of the options is selected', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          {(form) => (
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
        </FormStateful>
      )
      wrapper
        .find('select')
        .simulate('change', { target: { value: 'testOptionValue2' } })
    })

    test('should update field value', () => {
      expect(wrapper.find('select').prop('defaultValue')).toEqual(
        'testOptionValue2'
      )
    })

    test('should update value in form state', () => {
      expect(wrapper.find('#values').text()).toEqual('testOptionValue2')
    })
  })
})
