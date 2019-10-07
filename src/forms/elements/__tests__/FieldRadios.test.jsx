import React from 'react'
import { mount } from 'enzyme'
import Radio from '@govuk-react/radio'
import Label from '@govuk-react/label'
import HintText from '@govuk-react/hint-text'

import Form from '../Form'
import FieldRadios from '../FieldRadios'

describe('FieldRadios', () => {
  let wrapper

  describe('when the field does specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios name="testField" label="testLabel" />
        </Form>
      )
    })

    test('should render the field with a label', () => {
      expect(wrapper.find(Label).text()).toEqual('testLabel')
    })
  })

  describe('when the field does not specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios name="testField" />
        </Form>
      )
    })

    test('should render the field without a label', () => {
      expect(wrapper.find(Label).exists()).toBeFalsy()
    })
  })

  describe('when the field does specify a legend', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldRadios name="testField" legend="testLegend" />
        </Form>
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
          <FieldRadios name="testField" hint="testHint" />
        </Form>
      )
    })

    test('should render the field with a hint', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
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
        </Form>
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
        </Form>
      )
      wrapper.find('form').simulate('submit')
    })

    test('should render with an error', () => {
      expect(
        wrapper
          .find('span')
          .at(1)
          .text()
      ).toEqual('testError')
    })
  })

  describe('when a radio is checked', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {(form) => (
            <>
              <FieldRadios
                name="testField"
                options={[
                  { label: 'testOptionLabel1', value: 'testOptionValue1' },
                  { label: 'testOptionLabel2', value: 'testOptionValue2' },
                ]}
              />
              <div id="values">{form.values.testField}</div>
            </>
          )}
        </Form>
      )

      wrapper
        .find('input')
        .first()
        .simulate('change', {
          target: {
            checked: true,
            value: 'testOptionValue1',
          },
        })
    })

    test('should update value in form state', () => {
      expect(wrapper.find('#values').text()).toEqual('testOptionValue1')
    })

    test('should check the first checkbox', () => {
      expect(
        wrapper
          .find('input')
          .first()
          .prop('checked')
      ).toBeTruthy()
    })
  })
})
