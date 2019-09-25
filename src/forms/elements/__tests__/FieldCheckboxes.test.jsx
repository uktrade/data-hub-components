import React from 'react'
import { mount } from 'enzyme'
import Label from '@govuk-react/label'
import HintText from '@govuk-react/hint-text'
import Checkbox from '@govuk-react/checkbox'

import Form from '../Form'
import FieldCheckboxes from '../FieldCheckboxes'

describe('FieldCheckboxes', () => {
  let wrapper

  describe('when the field does specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldCheckboxes name="testField" label="testLabel" />
        </Form>,
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
          <FieldCheckboxes name="testField" />
        </Form>,
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
          <FieldCheckboxes name="testField" legend="testLegend" />
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
          <FieldCheckboxes name="testField" hint="testHint" />
        </Form>,
      )
    })

    test('should render the field with a hint', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the field does specify options', () => {
    let checkboxes

    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldCheckboxes
            name="testField"
            options={[
              { label: 'testOptionLabel1', value: 'testOptionValue1' },
              { label: 'testOptionLabel2', value: 'testOptionValue2' },
            ]}
          />
        </Form>,
      )
      checkboxes = wrapper.find(Checkbox)
    })

    test('should render the checkbox inputs', () => {
      expect(wrapper.find(Checkbox).length).toEqual(2)
    })

    test('should render a label for each option', () => {
      expect(checkboxes.first().text()).toEqual('testOptionLabel1')
      expect(checkboxes.at(1).text()).toEqual('testOptionLabel2')
    })

    test('should render a name for each option', () => {
      expect(checkboxes.first().prop('name')).toEqual('testOptionValue1')
      expect(checkboxes.at(1).prop('name')).toEqual('testOptionValue2')
    })
  })

  describe('when the field validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldCheckboxes name="testField" validate={() => 'testError'} />
        </Form>,
      )
      wrapper.find('form').simulate('submit')
    })

    test('should render with an error', () => {
      expect(wrapper.find('span').at(1).text()).toEqual('testError')
    })
  })

  describe('when a checkbox is checked', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {form => (
            <>
              <FieldCheckboxes
                name="testField"
                options={[
                  { label: 'testOptionLabel1', value: 'testOptionValue1' },
                  { label: 'testOptionLabel2', value: 'testOptionValue2' },
                ]}
              />
              <div id="values">{JSON.stringify(form.values.testField)}</div>
            </>
          )}
        </Form>,
      )

      wrapper.find('input').first().simulate('change', {
        target: {
          checked: true,
          name: 'testOptionValue1',
        },
      })
    })

    test('should update value in form state', () => {
      expect(wrapper.find('#values').text()).toEqual('["testOptionValue1"]')
    })

    test('should check the first checkbox', () => {
      expect(wrapper.find('input').first().prop('checked')).toBeTruthy()
    })

    describe('when a checkbox is unchecked', () => {
      beforeAll(() => {
        wrapper.find('input').first().simulate('change', {
          target: {
            checked: false,
            name: 'testOptionValue1',
          },
        })
      })

      test('should update value in form state', () => {
        expect(wrapper.find('#values').text()).toEqual('[]')
      })

      test('should uncheck the first checkbox', () => {
        expect(wrapper.find('input').first().prop('checked')).toBeFalsy()
      })
    })
  })
})
