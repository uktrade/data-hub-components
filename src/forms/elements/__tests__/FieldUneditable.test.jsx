import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import Label from '@govuk-react/label'

import Form from '../Form'
import FieldUneditable from '../FieldUneditable'
import ButtonLink from '../../../button-link/ButtonLink'

describe('FieldUneditable', () => {
  let wrapper

  describe('when the field does specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldUneditable name="testField" label="testLabel">
            testValue
          </FieldUneditable>
        </Form>
      )
    })

    test('should render the value', () => {
      expect(wrapper.text()).toContain('testValue')
    })

    test('should render the field with a label', () => {
      expect(wrapper.find(Label).text()).toEqual('testLabel')
    })
  })

  describe('when the field does not specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldUneditable name="testField">testValue</FieldUneditable>
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
          <FieldUneditable type="text" name="testField" legend="testLegend">
            testValue
          </FieldUneditable>
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
          <FieldUneditable type="text" name="testField" hint="testHint">
            testValue
          </FieldUneditable>
        </Form>
      )
    })

    test('should render the field with a legend', () => {
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the "onChangeClick" callback is defined', () => {
    const onChangeClickSpy = jest.fn()

    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldUneditable
            type="text"
            name="testField"
            label="Test value"
            onChangeClick={onChangeClickSpy}
          >
            testValue
          </FieldUneditable>
        </Form>
      )
    })

    test('should render a button to change the field value', () => {
      expect(wrapper.find(ButtonLink).text()).toEqual('Change Test value')
    })

    describe('when the "Change" button is clicked', () => {
      beforeAll(() => {
        wrapper.find(ButtonLink).simulate('click')
      })

      test('should call callback defined in the "onChangeClick" prop', () => {
        expect(onChangeClickSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
